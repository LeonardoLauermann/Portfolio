---
name: lordsz-integracao
description: Integração do frontend Lordsz com a API (homologação). Use sempre que uma tela, fachada, cliente HTTP, mapeador ou fluxo passar a consumir ou mudar um endpoint; quando o backend avisar de endpoint, campo ou enum novo; quando um tipo gerado parecer desatualizado; ou quando alguém pedir para "integrar", "ligar na API", "puxar o contrato", "atualizar o schema" ou "regenerar os tipos".
metadata:
  version: '1.22'
---

# Integração com a API no Lordsz

Índice da documentação: `docs/README.md`. Configuração local e chaves: `docs/variaveis-de-ambiente.md`; deploy: `docs/deploy.md`.

Guia de campos e convenções: `docs/integracao/contrato-api.md`. Etapas e pendências: `docs/integracao/roteiro.md`. Diário: `docs/integracao/progresso.md`. Diferenças conhecidas entre a documentação e a homologação: `docs/integracao/divergencias-homolog.md`. Testes da integração: skill `lordsz-testes`.

## Regra principal

**Toda integração nova começa puxando o contrato real.** Revisar documentação ou skills sem alterar endpoints, payloads ou tipos não exige baixar o schema nem regenerar arquivos. Não escreva DTO, mapeador nem fixture contra um contrato antigo ou de memória. Sem backend local, a fonte é a homologação.

## 1. Puxar o contrato e regenerar os tipos

Rode, nesta ordem, na raiz do repositório:

```powershell
$env:LORDSZ_SCHEMA_URL = 'https://homolog-api.lordsz.com/v1/schema/?format=json'
npm run api:schema
npm run api:generate
npx prettier --write apps/shared/data-access/src/lib/api/generated
git diff --stat -- docs/integracao/openapi.json apps/shared/data-access/src/lib/api/generated
```

- Sem `LORDSZ_SCHEMA_URL`, o `api:schema` tenta `http://127.0.0.1:8000` e falha (não há backend local).
- O `prettier` é obrigatório: sem ele os arquivos gerados aparecem com um diff de formatação de milhares de linhas.
- Não passe o `prettier` no `docs/integracao/openapi.json`: ele fica no formato do `api:schema` (o `prettier` gera um diff de milhares de linhas). Se passou, rode o `api:schema` de novo.
- Nunca edite `api/generated/` à mão. A origem do schema fica registrada em `api/generated/README.md`.

## 2. Ler o que mudou no contrato

- `git diff -- docs/integracao/openapi.json` mostra as linhas alteradas; `git diff apps/shared/data-access/src/lib/api/generated/types.gen.ts` mostra o efeito nos tipos.
- Para cada mudança, classifique: endpoint novo, campo novo/removido/renomeado, enum com valor novo ou renomeado (ex.: `ReportKindEnum`), mudança só de descrição.
- Procure os usos de cada tipo afetado (`rg` pelo nome do tipo em `apps/`), inclusive fixtures de `apps/e2e/src/support/`.
- Diferença entre o schema e o que a homologação responde de fato: registre em `divergencias-homolog.md`.

## 3. Implementar

- Retomada de pagamento (25/10/2026): `/checkout?resume=1&payment=<id>` lê assinatura e todas as páginas de `payments/` via `SubscriptionFacade.recoverCyclePayment`; sem ID, escolhe a cobrança de ciclo pendente válida mais recente. Não criar checkout ao consultar/recarregar. Pix, boleto e cartão usam os componentes compartilhados; 3-D Secure recuperado usa `collectDetails=false`. Sem conta, o identificador de status do pedido e e-mail ficam apenas na sessão da aba, e a API relê o pedido por `guest/status/`; o token não vai à URL. Módulo em `scheduled_changes.remove_modules` mantém acesso até a data, mostra aviso e oferece a aba Assinatura para desfazer todas as alterações agendadas. Guia em `docs/integracao/retomada-pagamentos-e-modulos.md`.

