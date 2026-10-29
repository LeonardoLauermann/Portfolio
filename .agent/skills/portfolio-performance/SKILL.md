---
name: lordsz-performance
description: Performance, bundle e Lighthouse no monorepo Lordsz (Angular 22 + Nx, SSG). Use ao medir ou otimizar FCP, LCP, CLS, Speed Index ou TBT; ao investigar o tamanho de bundles ou avisos de budget; ao criar rota, página ou seção nova; ao adicionar dependência, provider global, fonte, ícone Material Symbols, imagem ou componente do Bootstrap; ao mexer em app.config, app.routes, app.routes.server ou nos estilos compartilhados.
metadata:
  version: '1.2'
---

# Performance no Lordsz

Regras permanentes: `docs/INSTRUCOES-IA.md` §11. Histórico e números: `docs/performance/progresso.md`. Hospedagem: `docs/performance/hospedagem.md`. Para APIs do Angular (SSR, hidratação, `@defer`), consulte a skill `angular-developer`.

## Arquitetura atual (não desfazer sem medir)

- **Build estático nas três apps** (`outputMode: 'static'`, `main.server.ts`, `app.config.server.ts`, `app.routes.server.ts`). Site e páginas públicas do Portal têm prerender; Ecommerce usa apenas CSR com base `/catalogo/`. Checkout, login e recuperação do Site usam CSR; módulos parametrizados dependem dos slugs obtidos no build, com fallback Client. Consulte as rotas de servidor de cada app. Hidratação com `withEventReplay()`; a hidratação incremental já é padrão no Angular 22.
- **Rotas:** layout raiz eager, páginas lazy, `IdlePreloading` (`@lordsz/data-access`) pré-carrega depois do `load` e das fontes.
- **Libs com `"sideEffects": false`** (`apps/shared/components/package.json` e `apps/shared/data-access/package.json`): o barrel `@lordsz/components` não arrasta `forms` e `ngx-mask` para quem só usa o `Footer`.
- **`provideNgxMask()`** fica no componente `Input`, não na raiz.
- **CSS:** pilha modular do Bootstrap em `_bootstrap-stack.scss`; CSS crítico inlineado pelo Beasties no HTML prerenderizado.
- **Fontes:** subconjunto latino com `unicode-range`, arquivo completo só para outros scripts (`_font-ranges.scss`, gerado), fallbacks com métricas ajustadas e `preload` das 3 fontes da primeira dobra no `index.html`.
- **Ícones:** subconjunto do Material Symbols via `icon_names=` no `index.html`, gerado por `tools/icons.mjs`. A regra `.material-symbols-outlined { width: 1em }` evita CLS.

## Fluxo para uma mudança de performance

1. Linha de base: `npm run preview:<app>` (portas 4301 site, 4302 ecommerce, 4303 portal) e `npm run perf:lighthouse -- http://localhost:<porta>/<rota>`.
2. Bundle: `npx nx build <app> --statsJson` e `npm run perf:bundle -- <app>` (mostra o peso por pacote e por pasta; conta como iniciais os chunks com `modulepreload`).
3. Se a mudança for de estilo: `npm run perf:pages -- <app> http://localhost:<porta> --snapshot=antes.json` (e outra execução com `--mobile`).
4. Aplicar a mudança. Rebuild (o `serve-dist` relê os arquivos alterados).
5. Validar:
   - `npm run perf:pages -- <app> http://localhost:<porta> --mobile` (erros de console e de hidratação, ícone sem glifo, rolagem horizontal; somente rotas públicas; fluxos autenticados ficam nos E2E com API simulada);
   - `--compare=antes.json` para mudanças de CSS;
   - Lighthouse mobile com mediana de 3 execuções (padrão do comando); amplie a amostra se a variação impedir uma conclusão.
6. Lint, testes, build e E2E dos fluxos afetados (`npm run check` completo só se o usuário pedir) e registrar em `docs/performance/progresso.md`: linha na tabela de métricas e um parágrafo no diário (o que mudou, números e achados).

