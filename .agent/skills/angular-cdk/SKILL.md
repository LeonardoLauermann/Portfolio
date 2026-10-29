---
name: angular-cdk
description: Avaliar e implementar interações com Angular CDK no portfólio quando overlay, foco, drag-and-drop ou virtualização forem necessários.
metadata:
  version: '2.0'
---

# Angular CDK no Portfolio

Este workspace tem uma única aplicação portfolio, Angular 22.2 e Angular CDK 22.2.5. Não há Angular Material. Confirme as versões instaladas no manifesto e lockfile.

O menu central usa CdkMenu e CdkMenuItem para semântica ARIA, foco gerenciado e navegação por teclado. Reaproveite esse menu e sua apresentação de pedra; não crie interação paralela nem instale Angular Material.

Importe apenas diretivas ou serviços usados e mantenha componentes standalone. Preserve utilitários Bootstrap e tokens de cor compartilhados. Em novos usos, verifique teclado, setas, Home/End, foco, nomes acessíveis, toque e movimento reduzido.

Em overlays e diálogos, verifique posicionamento, Escape, foco inicial, contenção quando modal, retorno do foco e descarte. Drag-and-drop precisa de alternativa por teclado; virtualização exige volume e medição que a justifiquem.

Consulte [documentação](references/docs/_INDEX.md) e [releases](references/releases/_INDEX.md) para a API compatível. [Issues](references/issues/_INDEX.md) e [discussões](references/discussions/_INDEX.md) apoiam investigação e não comprovam APIs instaladas.

Valide teclado, nomes acessíveis, foco e mobile. Execute lint e build por lint, build e inspeção manual. Não copie controles ou caminhos de outro workspace.