- Limpeza do Estoque (24/10/2026): `InventoryFacade.clearStock` atende divisão ou todas as divisões de um espaço. Retirada mantém saldo/cadastro com `Transfer.target: null`; baixa usa Consumo/Estorno com `MovementCreate.division`. Não exclui produtos. Sem endpoint em lote, consulta ocupação antes, processa sequencialmente, para na primeira falha e relê o estado; repetição processa o saldo restante. Preserve o resultado parcial e as permissões de movimentação.

- Estoque por divisão (24/10/2026): `MovementCreate.division` fixa o local da entrada/consumo/estorno; a UI valida capacidade na entrada e o saldo daquele produto na divisão na baixa. `Transfer.source` e `target` aceitam `null` (saldo não alocado): retirar usa origem UUID e destino nulo, sem mudar quantidade total nem criar movimentação. Reutilize `MovementModal` para movimentos da listagem e da divisão; mantenha `inventory.move_stock` e bloqueio de assinatura. Guia em `docs/portal/estoque-operacoes-por-divisao.md`.

- Categorias de produtos (23/10/2026): inventory/categories/ devolve array completo, sem paginação. CategoriesFacade mantém o cadastro; inventory.view lê e inventory.edit escreve. Produto envia category_id (UUID/null); só a opção Nova categoria envia category por nome, sem category_id. A leitura do nome continua compatível com CSV e Catálogo. Renomear/excluir relê produtos; exclusão preserva produtos e confirma products_count. Cores de apresentação ficam em shared/styles (--inventory-category-color e .color-swatch); cor da entidade vem da API por --swatch-color.

