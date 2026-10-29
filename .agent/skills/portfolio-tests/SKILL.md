---
name: portfolio-tests
description: Definir e validar verificações do app portfolio sem presumir runners que não estão configurados.
metadata:
  version: '1.0'
---

# Verificação do portfólio

Este workspace tem uma única aplicação Angular chamada portfolio. Confira os targets atuais antes de validar. Neste momento, não há target de testes unitários ou E2E; não crie runner nem execute testes sem pedido explícito.

Para mudanças de código, formate os arquivos afetados com Prettier, execute npx nx lint portfolio e npx nx build portfolio. Para interface, confira desktop e mobile, navegação pelo teclado, foco, nomes acessíveis, preferência por movimento reduzido, erros de console e interações afetadas. Áudio, autoplay, mute, carregamento de assets e links mailto devem ser inspecionados quando mudarem.

Não envie formulários ou mensagens reais durante validações. Em banco de dados, apenas SELECT é permitido. Mudanças apenas de documentação exigem links, formatação e git diff --check.
