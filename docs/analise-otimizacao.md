# Análise de otimização do portfólio

Data da análise inicial: 29/10/2026. Referência inicial: commit `774ea64`. Revisão após implementação: 29/10/2026.

## Escopo e condições

Análise comparativa do build de produção, estatísticas do bundler, arquivos de mídia, código e navegador. O build revisado foi servido localmente na porta 4300 e inspecionado em 1280 × 720 e 390 × 844. A porta 4200 não foi alterada. As abas abertas para a verificação foram fechadas e o servidor temporário na porta 4300 foi encerrado.

Os tamanhos abaixo usam unidades decimais. Foram criadas versões WebP dos quatro PNGs e mantidos os PNGs como fallback. Não foram coletados Lighthouse, Core Web Vitals, trace de CPU/GPU, FPS nem métricas de rede móvel; os ganhos de tempo de carregamento não foram medidos.

## Medidas atuais

Comando: `npx nx build portfolio --stats-json --output-style=static`.

| Item                         |   Tamanho |
| ---------------------------- | --------: |
| JavaScript inicial antes     | 461,12 kB |
| CSS global                   |  42,19 kB |
| Total inicial antes          | 503,19 kB |
| Transferência estimada antes | 130,93 kB |
| JavaScript inicial após      | 390,48 kB |
| Total inicial após           | 432,67 kB |
| Chunks adiados após          |   7,19 kB |
| Transferência estimada após  | 117,33 kB |
| Arquivos de public/ após     |   8,88 MB |

Após retirar o Router e adiar a modal, o total inicial caiu 70,52 kB (14,0%) e a transferência estimada caiu 13,60 kB (10,4%). O build de produção passou sem aviso de budget: o inicial ficou 67,33 kB abaixo do limite de 500 kB. A modal tem um chunk adiado de 7,19 kB. Como as mudanças foram validadas juntas, não há um resultado isolado para atribuir o delta a cada alteração. A transferência estimada pelo builder não representa uma medição da hospedagem real. O tamanho de `public/` inclui PNGs de fallback que navegadores modernos não selecionaram.

### Participação no JavaScript inicial

Dados de `dist/portfolio/browser-stats.json`, usando `bytesInOutput`. Valores não comprimidos; não equivalem à economia obtida ao remover uma dependência.

| Origem                               | Participação |
| ------------------------------------ | -----------: |
| Angular Core                         |    119,02 kB |
| Angular CDK                          |     72,19 kB |
| GSAP                                 |     70,68 kB |
| Angular Router                       |     69,92 kB |
| Código e estilos locais incorporados |     53,35 kB |
| Howler                               |     36,20 kB |
| RxJS                                 |     19,05 kB |
| Angular Platform Browser             |     12,15 kB |
| Angular Common                       |      5,73 kB |

## Prioridades propostas

### 1. Otimizar imagens e áudio — maior ganho de transferência

Os quatro PNGs somam 5.627.809 bytes. Experimento com Pillow, mantendo dimensões e transparência, codificação WebP com qualidade 85 e método 4:

| Arquivo                  |   PNG atual | WebP experimental |
| ------------------------ | ----------: | ----------------: |
| medieval-pixel-world.png | 2.273,86 kB |         218,70 kB |
| wizard-leonardo.png      | 1.022,19 kB |         184,56 kB |
| archer-companion.png     | 1.032,00 kB |         200,32 kB |
| cat-companions.png       | 1.299,76 kB |         218,47 kB |
| Total                    | 5.627,81 kB |         822,06 kB |

Redução: 85,4% no conjunto dos quatro arquivos. As versões WebP foram abertas no navegador de produção, que selecionou esses arquivos mantendo as dimensões originais. A inspeção visual confirmou preservação do personagem, dos contornos transparentes e do cenário nesta viewport; como WebP em qualidade 85 usa perdas, vale revisar outros dispositivos e telas após o deploy. Uma comparação sem perdas, método 0, resultou em 4,72 MB, redução de 16,2%.`r`n`r`nO JPEG `rock-title.jpg` (17.063 bytes) também ganhou versão WebP (13.734 bytes, qualidade 65), redução de 19,5%. Um token CSS fornece `image-set()` com WebP e JPEG de fallback, aplicado aos painéis de pedra e áreas temáticas; o JPEG original foi mantido.

Os personagens têm arquivos de 1133 × 1388 pixels, e os gatos, 1402 × 1122. No desktop inspecionado, os elementos ocupavam aproximadamente 207 × 321, 193 × 309 e 144 × 112 pixels. Cabe avaliar variantes menores para cada breakpoint e densidade de tela, verificando também desktops maiores. Para o fundo em CSS, usar variantes por media query; para os personagens, avaliar srcset/sizes. Não aplicar lazy loading indiscriminadamente aos elementos visíveis na primeira dobra.

`castle-ambience.wav` continua com 2.304.044 bytes: 24 segundos, estéreo, 24 kHz e PCM de 16 bits. O ambiente não tem ffmpeg, sox ou outro encoder disponível; por isso o arquivo permanece inalterado para preservar a qualidade e o início automático e gradual do som. A 96 kbit/s, 24 segundos representam cerca de 288 kB antes do overhead do formato: estimativa, não resultado de codificação. A compressão desse arquivo continua pendente de encoder e revisão auditiva.

