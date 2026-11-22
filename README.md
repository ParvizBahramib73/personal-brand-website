# Parviz Bahrami — Personal Website

A minimal bilingual portfolio for a senior front-end developer. Built with **Next.js 15**, **TypeScript** and plain CSS, statically hosted on **GitHub Pages**.

## Run locally

Requirements: Node.js 22+

```sh
npm ci
npm run dev
```

The default entry route is `/`, and translated routes are `/en/` and `/fa/`. Career details are at `/en/details/` and `/fa/details/`.

## Quality checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Format code with `npm run format`. GitHub Actions runs the checks on pull requests and before deployment.

## Folder structure

| Folder           | Responsibility                                  |
| ---------------- | ----------------------------------------------- |
| `src/app`        | Next.js routes, static metadata and sitemap     |
| `src/components` | Small presentational components                 |
| `src/content`    | Verified professional facts and translated copy |
| `src/lib`        | Shared routing and SEO helpers                  |
| `src/styles`     | Theme tokens, base, landing and profile styles  |
| `tests`          | Routing, translation and SEO regression tests   |

The current live photo is the owner's **original photograph**. No AI-generated portrait replaces it.

## Publish

The site exports static HTML to `out/`, then the workflow `.github/workflows/deploy-pages.yml` deploys it to GitHub Pages from `master`. The base path is `/personal-brand-website`.

Production: https://parvizbahramib73.github.io/personal-brand-website/

For content changes, edit `src/content/profile.ts` (verified facts) or `src/content/messages.ts` (English/Persian wording). For domain changes, update `src/lib/site.ts`, `next.config.ts` and SEO URLs.

See [Architecture and maintenance](docs/ARCHITECTURE.md) and [SEO notes](docs/SEO.md).

Do not add fabricated projects, achievements, employment claims or published article URLs. Project names intentionally have no invented case studies.
