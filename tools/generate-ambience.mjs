import { writeFileSync } from 'node:fs';

const sampleRate = 24000;
const tempo = 80;
const beat = 60 / tempo;
const bars = 8;
const duration = beat * 4 * bars;
const frames = Math.round(sampleRate * duration);
const channels = 2;
const mix = [new Float32Array(frames), new Float32Array(frames)];
let noiseState = 0x5eed1234;

function nextNoise() {
  noiseState ^= noiseState << 13;
  noiseState ^= noiseState >>> 17;
  noiseState ^= noiseState << 5;
  return ((noiseState >>> 0) / 0xffffffff) * 2 - 1;
}

const chords = [
  [50, 53, 57, 62],
  [48, 52, 55, 60],
  [43, 46, 50, 55],
  [50, 53, 57, 62],
  [46, 50, 53, 58],
  [41, 45, 48, 53],
  [48, 52, 55, 60],
  [50, 53, 57, 62],
];

function frequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function addNote({ note, start, length, gain, pan, voice }) {
  const startFrame = Math.max(0, Math.floor(start * sampleRate));
  const endFrame = Math.min(frames, Math.floor((start + length) * sampleRate));
  const hz = frequency(note);
  const panAngle = ((pan + 1) * Math.PI) / 4;
  const leftGain = Math.cos(panAngle) * gain;
  const rightGain = Math.sin(panAngle) * gain;

  for (let frame = startFrame; frame < endFrame; frame++) {
    const time = (frame - startFrame) / sampleRate;
    const progress = time / length;
    let envelope;
    let sample;

    if (voice === 'lute') {
      envelope = Math.exp(-time * 5.8) * Math.min(1, time * 90);
      sample =
        Math.sin(2 * Math.PI * hz * time) * 0.72 +
        Math.sin(2 * Math.PI * hz * 2.01 * time) * 0.2 +
        Math.sin(2 * Math.PI * hz * 3.98 * time) * 0.08;
    } else if (voice === 'flute') {
      const fadeIn = Math.min(1, time * 8);
      const fadeOut = Math.min(1, (length - time) * 5);
      envelope = fadeIn * fadeOut * (0.88 + 0.12 * Math.sin(time * 5));
      sample =
        Math.sin(2 * Math.PI * hz * time) * 0.78 +
        Math.sin(2 * Math.PI * hz * 2 * time) * 0.16 +
        Math.sin(2 * Math.PI * hz * 3 * time) * 0.06;
    } else {
      const fadeIn = Math.min(1, time * 1.8);
      const fadeOut = Math.min(1, (length - time) * 1.8);
      envelope = fadeIn * fadeOut;
      sample =
        Math.sin(2 * Math.PI * hz * time) * 0.8 +
        Math.sin(2 * Math.PI * hz * 2 * time) * 0.2;
    }

    const value = sample * envelope;
    mix[0][frame] += value * leftGain;
    mix[1][frame] += value * rightGain;
  }
}

function addDrum(start, gain, pan) {
  const length = 0.22;
  const startFrame = Math.floor(start * sampleRate);
  const endFrame = Math.min(frames, Math.floor((start + length) * sampleRate));
  const panAngle = ((pan + 1) * Math.PI) / 4;
  const leftGain = Math.cos(panAngle) * gain;
  const rightGain = Math.sin(panAngle) * gain;

  for (let frame = startFrame; frame < endFrame; frame++) {
    const time = (frame - startFrame) / sampleRate;
    const decay = Math.exp(-time * 19);
    const thump = Math.sin(2 * Math.PI * (82 - 28 * time) * time) * decay;
    const noise = nextNoise() * Math.exp(-time * 36) * Math.min(1, time * 250);
    const value = thump * 0.7 + noise * 0.3;
    mix[0][frame] += value * leftGain;
    mix[1][frame] += value * rightGain;
  }
}

const melody = [
  [74, 76, 77, 81],
  [79, 76, 74],
  [72, 74, 76, 79],
  [81, 79, 76, 74],
  [77, 76, 74, 69],
  [72, 74, 77, 76],
  [74, 72, 69],
  [69, 72, 74],
];

for (let bar = 0; bar < bars; bar++) {
  const barStart = bar * beat * 4;
  const chord = chords[bar];

  for (const [index, note] of chord.entries()) {
    addNote({
      note: note - 12,
      start: barStart,
      length: beat * 3.9,
      gain: index === 0 ? 0.035 : 0.019,
      pan: index % 2 === 0 ? -0.22 : 0.22,
      voice: 'pad',
    });
  }

  const arpeggio = [chord[0] + 12, chord[2] + 12, chord[1] + 12, chord[3] + 12];
  for (let step = 0; step < 6; step++) {
    addNote({
      note: arpeggio[step % arpeggio.length],
      start: barStart + step * beat * 0.5,
      length: beat * 0.46,
      gain: 0.075,
      pan: step % 2 === 0 ? -0.38 : 0.38,
      voice: 'lute',
    });
  }

  const notes = melody[bar];
  notes.forEach((note, index) => {
    const slot = index % 4;
    const start = barStart + slot * beat * 0.85 + beat * 0.12;
    const length = Math.min(beat * 0.72, duration - start - 0.03);
    if (length > 0.08) {
      addNote({
        note,
        start,
        length,
        gain: 0.043,
        pan: 0.04,
        voice: 'flute',
      });
    }
  });

  addDrum(barStart, 0.012, 0);
  addDrum(barStart + beat * 2, 0.008, 0.05);
}

// A short, quiet delay gives the plucked notes a soft room-like tail.
for (let channel = 0; channel < channels; channel++) {
  const delayFrames = Math.floor(sampleRate * 0.17);
  for (let frame = delayFrames; frame < frames; frame++) {
    mix[1 - channel][frame] += mix[channel][frame - delayFrames] * 0.12;
  }
}

const peak = Math.max(
  ...mix.map((channel) =>
    channel.reduce((max, v) => Math.max(max, Math.abs(v)), 0),
  ),
);
const masterGain = peak > 0 ? 0.82 / peak : 1;
const dataSize = frames * channels * 2;
const wav = Buffer.alloc(44 + dataSize);
wav.write('RIFF', 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write('WAVE', 8);
wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(channels, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * channels * 2, 28);
wav.writeUInt16LE(channels * 2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(dataSize, 40);

for (let frame = 0; frame < frames; frame++) {
  for (let channel = 0; channel < channels; channel++) {
    const normalized = Math.max(
      -1,
      Math.min(1, mix[channel][frame] * masterGain),
    );
    wav.writeInt16LE(
      Math.round(normalized * 32767),
      44 + (frame * channels + channel) * 2,
    );
  }
}

writeFileSync('public/sounds/castle-ambience.wav', wav);
console.log(
  `Generated original ${duration.toFixed(1)}s fantasy game ambience.`,
);
