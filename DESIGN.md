# Identidade visual do portfólio

## Referência e intenção

A direção visual segue a captura de referência fornecida pelo autor: uma tela inicial de RPG medieval old-school com cenário pixel art, molduras de pedra, destaques dourados e navegação apresentada como menu de jogo. O conteúdo continua sendo uma apresentação profissional real de Leonardo Lauermann; elementos do jogo são uma camada visual e não atribuem níveis, resultados ou missões fictícias.

## Cenário e personagem

`public/medieval-pixel-world.png` é uma paisagem original em pixel art criada para o projeto: portal de pedra, bandeiras azuis, tochas, vila e vale ao fundo. `public/wizard-leonardo.png` é uma representação em pixel art do autor como mago, baseada na foto fornecida para este propósito. As imagens são decorativas em relação à navegação; o personagem tem texto alternativo por representar o autor.

## Paleta e materiais

| Cor          | Valor     | Uso                                  |
| ------------ | --------- | ------------------------------------ |
| Carvão       | `#171512` | Fundo e contorno das janelas         |
| Pedra escura | `#292621` | Painéis e botões de menu             |
| Pedra média  | `#454039` | Relevos e molduras                   |
| Ouro         | `#edc74c` | Títulos, bordas e destaques          |
| Papel        | `#e6dfd4` | Fundo de pergaminho do diálogo       |
| Azul         | `#314cc1` | Link de contato no painel de diálogo |

O cenário mantém tons terrosos, verde de vale e azul de estandartes. Painéis usam bordas em camadas, sombras internas e gradientes para sugerir pedra esculpida. O título usa letras individuais com textura de pedra, sem arma sobreposta. Botões têm relevo, foco visível e realce ao passar o cursor.

## Layout e tipografia

Em telas largas, o layout distribui ficha do personagem, título, habilidades, personagem, menu central, mensagem de boas-vindas e foco profissional em três colunas. Em tablets e celulares, os blocos passam a uma coluna; o quadro lateral de habilidades fica oculto e aparece em modal central quando a opção Habilidades é selecionada. A mensagem neutra de boas-vindas permanece no rodapé, enquanto cada opção do menu abre sua própria modal. O menu tem altura adequada ao toque e o personagem reduz de tamanho sem desaparecer.

O texto usa Courier New e fontes monoespaçadas do sistema para reforçar a interface retrô; o título contrasta com letras serifadas em placas de pedra e o subtítulo dourado. Bootstrap 5.3 fornece container, grid, utilitários de espaço e flex, botões e recursos de acessibilidade; SCSS local fica para os materiais, a composição de tela e a pixel art.

## Componentes e comportamento

- `app`: composição responsiva, estado da seção ativa e entrada dos painéis.
- `features/portfolio/components/hero`: logotipo e subtítulo.
- `features/portfolio/components/audio-controls`: botão de som e ajuste de volume recolhido acima do foco profissional.
- `features/portfolio/components/profile`: nome e resumo profissional.
- `features/portfolio/components/main-menu`: menu CDK que abre modais de seção.
- `features/portfolio/components/section-modal`: conteúdo central com foco modal, Escape e botão de fechar.
- `features/portfolio/components/character`: personagem em pixel art e ciclo de movimento GSAP.
- `features/portfolio/components/skills`: competências e níveis conforme a imagem; oculta em mobile até ser aberta pelo menu.
- `features/portfolio/components/dialogue`: mensagem neutra e permanente de boas-vindas.
- `features/portfolio/components/objectives`: foco profissional baseado nas atividades descritas no currículo.

Os componentes são standalone, `OnPush`, com arquivos `.ts`, `.html` e `.scss` em pastas por feature, gerados pelo Nx. O menu e a lista vertical de habilidades usam ícones SVG pixelados em CC0, documentados em `public/icons/SOURCES.md`; não há pontuações presumidas. GSAP anima a entrada dos painéis, o balanço ocioso e o deslocamento do personagem, além do brilho sobre as fogueiras já desenhadas ao lado da porta. O ciclo de vida do GSAP é encerrado ao destruir os componentes. A preferência do sistema por movimento reduzido desativa esses movimentos.

Uma ambiência medieval original de 24 segundos em loop começa em volume baixo e sobe suavemente ao longo de oito segundos. O botão permite ligar/desligar o som; o controle de volume fica recolhido e abre ao selecionar Volume para ajustar a música de 0% a 60%. Os efeitos de interação têm volume separado e discreto. Os dois arquivos WAV foram sintetizados para o projeto. Se o navegador bloquear a reprodução automática, o serviço tenta novamente após a primeira interação.

## Conteúdo e limites

Experiência, formação, tecnologias e e-mail vieram do currículo fornecido pelo autor. Os níveis 0–100 do painel de habilidades vieram da imagem de referência. O autor forneceu dois projetos de landing page e um catálogo de filmes sem reprodução, além de seus links. O currículo não declara metas futuras; o painel de foco descreve áreas de atuação documentadas.

## Referências locais

- `src/app/app.html`, `src/app/app.scss` e `src/app/app.ts`: composição, breakpoints e estado.
- `src/app/features/`: componentes e regras visuais locais.
- `src/app/shared/audio/sound.service.ts`: controle de som com Howler.
- `public/icons/SOURCES.md`: origem e licença CC0 dos ícones pixelados.
- `src/styles.scss`: importação modular de Bootstrap e materiais comuns.
- `public/medieval-pixel-world.png` e `public/wizard-leonardo.png`: artes usadas no cenário.
- `docs/arquitetura-portfolio-rpg-angular.md`: arquitetura, acessibilidade e validação.
