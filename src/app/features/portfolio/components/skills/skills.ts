import { Component } from '@angular/core';

interface Skill {
  readonly name: string;
  readonly icon: string;
  readonly level: number;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  readonly skills: readonly Skill[] = [
    { name: 'C#', icon: 'csharp-sword', level: 90 },
    { name: '.NET', icon: 'dotnet-bars', level: 88 },
    { name: 'Angular / TypeScript', icon: 'angular-shield', level: 85 },
    { name: 'SQL Server', icon: 'sql-pick', level: 80 },
    { name: 'APIs REST', icon: 'rest-leaf', level: 82 },
    { name: 'Sistema Fiscal (NFe, NFSe)', icon: 'dapper-scroll', level: 78 },
    { name: 'Banco de Dados', icon: 'dapper-scroll', level: 80 },
    { name: 'Docker', icon: 'docker-fish', level: 70 },
    { name: 'Git', icon: 'git-tree', level: 82 },
    { name: 'Resolução de Problemas', icon: 'problem-solving', level: 90 },
  ];
}
