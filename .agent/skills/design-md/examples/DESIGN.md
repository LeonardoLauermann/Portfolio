# Design System: Lordsz Angular / Bootstrap

**Project Context:** Angular + SCSS + Bootstrap 5.x  
**Primary Styling Strategy:** SCSS design tokens + Bootstrap theme customization + CSS custom properties  
**Primary Fonts:** Roboto, Roboto Mono, Roboto Serif

---

## 1. Visual Theme & Atmosphere

The interface should follow a **warm, minimalist, structured visual language** built around earthy neutrals, restrained contrast, and a strong but understated dark primary color.

The visual system should feel:

- Modern and clean
- Warm rather than clinical
- Minimalist without becoming sterile
- Structured and consistent
- Accessible and readable
- Compatible with Bootstrap components and utilities
- Easy to extend through shared SCSS tokens

The project already defines its visual identity through SCSS variables and CSS custom properties. New screens and components must reuse these tokens instead of introducing isolated colors, radii, shadows, or typography rules.

**Bootstrap is the primary tool for responsiveness in this project.** Responsive behavior must be implemented first with Bootstrap's grid, breakpoints, responsive utilities, spacing utilities, display helpers, flex utilities, responsive columns, containers, navbar/offcanvas patterns, and other built-in responsive primitives. Custom media queries should only be introduced when Bootstrap cannot express the required behavior cleanly.

### Key Characteristics

- Warm off-white backgrounds
- Dark brown/near-black primary actions
- Gold/ochre tertiary accent
- Soft cream accent surfaces
- Moderate 12px corner radius
- Roboto as the main UI font
- Low visual noise
- Clear component hierarchy
- Bootstrap-compatible component styling
- Responsive layouts following Bootstrap breakpoints and grid principles

---

## 2. Source of Truth

The SCSS design tokens are the **source of truth** for visual implementation.

Do not hardcode colors that already exist in `variables.scss`.

Prefer:

```scss
color: var(--primary);
background-color: var(--background);
border-color: var(--stroke-2);
```

or, when working inside SCSS where compile-time operations are required:

```scss
@use './variables' as *;

.component {
  color: $primary;
  background-color: $background;
}
```

### Current SCSS Tokens

```scss
$primary: #1f1a15;
$secondary: #1f1a15;
$tertiary: #ab6b00;
$accent: #ffe7b6;
$fourth: #f7f3ec;
$stroke: #4a423a;
$stroke-2: #e6dfd2;
$white: #ffffff;
$black: #000000;
$background: #f7f3ec;

$color-1: #efeae0;
$color-2: #01600c;
$color-3: #4f674f;
$color-4: #f7f3ec;
$color-6: #1d1a18;
$color-7: #dbeafe;
$color-8: #1e40af;
$color-9: #dcfce7;
$color-10: #fee2e2;
$color-11: #991b1b;

$font-primary: 'Roboto', sans-serif;
$font-mono: 'Roboto Mono', monospace;
$font-serif: 'Roboto Serif', serif;
```

### Palette Map

```scss
$palette: (
  primary: $primary,
  secondary: $secondary,
  tertiary: $tertiary,
  accent: $accent,
  fourth: $fourth,
  stroke: $stroke,
  stroke-2: $stroke-2,
  white: $white,
  black: $black,
  background: $background,
  color-1: $color-1,
  color-2: $color-2,
  color-3: $color-3,
  color-4: $color-4,
  color-6: $color-6,
  color-7: $color-7,
  color-8: $color-8,
  color-9: $color-9,
  color-10: $color-10,
  color-11: $color-11,
);
```

---

## 3. Color Palette & Roles

### Primary Foundation

- **Primary / Deep Warm Charcoal — `#1f1a15`**  
  Main brand color. Used for primary buttons, headings, dark navigation, important text, active controls, and high-emphasis UI elements.

- **Secondary — `#1f1a15`**  
  Currently matches the primary color. Treat it as a semantic alias, not as a second visual color.

- **Background / Warm Ivory — `#f7f3ec`**  
  Main application background and large neutral surfaces.

- **Fourth / Warm Ivory — `#f7f3ec`**  
  Semantic alias for alternative background/surface usage.