Fontes locais: [sound.service.ts](../src/app/shared/audio/sound.service.ts), [character.html](../src/app/features/portfolio/components/character/character.html), [app.scss](../src/app/app.scss). Referência: [documentação do Howler](https://github.com/goldfire/howler.js#documentation).

### 2. Remover inicialização de Router sem uso — concluído

`app.config.ts` registrava `provideRouter(appRoutes)`, mas `app.routes.ts` continha uma lista vazia e a aplicação usa modais para suas seções. O provider foi removido e o arquivo de rotas vazio foi excluído. O build após a remoção passou. A contribuição anterior do Router, 69,92 kB no mapa de entradas, não equivale sozinha à economia atribuível; a remoção e a divisão lazy da modal foram medidas em conjunto.

Fontes: [app.config.ts](../src/app/app.config.ts), [app.routes.ts](../src/app/app.routes.ts).

### 3. Controlar o ciclo das animações — concluído

`playMovement()` reutiliza uma única timeline GSAP, criada no contexto do componente, em vez de criar novos tweens a cada clique. O bloqueio de cliques só é liberado ao fim da sequência.

Os três personagens e o brilho do mago completam a animação de clique juntos em 0,80 s. As rotações compartilham os mesmos keyframes, então todos viram e retornam à frente nos mesmos momentos. Em repouso, os movimentos usam uma timeline mestre com período e fase iguais; cada clique reinicia os três na mesma fase. Ao fim do clique, o repouso recomeça do início. Abrir uma modal pausa o movimento dos personagens e os efeitos decorativos; fechar a modal retoma esses efeitos. As partículas e tochas também pausam quando o documento fica oculto. A versão atual foi compilada; a inspeção visual anterior não cobre esta revisão dos keyframes.

A sequência de clique usa easing em passos (`steps`) e keyframes curtos, com antecipação, salto, deslocamento, recuperação e retorno, para remeter a sprites de RPG antigo. Os três personagens e o brilho do mago percorrem juntos os mesmos keyframes e terminam em 0,84 s. A versão atual foi compilada; a inspeção visual anterior não cobre esta revisão dos keyframes.`r`n`r`nO cenário mantém dez animações decorativas contínuas: duas tochas, cinco partículas e três personagens. Não foi feita medição de CPU/GPU; filtros, sombras, blend modes e fogo foram preservados. A pausa por visibilidade do documento e da modal reduz ciclos quando a cena não está sendo vista.

Fontes: [character.ts](../src/app/features/portfolio/components/character/character.ts), [app.ts](../src/app/app.ts). Referências: [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/), [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

### 4. Evitar conteúdo oculto no mobile e adiar carregamento da modal — concluído

O painel fixo de habilidades é instanciado apenas em larguras de 992 px ou mais; o listener do breakpoint atualiza o estado ao redimensionar. No viewport mobile de 390 × 844, a página inicial não contém `app-skills`; abrir “Habilidades” monta as 59 linhas dentro da modal. No desktop, o painel lateral continua disponível.

O navegador inspecionado mostrou 447 elementos no DOM, um total que por si só não demonstra gargalo. A mudança proposta reduz conteúdo oculto; não exige virtualização de uma lista de 59 itens.

`SectionModal` é carregada em um bloco `@defer` ao abrir a primeira seção; o build confirma um chunk de 7,19 kB separado do inicial. O navegador de produção abriu a modal de projetos no desktop e de habilidades no mobile, com o conteúdo da janela disponível.

Fontes: [app.html](../src/app/app.html), [skills.scss](../src/app/features/portfolio/components/skills/skills.scss). Referência: [deferred loading no Angular](https://angular.dev/guide/templates/defer).

### 5. Ajustes menores e hospedagem — símbolos atualizado

- A fonte Material Symbols agora solicita somente os seis símbolos utilizados: person, auto_awesome, close, tune, volume_up e volume_off. A regra @font-face é incorporada ao HTML; o arquivo WOFF2 continua remoto.
- Bootstrap já usa imports parciais e um subconjunto de utilitários. Os 42,07 kB de CSS não são o maior problema. Rever regras sem uso somente com uma comparação de estilos e estados em mobile e desktop.
- Confirmar Brotli/gzip e política de cache na hospedagem real. JavaScript e CSS têm hash no nome; os assets de public/ preservam nomes estáveis. Cache imutável longo para mídia exige versionamento dos arquivos. Nenhuma configuração de hospedagem foi encontrada nos arquivos consultados; não inferir os cabeçalhos de produção a partir do servidor local.
- Dependências instaladas não equivalem a código enviado ao navegador. Por exemplo, não atribuir peso a Angular Forms apenas por constar no package.json; a análise deve usar o código efetivamente emitido.

Referência: [otimização de Material Symbols](https://developers.google.com/fonts/docs/material_symbols#optimize_the_icon_font).

## Validação e itens ainda pendentes

Foram executados Prettier, lint e build; o build de produção passou sem aviso de budget. A inspeção local anterior incluiu 1280 × 720 e 390 × 844, carregamento WebP, menu, modal e lista de habilidades. O navegador permaneceu fechado conforme solicitado, então os keyframes estilo RPG da revisão atual foram conferidos no código e no build, mas não visualmente nesta rodada. O build foi servido na porta 4300 para essa conferência; o processo foi encerrado.

- Converter a música WAV para formato comprimido quando houver encoder disponível e fazer revisão auditiva do bitrate e da continuidade do loop.
- Medir carregamento frio/com cache no host real e em rede móvel; medir CPU/GPU em dispositivo móvel antes de estabelecer metas para LCP, INP ou CLS ou alterar efeitos.
- Confirmar Brotli/gzip e política de cache na hospedagem real; nenhum arquivo de configuração de hospedagem foi identificado nesta análise.

Preservar os budgets, a identidade visual, a acessibilidade e as bibliotecas pedidas pelo usuário.
