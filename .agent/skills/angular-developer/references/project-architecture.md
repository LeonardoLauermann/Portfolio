# Arquitetura do portfólio

O workspace tem uma aplicação portfolio em src/. Confirme project.json antes de criar diretórios ou comandos. O bootstrap standalone usa src/main.ts, app.config.ts e app.ts; a navegação fica em app.routes.ts.

Mantenha componentes em src/app/ seguindo o padrão existente. Extraia seções por responsabilidade clara ou reutilização real; conteúdo estático pode ficar em modelos locais tipados, sem exigir fachada ou backend. Evite duplicar páginas completas para trocar textos.

Use SCSS de componente e src/styles.scss para regras globais. Não há framework CSS ou sistema de design instalado. Tokens compartilhados devem nascer de valores recorrentes ou identidade definida.

Use código em inglês e conteúdo ao visitante em português, somente com fatos confirmados. Contato não pode simular envio concluído. Valide lint, build e interações por lint, build e inspeção manual.