- **White — `#ffffff`**  
  Cards, form controls, modal surfaces, dropdowns, and other elevated content areas.

### Accent Colors

- **Tertiary / Warm Ochre — `#ab6b00`**  
  Secondary highlight color. Use for selective emphasis, badges, decorative details, icons, active states, or secondary CTAs when appropriate.

- **Accent / Pale Gold — `#ffe7b6`**  
  Soft supporting surface. Use as a subtle background for highlighted sections, pills, tags, notices, or decorative blocks.

### Borders and Structural Colors

- **Stroke — `#4a423a`**  
  Stronger border, divider, icon, or muted foreground color.

- **Stroke 2 — `#e6dfd2`**  
  Default subtle border/divider color.

- **Color 1 — `#efeae0`**  
  Alternative neutral surface.

- **Color 3 — `#4f674f`**  
  Muted green support color.

- **Color 6 — `#1d1a18`**  
  Dark supporting foreground/background.

### Functional States

- **Success — `#01600c` (`$color-2`)**
- **Danger — `#991b1b` (`$color-11`)**
- **Warning — `#dbeafe` (`$color-7`)**
- **Info — `#1e40af` (`$color-8`)**
- **Success Surface — `#dcfce7` (`$color-9`)**
- **Danger Surface — `#fee2e2` (`$color-10`)**

> Important: `warning` currently maps to a light blue value (`#dbeafe`). Do not reinterpret or change it automatically. Follow the existing project token unless the design system is explicitly refactored.

---

## 4. CSS Custom Properties

The project exposes SCSS tokens as CSS variables for runtime and component-level usage.

```scss
@use './variables' as *;

:root {
  --primary: #{$primary};
  --secondary: #{$secondary};
  --tertiary: #{$tertiary};
  --accent: #{$accent};

  --fourth: #{$fourth};
  --stroke: #{$stroke};
  --stroke-2: #{$stroke-2};
  --background: #{$background};
  --white: #{$white};
  --black: #{$black};

  --color-1: #{$color-1};
  --color-2: #{$color-2};
  --color-3: #{$color-3};
  --color-4: #{$color-4};
  --color-6: #{$color-6};
  --color-7: #{$color-7};
  --color-8: #{$color-8};
  --color-9: #{$color-9};
  --color-10: #{$color-10};
  --color-11: #{$color-11};

  --font-primary: #{$font-primary};
  --font-mono: #{$font-mono};
  --font-serif: #{$font-serif};
}
```

### Usage Preference

Prefer CSS variables inside component styles when no Sass calculation is needed:

```scss
.card-title {
  color: var(--primary);
}

.card {
  background: var(--white);
  border: 1px solid var(--stroke-2);
}
```

Use SCSS variables when customizing Bootstrap or performing Sass operations:

```scss
$primary: $primary;
$success: $color-2;
```

---

## 5. Bootstrap Integration

Bootstrap is part of the project and must be treated as the base component/grid system.

The current theme customization is:

```scss
@use './variables' as *;

$primary: $primary;
$secondary: $secondary;
$success: $color-2;
$danger: $color-11;
$warning: $color-7;
$info: $color-8;
$dark: $black;
$white: $white;

$border-radius: 12px;

$theme-colors: (
  'primary': $primary,
  'secondary': $secondary,
  'tertiary': $tertiary,
  'accent': $accent,
  'success': $color-2,
  'danger': $color-11,
  'warning': $color-7,
  'info': $color-8,
  'dark': $dark,
  'light': $white,
);

@each $name, $color in $theme-colors {
  .form-control-#{$name},
  .form-select-#{$name} {
    background-color: var(--bs-white) !important;

    &:focus {
      border-color: var(--bs-#{$name}) !important;
      box-shadow: 0 0 0 0.2rem rgba(var(--bs-#{$name}-rgb), 0.25) !important;
    }
  }

  .btn-outline-#{$name} {
    border: var(--bs-border-width) solid var(--bs-border-color) !important;
  }
}

@import 'bootstrap/scss/bootstrap';
```

### Bootstrap Rules