- Atalho de bundle: `npm run perf:bundle:<app>` compila com stats e gera o relatório. `<app>` é `site`, `ecommerce` ou `portal`; preview da vitrine: `http://localhost:4302/catalogo/`.
- Hospedagem atual: uma imagem e um contêiner Caddy por app; veja `docs/deploy.md`. Alterações de documentação não exigem executar Lighthouse, builds ou E2E. Números históricos só valem para o build medido.
- Fontes e estilos: consulte `apps/shared/styles/README.md`. Preserve `implicitDependencies: ["styles"]` nas três apps e a pilha modular do Bootstrap. Depois de scripts avulsos de navegador, feche o processo, remova o perfil criado e rode `npm run limpar:temp`; as ferramentas oficiais já fazem a limpeza.

## Armadilhas já encontradas

- **Antivírus (Kaspersky) local:** injeta um script bloqueante e entrega o HTML descomprimido. O `perf:lighthouse` bloqueia o script, mas o HTML continua com cerca de 70 kB em vez de cerca de 12 kB. No trace observado, FCP e LCP acontecem por volta de 230 ms; os 2 a 3 s simulados vêm do modelo Lantern. A referência final é o PageSpeed Insights em produção.
- **Lantern cobra tudo o que é pedido antes da pintura:** preload ou modulepreload a mais aumenta o FCP/LCP simulado. Pré-carregar rotas cedo demais piorou o LCP (2,92 → 3,32 s); por isso o `IdlePreloading` espera `load` e `document.fonts.ready`.
- **Beasties (CSS crítico):** só inlineia `@font-face` com `url()` e cuja família apareça literalmente em alguma regra crítica. Por isso as custom properties de fonte usam `meta.inspect()` (mantém as aspas) e os fallbacks têm um `url()` final.
- **CLS por fonte:** com SSG, a troca de fonte depois da primeira pintura muda a quebra de linha de títulos grandes. Fallback com métricas e `preload` resolvem. Ao criar um título grande com outra família ou peso, confira a CLS.
- **`grep -E` com `\|`:** dentro de ERE, `\|` é um caractere literal, não alternativa. Uma auditoria de classes com esse erro "provou" que `nav` e `images` não eram usados. Use `a|b` com `-E`.
- **`page-check --compare` só cobre o estado inicial de cada rota.** Estados que dependem de interação (Pix no checkout, modais, menus abertos) precisam de busca no código.
- **Fallback de SPA:** `index.csr.html`, nunca `index.html` (no site, `index.html` é a home prerenderizada).

## Checklists rápidos

- **Rota nova:** `loadComponent`; entrada em `app.routes.server.ts` (Prerender ou Client); conteúdo da primeira dobra sem `@defer`; seções de baixo com `@defer (on idle; hydrate on viewport)`; rota em `ROUTES` de `tools/page-check.mjs`.
- **Ícone novo:** `npm run icons`, depois `perf:pages`.
- **Dependência nova:** importar só onde é usada; nada de provider na raiz; conferir com `perf:bundle` se não entrou no inicial.
- **Componente Bootstrap fora da pilha:** adicionar o `@import` em `_bootstrap-stack.scss` e conferir o tamanho do CSS.
- **JavaScript do Bootstrap:** só por `import()` sob demanda, como a diretiva `libTooltip` (`bootstrap/js/src/tooltip.js` com o Popper num chunk à parte). Nunca importar `bootstrap` inteiro no pacote inicial.
- **Estilo novo:** `font-size` sempre em `rem`, equivalente a px par e inteiro (1rem = 16px; 13px → 12px → `0.75rem`; `INSTRUCOES-IA.md` §7). Uma conversão pura de px para rem dá 0 diferenças no `perf:pages --compare`; arredondar para par muda o tamanho calculado, então confira as telas afetadas.
- **Fonte nova ou trocada:** `npm run fonts:subset`, recalcular as métricas do fallback (ver `references/fontes.md`) e atualizar os `preload` se for fonte da primeira dobra.
