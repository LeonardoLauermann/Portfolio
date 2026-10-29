---
name: design-md
description: Documentar a identidade visual do portfólio em DESIGN.md a partir do código e de referências fornecidas pelo usuário.
metadata:
  version: '2.0'
---

# Design do portfólio

Inspecione src/styles.scss, estilos e templates em src/app/, assets em public/ e referências fornecidas. Não presuma projeto Stitch nem ferramenta externa disponível.

A aplicação única portfolio segue a referência visual fornecida pelo autor. Descreva com evidência o design implementado, a interação e decisões pendentes; não invente dados profissionais.

Documente em português somente o que a evidência permite:

- Identidade e objetivo: apresentação profissional, projetos, competências e contato.
- Cores e funções, com valores extraídos dos estilos quando existirem.
- Tipografia, hierarquia, espaçamento e responsividade.
- Componentes presentes, estados de interação, foco e teclado.
- Origem das decisões, propostas e limites da observação.

Use a estrutura Angular e Bootstrap 5.3 como base. Registre tokens de cor de src/styles/\_tokens.scss, use Material Symbols Outlined conforme o subconjunto em src/index.html para controles funcionais e documente os SVGs pixelados CC0 em public/icons/ conforme SOURCES.md. Não introduza Tailwind ou conjuntos externos sem necessidade. Documente GSAP, CDK e Howler somente quando aparecerem no código. Não invente experiências, resultados, níveis de habilidade ou contatos.

Consulte o [exemplo de estrutura](examples/DESIGN.md) apenas como formato, não especificação implementada. Confira caminhos, valores, links, formatação e diff. Mudanças de interface também seguem angular-developer, com lint, build e inspeção manual.
