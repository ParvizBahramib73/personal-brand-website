# Architecture & clean-code conventions

This site is deliberately small. Prefer **clarity over abstraction** and avoid introducing a backend, CMS, complex state management or design framework until there is a confirmed need.

## Responsibilities

- `src/lib/site.ts`: verified identity, social URLs, supported locales and route helpers
- `src/content/profile.ts`: roles, dates, known technologies and named projects
- `src/content/messages.ts`: user-facing English and Persian wording
- `src/lib/seo.ts`: metadata and JSON-LD for search engines
- `src/components/minimal-landing.tsx`: homepage presentation only
- `src/components/profile-page.tsx`: professional details composed from small sections
- `src/styles`: CSS design tokens and page-specific selectors
- `src/app`: thin framework route wrappers (params validation, metadata, composition)

## Change checklist

1. **Factual accuracy**: never invent employers, dates, metrics, project details or public links.
2. **Localization**: every content change must work for `en` and `fa`, with RTL verified on mobile.
3. **Components**: make each component do one presentational job; avoid over-generalizing tiny components.
4. **Types**: use strict TypeScript; avoid `any`, unchecked casts and non-null assertions.
5. **Accessibility**: preserve one `h1` per page, semantic landmarks, alt text, keyboard navigation and sufficient contrast.
6. **SEO**: preserve canonical, hreflang, OG metadata, JSON-LD, sitemap and static export.
7. **Performance**: do not introduce client-side JavaScript for static content; use lightweight images and CSS.
8. **Safety**: never commit tokens, secrets, confidential work details or unverified image rights.
9. **Verification**: run `npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build` before merging.
10. **Delivery**: use a reviewed pull request and confirm the GitHub Pages deployment is green.

## Source-of-truth notes

`site.url` is the public GitHub Pages **project URL**; `site.basePath` is the Next.js route base path. Use `localePath` with Next.js `Link` because Next applies the configured basePath; use `assetPath` only for literal static public assets.

Dark mode is controlled by `prefers-color-scheme` via CSS tokens, not by Javascript or a separate widget.

Only verified project **names** appear publicly. Add case-study pages after confirming each project's problem, individual contribution and shareable screenshots/links.

## Known platform constraint

With GitHub Pages we use Next.js static export (`output: "export"`). Server runtime features such as API routes, email backend actions and ISR cannot run here. Contact is via direct mailto. A future form needs an external service or different hosting setup.

No codebase can claim universal adherence to every subjective "clean code" rule; review and evolving tests are part of maintaining quality.