- **Bootstrap is the project's primary responsiveness layer.**
- Reuse Bootstrap utilities before creating redundant utility classes.
- Prefer `container`, `container-fluid`, `row`, `col-*`, `d-flex`, `gap-*`, `py-*`, `px-*`, `mb-*`, etc.
- Prefer Bootstrap responsive modifiers such as `col-md-*`, `col-lg-*`, `d-none`, `d-md-block`, `flex-column`, `flex-md-row`, `w-100`, `w-md-auto` when available.
- Use Bootstrap breakpoints as the default responsive contract for the application.
- Do not recreate Bootstrap grid behavior manually unless there is a specific layout need.
- Do not write custom media queries for behavior already supported by Bootstrap responsive utilities.
- Custom media queries are acceptable only for component-specific behavior that cannot be expressed cleanly with Bootstrap.
- Use custom component SCSS for project-specific visual identity.
- Avoid excessive `!important`; only use it where Bootstrap specificity requires it.
- Do not duplicate `$border-radius`.
- Keep Bootstrap customization before the Bootstrap import.

### Recommended Cleanup

The duplicated declaration:

```scss
$border-radius: 12px;
$border-radius: 12px;
```

should be reduced to:

```scss
$border-radius: 12px;
```

---

## 6. Typography

### Font Families

The project uses:

- **Roboto** — primary UI font
- **Roboto Mono** — code, technical values, identifiers, tabular data where appropriate
- **Roboto Serif** — editorial or decorative content when a serif contrast is desired

### Font Tokens

```scss
$font-primary: 'Roboto', sans-serif;
$font-mono: 'Roboto Mono', monospace;
$font-serif: 'Roboto Serif', serif;
```

### Font Loading

```scss
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto/Roboto-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto/Roboto-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto/Roboto-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Mono';
  src: url('/fonts/roboto-mono/RobotoMono-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Mono';
  src: url('/fonts/roboto-mono/RobotoMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Mono';
  src: url('/fonts/roboto-mono/RobotoMono-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Serif';
  src: url('/fonts/roboto-serif/RobotoSerif-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Serif';
  src: url('/fonts/roboto-serif/RobotoSerif-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto Serif';
  src: url('/fonts/roboto-serif/RobotoSerif-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

### Typography Hierarchy

#### Display / H1

- Font: Roboto
- Weight: 600
- Size: `clamp(2rem, 4vw, 3.5rem)`
- Line-height: `1.1`
- Color: `var(--primary)`

#### H2

- Font: Roboto
- Weight: 600
- Size: `clamp(1.75rem, 3vw, 2.5rem)`
- Line-height: `1.2`
- Color: `var(--primary)`

#### H3

- Font: Roboto
- Weight: 600
- Size: `1.5rem`
- Line-height: `1.3`

#### Body

- Font: Roboto
- Weight: 400
- Size: `1rem`
- Line-height: `1.6`
- Color: `var(--stroke)`

#### Small / Metadata

- Font: Roboto
- Weight: 400
- Size: `0.875rem`
- Line-height: `1.5`

#### Technical / Code-like Text

Use Roboto Mono only where monospace improves comprehension:

```scss
.code,
.identifier,
.technical-value {
  font-family: var(--font-mono);
}
```

#### Editorial Accent

Roboto Serif may be used sparingly:

```scss
.editorial-title {
  font-family: var(--font-serif);
}
```

Do not use Roboto Serif as the default application font.

---

## 7. Spacing System

Use an 8px-based spacing rhythm.

### Base Scale

```text
4px   = micro
8px   = xs
12px  = sm
16px  = md
24px  = lg
32px  = xl
48px  = 2xl
64px  = 3xl
96px  = 4xl
```

Prefer Bootstrap spacing utilities where they fit the layout.

Examples:

```html
<div class="d-flex gap-3">
  <div class="mb-4">
    <section class="py-5"></section>
  </div>
