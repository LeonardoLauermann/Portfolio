---
name: angular-cdk
description: Avaliar e implementar interações com Angular CDK no portfólio quando overlay, foco, drag-and-drop ou virtualização forem necessários.
metadata:
  version: '2.0'
---

# CDK no portfólio

O projeto usa Angular ~21.2.0 e não declara @angular/cdk ou @angular/material. Confira package.json e lockfile antes de sugerir imports. Acessibilidade básica não exige CDK: priorize HTML semântico, controles nativos e teclado.

Quando a necessidade justificar a dependência, escolha versão compatível e registre a razão. Não adicione Material por consequência. Importe somente recursos usados e mantenha SCSS no padrão existente.

Em overlays e diálogos, verifique posicionamento, Escape, foco inicial, contenção quando modal, retorno do foco e descarte. Drag-and-drop precisa de alternativa por teclado; virtualização exige volume e medição que a justifiquem.

Consulte [documentação](references/docs/_INDEX.md) e [releases](references/releases/_INDEX.md) para a API compatível. [Issues](references/issues/_INDEX.md) e [discussões](references/discussions/_INDEX.md) apoiam investigação e não comprovam APIs instaladas.

Valide teclado, nomes acessíveis, foco e mobile. Execute lint e build por lint, build e inspeção manual. Não copie controles ou caminhos de outro workspace.
