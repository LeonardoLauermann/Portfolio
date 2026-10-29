import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { PortfolioSection } from '../main-menu/main-menu';

export interface DialogueEntry {
  readonly heading: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly link?: string;
}

export interface DialogueContent {
  readonly title?: string;
  readonly paragraphs: readonly string[];
  readonly entries?: readonly DialogueEntry[];
  readonly email?: string;
}

export const DIALOGUE_CONTENT: Record<PortfolioSection, DialogueContent> = {
  welcome: {
    paragraphs: [
      'Bem-vindo ao portfólio de Leonardo Lauermann.',
      'Selecione uma opção no menu para conhecer mais.',
    ],
  },
  about: {
    title: 'Sobre Mim',
    paragraphs: [
      'Sou Leonardo Lauermann, desenvolvedor Full Stack com mais de quatro anos de experiência em sistemas corporativos, integrações e automações.',
      'Trabalho principalmente com C#, .NET, Angular e React, com atenção à arquitetura, testes e manutenção de soluções confiáveis.',
    ],
  },
  experience: {
    title: 'Experiência',
    entries: [
      {
        heading: 'LBCA · Desenvolvedor Pleno',
        subtitle: 'set/2026 até o presente',
        description:
          'APIs .NET, integrações, serviços em background e SQL Server.',
      },
      {
        heading: 'W3K Tecnologia · Full Stack Pleno',
        subtitle: 'fev/2026 a ago/2026',
        description: 'Sistemas corporativos com C#, .NET e React.',
      },
      {
        heading: 'SafeNota · Full Stack Júnior',
        subtitle: 'ago/2022 a jan/2026',
        description: 'Sistemas fiscais com .NET, Angular e SQL Server.',
      },
    ],
    paragraphs: [],
  },
  projects: {
    title: 'Projetos pessoais',
    paragraphs: [],
    entries: [
      {
        heading: 'Landing page — Santa Rosa',
        description: 'Página institucional.',
        link: 'https://santa-rosa-swart.vercel.app/',
      },
      {
        heading: 'Landing page — Claudete Lauermann',
        description: 'Terapia holística.',
        link: 'https://claudete-lauermann-terapia-holistic.vercel.app/',
      },
      {
        heading: 'Movie Explorer',
        description:
          'Sistema para explorar e visualizar informações de filmes, sem reprodução de vídeo.',
        link: 'https://movie-explorer-lime-three.vercel.app/',
      },
    ],
  },
  skills: {
    title: 'Habilidades',
    paragraphs: [
      'Desenvolvimento Full Stack com C#, .NET, ASP.NET Core, Angular, React, TypeScript e JavaScript. APIs REST e persistência com SQL Server, Dapper e Entity Framework.',
      'Também constam no currículo Azure Functions, Worker Services, Docker, Git, testes automatizados, SOLID e Clean Architecture.',
    ],
  },
  education: {
    title: 'Formação',
    entries: [
      {
        heading: 'Análise e Desenvolvimento de Sistemas',
        subtitle: 'Estácio · 2024 — atual',
      },
      {
        heading: 'Técnico em Sistemas para Internet',
        subtitle: 'Universidade Senac · 2022',
      },
    ],
    paragraphs: [],
  },
  objectives: {
    title: 'Objetivos',
    paragraphs: [
      'Atuação documentada em APIs, integrações corporativas, automação, arquitetura em camadas e evolução de sistemas legados.',
      'O currículo não descreve metas pessoais ou profissionais futuras.',
    ],
  },
  contact: {
    title: 'Contato',
    paragraphs: [
      'Quer conversar sobre desenvolvimento Full Stack e sistemas corporativos?',
    ],
    email: 'leonardolauerman@gmail.com',
  },
};

@Component({
  selector: 'app-dialogue',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialogue.html',
  styleUrl: './dialogue.scss',
})
export class Dialogue {
  readonly content = DIALOGUE_CONTENT.welcome;
}
