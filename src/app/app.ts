import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
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
export class App implements OnInit, AfterViewInit, OnDestroy {
  readonly activeSection = signal<PortfolioSection | null>(null);
  readonly showDesktopSkills = signal(
    !window.matchMedia('(max-width: 991.98px)').matches,
  );
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  private animationContext?: gsap.Context;
  private mobilePanelObserver?: IntersectionObserver;
  private readonly ambientAnimations: gsap.core.Animation[] = [];
  private readonly desktopSkillsQuery = window.matchMedia('(min-width: 992px)');
  private readonly updateDesktopSkills = (event: MediaQueryListEvent): void =>
    this.showDesktopSkills.set(event.matches);
  private readonly updateVisibility = (): void =>
    this.updateAmbientAnimations();

  ngOnInit(): void {
    this.desktopSkillsQuery.addEventListener(
      'change',
      this.updateDesktopSkills,
    );
    document.addEventListener('visibilitychange', this.updateVisibility);
  }

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {
      if (!this.motionPreference.matches) {
        const isMobile = !this.desktopSkillsQuery.matches;
        gsap.from(
          isMobile
            ? '.stone-panel:not(.dialogue-panel):not(.menu-panel), app-hero'
            : '.stone-panel, app-hero',
          {
            autoAlpha: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
          },
        );

        if (isMobile) {
          const panels = gsap.utils.toArray<HTMLElement>(
            '.dialogue-panel, .menu-panel',
          );
          gsap.set(panels, { autoAlpha: 0, y: 14 });
          this.mobilePanelObserver = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                this.animationContext?.add(() => {
                  gsap.to(entry.target, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    ease: 'power2.out',
                  });
                });
              });
            },
            { threshold: 0.1 },
          );
          panels.forEach((panel) => this.mobilePanelObserver?.observe(panel));
        }

        gsap.from('.game-logo span', {
          y: -12,
          opacity: 0,
          duration: 0.4,
          stagger: 0.045,
          delay: 0.15,
          ease: 'back.out(1.5)',
        });

        gsap.utils.toArray<HTMLElement>('.door-fire').forEach((fire, index) => {
          this.ambientAnimations.push(
            gsap
              .timeline({ repeat: -1, delay: index * 0.13 })
              .to(fire, { scale: 1.16, opacity: 0.68, duration: 0.18 })
              .to(fire, { scale: 0.94, opacity: 0.4, duration: 0.12 })
              .to(fire, { scale: 1.27, opacity: 0.75, duration: 0.22 })
              .to(fire, { scale: 1, opacity: 0.48, duration: 0.3 }),
          );
        });

        gsap.utils.toArray<HTMLElement>('.dust-mote').forEach((mote, index) => {
          this.ambientAnimations.push(
            gsap.to(mote, {
              y: -20 - index * 3,
              x: index % 2 ? 7 : -7,
              opacity: 0.12,
              duration: 3.5 + index * 0.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            }),
          );
        });
      }
    }, this.host.nativeElement);
  }

  selectSection(section: PortfolioSection): void {
    this.activeSection.set(section);
    this.updateAmbientAnimations();
  }

  closeSection(): void {
    this.activeSection.set(null);
    this.updateAmbientAnimations();
  }

  ngOnDestroy(): void {
    this.desktopSkillsQuery.removeEventListener(
      'change',
      this.updateDesktopSkills,
    );
    document.removeEventListener('visibilitychange', this.updateVisibility);
    this.mobilePanelObserver?.disconnect();
    this.animationContext?.revert();
  }

  private updateAmbientAnimations(): void {
    const shouldPause = this.activeSection() !== null || document.hidden;
    this.ambientAnimations.forEach((animation) =>
      shouldPause ? animation.pause() : animation.resume(),
    );
  }
}
