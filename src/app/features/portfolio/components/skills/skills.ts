import { Component } from '@angular/core';

interface Skill {
  readonly name: string;
  readonly icon?: string;
  readonly level?: number;
  readonly details?: string;
}

interface SkillGroup {
  readonly name: string;
  readonly icon: string;
  readonly skills: readonly Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  iconPath(icon: string): string {
    return icon.startsWith('menu/')
      ? `/icons/${icon}.svg`
      : `/icons/skills/${icon}.svg`;
  }

  readonly groups: readonly SkillGroup[] = [
    {
      name: 'Linguagens e Frameworks',
      icon: 'csharp-sword',
      skills: [
        { name: 'C#', icon: 'csharp-sword', level: 90 },
        {
          name: '.NET',
          icon: 'dotnet-bars',
          level: 88,
          details:
            '.NET Framework · .NET Core · .NET 5+ · ASP.NET MVC · ASP.NET Core',
        },
        { name: 'Entity Framework Core', icon: 'sql-pick' },
        { name: 'Dapper', icon: 'sql-pick' },
        { name: 'Java', icon: 'azure-lightning' },
        { name: 'JavaScript', icon: 'rest-leaf' },
        { name: 'TypeScript', icon: 'angular-shield' },
        { name: 'HTML5', icon: 'menu/education-scroll' },
        { name: 'CSS3', icon: 'menu/education-scroll' },
        { name: 'SCSS', icon: 'menu/education-scroll' },
      ],
    },
    {
      name: 'Front-end',
      icon: 'angular-shield',
      skills: [
        { name: 'AngularJS', icon: 'angular-shield' },
        { name: 'Angular', icon: 'angular-shield', level: 85 },
        { name: 'React', icon: 'react-rune' },
        { name: 'Next.js', icon: 'react-rune' },
        { name: 'Vue.js', icon: 'rest-leaf' },
        { name: 'React Native', icon: 'react-rune' },
        { name: 'Responsive Design', icon: 'menu/education-scroll' },
        { name: 'Consumo de APIs REST', icon: 'rest-leaf' },
      ],
    },
    {
      name: 'Back-end',
      icon: 'dotnet-bars',
      skills: [
        { name: 'ASP.NET Core Web API', icon: 'dotnet-bars' },
        { name: 'APIs RESTful', icon: 'rest-leaf', level: 82 },
        { name: 'Injeção de Dependência (DI)', icon: 'git-tree' },
        { name: 'LINQ', icon: 'sql-pick' },
        { name: 'Autenticação JWT', icon: 'angular-shield' },
        { name: 'Arquitetura em Camadas', icon: 'menu/education-scroll' },
        { name: 'Microsserviços', icon: 'menu/objective-group' },
      ],
    },
    {
      name: 'Banco de Dados',
      icon: 'sql-pick',
      skills: [
        { name: 'SQL Server', icon: 'sql-pick', level: 80 },
        { name: 'MySQL', icon: 'sql-pick' },
        { name: 'PostgreSQL', icon: 'sql-pick' },
        { name: 'SQL', icon: 'sql-pick' },
        { name: 'Modelagem de Dados', icon: 'dapper-scroll' },
        { name: 'Stored Procedures', icon: 'dapper-scroll' },
        { name: 'Otimização de Consultas', icon: 'dapper-scroll' },
        { name: 'Banco de Dados', icon: 'dapper-scroll', level: 80 },
      ],
    },
    {
      name: 'Ferramentas e DevOps',
      icon: 'git-tree',
      skills: [
        { name: 'Git', icon: 'git-tree', level: 82 },
        { name: 'GitHub', icon: 'git-tree' },
        { name: 'Azure DevOps', icon: 'azure-lightning' },
        { name: 'Azure Functions', icon: 'azure-lightning' },
        { name: 'Azurite', icon: 'azure-lightning' },
        { name: 'Docker', icon: 'docker-fish', level: 70 },
        { name: 'Linux', icon: 'azure-lightning' },
        { name: 'CI/CD', icon: 'dotnet-bars' },
        { name: 'Quartz.NET', icon: 'menu/education-scroll' },
      ],
    },
    {
      name: 'Arquitetura e Boas Práticas',
      icon: 'education-scroll',
      skills: [
        { name: 'SOLID', icon: 'menu/skills-star' },
        { name: 'Clean Architecture', icon: 'menu/education-scroll' },
        { name: 'Design Patterns', icon: 'menu/skills-star' },
        { name: 'DDD (Domain-Driven Design)', icon: 'menu/objective-group' },
        { name: 'Repository Pattern', icon: 'dapper-scroll' },
        { name: 'Testes Unitários', icon: 'menu/skills-star' },
      ],
    },
    {
      name: 'Desktop',
      icon: 'dotnet-bars',
      skills: [
        { name: 'WPF', icon: 'dotnet-bars' },
        { name: 'Windows Forms', icon: 'dotnet-bars' },
      ],
    },
    {
      name: 'Segurança',
      icon: 'angular-shield',
      skills: [
        { name: 'Autenticação e Autorização', icon: 'angular-shield' },
        { name: 'JWT', icon: 'azure-lightning' },
        { name: 'Controle de Acesso', icon: 'angular-shield' },
        { name: 'Segurança da Informação', icon: 'menu/skills-star' },
      ],
    },
    {
      name: 'Metodologias',
      icon: 'skills-star',
      skills: [
        { name: 'Scrum', icon: 'menu/objective-group' },
        { name: 'Kanban', icon: 'menu/objective-group' },
        { name: 'Desenvolvimento Ágil', icon: 'menu/objective-group' },
      ],
    },
    {
      name: 'Domínio e Competências',
      icon: 'skills-star',
      skills: [
        {
          name: 'Sistema Fiscal e Tributário',
          icon: 'dapper-scroll',
          level: 78,
        },
        { name: 'Resolução de Problemas', icon: 'problem-solving', level: 90 },
      ],
    },
  ].map((group, groupIndex) => ({
    ...group,
    skills: group.skills.map((skill, skillIndex) => ({
      ...skill,
      level: skill.level ?? 68 + ((groupIndex * 13 + skillIndex * 7) % 27),
    })),
  }));
}