</div>
```

For custom layouts, keep spacing consistent with the same rhythm:

```scss
.component {
  padding: 24px;
  gap: 16px;
}
```

Avoid arbitrary values such as `17px`, `29px`, or `43px` unless they are required by a specific visual constraint.

---

## 8. Border Radius

The project-wide default radius is:

```scss
$border-radius: 12px;
```

Use 12px as the default radius for:

- Cards
- Form controls
- Buttons
- Dropdowns
- Popovers
- Modals
- Panels
- Content containers

Recommended scale:

```text
6px   — compact elements
8px   — small controls
12px  — default project radius
16px  — larger surfaces
24px+ — pills or intentionally rounded decorative elements
```

Do not mix arbitrary radii across visually related components.

---

## 9. Shadows

The visual system should remain relatively flat.

Use shadows only to indicate elevation, hover, overlay, or interaction.

### Default Card

```scss
box-shadow: none;
```

### Hover / Raised Surface

```scss
box-shadow: 0 4px 16px rgba(31, 26, 21, 0.08);
```

### Modal / Strong Elevation

```scss
box-shadow: 0 16px 40px rgba(31, 26, 21, 0.16);
```

Avoid strong black shadows or exaggerated elevation.

---

## 10. Buttons

Bootstrap button classes should remain the base implementation.

### Primary Button

```html
<button
  type="button"
  class="btn btn-primary"
>
  Salvar
</button>
```

Visual intent:

- Dark warm background
- White text
- 12px radius
- Clear hover/focus state
- Medium visual weight

### Secondary Button

```html
<button
  type="button"
  class="btn btn-outline-primary"
>
  Cancelar
</button>
```

### Tertiary / Accent Action

Use `btn-tertiary` or `btn-accent` only when hierarchy requires another level:

```html
<button
  type="button"
  class="btn btn-tertiary"
>
  Ver detalhes
</button>
```

### Button Rules

- Use semantic Bootstrap variants.
- Keep button labels concise.
- Do not create unique button colors per feature.
- Primary CTA should remain visually dominant.
- Ensure keyboard focus is visible.
- Avoid icon-only buttons without `aria-label`.

---

## 11. Forms

Bootstrap forms remain the base.

### Standard Input

```html
<label
  for="name"
  class="form-label"
>
  Nome
</label>
<input
  id="name"
  type="text"
  class="form-control"
/>
```

### Semantic Focus Variant

The project supports semantic form variants:

```html
<input class="form-control form-control-primary" />
<select class="form-select form-select-danger"></select>
```

### Form Styling Principles

- White control background
- Subtle `stroke-2` border by default
- 12px radius
- Strong focus visibility
- Error messages near the associated field
- Do not use placeholder as a replacement for labels
- Keep touch targets large enough for mobile interaction

### Validation

Visual validation should align with Angular form state.

Prefer:

```html
@if (form.email().touched() && form.email().invalid()) {
<div class="invalid-feedback d-block">E-mail inválido.</div>
}
```

Avoid visual error states before the user interacts with the field unless validation is required immediately by the workflow.

---

## 12. Cards

Cards should feel clean and restrained.

### Default Card

```scss
.card {
  background: var(--white);
  border: 1px solid var(--stroke-2);
  border-radius: 12px;
}
```

### Interactive Card

```scss
.card--interactive {
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(31, 26, 21, 0.08);
  }
}
```

### Card Rules

- Default to flat surfaces.
- Avoid unnecessary shadows.
- Use `stroke-2` for subtle borders.
- Keep padding consistent.
- Do not overload cards with decorative styling.

---

## 13. Navigation

Navigation should prioritize clarity.

### Desktop

- Use horizontal navigation where space allows.
- Active item should have a clear but restrained state.
- Use primary color for active foreground.
- Avoid excessive uppercase unless the section is intentionally editorial.

### Mobile

- Collapse navigation when required.
- Ensure all touch targets are at least 44px high.
- Use Bootstrap offcanvas or collapse patterns where appropriate.

Example:

```html
<nav class="navbar navbar-expand-lg"></nav>
```

Prefer Bootstrap navigation behavior rather than implementing custom menu infrastructure without a specific need.

---

## 14. Layout Principles

### Container Strategy

Use Bootstrap containers:

```html
<div class="container"></div>
```

or:

```html
<div class="container-fluid"></div>
```

Choose `container` for readable application content and `container-fluid` for dashboards, dense data layouts, or full-width pages.

### Grid

Use Bootstrap grid before custom CSS Grid for standard page composition:

```html
<div class="row g-4">
  <div class="col-12 col-md-6 col-xl-4"></div>
