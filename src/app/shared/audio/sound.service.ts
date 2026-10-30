import { Injectable, OnDestroy, signal } from '@angular/core';
import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class SoundService implements OnDestroy {
  private readonly enabledState = signal(true);
  private readonly musicVolumeState = signal(0.24);
  readonly enabled = this.enabledState.asReadonly();
  readonly musicVolume = this.musicVolumeState.asReadonly();

  private readonly selection = new Howl({
    src: ['sounds/menu-select.wav'],
    volume: 0.08,
    preload: true,
  });

  private readonly ambience = new Howl({
    src: ['sounds/castle-ambience.wav'],
    volume: 0.02,
    loop: true,
    preload: true,
    onplay: () => {
      if (!this.canPlay()) {
        this.ambience.pause();
        return;
      }
      this.ambience.fade(this.ambience.volume(), this.musicVolume(), 8000);
    },
    onplayerror: () => {
      this.ambience.once('unlock', () => {
        if (this.canPlay()) this.ambience.play();
      });
    },
  });

  toggle(): void {
    if (this.enabled()) {
      this.enabledState.set(false);
      this.selection.stop();
      if (this.ambience.playing()) {
        this.ambience.fade(this.ambience.volume(), 0, 350);
        window.setTimeout(() => {
          if (!this.enabled()) this.ambience.stop();
        }, 375);
      } else {
        this.ambience.stop();
      }
      return;
    }

    this.enabledState.set(true);
    this.syncPlayback();
    if (this.ambience.playing()) {
      this.ambience.fade(this.ambience.volume(), this.musicVolume(), 1200);
    }
    this.playUi();
  }

  setMusicVolume(volume: number): void {
    const nextVolume = Math.max(0, Math.min(0.6, volume));
    this.musicVolumeState.set(nextVolume);
    if (this.enabled() && this.ambience.playing()) {
      this.ambience.fade(this.ambience.volume(), nextVolume, 180);
    }
  }

  playUi(): void {
    if (this.canPlay()) this.selection.play();
  }

  ngOnDestroy(): void {
    this.ambience.unload();
    this.selection.unload();
  }

  syncPlayback(): void {
    if (!this.canPlay()) {
      this.ambience.pause();
      this.selection.stop();
      return;
    }

    if (!this.ambience.playing()) this.ambience.play();
  }

  private canPlay(): boolean {
    return this.enabled() && !document.hidden && document.hasFocus();
  }
}
