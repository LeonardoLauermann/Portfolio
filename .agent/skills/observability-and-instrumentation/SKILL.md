---
name: observability-and-instrumentation
description: Adicionar ou revisar diagnóstico de erros e medições no navegador do portfólio quando houver necessidade concreta.
metadata:
  version: '2.0'
---

# Observabilidade do portfólio

O app é frontend Angular. app.config.ts usa provideBrowserGlobalErrorListeners() e src/main.ts registra falha de bootstrap no console. Não há coletor remoto, analytics, tracing distribuído ou backend de métricas configurado.

Comece pela pergunta: qual interação falhou, qual asset não carregou ou qual etapa demora? Console, rede e Performance do navegador podem bastar. Para otimizar, use portfolio-performance; para falha atual, debugging-and-error-recovery.

Não adicione SDK, coletor ou alertas por padrão. Se o pedido exigir telemetria remota, confirme destino, configuração pública, dados mínimos e necessidade da dependência.

Use eventos estáveis e contexto técnico limitado. Não registre formulários, e-mails, tokens, segredos, corpos de requisição ou URLs com parâmetros pessoais. Um coletor opcional não deve bloquear renderização, navegação ou contato. Evite duplicações e descarte listeners e subscriptions.

Valide sucesso e falha de forma controlada localmente e inspecione o que foi realmente emitido. Não provoque incidentes remotos ou envios reais como teste implícito. Execute lint e build quando código mudar e informe destinos não verificados.

Somente SELECT é permitido em bancos. Não execute procedures, escritas, migrações, seeds nem aplicações ou testes que possam alterar dados.