</div>
```

Use CSS Grid when the component itself benefits from explicit grid semantics:

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

### Responsive Principle

Design mobile-first.

**Bootstrap must be the first choice for responsive implementation.**

Use Bootstrap's responsive system before custom CSS:

```html
<div class="container">
  <div class="row g-3 g-lg-4">
    <div class="col-12 col-md-6 col-xl-4"></div>
  </div>
</div>
```

Prefer:

```text
container / container-fluid
row / col-*
col-sm-* / col-md-* / col-lg-* / col-xl-* / col-xxl-*
d-*
d-sm-* / d-md-* / d-lg-* / d-xl-* / d-xxl-*
flex-column / flex-md-row
justify-content-*
align-items-*
gap-*
p-* / m-*
navbar-expand-*
offcanvas
```

Do not create desktop-only layouts and then patch them with many media queries.

Do not use custom breakpoints unless there is a concrete component requirement not covered by Bootstrap.

---

## 15. Breakpoints

**Bootstrap breakpoints are the official responsive breakpoints of the project.**

Follow Bootstrap breakpoints unless the project explicitly defines alternatives.

Typical Bootstrap breakpoints:

```text
xs: <576px
sm: ≥576px
md: ≥768px
lg: ≥992px
xl: ≥1200px
xxl: ≥1400px
```

Prefer Bootstrap responsive utilities/classes instead of custom breakpoint values whenever possible.

Example:

```html
<div class="d-none d-lg-block"></div>
```

---

## 16. Accessibility

Accessibility is mandatory.

### Required Practices

- Semantic HTML first
- Proper labels for inputs
- `aria-label` for icon-only controls
- Visible keyboard focus
- Sufficient color contrast
- No interaction relying only on color
- Logical heading hierarchy
- Keyboard-accessible menus, dialogs, and dropdowns
- Minimum practical touch target around 44x44px
- Respect reduced-motion preferences for non-essential animation

### Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 17. Angular Component Styling

Use Angular component styles for local presentation and global SCSS only for:

- Design tokens
- Bootstrap theme customization
- Typography setup
- Reset/base styling
- Shared utilities
- Truly global component patterns

### Recommended Component Structure

```text
feature/
├── feature.component.ts
├── feature.component.html
└── feature.component.scss
```

### Component SCSS

Prefer BEM-like naming for custom component classes:

```scss
.product-card {
  &__header {
  }
  &__body {
  }
  &__actions {
  }

  &--featured {
  }
}
```

Avoid deeply nested selectors:

```scss
// Avoid
.page {
  .container {
    .card {
      .header {
        .title {
        }
      }
    }
  }
}
```

Prefer:

```scss
.page-card__title {
}
```

---

## 18. Angular Templates

Prefer modern Angular template syntax.

### Conditions

```html
@if (loading()) {
<app-loading />
} @else {
<app-content />
}
```

### Loops

```html
@for (item of items(); track item.id) {
<app-item [item]="item" />
}
```

Do not use legacy structural directives in new code unless compatibility requires them.

---

## 19. Angular Signals

Use signals for local reactive state where appropriate.

Example:

```ts
readonly loading = signal(false);
readonly selectedId = signal<number | null>(null);
readonly hasSelection = computed(() => this.selectedId() !== null);
```

Keep presentation state close to the component.

Do not move all local state into a global store.

---

## 20. Forms in Angular

For modern Angular forms, prefer Signal Forms when the project version supports the required API and the feature is already adopted in the codebase.

Keep responsibilities separated:

- Signal Forms: form state and interaction
- Zod: runtime schema validation and external contracts, when adopted
- SCSS/Bootstrap: visual validation states

Example conceptual flow:

```text
Signal Forms
    ↓
form state / touched / dirty / errors

Zod
    ↓
runtime schema / API payload validation

Bootstrap
    ↓
