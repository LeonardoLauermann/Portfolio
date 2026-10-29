---
name: portfolio-integrations
description: Implementar ou revisar integrações externas do portfólio, como contato e leitura de projetos, com serviços e contratos confirmados.
metadata:
  version: '2.0'
---

# Integrações do portfólio

Confira dependências, providers em src/app/app.config.ts, serviços e contrato da tarefa. Atualmente não há cliente HTTP configurado, backend, schema OpenAPI ou serviço de contato no app. Não invente endpoints, chaves, perfis ou URLs.

O escopo é apresentação profissional, projetos, competências e contato. Não importe pagamentos, autenticação empresarial ou gestão de produtos de outro repositório.

- Conteúdo estático pode usar dados locais tipados. Fatos e links precisam existir no repositório ou ser fornecidos pelo usuário.
- Antes de consumir serviços, confirme URL, método, formato, limites e erros. Se faltar contrato necessário, avance nas partes independentes e solicite a informação faltante.
- Se HTTP for necessário, use APIs compatíveis com o Angular instalado. Isole comunicação em serviço quando houver responsabilidade clara e adicione provideHttpClient somente se utilizado.
- Nunca inclua segredos no bundle, public/ ou configuração enviada ao navegador.
- Mostre carregamento, erro e sucesso conforme resposta real. Sem serviço, não simule envio concluído. Use mailto somente com endereço confirmado.
- Não registre dados pessoais nem envie formulários reais durante validações sem autorização específica para esse envio.

Valide mapeamento, falha de rede, repetição e bloqueio de envios duplicados quando aplicável. Simule serviços localmente. Execute lint e build por lint, build e inspeção manual; não presuma scripts de geração de schema.

Em bancos, somente SELECT é permitido. Não execute procedures, escritas, migrações, seeds nem aplicações ou testes que possam alterar dados.
