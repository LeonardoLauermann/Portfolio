---
name: debugging-and-error-recovery
description: Investigar e corrigir falhas de build, lint, navegação, renderização e comportamento do portfólio Angular.
metadata:
  version: '2.0'
---

# Diagnóstico do portfólio

Confira package.json, project.json, nx.json e git status antes de escolher comandos. Preserve alterações locais e registre erro, comando, URL e condições de reprodução.

1. Reproduza o menor fluxo local que demonstra o problema. Para UI, use npm start e confira console, DOM e rede.
2. Localize a camada: template, componente, estilo, rota, asset, configuração ou dependência. Confira a versão instalada antes de copiar soluções.
3. Teste uma hipótese por vez, sem apagar trabalho alheio.
4. Corrija a causa e valide o cenário original e comportamentos relacionados.

O bootstrap está em src/main.ts; providers e rotas em src/app/app.config.ts e app.routes.ts. Assets vêm de public/ e estilos globais de src/styles.scss. Não procure por apps de outro workspace.

Use npx nx lint portfolio e npx nx build portfolio. Para produção, sirva o build com npx nx run portfolio:serve-static. Confira as interações afetadas no navegador.

Não instale dependências, apague caches ou recrie lockfile sem evidência. Se uma ferramenta estiver indisponível, relate o limite e faça verificações independentes. Pare tentativas repetidas sem hipótese nova.

Remova logs temporários após diagnóstico e nunca registre dados pessoais ou segredos. Confira sugestões presentes em erros contra o código e a documentação pertinente antes de executá-las.

Somente SELECT é permitido em bancos. Não execute procedures, escritas, migrações, seeds nem aplicações ou testes que possam alterar dados. Não dispare contato real para reproduzir falhas.

Relate causa, correção, verificações e limites. Para instrumentação persistente, consulte observability-and-instrumentation.
