# Arquitetura — Portfólio RPG com Angular

> Implementação da tela de portfólio RPG medieval com referência visual fornecida pelo autor. O site apresenta a trajetória profissional em uma interface de jogo old-school e responsiva; não contém uma engine de jogo.

## Estado e stack

O workspace Nx contém a aplicação `portfolio` em `src/`. O bootstrap é standalone e a implementação usa Angular 22.2, Nx 24.0, TypeScript 6, Bootstrap 5.3, Angular CDK 22.2.5, GSAP 3 e Howler 2.2.4. A configuração de produção preserva os budgets definidos em `project.json`.

Bootstrap fornece grid, flex, espaçamento, botões e utilitários acessíveis. Os SCSS locais são reservados ao visual de pedra, arte pixelada, alinhamento responsivo específico e estados de interação. A paleta está centralizada em `src/styles/_tokens.scss`; os Sass parciais do Bootstrap seguem a pilha modular do Lordsz. Material Symbols Outlined é carregado como subconjunto para controles; `npm run icons` atualiza os nomes encontrados no app e `npm run icons:check` verifica a URL configurada. O menu e o painel de habilidades usam ícones pixelados vetorizados a partir de recursos CC0; os originais selecionados e a origem estão documentados em `assets/icons-cc0/` e `public/icons/SOURCES.md`.

O conteúdo estático vem do currículo e de informações e links de projetos fornecidos pelo autor. O link `mailto:` usa o endereço informado no currículo. Não há API nem formulário de contato.

## Organização

```text
src/app/
├── app.ts / app.html / app.scss       # composição, estado e animação de entrada
├── app.config.ts
├── app.routes.ts
├── features/
│   └── portfolio/components/
│       ├── character/                 # sprite, idle e deslocamento
│       ├── dialogue/                  # mensagem neutra de boas-vindas
│       ├── hero/                      # título e nome
│       ├── audio-controls/            # controle flutuante de som e volume
│       ├── main-menu/                 # opções de navegação CDK
│       ├── section-modal/             # detalhe central da opção selecionada
│       ├── objectives/                # foco profissional documentado
│       ├── profile/                   # identificação profissional
│       └── skills/                    # competências e níveis da referência
└── shared/audio/sound.service.ts      # áudio local controlado por Howler
public/
├── medieval-pixel-world.png           # cenário de fundo original
└── wizard-leonardo.png                # personagem baseado na foto enviada
```

O feature único `portfolio` segue o formato do Lordsz: cada componente vive em `features/portfolio/components/<component>/` com arquivos `.ts`, `.html` e `.scss`, componente standalone e `ChangeDetectionStrategy.OnPush`. Os componentes foram criados pelo gerador `@nx/angular:component`. O shell usa um signal para a seção de diálogo e outro para acionar o deslocamento do personagem.

## Design e comportamento

A captura de referência define o enquadramento: ficha no topo esquerdo, título central, habilidades à direita, menu de opções ao centro, personagem na área inferior esquerda, diálogo na base e foco profissional no canto inferior direito. O diálogo usa fundo claro de pergaminho e tipografia maior para manter o texto legível sobre a cena escura. Em telas estreitas, os elementos fluem em uma coluna e preservam todas as opções por rolagem; o personagem continua visível em tamanho menor.

A mensagem de boas-vindas permanece neutra no canto inferior esquerdo em desktop e fica logo acima do menu em mobile. Cada opção do menu central abre uma janela modal central com o conteúdo correspondente; a janela nativa fecha por Escape ou pelo botão de fechar e mantém o foco acessível. Em mobile, o quadro lateral de habilidades fica oculto e a mesma lista aparece na modal ao selecionar Habilidades. Projetos lista duas landing pages (Santa Rosa e Claudete Lauermann — Terapia Holística) e o Movie Explorer, descrito como catálogo para visualizar filmes sem reprodução, cada um com link externo. O quadro de habilidades exibe os níveis numéricos informados na imagem de referência. O foco profissional resume as atividades descritas no currículo. O controle de áudio flutua no canto inferior direito em desktop e mobile; a página reserva espaço junto ao foco profissional para não o cobrir.

GSAP anima a entrada gradual dos painéis, o movimento idle e caminhada curta do personagem e a oscilação do brilho das fogueiras já presentes na arte de fundo, ao lado da porta. `gsap.context()` delimita e limpa as animações do shell; o componente do personagem reverte o contexto ao ser destruído. `prefers-reduced-motion` desativa os tweens contínuos e a entrada animada.

O Howler inicia uma trilha original de fantasia retrô sintetizada para o portfólio: flauta suave, arpejos de alaúde, acordes sustentados e percussão leve. Começa em volume baixo e sobe gradualmente durante oito segundos. O botão de áudio liga ou desliga o som; o slider fica oculto até abrir o ajuste de volume e altera a música de 0% a 60%. O efeito de seleção usa volume baixo separado. `npm run sounds:generate` recria a trilha ambiente. Se o navegador bloquear autoplay, o serviço tenta novamente após o desbloqueio por interação e o mesmo botão inicia a reprodução quando necessário. O menu usa diretivas CDK para anunciar semântica de menu e prover navegação por teclado. As barras de rolagem usam a mesma paleta de pedra e ouro.

## Conteúdo confirmado

- Perfil: desenvolvedor Full Stack com mais de quatro anos de experiência.
- Experiências: LBCA (set/2026–atual), W3K Tecnologia (fev–ago/2026) e SafeNota (ago/2022–jan/2026).
- Formação: Análise e Desenvolvimento de Sistemas (Estácio, 2024–atual) e Técnico em Sistemas para Internet (Senac, 2022).
- Tecnologias e competências incluídas no painel: C#, .NET, Angular/TypeScript, SQL Server, APIs REST, Sistema Fiscal (NFe, NFSe), banco de dados, Docker, Git e resolução de problemas.
- Projetos pessoais: duas landing pages e o Movie Explorer, com endereços informados pelo autor no diálogo.
- Contato: `leonardolauerman@gmail.com`, fornecido no currículo.

Telefone e destinos de redes sociais não foram publicados; a captura não é fonte para qualificações ou metas pessoais.

## Validação

Comandos do projeto:

```bash
npx nx lint portfolio
npx nx build portfolio
npx nx build portfolio --configuration=development
```

Depois de mudanças visuais, inspecionar desktop e mobile, menu por toque e teclado, `mailto:`, console, carregamento dos PNGs e WAVs, fade da ambiência, controle de som, animação e preferência de movimento reduzido. `git diff --check` valida a formatação do diff. O projeto ainda não configura runner de testes unitários nem E2E.

## Roadmap

1. Tela atual: conteúdo e interação em HTML/Angular, arte pixel art, som e animações opcionais.
2. Exploração opcional: avaliar engine de jogo somente se a navegação pelo cenário se tornar um requisito; conteúdo essencial permanece em HTML.
3. Publicação: definir hospedagem, domínio e validação de fallback SPA antes de deploy.
