<!--
Guidance for automated coding agents working on this repository.
Keep this file concise and focused on discoverable, actionable project specifics.
-->

# Copilot / AI agent instructions — khang2107.github.io

Purpose: help an AI coding agent become productive quickly. Focus on the static portfolio site in this repo and the small JS/CSS patterns used.

-   Project type: Single-page static portfolio built with plain HTML, CSS, and vanilla JavaScript. No build system, package manager, or tests in the repo.
-   Key files:
    -   `index.html` — single-page structure, navigation anchor links, sections: home, about, skills, projects, experience, resume, contact.
    -   `js/script.js` — all interactive behaviour: dark mode toggle, mobile nav, smooth scrolling, form handling (client-only), simple animations.
    -   `css/style.css` — global styles, dark-mode variables, responsive breakpoints and design system variables in `:root`.
    -   `image/` — media assets referenced by `index.html` (photos, project thumbnails).

What to change and how

-   Make minimal, localized edits. Prefer small, atomic PRs that modify only the files required for the feature/bugfix (usually `index.html`, `js/script.js`, and/or `css/style.css`).
-   Preserve the existing responsive classes, CSS custom properties, and the dark-mode variable pattern (body.dark-mode). When adding styles, add variables to `:root` and their dark-mode counterparts in `body.dark-mode`.
-   When modifying JavaScript, keep all behaviour in `js/script.js` unless adding a new widget that warrants an adjacent file under `js/`. Keep code ES6+, avoid frameworks/polyfills.
-   Do not introduce a build step or package manager unless the user explicitly requests it.

Conventions & patterns to follow

-   Dark mode: toggled by adding/removing `dark-mode` on `body`; icons switch between `fa-moon` and `fa-sun` in `js/script.js`. Use CSS custom properties to adapt colours.
-   Navigation: mobile menu toggles `nav-menu` class `active`; the hamburger button gets `active`. When altering markup, maintain `id` attributes used by `js/script.js` (e.g. `navToggle`, `navMenu`, `navClose`, `navLink`, `darkModeToggle`).
-   Animations: IntersectionObserver is used for reveal animations. Prefer reusing the existing observer logic or adding new selectors observed in `js/script.js`.
-   Contact form: client-only. The form currently prevents default submit and shows an alert. If implementing a backend integration, keep the current UX (reset and success message) and ensure no new third-party keys are committed.

Common tasks and examples

-   Add a new section: edit `index.html` to add the section's markup and add a link in the navigation with class "nav-link" that points to the section's fragment. Add any new styles to `css/style.css` and small JS in `js/script.js` only if required for animation or interaction.

Example: add a small CTA modal

-   HTML: add modal markup near the end of `index.html` (hidden by default).
-   CSS: add a `.modal` block to `css/style.css` and reuse variables like `--bg-primary`.
-   JS: add event listeners in `js/script.js` to toggle the modal's visibility and `aria-hidden`. Follow existing toggle patterns (e.g. toggling `classList` on elements).

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
-   `css/style.css` — design tokens, variables, breakpoints

After making changes

-   Create a short PR description: one-sentence summary, files changed, and verification steps (manual browser checks). Keep commits small and focused.

If you have suggestions for larger improvements (tests, build, CI), list them as a separate RFC-style PR and do not bundle them with small UI/UX fixes.
