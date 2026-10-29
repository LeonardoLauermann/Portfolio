import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { SoundService } from '../../../../shared/audio/sound.service';

export type PortfolioSection =
  | 'welcome'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'objectives'
  | 'hobbies'
  | 'contact';

interface MenuOption {
  readonly section: Exclude<PortfolioSection, 'welcome'>;
  readonly label: string;
  readonly icon: string;
}

@Component({
  selector: 'app-main-menu',
  imports: [CdkMenu, CdkMenuItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu implements OnInit, OnDestroy {
  readonly sectionSelected = output<PortfolioSection>();
  private readonly sound = inject(SoundService);
  private readonly mobileQuery = window.matchMedia('(max-width: 991.98px)');
  readonly isMobile = signal(this.mobileQuery.matches);
  readonly options: readonly MenuOption[] = [
    {
      section: 'about',
      label: 'Sobre Mim',
      icon: '/icons/skills/csharp-sword.svg',
    },
    {
      section: 'experience',
      label: 'Experiência',
      icon: '/icons/skills/dotnet-bars.svg',
    },
    {
      section: 'projects',
      label: 'Projetos',
      icon: '/icons/menu/project-chest.svg',
    },
    {
      section: 'skills',
      label: 'Habilidades',
      icon: '/icons/menu/skills-star.svg',
    },
    {
      section: 'education',
      label: 'Formação',
      icon: '/icons/menu/education-scroll.svg',
    },
    {
      section: 'objectives',
      label: 'Objetivos',
      icon: '/icons/menu/objective-group.svg',
    },
    {
      section: 'hobbies',
      label: 'Hobbies',
      icon: '/icons/menu/project-chest.svg',
    },
    {
      section: 'contact',
      label: 'Contato',
      icon: '/icons/menu/contact-flag.svg',
    },
  ];
  readonly visibleOptions = computed(() =>
    this.options.filter(
      (option) => this.isMobile() || option.section !== 'skills',
    ),
  );
  private readonly updateViewport = (event: MediaQueryListEvent): void => {
    this.isMobile.set(event.matches);
  };

  ngOnInit(): void {
    this.mobileQuery.addEventListener('change', this.updateViewport);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.updateViewport);
  }

  select(section: PortfolioSection): void {
    this.sound.playUi();
    this.sectionSelected.emit(section);
  }
}
