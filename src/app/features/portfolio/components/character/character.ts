import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
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
  readonly isAnimating = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private animationContext?: gsap.Context;
  private readonly idleTweens: gsap.core.Tween[] = [];

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {
      if (this.motionPreference.matches) return;

      this.idleTweens.push(
        gsap.to('.wizard-avatar', {
          y: -7,
          rotation: 1,
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: '50% 85%',
        }),
      );
      this.idleTweens.push(
        gsap.to('.archer-avatar', {
          y: -3,
          rotation: -0.6,
          duration: 2.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: '50% 90%',
        }),
      );
      this.idleTweens.push(
        gsap.to('.cat-companions', {
          y: -2,
          duration: 1.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }),
      );
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

    this.isAnimating.set(true);
    this.idleTweens.forEach((tween) => tween.pause());
    this.animationContext.add(() => {
      gsap.fromTo(
        '.wizard-spark',
        { autoAlpha: 0, scale: 0.25, y: 8, rotation: -45 },
        {
          autoAlpha: 1,
          scale: 1.8,
          y: -24,
          rotation: 45,
          duration: 0.4,
          repeat: 1,
          yoyo: true,
        },
      );
      gsap
        .timeline({
          onComplete: () => {
            this.isAnimating.set(false);
            this.idleTweens.forEach((tween) => tween.resume());
          },
        })
        .to('.wizard-avatar', {
          x: 8,
          y: -20,
          rotation: -9,
          duration: 0.2,
          ease: 'power1.out',
        })
        .to('.wizard-avatar', {
          x: 30,
          y: -4,
          rotation: 8,
          duration: 0.2,
          ease: 'power1.inOut',
        })
        .to('.wizard-avatar', {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.35,
          ease: 'back.out(1.5)',
        })
        .to(
          '.archer-avatar',
          {
            x: 14,
            y: -16,
            rotation: -9,
            duration: 0.2,
            ease: 'power1.out',
          },
          0,
        )
        .to(
          '.archer-avatar',
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.48,
            ease: 'back.out(1.5)',
          },
          0.2,
        )
        .to(
          '.cat-companions',
          {
            y: -22,
            rotation: -8,
            duration: 0.18,
            ease: 'power1.out',
            transformOrigin: '50% 100%',
          },
          0.08,
        )
        .to(
          '.cat-companions',
          {
            y: 0,
            rotation: 0,
            duration: 0.24,
            ease: 'bounce.out',
          },
          0.26,
        )
        .to(
          '.cat-companions',
          {
            y: -10,
            rotation: 6,
            duration: 0.12,
            ease: 'power1.out',
          },
          0.5,
        )
        .to(
          '.cat-companions',
          {
            y: 0,
            rotation: 0,
            duration: 0.15,
            ease: 'bounce.out',
          },
          0.62,
        );
    });
  }
}
