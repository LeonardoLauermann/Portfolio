---
name: portfolio-performance
description: Medir e otimizar bundles, carregamento, imagens, fontes e estabilidade visual do portfólio Angular.
metadata:
  version: '2.0'
---

# Performance do portfólio

Confira alvos e budgets em project.json. O build usa @angular/build:application, saída em dist/portfolio e conteúdo servido em dist/portfolio/browser. A configuração padrão é production, com outputHashing all.

Budgets atuais: initial avisa em 500 kB e falha em 1 MB; anyComponentStyle avisa em 4 kB e falha em 8 kB. Não aumente limites para ocultar regressões.

O app renderiza no cliente. Não há SSR, prerender, hidratação, fontes próprias ou ferramentas Lighthouse configuradas. Não atribua métricas de outro projeto a este app.

1. Defina a hipótese e uma linha de base.
2. Compile com npx nx build portfolio. Para chunks, use npx nx build portfolio --stats-json e confira o arquivo emitido.
3. Sirva com npx nx run portfolio:serve-static e use a URL informada pelo servidor.
4. Compare antes e depois em navegador, viewport, rede e cache equivalentes. Use DevTools ou Lighthouse disponível; não presuma scripts npm perf:*.
5. Registre resultados, condições e limites. Repita medições quando a variação impedir conclusão.

Reserve espaço para imagens e carregue as de baixo da dobra sob demanda. Não adie o conteúdo principal. Prefira CSS para efeitos simples e respeite prefers-reduced-motion. Rotas lazy só se justificam quando houver páginas para isso; não fragmente excessivamente a página única.

Leia [fontes](references/fontes.md) ao alterar tipografia. Não introduza frameworks CSS, bibliotecas de ícones ou providers globais por exemplos genéricos. Valide lint, build e comportamento por lint, build e inspeção manual. Apenas documentação não exige medição.
