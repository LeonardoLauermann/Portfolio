---
name: design-md
description: Documentar a identidade visual do portfólio em DESIGN.md a partir do código e de referências fornecidas pelo usuário.
metadata:
  version: '2.0'
---

# Design do portfólio

Inspecione src/styles.scss, estilos e templates em src/app/, assets em public/ e referências fornecidas. Não presuma projeto Stitch nem ferramenta externa disponível.

A tela inicial usa NxWelcome e não define identidade profissional própria. Diferencie scaffold, design implementado e proposta pendente. Não atribua paletas ou fontes de outro produto ao portfólio.

Documente em português somente o que a evidência permite:

- Identidade e objetivo: apresentação profissional, projetos, competências e contato.
- Cores e funções, com valores extraídos dos estilos quando existirem.
- Tipografia, hierarquia, espaçamento e responsividade.
- Componentes presentes, estados de interação, foco e teclado.
- Origem das decisões, propostas e limites da observação.

Use SCSS e a estrutura Angular como base. Não imponha Bootstrap, Tailwind, Material Symbols ou biblioteca de ícones. Não invente experiências, resultados ou contatos.

Consulte o [exemplo de estrutura](examples/DESIGN.md) apenas como formato, não especificação implementada. Confira caminhos, valores, links, formatação e diff. Mudanças de interface também seguem angular-developer, com lint, build e inspeção manual.
