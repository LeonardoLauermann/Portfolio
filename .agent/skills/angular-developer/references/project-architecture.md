# Feature component architecture in Lordsz

Keep route resolution, API/facade state and variant selection in the feature page. When variants share a structure, render that structure once in the page from typed per-item content and extract only the parts that genuinely differ into `apps/<app>/src/app/features/<feature>/components/<part>/`. For example, `site/features/module-detail` renders the hero, features, integrations and related modules for every module from `module-detail.content.ts`, and only the previews (`estoque-preview`, `agenda-preview`, `audit-preview`) are separate components chosen by module ID inside `module-preview-frame`. Do not keep near-identical full-page copies per variant.

Pass typed data through `input.required()` and actions through `output()`. A variant must not fetch the catalog again or duplicate route and checkout logic. Repeated sections should become shared local components only when they have the same behavior and a clear input contract. Preserve genuinely different previews in their variant components.

Use Bootstrap 5 utilities and grid for layout, spacing, positioning and responsive breakpoints. Do not add new numbered `reference-*` classes. When changing an old block, migrate its layout classes and remove the corresponding unused CSS rules; keep a descriptive class only for presentation that Bootstrap cannot express well. Typography uses `font-primary`, `font-mono`, `font-serif` and nearby Bootstrap `fs-*` sizes.

`apps/shared/styles/src/lib/_variables.scss` is the canonical source for project colors, fonts and design values, with highest priority for styling decisions. Bootstrap theme values should follow it. `_reference-theme.scss` and its `--ink` family have been removed; do not recreate them or introduce new dependencies on those tokens. Migrate touched selectors to the canonical Sass variables or Bootstrap utilities where appropriate.

Do not use italic typography in any application: avoid `<em>`, `fst-italic`, `font-style: italic` and italic font shorthands. Use the existing font-family utilities, weight and color when text needs visual distinction.

Customer-facing catalog data comes from APIs through `@lordsz/data-access` facades. Keep prices, names, features and counts in typed models or view models supplied by the page/facade. Do not freeze values in variant templates or invent production endpoints. Validate the affected app's build and lint after extraction, and document remaining legacy classes when migration must be incremental.

If an API endpoint is not configured, show an explicit unavailable state for actions that would send customer data. Never simulate a successful submission or log personal form data. Do not restore the archived demo storefront or its fixtures in production flows. Journeys without an API contract stay out of the interface; see `docs/integracao/roteiro.md` for current pending work.
