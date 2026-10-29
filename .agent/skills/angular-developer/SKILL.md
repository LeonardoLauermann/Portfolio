---
name: angular-developer
description: Implementar componentes, serviços, formulários, rotas e estilos do portfólio Angular no workspace Nx.
license: MIT
metadata:
  author: Copyright 2026 Google LLC
  version: '2.0'
---

# Desenvolvimento Angular do portfólio

Confira package.json, project.json, nx.json e package-lock.json antes de escolher APIs ou comandos. A base atual usa Angular ~21.2.0, Nx 22.7.1, TypeScript ~5.9.2 e RxJS ~7.8.0. Não atualize versões por consequência de uma referência.

Há uma aplicação portfolio em src/. O bootstrap standalone está em src/main.ts; configuração, rotas e componente raiz ficam em src/app/app.config.ts, app.routes.ts e app.ts. A tela ainda renderiza NxWelcome e as rotas estão vazias. O scaffold não é conteúdo profissional aprovado.

Preserve arquivos separados como app.ts, app.html e app.scss, imports explícitos e componentes standalone. Prefira signal/computed para estado local quando necessário. Extraia componentes por responsabilidade ou reutilização real; conteúdo estático não exige serviços ou bibliotecas compartilhadas. Leia [arquitetura](references/project-architecture.md) ao dividir páginas.

Use SCSS local e src/styles.scss para regras globais. Não há Bootstrap, Tailwind, CDK, Angular Aria ou biblioteca de ícones nas dependências. Referências a essas ferramentas não autorizam instalá-las. Prefira HTML semântico, controles nativos, foco visível e layouts responsivos com CSS.

Nomes de código ficam em inglês e textos ao visitante em português. Use somente experiências, projetos, competências e contatos confirmados. Formulários devem usar APIs compatíveis com a versão instalada; não imponha Signal Forms por exemplos de versões posteriores. Contato exige integração real para confirmar envio: consulte portfolio-integrations.

## Referências por tarefa

Leia somente o necessário. Exemplos genéricos não comprovam funcionalidades instaladas e devem ser conferidos contra a versão local.

- Componentes: [fundamentos](references/components.md), [inputs](references/inputs.md), [outputs](references/outputs.md), [host](references/host-elements.md), [nomes](references/naming-conventions.md).
- Estado: [signals](references/signals-overview.md), [linkedSignal](references/linked-signal.md), [effects](references/effects.md), [resource](references/resource.md).
- Serviços: [injeção](references/di-fundamentals.md), [serviços](references/creating-services.md), [providers](references/defining-providers.md), [contexto](references/injection-context.md), [hierarquia](references/hierarchical-injectors.md), [HTTP](references/http-client.md), [pipes](references/pipes.md).
- Formulários: [reactive forms](references/reactive-forms.md), [template-driven](references/template-driven-forms.md), [Signal Forms](references/signal-forms.md), conforme compatibilidade e necessidade.
- Navegação: [rotas](references/define-routes.md), [carregamento](references/loading-strategies.md), [outlets](references/show-routes-with-outlets.md), [links](references/navigate-to-routes.md), [eventos](references/router-lifecycle.md), [guards](references/route-guards.md), [resolvers](references/data-resolvers.md).
- Visual: [estilos](references/component-styling.md), [animações](references/angular-animations.md), [transições](references/route-animations.md).
- Recursos condicionais: [renderização](references/rendering-strategies.md), [Aria](references/angular-aria.md). SSR e hidratação não estão configurados.
- Ferramentas: [CLI](references/cli.md), [ambientes](references/environment-configuration.md), [migrações](references/migrations.md), [MCP](references/mcp.md). Não crie outra aplicação nem execute migrações sem relação com o pedido.

Após mudanças de código, execute npx nx lint portfolio e npx nx build portfolio e confira as interações afetadas. Apenas documentação exige links, formatação e diff.