- Adaptador em `@lordsz/data-access`, numa subpasta própria do domínio (`src/lib/<dominio>/<arquivo>/<arquivo>.ts`, spec junto) e exportado pelo `index.ts` do domínio: DTO a partir de `@lordsz/api-types`, mapeador que valida a resposta (inválida → `ApiError` `invalid_response`) e fachada. Telas leem só a fachada; nada de dado fictício em domínios com contrato, inclusive na vitrine. Jornadas ainda sem contrato ficam fora da interface. Consulte `apps/shared/data-access/README.md` antes de criar um adaptador.
- Sessão empresarial: `AuthApiSession` mantém o access em memória e o refresh no cookie de sessão de `sharedSessionCookie`, compartilhado entre Site e Portal (`SameSite=Lax`, `Secure` em HTTPS, acessível ao JavaScript). Não restaurar o uso de `sessionStorage` nem misturar com a sessão do cliente da vitrine. Links reais em `applicationLinks` determinam o domínio comum; logout do Portal recarrega o login.
- Ambientes: as três apps usam API absoluta em homologação e produção. `start:<app>` exige `environment.localhost.ts` ignorado pelo Git; `start:<app>:homolog` usa o ambiente versionado. Chaves de deploy vêm de `/integrations.json`; nunca incluir chaves secretas nos builds.
- Dinheiro chega como string decimal; datas e IDs conforme `contrato-api.md` §2.
- Erros de formulário só no `lib-alert-dialog`; obrigatórios com `*`.
- Erros da API (desde 13/10/2026): exiba o `detail` em português por `apiErrorMessage`, ou as mensagens de validação 400 com rótulo de campo. `code` decide comportamento, não texto. Sem `detail`, use o fallback da tela; `invalid_response` mantém o texto local.
- Layout aprovado é preservado: religue a tela à API, não a redesenhe.
- Permissões (desde 12/10/2026, `docs/integracao/permissoes.md`): `Permission` é o código da API (`leads.view`, `inventory.move_stock`…), chave de `PERMISSION_MODULES` em `auth.models.ts` com o módulo exigido (`null` no núcleo). `mapAuthUser` guarda de `Me.permissions` só os códigos com módulo contratado; gerente recebe todos da API. Tela e botão perguntam `auth.hasPermission('<código>')`; rota usa `permissionGuard('<código>')` e item do `PORTAL_NAV` leva `permission` (sem ela, qualquer pessoa da empresa). Botão sem permissão some; seleção em tabela fica desabilitada; ficha aberta sem permissão de edição é só consulta.
- Permissão nova no backend: acrescente em `PERMISSION_MODULES`, em `ALL_PERMISSIONS` (e `TEAM_PERMISSIONS`, se o grupo Equipe a tiver) de `apps/e2e/src/support/dto.ts` e use na tela. Módulo novo contratável: o código dele em `PERMISSION_MODULES`, item no `PORTAL_NAV` e rota com `permissionGuard`. Sem o módulo ou sem a permissão, o menu esconde e a rota manda para `/acesso-negado`.
- Módulo incluso por outro (`includes` e `included_by`): use `inclusoesDaSelecao`, `modulosInclusos` e `centavosDosModulos` do `data-access`, sem recalcular na tela.
- Planos e checkout (17/10/2026): `ModulesFacade.allModules` expõe o catálogo completo. `included_in_plans` indica inclusão, não proibição de venda avulsa nos demais planos. Todos aparecem em `/planos`; núcleo, preço zero e inclusões do plano selecionado ficam marcados/bloqueados, com "Incluído no plano …", sem entrar no preço nem em `Checkout.modules`. `permissoes` não é vendido avulso: vem apenas no Crescimento/Empresa (ou no trial), com `sold_separately: false`, preço zero e `is_available: false`. `CatalogModule.soldSeparately` controla seleção, checkout, catálogo e ativação/desativação no Portal para qualquer slug. `ModulesFacade.modules` contém os vendidos separadamente e `planFeatures` os exclusivos de planos. Use `isModuleIncludedInPlan` para não confundir preço zero de recurso exclusivo com inclusão geral. Campo ausente mantém `true` por compatibilidade; valor presente inválido gera `invalid_response`. Ver `docs/integracao/permissoes-por-plano.md`.
- Telas de pagamento (desde 14/10/2026, `docs/integracao/telas-de-pagamento.md`): Pix pelo `lib-pix-payment`, boleto pelo `lib-boleto-payment` e cartão pelo `lib-card-payment` de `@lordsz/components`, em qualquer app. Passe os campos de `checkout_data` (`qr_code`, `qr_code_url`, `expires_at`, `instructions_url`, `line`, `url`, `pdf`, `due_at`); no cartão, passe a chave publicável e, na vitrine, a conta Stripe conectada. O componente devolve somente o ID do PaymentMethod e trata o 3-D Secure. Não desenhe outra versão.
- Cartões salvos do checkout (18/10/2026, `docs/integracao/cartoes-salvos.md`): `SavedCardsFacade` lê todas as páginas de `subscription/cards/` somente com `billing.manage` e e-mail confirmado. O padrão válido é selecionado; vencidos são desabilitados. Envie `saved_card` sem `card_token` e use `lib-card-payment [collectDetails]="false"` para não criar Elements; `handleNextAction` carrega o SDK sob demanda. “Usar outro cartão” mantém o fluxo com token. Checkout sem conta não lista cartões. Erros 422 `card_expired`/`saved_card_not_found`: mostrar `detail`.
- Forma de pagamento (desde 13/10/2026, `docs/integracao/forma-de-pagamento.md`): só no Portal. A conta usa `PaymentMethodFacade` (`GET`/`PUT subscription/payment-method/`, `setup` → `stripe.handleNextAction`); sem checkout no teste, o Portal registra a forma por `subscription/checkout/`. Cobrança proporcional com forma própria: `ChargePaymentChoice` em `addModule`/`buySeats` e `ChargeMethodSelect` na tela. Cartão só pelos campos do Stripe (o número nunca vai à API); `card_token` vale para o primeiro gateway.
- Listagens (desde 14/10/2026 todas paginadas na API): a tela pede `page`/`size` e mostra `count`/`total_pages` da resposta (`docs/portal/padrao-listagens.md`); nunca recorte no front. Criar ou excluir relê a página atual e, se ela sumir, a última que sobrou. Quando a mesma lista alimenta uma escolha (grupos no convite), leia todas as páginas numa leitura separada (`AccessGroupsFacade.readAll`), sem reaproveitar a página da tabela.
- Escolhas de equipe e grupos (19/10/2026): o schema atual de `company/users/` e `company/groups/` só oferece `page`/`size`, sem busca no servidor. As fachadas seguem todas as páginas, sem corte de dez páginas; as telas filtram localmente. Não envie `search` sem contrato nem confunda busca local com consulta remota. A busca escalável permanece em `docs/integracao/pendencias-backend.md`.
- Formulários e filtros que leem a API (desde 14/10/2026): Signal Forms com RxJS sempre que possível. O fluxo parte do modelo (`toObservable(model)`) com `debounceTime` no texto, `distinctUntilChanged`, `switchMap` até a fachada e `takeUntilDestroyed()`; nada de `effect()` ou `(change)` chamando a fachada (`docs/INSTRUCOES-IA.md` §6).
- Consulta periódica (pagamento pendente) usa `backgroundRequest()` (`BACKGROUND_REQUEST`): `ApiClient.get(path, params, backgroundRequest())`, `SubscriptionFacade.refresh(true)`/`guestStatus(token, true)` e, na vitrine, o último argumento `background` de `CatalogCustomerSession.publica`/`autenticada` e `CatalogCheckoutFacade.pedido`. O indicador de requisições não acende; leitura pedida pela pessoa continua com ele.
- Recurso só de teste (desde 14/10/2026): decida por `ENVIRONMENT_NAME` (`local`, `homolog`, `production`; sem provedor vale `production`). Exemplo: o link "Instruções de pagamento" do `lib-pix-payment` (`instructions_url`) só aparece fora de produção.
- Aviso de conclusão que pede leitura (ex.: "Pagamento confirmado" no checkout): `lib-alert-dialog` com `variant="success"`; o resto continua em toast (`docs/portal/avisos-toast.md`).
- Fachada global (`providedIn: 'root'`) com dados da empresa não precisa de `reset()`: o fim da sessão no Portal recarrega a página (`docs/INSTRUCOES-IA.md` §3). Não faça o logout navegar pelo router.
- Specs do mapeador e da fachada (Vitest) e fluxo de tela (Playwright) conforme a skill `lordsz-testes`.

