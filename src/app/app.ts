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
import { Character } from './features/portfolio/components/character/character';
import { Dialogue } from './features/portfolio/components/dialogue/dialogue';
import { MainMenu } from './features/portfolio/components/main-menu/main-menu';
import type { PortfolioSection } from './features/portfolio/components/main-menu/main-menu';
import { Objectives } from './features/portfolio/components/objectives/objectives';
import { Hero } from './features/portfolio/components/hero/hero';
import { Profile } from './features/portfolio/components/profile/profile';
import { Skills } from './features/portfolio/components/skills/skills';
import { SectionModal } from './features/portfolio/components/section-modal/section-modal';

@Component({
  imports: [
    Character,
    Dialogue,
    MainMenu,
    Objectives,
    Hero,
    Profile,
    Skills,
    SectionModal,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  readonly activeSection = signal<PortfolioSection | null>(null);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private animationContext?: gsap.Context;

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {
      if (!this.motionPreference.matches) {
        gsap.from('.stone-panel, app-hero', {
          autoAlpha: 0,
          y: 14,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        });

        gsap.from('.game-logo span', {
          y: -12,
          opacity: 0,
          duration: 0.4,
          stagger: 0.045,
          delay: 0.15,
          ease: 'back.out(1.5)',
        });

        gsap.utils.toArray<HTMLElement>('.door-fire').forEach((fire, index) => {
          gsap
            .timeline({ repeat: -1, delay: index * 0.13 })
            .to(fire, { scale: 1.16, opacity: 0.68, duration: 0.18 })
            .to(fire, { scale: 0.94, opacity: 0.4, duration: 0.12 })
            .to(fire, { scale: 1.27, opacity: 0.75, duration: 0.22 })
            .to(fire, { scale: 1, opacity: 0.48, duration: 0.3 });
        });

        gsap.utils.toArray<HTMLElement>('.dust-mote').forEach((mote, index) => {
          gsap.to(mote, {
            y: -20 - index * 3,
            x: index % 2 ? 7 : -7,
            opacity: 0.12,
            duration: 3.5 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, this.host.nativeElement);
  }

  selectSection(section: PortfolioSection): void {
    this.activeSection.set(section);
  }

  closeSection(): void {
    this.activeSection.set(null);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