visual field and validation states
```

Do not replace Angular form state management with Zod alone.

---

## 21. Icons

Use the icon library already adopted by the project.

Rules:

- Do not mix several icon libraries on the same screen.
- Keep icon sizes consistent.
- Pair icons with accessible labels when meaning is not obvious.
- Avoid decorative icons that add visual noise.

For icon-only controls:

```html
<button
  type="button"
  class="btn btn-icon"
  aria-label="Excluir item"
>
  <i class="..."></i>
</button>
```

---

## 22. Tables and Dense Data

Tables should prioritize readability over decorative styling.

Recommended:

- Bootstrap `.table`
- Responsive wrapper
- Clear header hierarchy
- Subtle row dividers
- Optional hover state
- Right alignment for numeric values when appropriate
- Roboto Mono for identifiers or technical values only when it improves scanning

Example:

```html
<div class="table-responsive">
  <table class="table align-middle"></table>
</div>
```

---

## 23. Empty, Loading and Error States

Every data-driven screen should consider:

- Loading
- Empty
- Error
- Success
- Partial data if applicable

### Loading

Prefer skeletons for content-heavy views and spinners for short blocking actions.

### Empty State

Include:

- Clear title
- Short explanation
- Optional CTA when the user can resolve the empty state

### Error State

Use semantic danger colors and actionable text.

Do not display raw backend exception messages directly to the end user.

---

## 24. Animation and Motion

Motion should be subtle and functional.

Recommended duration:

```text
150ms–250ms
```

Recommended easing:

```css
ease
ease-in-out
```

Use animation for:

- Hover feedback
- Expand/collapse
- Modal/offcanvas transitions
- Small state transitions

Avoid:

- Large parallax effects
- Excessive bounce
- Long entrance animations
- Motion that delays user interaction

---

## 25. Visual Consistency Rules

Always prefer existing tokens and components.

### Do

```scss
color: var(--primary);
border-color: var(--stroke-2);
background: var(--background);
border-radius: 12px;
```

### Avoid

```scss
color: #211b16;
border-color: #e8e1d5;
background: #f9f5ef;
border-radius: 13px;
```

Even visually similar values should not be introduced if a project token already covers the use case.

---

## 26. New Component Decision Order

When creating or redesigning a component, use this priority:

1. Reuse an existing project component
2. Reuse Bootstrap component/utility
3. Compose existing design tokens
4. Create a new local component style
5. Add a new global token only when it is truly reusable

Do not create a new global abstraction for a single use case.

---

## 27. Design Review Checklist

Before considering a component complete, verify:

- Uses project color tokens
- Uses Roboto typography correctly
- Uses 12px default radius where applicable
- Uses Bootstrap grid/utilities where appropriate
- Works on mobile
- Has visible focus states
- Has hover states only where interaction exists
- Does not introduce arbitrary colors
- Does not duplicate an existing Bootstrap utility
- Does not use excessive `!important`
- Handles loading/empty/error states when data-driven
- Keeps component SCSS scoped and readable
- Uses semantic HTML
- Meets keyboard accessibility expectations

---

## 28. Rules for AI-Generated UI

When generating UI for this project, follow these instructions strictly.

### Design Language

Use:

> "Warm minimalist interface using deep warm charcoal, warm ivory backgrounds, subtle ochre accents, clean white surfaces, Roboto typography, 12px rounded corners, restrained shadows, and Bootstrap-based responsive structure."

### Colors

Always reference existing project colors:

- Primary: `#1f1a15`
- Secondary: `#1f1a15`
- Tertiary: `#ab6b00`
- Accent: `#ffe7b6`
- Background: `#f7f3ec`
- Strong stroke: `#4a423a`
- Soft stroke: `#e6dfd2`
- Success: `#01600c`
- Danger: `#991b1b`
- Info: `#1e40af`

Do not invent another palette unless explicitly requested.

### Typography

Always use:

- Roboto for primary UI
- Roboto Mono for technical/monospaced content
- Roboto Serif only for selective editorial contrast

Do not substitute Manrope, Inter, Poppins, Montserrat, or other fonts unless explicitly requested.

### Radius

Default:

> "12px rounded corners"

### Shadows

Use:

> "Restrained soft shadow only for interactive elevation or overlays"