## 4. Atualizar documentação e skills

Ao concluir uma integração nova, no mesmo trabalho:

1. `docs/integracao/progresso.md`: entrada datada com a data do schema puxado, o que mudou no contrato, o que foi integrado e os comandos/testes executados.
2. `docs/integracao/contrato-api.md`: seção do domínio com endpoints, corpos e regras novos (e "Atualização confirmada na homologação (dd/mm/aaaa)" quando o schema mudou).
3. `docs/integracao/roteiro.md`: marcar a etapa e a linha da matriz §5; mover ou fechar pendências em §7.
4. **Skills:** revise as skills `lordsz-*` em `.agents/skills/` e atualize as que a integração tornou desatualizadas — esta skill (comandos, armadilhas, convenções novas), `lordsz-testes` (helpers novos em `apps/e2e/src/support/`, construtores de DTO) e `lordsz-performance` (rota ou dependência nova). Ao alterar uma skill, suba `metadata.version`.

## 5. Validar

- `npx tsc -p apps/shared/data-access/tsconfig.lib.json --noEmit` depois de regenerar, para achar quebras de tipo cedo.
- `npm run test:data-access -- --watch=false` e o spec de ponta a ponta da tela.
- Antes de entregar: lint, testes e build dos projetos afetados e os E2E dos fluxos alterados; `npm run check` completo só quando o usuário pedir (`docs/INSTRUCOES-IA.md` §11).

## Armadilhas já encontradas

