import {
  ChangeDetectionStrategy,
  Component,
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
})
export class AudioControls {
  readonly sound = inject(SoundService);
  readonly volumeControlsOpen = signal(false);

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
