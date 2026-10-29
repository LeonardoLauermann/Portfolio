# Identidade visual do portfólio

## Referência e intenção

A direção visual segue a captura de referência fornecida pelo autor: uma tela inicial de RPG medieval old-school com cenário pixel art, molduras de pedra, destaques dourados e navegação apresentada como menu de jogo. Os níveis exibidos nas habilidades são ilustrativos, conforme indicado nos tooltips, e não representam uma avaliação formal.

## Cenário e personagem

`public/medieval-pixel-world.png` é uma paisagem original em pixel art criada para o projeto: portal de pedra, bandeiras azuis, tochas, vila e vale ao fundo. `public/wizard-leonardo.png` é uma representação em pixel art do autor como mago, baseada na foto fornecida para este propósito. As imagens são decorativas em relação à navegação; o personagem tem texto alternativo por representar o autor.

## Paleta e materiais

| Cor          | Valor     | Uso                                  |
| ------------ | --------- | ------------------------------------ |
| Carvão       | `#140f09` | Fundo e contorno das janelas         |
| Pedra escura | `#292116` | Painéis e botões de menu             |
| Pedra média  | `#51402a` | Relevos e molduras                   |
| Ouro         | `#e0b323` | Títulos, bordas e destaques          |
| Papel        | `#cbb07b` | Fundo de pergaminho do diálogo       |
| Azul         | `#314cc1` | Link de contato no painel de diálogo |

O cenário mantém tons terrosos, verde de vale e azul de estandartes. Painéis usam bordas em camadas, marcas discretas, sombras internas e gradientes para sugerir pedra esculpida. O título “PORTFÓLIO” aparece em letras individuais de pedra, sem lâmina sobreposta. Botões têm relevo, foco visível e estado pressionado.

## Layout e tipografia

Em telas largas, o layout distribui ficha do personagem, título, habilidades, personagem, menu central, mensagem de boas-vindas e foco profissional em três colunas. A opção Habilidades não aparece no menu desktop, pois o quadro lateral já está visível. Em tablets e celulares, os blocos passam a uma coluna; o quadro lateral fica oculto e a opção Habilidades abre a lista em modal. A mensagem neutra de boas-vindas fica logo acima do menu no mobile, enquanto cada opção abre sua própria modal. O controle de áudio fica acima do foco profissional no desktop e flutua no canto inferior direito no mobile. O menu tem altura adequada ao toque e o personagem reduz de tamanho sem desaparecer.

O texto usa Courier New e fontes monoespaçadas do sistema para reforçar a interface retrô; o título contrasta com letras serifadas em placas de pedra. Bootstrap 5.3 fornece container, grid, utilitários de espaço e flex, botões e recursos de acessibilidade; SCSS local fica para os materiais, a composição de tela e a pixel art.

## Componentes e comportamento

- `app`: composição responsiva, estado da seção ativa e entrada dos painéis.
- `features/portfolio/components/hero`: logotipo.
- `features/portfolio/components/audio-controls`: controle de som acima do foco profissional no desktop e flutuante no mobile, com ajuste de volume recolhido.
- `features/portfolio/components/profile`: nome e resumo profissional.
- `features/portfolio/components/main-menu`: menu CDK que abre modais de seção.
- `features/portfolio/components/section-modal`: conteúdo central com foco modal, Escape e botão de fechar.
- `features/portfolio/components/character`: personagem em pixel art e ciclo de movimento GSAP.
- `features/portfolio/components/skills`: competências do currículo agrupadas por área e destaques com níveis da referência; o quadro lateral fica oculto em mobile até ser aberto pelo menu.
- `features/portfolio/components/dialogue`: mensagem neutra e permanente de boas-vindas.
- `features/portfolio/components/objectives`: foco profissional baseado nas atividades descritas no currículo.

Os componentes usam arquivos `.ts`, `.html` e `.scss` em pastas por feature. O menu e a lista vertical de habilidades usam SVGs pixelados documentados em `public/icons/SOURCES.md`. Os níveis são ilustrativos. GSAP anima a entrada dos painéis e letras, o balanço e deslocamento do personagem, uma faísca na interação, partículas discretas, o brilho sobre as fogueiras desenhadas e a saída das modais. As primeiras linhas de habilidades são reveladas em sequência na modal. O ciclo de vida do GSAP é encerrado ao destruir os componentes. A preferência do sistema por movimento reduzido desativa esses movimentos.

Uma trilha original de fantasia retrô em loop combina melodia suave de flauta, arpejos de alaúde, acordes sustentados e percussão leve. Começa em volume baixo e sobe suavemente ao longo de oito segundos. O botão permite ligar/desligar o som; o controle de volume fica recolhido e abre ao selecionar Volume para ajustar a música de 0% a 60%. Os efeitos de interação têm volume separado e discreto. Os arquivos WAV são sintetizados para o projeto e a trilha ambiente pode ser regenerada com `npm run sounds:generate`. Se o navegador bloquear a reprodução automática, o serviço tenta novamente após a primeira interação.

## Conteúdo e limites

Resumo profissional, experiências, formação, competências e contatos vieram do currículo e do resumo do LinkedIn fornecidos pelo autor. O autor forneceu dois projetos de landing page e um catálogo de filmes sem reprodução, além de seus links.

## Referências locais

- `src/app/app.html`, `src/app/app.scss` e `src/app/app.ts`: composição, breakpoints e estado.
- `src/app/features/`: componentes e regras visuais locais.
- `src/app/shared/audio/sound.service.ts`: controle de som com Howler.
- `public/icons/SOURCES.md`: origem e licença CC0 dos ícones pixelados.
- `src/styles.scss`: importação modular de Bootstrap e materiais comuns.
- `public/medieval-pixel-world.png` e `public/wizard-leonardo.png`: artes usadas no cenário.
- `docs/arquitetura-portfolio-rpg-angular.md`: arquitetura, acessibilidade e validação.