- Enum renomeado no schema (`ReportKindEnum`) quebra o import mesmo com valores iguais: rode o `tsc` logo após o `api:generate`.
- Enum com valor novo (área `catalogo` da Auditoria) exige rótulo no Portal e opção no filtro; use o `*_label` da API quando existir e caia no rótulo local se vier vazio.
- `checkout_data` é `CheckoutData` desde 12/10/2026, mas todas as chaves são opcionais e vem `{}` sem pagamento pendente: continue lendo cada chave com tolerância.
- Campo que vira obrigatório no tipo gerado (`Me.permissions`, `Appointment.order`, `checkout_data`) quebra as fixtures do E2E e dos specs (`meDto`, `agendaItem`, `paymentDto`): rode o `tsc` de `apps/e2e/tsconfig.json` logo depois do `api:generate`. No mapeador, aceite a ausência quando o valor padrão é seguro (ex.: `permissions` ausente = nenhuma), para não derrubar a sessão com uma resposta antiga.
- Campos substituídos ficam no schema como "Deprecated" (`revenue_weekly`, `*_7d`, `*_24h`): troque a leitura para o campo novo e apague o contorno que existia no front (leituras extras, recortes).
- Lista que passa de array a `Paginated*List` (14/10/2026: `company/groups/`, `developers/keys/`, `developers/webhooks/`, `reports/schedules/`) não quebra o `tsc` quando o mapeador recebe `unknown`: a tela só falha em execução, com "Resposta de … incompatível com o contrato.". No diff do schema, procure respostas `type: array` que viraram `$ref: Paginated…` e troque o mapeador, a fachada e os mocks do E2E (`pageOf`).
- Taxa de agendamento do Catálogo (schema atualizado em 15/10/2026): configuração e vitrine usam `booking_fee_percent` (decimal string percentual, incluído no preço dos serviços); pedido mantém `booking_fee` como valor monetário e inclui o percentual snapshot `booking_fee_percent`. Não some novamente a parcela ao total. `booking_fee_kept_on_cancel` fica fixado no pedido; `refunded_amount` é o valor efetivamente estornado (não deduza pelo `refunded_at`); `refund_booking_fee` só vai no cancelamento da empresa quando ela opta por devolver uma taxa normalmente retida. Validar em homologação o cálculo e arredondamento do `booking_fee` monetário.
- Cancelamento e reagendamento do Catálogo (schema atualizado em 15/10/2026): `free_reschedule` é configuração por serviço, `can_cancel` vem no pedido e `can_reschedule`/`rescheduled_at` vêm por linha. `POST public/catalog/{slug}/orders/{order_id}/reschedule/` recebe o **id da linha**, data e hora; `slots/` recebe o **id do item do catálogo**. Os POSTs de cancelamento e reagendamento exigem `customerAuth`; `guest_token` é só para leitura. A integração está no Portal/Ecommerce; regras, testes e QA backend pendente em `docs/integracao/catalogo-cancelamento-remarcacao.md`.
- CORS da homologação libera só as portas de desenvolvimento (`localhost:4200`–`4203`).
- Campo com janela fixa no nome ou na descrição (`movements_7d`, `events_24h`, "Last 12 weeks") não acompanha o filtro de período. Se a tela tem seletor de período, conte pela lista filtrada (`count` com `size=1`) ou corte a série enquanto o backend não resolve, e registre o pedido em `docs/integracao/pendencias-backend.md`. O Dashboard passou por isso e, desde 12/10/2026, lê as séries do período (`DashboardSeries`, por dia, semana ou mês).
- Pendências do backend ficam reunidas em `docs/integracao/pendencias-backend.md`: ao descobrir uma nova, inclua lá (e no roteiro §7 quando for etapa do projeto).
- Leitura de fundo sem a permissão vira 403 `permission_denied`, e o aviso central aparece em toda tela. Antes de ler algo que a tela não pediu (contadores do menu, equipe para responsáveis, busca de leads na agenda, compras do lead, conta Stripe), confira a permissão da rota lida (tabela §7 de `permissoes.md`).
- `permission_denied` relê `auth/me/` (como `module_not_enabled`): o gerente pode tirar um acesso no meio da sessão. Mostre o `detail` da resposta no aviso.
