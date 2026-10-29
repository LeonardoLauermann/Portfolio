---
name: angular-developer
description: Generates Angular code and provides architectural guidance. Trigger when creating projects, components, services, or HTTP communication, or for best practices on reactivity (signals, linkedSignal, resource, httpResource), forms, dependency injection, routing, SSR, accessibility (ARIA), animations, styling (component styles, Tailwind CSS), testing, naming conventions, or CLI tooling.
license: MIT
metadata:
  author: Copyright 2026 Google LLC
  version: '1.2'
---

# Angular Developer Guidelines

## Lordsz repository context

Start from `docs/README.md` and `docs/INSTRUCOES-IA.md`; use the installed versions in `package.json` and the lockfile. This workspace has three apps: Site, Ecommerce and Portal. Build affected apps with `npx nx build <app>`; run focused lint, unit tests and E2E according to `lordsz-testes`. Use `npm run check` only when requested. Documentation-only changes need reference and formatting checks.

Before adding shared UI, data access or styles, read the respective README in `apps/shared/components`, `apps/shared/data-access` or `apps/shared/styles`, and inspect the public exports. Use Bootstrap utilities and existing controls; do not introduce Tailwind or a second icon system merely because a generic reference below describes it. Business data comes through API facades, including the Ecommerce storefront; journeys without a contract stay out of the interface.

