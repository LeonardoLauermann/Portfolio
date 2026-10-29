import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-character',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './character.html',
  styleUrl: './character.scss',
})
export class Character implements AfterViewInit, OnDestroy {
  readonly paused = input(false);
  readonly isAnimating = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private readonly characterSprites =
    '.wizard-avatar, .archer-avatar, .cat-companions';
  private animationContext?: gsap.Context;
  private idleTimeline?: gsap.core.Timeline;
  private movementTimeline?: gsap.core.Timeline;

  constructor() {
    effect(() => this.setIdlePaused(this.paused()));
  }

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {
      if (this.motionPreference.matches) return;

      this.idleTimeline = gsap
        .timeline({ paused: true, repeat: -1, yoyo: true })
        .fromTo(
          this.characterSprites,
          { y: 0, rotation: 0 },
          {
            y: -3,
            rotation: 0.6,
            duration: 2.4,
            ease: 'sine.inOut',
            transformOrigin: '50% 90%',
            immediateRender: false,
          },
          0,
        );

      this.movementTimeline = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            this.isAnimating.set(false);
            if (this.paused()) return;
            this.idleTimeline?.restart();
          },
        })
        .set(this.characterSprites, { transformOrigin: '50% 90%' }, 0)
        .to(
          this.characterSprites,
          {
            x: -5,
            y: -12,
            rotation: -3,
            duration: 0.22,
            ease: 'power2.out',
          },
          0,
        )
        .to(
          this.characterSprites,
          {
            x: 7,
            y: -5,
            rotation: 3,
            duration: 0.3,
            ease: 'power1.inOut',
          },
          0.22,
        )
        .to(
          this.characterSprites,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.58,
            ease: 'elastic.out(1, 0.55)',
          },
          0.52,
        );

      this.setIdlePaused(this.paused());
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }

  playMovement(): void {
    if (
      !this.animationContext ||
      this.motionPreference.matches ||
      this.isAnimating()
    )
      return;

    if (!this.movementTimeline) return;

    this.isAnimating.set(true);
    this.idleTimeline?.pause(0);
    this.movementTimeline.restart();
  }

  private setIdlePaused(paused: boolean): void {
    if (paused) {
      this.idleTimeline?.pause();
      this.movementTimeline?.pause();
      return;
    }

    if (this.isAnimating()) this.movementTimeline?.resume();
    else this.idleTimeline?.resume();
  }
}
