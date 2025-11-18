<!--
Guidance for automated coding agents working on this repository.
Keep this file concise and focused on discoverable, actionable project specifics.
-->

# Copilot / AI agent instructions — khang2107.github.io

Purpose: help an AI coding agent become productive quickly. Focus on the static portfolio site in this repo and the small JS/CSS patterns used.

-   Project type: Single-page static portfolio built with plain HTML, CSS, and vanilla JavaScript. No build system, package manager, or tests in the repo.
-   Key files:
    -   `index.html` — single-page structure, navigation anchor links, sections: home, about, skills, projects, experience, resume, contact. Uses `css/main.css` (modular CSS architecture).
    -   `js/script.js` — all interactive behaviour: dark mode toggle, mobile nav with optimized animations, smooth scrolling, form handling, image loading optimization, IntersectionObserver for lazy loading.
    -   `css/main.css` — **Entry point** that imports modular CSS following ITCSS methodology (Settings → Base → Layout → Components → Pages → Utilities).
    -   `css/` structure:
        -   `base/` — variables.css (design tokens), reset.css, typography.css, images.css (loading optimization)
        -   `layout/` — container.css, sections.css, footer.css
        -   `components/` — navigation.css, buttons.css, modals.css, cards.css, forms.css
        -   `pages/` — hero.css, about.css, skills.css, achievements.css, projects.css, experience.css, resume.css, contact.css
        -   `utilities/` — animations.css, responsive.css
    -   `image/` — media assets referenced by `index.html` (photos, project thumbnails).

What to change and how

-   Make minimal, localized edits. Prefer small, atomic PRs that modify only the files required for the feature/bugfix.
-   **CSS Architecture**: Modular ITCSS structure. Edit the appropriate file:
    -   Design tokens (colors, shadows, transitions) → `css/base/variables.css`
    -   Component styles (buttons, nav, modals) → `css/components/*.css`
    -   Page-specific styles → `css/pages/*.css`
    -   Responsive breakpoints → `css/utilities/responsive.css`
    -   Never edit `css/style-backup.css` or `css/style-original.css.bak` (legacy backups)
-   Preserve CSS custom properties pattern: add variables to `css/base/variables.css` in both `:root` and `body.dark-mode` sections.
-   When modifying JavaScript, keep all behaviour in `js/script.js` unless adding a new widget that warrants an adjacent file under `js/`. Keep code ES6+, avoid frameworks/polyfills.
-   Do not introduce a build step or package manager unless the user explicitly requests it.

Conventions & patterns to follow

-   **Dark mode**: toggled by adding/removing `dark-mode` on `body`:
    -   Single `#darkModeToggle` button in nav menu switches icon between `fa-moon` and `fa-sun`
    -   Theme persisted in `localStorage` as `theme: "dark"` or `theme: "light"`
    -   On toggle, `updateNavbarColors()` adjusts navbar glassmorphism background immediately
-   **Navigation**: 
    -   Mobile: hamburger (`#navToggle`) toggles `.active` class on `#navMenu` for full-screen overlay
    -   Desktop: inline horizontal nav menu with glassmorphism (`backdrop-filter: saturate(180%) blur(20px)`)
    -   Close button (`#navClose`) and `.nav-link` clicks remove `.active` to close menu
    -   Scroll handler updates navbar background opacity and box-shadow at 100px threshold
    -   Active section highlighting uses `requestAnimationFrame` throttling for performance
-   **Performance patterns**:
    -   Image loading: `loading="eager"` for above-fold, `loading="lazy"` for below-fold
    -   IntersectionObserver with `rootMargin: "100px"` for lazy images
    -   Shimmer loading animation in `css/base/images.css` (`.achievement-item::before`)
    -   Preloading critical resources in `<head>` (CSS, hero image)
-   **Animations**: IntersectionObserver is used for reveal animations. Prefer reusing the existing observer logic or adding new selectors observed in `js/script.js`.
-   **Contact form**: submits to Web3Forms API. Form handler in `js/script.js` uses `fetch()` with async/await, shows loading state during submission, resets form on success. Error handling logs to console and shows user-friendly alerts.

