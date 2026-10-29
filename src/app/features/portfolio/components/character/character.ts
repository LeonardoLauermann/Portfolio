import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
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
  readonly moving = input(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private animationContext?: gsap.Context;
  private idleTween?: gsap.core.Tween;

  constructor() {
    effect(() => {
      if (this.moving()) this.walk();
    });
  }

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {
      if (this.motionPreference.matches) return;

      this.idleTween = gsap.to('.wizard-avatar', {
        y: -7,
        rotation: 1,
        duration: 1.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: '50% 85%',
      });
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }

  private walk(): void {
    if (!this.animationContext || this.motionPreference.matches) return;

    this.idleTween?.pause();
    this.animationContext.add(() => {
      gsap.fromTo(
        '.wizard-spark',
        { autoAlpha: 0, scale: 0.4, y: 5 },
        {
          autoAlpha: 1,
          scale: 1.15,
          y: -8,
          duration: 0.35,
          repeat: 1,
          yoyo: true,
        },
      );
      gsap
        .timeline({
          onComplete: () => this.idleTween?.resume(),
        })
        .to('.wizard-avatar', {
          x: 22,
          y: -12,
          rotation: -4,
          duration: 0.22,
          ease: 'power1.out',
        })
        .to('.wizard-avatar', {
          x: 58,
          y: -2,
          rotation: 4,
          duration: 0.24,
          ease: 'power1.inOut',
        })
        .to('.wizard-avatar', {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.32,
          ease: 'power2.out',
        });
    });
  }
}