Portal action buttons must follow `docs/portal/padrao-botoes.md`: primary near-black for record creation and form submission (multiple creation buttons may share a header), ghost for auxiliary operations such as opening a stock request, scanning, importing/exporting, editing or viewing, solid danger for Cancelar (the repository's explicit convention), and danger for destructive actions. Include an appropriate Material Symbol with `aria-hidden="true"`, flex alignment and gap. Creation actions use `add`; submit/save use `check` or the specific action icon. Regenerate and check icon subsets after editing templates. Inspect all equivalent actions across pages when introducing or changing a button.

1. Always analyze the project's Angular version before providing guidance, as best practices and available features can vary significantly between versions. If creating a new project with Angular CLI, do not specify a version unless prompted by the user.

2. When generating code, follow Angular's style guide and best practices for maintainability and performance. Use the Angular CLI for scaffolding components, services, directives, pipes, and routes to ensure consistency.

3. Once you finish generating code in this Nx repository, run `npx nx build <app>` for each affected app to ensure there are no build errors. If there are errors, analyze the error messages and fix them before proceeding. Do not skip this step, as it is critical for ensuring the generated code is correct and functional.

## Creating New Projects

If no guidelines are provided by the user, here are some default rules to follow when creating a new Angular project:

1. Use the latest stable version of Angular unless the user specifies otherwise.
2. Use Signal Forms for form management in new projects (stable in Angular v22 and newer) [Find out more](references/signal-forms.md).

**Execution Rules for `ng new`:**
When asked to create a new Angular project, you must determine the correct execution command by following these strict steps:

**Step 1: Check for an explicit user version.**

- **IF** the user requests a specific version (e.g., Angular 15), bypass local installations and strictly use `npx`.
- **Command:** `npx @angular/cli@<requested_version> new <project-name>`

**Step 2: Check for an existing Angular installation.**

- **IF** no specific version is requested, run `ng version` in the terminal to check if the Angular CLI is already installed on the system.
- **IF** the command succeeds and returns an installed version, use the local/global installation directly.
- **Command:** `ng new <project-name>`

**Step 3: Fallback to Latest.**

- **IF** no specific version is requested AND the `ng version` command fails (indicating no Angular installation exists), you must use `npx` to fetch the latest version.
- **Command:** `npx @angular/cli@latest new <project-name>`

## Components

For this repository, when a feature template contains complete variants selected by a slug or long sections with distinct responsibilities, read [project-architecture.md](references/project-architecture.md) before editing the feature.

When working with Angular components, consult the following references based on the task:

- **Fundamentals**: Anatomy, metadata, core concepts, self-closing tags, and template control flow (@if, @for, @switch). Read [components.md](references/components.md)
- **Inputs**: Signal-based inputs, transforms, and model inputs. Read [inputs.md](references/inputs.md)
- **Outputs**: Signal-based outputs and custom event best practices. Read [outputs.md](references/outputs.md)
- **Host Elements**: Host bindings and attribute injection. Read [host-elements.md](references/host-elements.md)
- **Naming Conventions**: Modern Angular v20+ naming style ("Intent over Role") for files, components, services, directives, pipes, and models. Read [naming-conventions.md](references/naming-conventions.md)

If you require deeper documentation not found in the references above, read the documentation at `https://angular.dev/guide/components`.

## Reactivity and Data Management

When managing state and data reactivity, use Angular Signals and consult the following references:

- **Signals Overview**: Core signal concepts (`signal`, `computed`), reactive contexts, and `untracked`. Read [signals-overview.md](references/signals-overview.md)
- **Dependent State (`linkedSignal`)**: Creating writable state linked to source signals. Read [linked-signal.md](references/linked-signal.md)
- **Async Reactivity (`resource`)**: Fetching asynchronous data directly into signal state. Read [resource.md](references/resource.md)
- **Side Effects (`effect`)**: Logging, third-party DOM manipulation (`afterRenderEffect`), and when NOT to use effects. Read [effects.md](references/effects.md)

## HTTP Communication

When communicating with backend services, use Angular HTTP APIs and consult the following reference:

- **HTTP Client and Resources**: `provideHttpClient`, `HttpClient`, interceptors, and `httpResource`. Read [http-client.md](references/http-client.md)

## Forms

In most cases for new apps, **prefer signal forms**. When making a forms decision, analyze the project and consider the following guidelines:

- If the application is using v22 or newer and this is a new form, **prefer Signal Forms**.
- For older applications or when working with existing forms, use the appropriate form type that matches the applications current form strategy.

- **Signal Forms**: Use signals for form state management. Read [signal-forms.md](references/signal-forms.md)
- **Template-driven forms**: Use for simple forms. Read [template-driven-forms.md](references/template-driven-forms.md)
- **Reactive forms**: Use for complex forms. Read [reactive-forms.md](references/reactive-forms.md)

**Lordsz project rule (2026-10-15):** every form uses Signal Forms with shared controls from `@lordsz/components`. Before writing a form field, inspect the library and reuse `lib-input`, `lib-select`, or another existing control; do not use native `<input>`/`<select>` or Bootstrap controls when a shared equivalent exists. Native fields are allowed only when no suitable shared control exists or a specialized integration requires them (such as Stripe secure fields); explain non-obvious exceptions in code. Apply this rule to existing fields whenever their form is changed. Use **RxJS whenever possible alongside Signal Forms**. Anything a form triggers (filters, search, a select that reloads a list, a field that queries the API) is derived from the form model with `toObservable(model)` plus operators (`map`, `debounceTime` for typed text, `distinctUntilChanged`, `switchMap` to cancel the previous read, `takeUntilDestroyed()`); avoid `effect()` or imperative `(change)` handlers calling a facade. CPF/CNPJ fields use `lib-document-input` (`kind`: `cpf`, `cnpj`, `cpf-cnpj`) plus `validDocument(path.field, {kind})` in the schema; submit blocks an invalid document before any request and shows the message in `lib-alert-dialog` (2026-10-17). See `docs/INSTRUCOES-IA.md` §6.

## Dependency Injection

When implementing dependency injection in Angular, follow these guidelines:

- **Fundamentals**: Overview of Dependency Injection, services, and the `inject()` function. Read [di-fundamentals.md](references/di-fundamentals.md)
- **Creating and Using Services**: Creating services, the `providedIn: 'root'` option, and injecting into components or other services. Read [creating-services.md](references/creating-services.md)
- **Defining Dependency Providers**: Automatic vs manual provision, `InjectionToken`, `useClass`, `useValue`, `useFactory`, and scopes. Read [defining-providers.md](references/defining-providers.md)
- **Injection Context**: Where `inject()` is allowed, `runInInjectionContext`, and `assertInInjectionContext`. Read [injection-context.md](references/injection-context.md)
- **Hierarchical Injectors**: The `EnvironmentInjector` vs `ElementInjector`, resolution rules, modifiers (`optional`, `skipSelf`), and `providers` vs `viewProviders`. Read [hierarchical-injectors.md](references/hierarchical-injectors.md)

## Pipes

When formatting values in templates, creating custom pipes, or reusing pipe-like logic in TypeScript, consult the following reference. Prefer pipes in templates; outside templates, avoid injecting pipe classes just to call `transform()`.

- **Pipes**: Built-in pipe imports, custom pipe naming and implementation, pure vs impure pipes, and TypeScript reuse patterns using standalone formatting functions or extracted plain functions. Read [pipes.md](references/pipes.md)

## Angular Aria

When building accessible custom components for any of the following patterns: Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid, consult the following reference:

- **Angular Aria Components**: Building headless, accessible components (Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid) and styling ARIA attributes. Read [angular-aria.md](references/angular-aria.md)

## Routing

When implementing navigation in Angular, consult the following references:

- **Define Routes**: URL paths, static vs dynamic segments, wildcards, and redirects. Read [define-routes.md](references/define-routes.md)
- **Route Loading Strategies**: Eager vs lazy loading, and context-aware loading. Read [loading-strategies.md](references/loading-strategies.md)
- **Show Routes with Outlets**: Using `<router-outlet>`, nested outlets, and named outlets. Read [show-routes-with-outlets.md](references/show-routes-with-outlets.md)
- **Navigate to Routes**: Declarative navigation with `RouterLink` and programmatic navigation with `Router`. Read [navigate-to-routes.md](references/navigate-to-routes.md)
- **Control Route Access with Guards**: Implementing `CanActivate`, `CanMatch`, and other guards for security. Read [route-guards.md](references/route-guards.md)
- **Data Resolvers**: Pre-fetching data before route activation with `ResolveFn`. Read [data-resolvers.md](references/data-resolvers.md)
- **Router Lifecycle and Events**: Chronological order of navigation events and debugging. Read [router-lifecycle.md](references/router-lifecycle.md)
- **Rendering Strategies**: CSR, SSG (Prerendering), and SSR with hydration. Read [rendering-strategies.md](references/rendering-strategies.md)
- **Route Transition Animations**: Enabling and customizing the View Transitions API. Read [route-animations.md](references/route-animations.md)

If you require deeper documentation or more context, visit the [official Angular Routing guide](https://angular.dev/guide/routing).

## Styling and Animations

For this repository, use Material Symbols Outlined for Angular UI icons. Select a real symbol whose meaning matches the action or content, and verify that the icon font loads in the consuming application. Do not create arbitrary inline SVGs or add another icon library for common UI icons. SVG remains appropriate for charts, logos, diagrams, and illustrations. Hide decorative icons from assistive technology and give icon-only controls an accessible name. See `docs/INSTRUCOES-IA.md` for the project rules.

When implementing styling and animations in Angular, consult the following references:

- **Using Tailwind CSS with Angular**: Integrating Tailwind CSS into Angular projects. Read [tailwind-css.md](references/tailwind-css.md)
- **Angular Animations**: Using native CSS (recommended) or the legacy DSL for dynamic effects. Read [angular-animations.md](references/angular-animations.md)
- **Styling components**: Best practices for component styles and encapsulation. Read [component-styling.md](references/component-styling.md)

## Testing

When writing or updating tests, consult the following references based on the task:

- **Fundamentals**: Best practices for unit testing (Vitest), async patterns, and `TestBed`. Read [testing-fundamentals.md](references/testing-fundamentals.md)
- **Component Harnesses**: Standard patterns for robust component interaction. Read [component-harnesses.md](references/component-harnesses.md)
- **Router Testing**: Using `RouterTestingHarness` for reliable navigation tests. Read [router-testing.md](references/router-testing.md)
- **End-to-End (E2E) Testing**: Setting up and running E2E tests. Read [e2e-testing.md](references/e2e-testing.md)

## Tooling

When working with Angular tooling, consult the following references:

- **Angular CLI**: Creating applications, generating code (components, routes, services), serving, and building. Read [cli.md](references/cli.md)
- **Code Modernization**: Automatically refactoring to modern standards using migrations. Read [migrations.md](references/migrations.md)
- **Angular MCP Server**: Available tools, configuration, and experimental features. Read [mcp.md](references/mcp.md)
- **Environment Configuration**: Strategies for build-time and runtime configuration. Read [environment-configuration.md](references/environment-configuration.md)