Common tasks and examples

-   **Add a new section**: edit `index.html` to add the section's markup and add a link in the navigation with class "nav-link" that points to the section's fragment. Add new styles to appropriate file in `css/pages/`. Add small JS in `js/script.js` only if required for animation or interaction.

-   **Modify component styling**: 
    -   Buttons → `css/components/buttons.css`
    -   Navigation → `css/components/navigation.css`
    -   Modals → `css/components/modals.css`

-   **Add responsive breakpoint**: Edit `css/utilities/responsive.css`, which contains all `@media` queries organized by screen size.

-   **Modify colors/theme**: Edit `css/base/variables.css`, updating both `:root` (light mode) and `body.dark-mode` (dark mode).

Example: add a small CTA modal

-   HTML: add modal markup near the end of `index.html` (hidden by default).
-   CSS: add modal styles to `css/components/modals.css`, reusing variables like `--bg-primary`, `--shadow-lg`.
-   JS: add event listeners in `js/script.js` to toggle the modal's visibility and `aria-hidden`. Follow existing toggle patterns (e.g. `requestAnimationFrame(() => element.classList.toggle('active'))`).

Example: optimize Experience section for large screens

-   CSS: Edit `css/pages/experience.css` for base styles, then add responsive overrides in `css/utilities/responsive.css` using breakpoints like `@media (min-width: 1401px)`.
-   Pattern: Mobile-first base styles (max-width: 1000px timeline), progressively enhanced for large (1401px - max-width: 1200px) and ultra-wide (1601px+ - max-width: 1400px) screens.

Deployment & External Dependencies

-   **Hosting**: GitHub Pages (static site) with custom domain `khang.me` (defined in `CNAME`)
-   **Contact form**: Uses Web3Forms API (external service) — form submits to their endpoint asynchronously
-   **External resources**: Font Awesome 6.4.0 (CDN), Google Fonts (Inter family)
-   **No build process**: Changes pushed to `main` branch deploy automatically via GitHub Pages

Safety and repository rules

-   This is a public personal portfolio. Do not add analytics, tracking, or any remote telemetry without explicit instruction.
-   Do not commit any secrets, keys, or binary large files. Image assets are okay if small and directly relevant.

Testing and verification

-   Manual verification is appropriate: open `index.html` in a browser (or use Live Server) and confirm:
    -   Navigation links scroll and highlight correctly.
    -   Dark mode toggles and persists via `localStorage`.
    -   Mobile menu opens/closes and the close button works.
    -   Contact form shows the existing alert and resets.

What not to change

-   Do not introduce frameworks (React, Angular, etc.) or major tooling (webpack, npm) without direction.
-   Do not reorganise CSS into different preprocessors.

If unsure / missing info

-   Ask the repo owner whether they want a build step, test harness, or CI before adding one.
-   If you plan to add external services (contact form backend, analytics), request the integration details and preferred provider first.

Files to reference while coding

-   `index.html` — structure and anchor ids
-   `js/script.js` — behaviour and event targets
-   `css/main.css` — import order and architecture overview
-   `css/base/variables.css` — design tokens (colors, shadows, transitions)
-   `css/utilities/responsive.css` — all breakpoints and mobile optimizations
-   `css/components/navigation.css` — navbar and menu patterns
-   `css/pages/*.css` — section-specific styles (hero, about, skills, etc.)

CSS Architecture Quick Reference

-   **ITCSS layers** (low to high specificity): Settings → Base → Layout → Components → Pages → Utilities
-   **Finding styles**: Use grep to search: `grep -r ".my-class" css/` or check specific layer folder
-   **Import order matters**: Variables must load before components; responsive utilities load last
-   **Performance**: GPU-accelerated animations (`transform`, `opacity`), reduced blur on mobile, lazy loading with IntersectionObserver

After making changes

-   Create a short PR description: one-sentence summary, files changed, and verification steps (manual browser checks). Keep commits small and focused.

If you have suggestions for larger improvements (tests, build, CI), list them as a separate RFC-style PR and do not bundle them with small UI/UX fixes.
