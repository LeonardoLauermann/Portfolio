---
name: portfolio-performance
description: Medir e otimizar bundles, carregamento, imagens, fontes e estabilidade visual do portfólio Angular.
metadata:
  version: '2.0'
---

# Performance do portfólio

Este workspace contém somente a aplicação portfolio. Confira alvos e budgets em project.json. O build usa @angular/build:application, saída em dist/portfolio e conteúdo servido em dist/portfolio/browser. A configuração padrão é production, com outputHashing all.

Budgets atuais: initial avisa em 500 kB e falha em 1 MB; anyComponentStyle avisa em 4 kB e falha em 8 kB. Não aumente limites para ocultar regressões.

O app renderiza no cliente. Não há SSR, prerender, hidratação, fontes próprias ou ferramentas Lighthouse configuradas. Não atribua métricas de outro projeto a este app.

1. Defina a hipótese e uma linha de base.
2. Compile com npx nx build portfolio. Para chunks, use npx nx build portfolio --stats-json e confira o arquivo emitido.
3. Sirva com npx nx run portfolio:serve-static e use a URL informada pelo servidor.
4. Compare antes e depois em navegador, viewport, rede e cache equivalentes. Use DevTools ou Lighthouse disponível; não presuma scripts npm perf:\*.
5. Registre resultados, condições e limites. Repita medições quando a variação impedir conclusão.

Os assets do cenário ficam em public/; considere dimensão, formato, cache e tamanho antes de adicionar novos. Não adie o conteúdo principal. A interface usa GSAP e respeita prefers-reduced-motion; a ambiência Howler inicia em volume baixo e aumenta gradualmente. Rotas lazy só se justificam quando houver páginas para isso; não fragmente excessivamente a página única.

Leia [fontes](references/fontes.md) ao alterar tipografia. Use Bootstrap e Material Symbols já instalados, com os SVGs pixelados CC0 locais documentados em `public/icons/SOURCES.md`; não adicione outro framework CSS ou novos conjuntos externos de ícones. Valide Prettier, lint, build e comportamento manualmente em desktop e mobile. Apenas documentação não exige medição.
