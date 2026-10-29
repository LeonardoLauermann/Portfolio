import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
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
export class MainMenu {
  readonly sectionSelected = output<PortfolioSection>();
  private readonly sound = inject(SoundService);
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
      section: 'contact',
      label: 'Contato',
      icon: '/icons/menu/contact-flag.svg',
    },
  ];

  select(section: PortfolioSection): void {
    this.sound.playUi();
    this.sectionSelected.emit(section);
  }
}
