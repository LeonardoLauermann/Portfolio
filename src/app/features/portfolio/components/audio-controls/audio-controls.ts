import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { SoundService } from '../../../../shared/audio/sound.service';

@Component({
  selector: 'app-audio-controls',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audio-controls.html',
  styleUrl: './audio-controls.scss',
  host: {
    '(document:visibilitychange)': 'onPageActivityChange()',
    '(window:focus)': 'onPageActivityChange()',
    '(window:blur)': 'onPageActivityChange()',
  },
})
export class AudioControls implements OnInit {
  readonly sound = inject(SoundService);
  readonly volumeControlsOpen = signal(false);

  ngOnInit(): void {
    this.sound.syncPlayback();
  }

  onPageActivityChange(): void {
    this.sound.syncPlayback();
  }

  toggleSound(): void {
    this.sound.toggle();
  }

  updateMusicVolume(event: Event): void {
    this.sound.setMusicVolume(
      Number((event.target as HTMLInputElement).value) / 100,
    );
  }

  toggleVolumeControls(): void {
    this.volumeControlsOpen.update((isOpen) => !isOpen);
  }
}
