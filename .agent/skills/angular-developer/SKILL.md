---
name: angular-developer
description: Implementar componentes, serviços, formulários, rotas e estilos do portfólio Angular no workspace Nx.
license: MIT
metadata:
  author: Copyright 2026 Google LLC
  version: '2.0'
---

# Desenvolvimento Angular do portfólio

## Contexto do repositório Portfolio

Este workspace Nx contém uma única aplicação Angular chamada portfolio. Confira package.json, project.json, nx.json e o lockfile antes de escolher APIs; a base atual usa Angular 22.2, Nx 24, TypeScript 6 e RxJS 7.8.

O app standalone fica em src/. O shell está em src/app/app.ts, app.html e app.scss; as seções e controles vivem em features. Use nomes de código em inglês, textos ao visitante em português e apenas fatos, experiências, links e contatos confirmados.

Siga o padrão de pastas do Lordsz: componentes em src/app/features/<feature>/components/<component>/, com arquivos separados <component>.ts, <component>.html e <component>.scss. Gere componentes com npx nx g @nx/angular:component <path> --style=scss --changeDetection=OnPush --skipTests; use standalone e OnPush.

Bootstrap 5.3 está instalado e deve ser usado para grid, flex, alinhamento, espaçamento, botões e outras utilidades existentes. Importe Bootstrap uma vez na pilha Sass global e prefira utilitários antes de criar CSS local. Centralize a paleta em src/styles/\_tokens.scss como variáveis CSS; SCSS de componente não deve conter hex, RGB ou cores literais. Tamanho de fonte em rem.

Material Symbols Outlined fornece ícones funcionais de áudio, carregados como subconjunto pela URL Google Fonts em src/index.html. Use <span class="material-symbols-outlined">nome</span>, aria-hidden em itens decorativos e nome acessível nos botões com ícone. Ícones ilustrados do menu e habilidades usam SVGs pixelados em CC0 em public/icons/; preserve a fonte documentada em public/icons/SOURCES.md.

GSAP anima a interface, o personagem e o brilho sobre as fogueiras que já existem na arte de fundo. Crie tweens dentro de gsap.context() e reverta o contexto ao destruir os componentes; respeite prefers-reduced-motion. Howler controla os sons locais; mantenha a ambiência baixa no início, aumente-a gradualmente, ofereça mute e slider de volume, e trate bloqueios de autoplay. Efeitos de interação permanecem discretos. Angular CDK está instalado; use o menu acessível existente sem instalar Angular Material.

Prefira signals e computed para estado local. Conteúdo estático não precisa de serviço nem estado global. Não adicione APIs, formulários ou camadas arquiteturais sem necessidade e contrato demonstrados.

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

Prettier formata os arquivos alterados; lint valida regras, não formata. Após mudanças de código, execute npx prettier --write nos arquivos afetados, npx nx lint portfolio e npx nx build portfolio. Confira interações em desktop e mobile. Apenas documentação exige links, formatação e diff.