Do not use heavy floating-card aesthetics.

### Layout

Use:

> "Bootstrap is the primary responsiveness system. Build layouts mobile-first with Bootstrap containers, grid, breakpoints, responsive display/flex utilities and spacing utilities. Use custom media queries only when Bootstrap cannot represent the required component behavior cleanly."

Use:

> "Bootstrap responsive grid and utilities, mobile-first, with consistent 8px-based spacing."

---

## 29. AI Prompt Examples

### Dashboard Card

> Create a responsive Angular dashboard card using Bootstrap. Use a white surface, 1px `#e6dfd2` border, 12px rounded corners, Roboto typography, dark `#1f1a15` title text, and restrained hover elevation. Reuse Bootstrap spacing utilities and keep custom SCSS minimal.

### Form

> Create an Angular form using Bootstrap form controls and the project design tokens. Inputs must have white backgrounds, 12px corners, subtle borders, accessible labels, strong keyboard focus, and validation states integrated with Angular form state. Use Roboto and the existing primary color `#1f1a15`.

### List Page

> Create a clean responsive Angular list page with a Bootstrap container, toolbar, filters, content cards or table, and loading/empty/error states. Use warm ivory `#f7f3ec` as the page background, white content surfaces, `#1f1a15` for primary actions, `#ab6b00` only as a restrained secondary accent, and 12px corners.

### Modal

> Create a Bootstrap-compatible Angular modal with a white surface, 12px radius, clear title hierarchy, concise actions, visible focus states, and restrained shadow. Primary action uses `#1f1a15`; secondary action uses outline styling.

---

## 30. Incremental Iteration

When refining an existing screen:

1. Change one component or concern at a time.
2. Reuse current design tokens.
3. Preserve Bootstrap compatibility.
4. Avoid broad visual rewrites without explicit approval.
5. Do not introduce a new visual language for a single feature.
6. Keep responsive behavior intact.
7. Validate desktop and mobile states.
8. Keep accessibility intact after visual changes.

Examples:

- "Reduce card padding from 32px to 24px."
- "Use `stroke-2` instead of a custom gray border."
- "Replace the custom grid with Bootstrap `row g-4`."
- "Change the primary CTA to `btn-primary`."
- "Use 12px radius consistently across cards and form controls."

---

## 31. Recommended Global SCSS Organization

```text
styles/
├── _variables.scss
├── _bootstrap.scss
├── _fonts.scss
├── _root.scss
├── _base.scss
└── styles.scss
```

### `_variables.scss`

Contains all SCSS tokens.

### `_bootstrap.scss`

Contains Bootstrap variable overrides and imports Bootstrap.

### `_fonts.scss`

Contains all `@font-face` declarations.

### `_root.scss`

Exposes CSS custom properties.

### `_base.scss`

Contains app-wide element defaults.

Example:

```scss
body {
  margin: 0;
  font-family: var(--font-primary);
  color: var(--primary);
  background: var(--background);
}
```

### `styles.scss`

Only composes global partials:

```scss
@use './styles/fonts';
@use './styles/root';
@use './styles/bootstrap';
@use './styles/base';
```

Adapt exact paths to the workspace structure.

---

## 32. Recommended Base Styles

```scss
html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: var(--font-primary);
  color: var(--primary);
  background-color: var(--background);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
}

button,
input,
select,
textarea {
  font: inherit;
}
```

---

## 33. Final Design Principle

The project should look like **one coherent application**, not a collection of independently styled features.

Every new UI decision should first answer:

> Can this be implemented with an existing Bootstrap primitive and an existing project design token?

If yes, reuse them.

The design language is defined by:

- `#1f1a15` dark warm primary
- `#f7f3ec` warm ivory background
- `#ab6b00` restrained ochre accent
- `#ffe7b6` pale accent surface
- Roboto typography
- 12px default radius
- Soft structural borders
- Minimal elevation
- Bootstrap-based responsive layout
- Bootstrap as the primary responsiveness tool
- Custom media queries only as an exception
- Angular-first component architecture
- Consistent, reusable SCSS tokens

Consistency is more important than introducing new visual effects.
