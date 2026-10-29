import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { PortfolioSection } from '../main-menu/main-menu';

export interface DialogueEntry {
  readonly heading: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly details?: readonly string[];
  readonly link?: string;
}

export interface DialogueLink {
  readonly label: string;
  readonly url: string;
  readonly external?: boolean;
}

export interface DialogueContent {
  readonly title?: string;
  readonly paragraphs: readonly string[];
  readonly entries?: readonly DialogueEntry[];
  readonly links?: readonly DialogueLink[];
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
      'Sou Desenvolvedor Full Stack Pleno com mais de 4 anos de experiência no desenvolvimento, manutenção e evolução de sistemas corporativos, fiscais e de gestão de processos.',
      'Atuo principalmente com C#, .NET, ASP.NET Core, Angular, React e TypeScript, desenvolvendo aplicações web, APIs REST, integrações entre sistemas e soluções escaláveis. Tenho experiência em arquiteturas modernas e na modernização de sistemas legados, da análise de requisitos e regras de negócio à implementação, troubleshooting e sustentação em produção.',
      'No backend, trabalho com .NET, ASP.NET Core Web API, Entity Framework Core, Dapper, LINQ, injeção de dependência, autenticação e autorização com JWT e arquitetura em camadas. No frontend, utilizo Angular, AngularJS, React, Next.js, TypeScript e JavaScript, com foco em componentização, reutilização de código e interfaces responsivas.',
      'Também tenho experiência com SQL Server, PostgreSQL e MySQL, incluindo modelagem de dados, stored procedures e otimização de consultas. Conheço microsserviços, mensageria com RabbitMQ e Kafka, arquitetura orientada a eventos, comunicação assíncrona e integração entre sistemas.',
      'Minha experiência inclui Docker, Git, GitHub, Azure DevOps e CI/CD, além de SOLID, Clean Architecture, Design Patterns, DDD e testes unitários.',
      'Atuei em sistemas fiscais com documentos eletrônicos como NF-e, NFC-e, NFS-e, CT-e e MDF-e, além de sistemas corporativos críticos de gestão de processos e fluxo documental.',
      'Tenho perfil hands-on, analítico e orientado à resolução de problemas, com experiência em Scrum, Kanban e equipes multidisciplinares.',
    ],
  },
  experience: {
    title: 'Experiência',
    entries: [
      {
        heading: 'LBCA · Desenvolvedor Pleno',
        subtitle: 'set/2026 — atual',
        details: [
          'Desenvolvimento e manutenção de APIs REST e serviços backend com C#, .NET 6/8/10 e arquitetura em camadas.',
          'Integrações entre sistemas corporativos e jurídicos para automatizar envio e sincronização de dados.',
          'Rotinas com Azure Functions, Worker Services e Quartz.NET para processamento agendado e fluxos de integração.',
          'Consultas SQL, stored procedures e acesso a dados com SQL Server e Dapper.',
          'Processamento de planilhas Excel com ClosedXML e funcionalidades de integração documental.',
          'Injeção de dependência, separação de responsabilidades e organização arquitetural.',
          'Tratamento de exceções, logging estruturado com Serilog e testes automatizados.',
          'Documentação de APIs com OpenAPI, Swagger e Scalar.',
        ],
      },
      {
        heading: 'W3K Tecnologia · Full Stack Pleno',
        subtitle: 'fev/2026 — ago/2026',
        details: [
          'Desenvolvimento e manutenção de sistemas web para gestão de processos e fluxo documental com C#, .NET e React.',
          'Desenvolvimento e consumo de APIs REST para integrar módulos e sistemas corporativos.',
          'Análise de requisitos, correção de defeitos, refatoração e modernização de sistemas legados.',
          'Padrões de desenvolvimento, versionamento com Git e code review.',
          'Consultas SQL e melhorias de integridade e performance dos dados.',
          'Atuação em squads multidisciplinares, investigação e resolução de incidentes em produção.',
        ],
      },
      {
        heading: 'SafeNota · Full Stack Júnior',
        subtitle: 'ago/2022 — jan/2026',
        details: [
          'Desenvolvimento e manutenção de sistemas fiscais e corporativos com C#, .NET, ASP.NET, JavaScript e TypeScript.',
          'Aplicações com AngularJS e Angular, com foco em escalabilidade, reutilização de componentes e experiência do usuário.',
          'APIs REST, integrações e regras de negócio para emissão e gestão de documentos fiscais eletrônicos.',
          'Modernização tecnológica, refatoração de código legado e migração de funcionalidades.',
          'Modelagem e otimização de consultas SQL Server; acesso a dados com Entity Framework e Dapper.',
          'Git, colaboração em equipes multidisciplinares, metodologias ágeis e resolução de incidentes em produção.',
        ],
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
    paragraphs: [],
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
      'Desenvolver soluções escaláveis, confiáveis e de fácil manutenção, contribuindo com integrações entre sistemas, automação de processos e modernização tecnológica.',
    ],
  },
  contact: {
    title: 'Contato',
    paragraphs: ['Entre em contato ou veja meus perfis profissionais:'],
    links: [
      {
        label: 'E-mail · leonardolauerman@gmail.com',
        url: 'mailto:leonardolauerman@gmail.com',
      },
      { label: 'Telefone · (51) 99650-0528', url: 'tel:+5551996500528' },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/leonardolauermann/',
        external: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/LeonardoLauermann',
        external: true,
      },
    ],
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
