<!--
Guidance for automated coding agents working on this repository.
Keep this file concise and focused on discoverable, actionable project specifics.
-->

# Copilot / AI agent instructions — khang2107.github.io

Purpose: help an AI coding agent become productive quickly. Focus on the static portfolio site in this repo and the small JS/CSS patterns used.

-   Project type: Single-page static portfolio built with plain HTML, CSS, and vanilla JavaScript. No build system, package manager, or tests in the repo.
-   Key files:
    -   `index.html` — single-page structure, navigation anchor links, sections: home, about, skills, projects, experience, resume, contact. Uses `css/main.css` (modular CSS architecture).
    -   `js/script.js` — all interactive behaviour: dark mode toggle (dual buttons for mobile/desktop), mobile nav with optimized animations, smooth scrolling, form handling (client-only), image loading optimization, IntersectionObserver for lazy loading.
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

-   **Dark mode**: toggled by adding/removing `dark-mode` on `body`; two toggle buttons exist:
    -   `#darkModeToggle` — visible on mobile next to hamburger (in `.nav-controls`)
    -   `#darkModeToggleMenu` — visible on desktop in nav menu
    -   Both buttons sync icons between `fa-moon` and `fa-sun`, controlled by `toggleDarkMode()` function in `js/script.js`
    -   Theme persisted in `localStorage` as `theme: "dark"` or `theme: "light"`
-   **Navigation**: 
    -   Mobile: hamburger menu (`#navToggle`) opens full-screen overlay (`#navMenu.active`)
    -   Uses `requestAnimationFrame` for smooth 60fps animations
    -   Body scroll locked when menu open (`body.style.overflow = "hidden"`)
    -   Performance optimized: GPU acceleration (`transform: translateZ(0)`), reduced blur on mobile (`blur(10px)`), `contain: layout style paint`
    -   Close button (`#navClose`) and nav links auto-close menu via `closeMenu()` function
-   **Performance patterns**:
    -   Image loading: `loading="eager"` for above-fold, `loading="lazy"` for below-fold
    -   IntersectionObserver with `rootMargin: "100px"` for lazy images
    -   Shimmer loading animation in `css/base/images.css` (`.achievement-item::before`)
    -   Preloading critical resources in `<head>` (CSS, hero image)
-   **Animations**: IntersectionObserver is used for reveal animations. Prefer reusing the existing observer logic or adding new selectors observed in `js/script.js`.
-   **Contact form**: client-only. The form currently prevents default submit and shows an alert. If implementing a backend integration, keep the current UX (reset and success message) and ensure no new third-party keys are committed.

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
-   Pattern: Mobile-first base styles, progressively enhanced for tablet (969px-1400px), large (1401px-1920px), and ultra-wide (>1920px) screens.

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
