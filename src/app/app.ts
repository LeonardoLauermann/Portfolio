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
import { AudioControls } from './features/portfolio/components/audio-controls/audio-controls';

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
    AudioControls,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  readonly activeSection = signal<PortfolioSection | null>(null);
  readonly isMoving = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private movementTimer?: number;
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

        gsap.to('.door-fire', {
          scale: 1.3,
          opacity: 0.78,
          duration: 0.24,
          stagger: 0.12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 100%',
        });
      }
    }, this.host.nativeElement);
  }

  selectSection(section: PortfolioSection): void {
    this.activeSection.set(section);
    this.isMoving.set(true);
    window.clearTimeout(this.movementTimer);
    this.movementTimer = window.setTimeout(() => this.isMoving.set(false), 850);
  }

  closeSection(): void {
    this.activeSection.set(null);
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.movementTimer);
    this.animationContext?.revert();
  }
}
