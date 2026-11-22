# Parviz Bahrami — Personal Brand Website

Bilingual (English and Persian) editorial personal brand website for Parviz Bahrami, Senior Front-end Developer.

## Included

- English default at `/en`, Persian RTL at `/fa`
- Responsive editorial landing page: hero, about, career timeline, skills, project index, education, interests, and contact
- Verified contact links (LinkedIn, GitHub, email, phone)
- Structured editable content under `src/lib/site.ts` and `src/lib/copy.ts`
- Per-locale metadata, Open Graph image, sitemap and robots route
- GitHub Actions workflow for typechecking and build

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Open http://localhost:3000 (redirects to /en).

## Deploy to Vercel

1. In Vercel choose **Add New Project** and import this GitHub repository.
2. Set the framework to Next.js, and deploy after the feature PR is merged.
3. Once Vercel assigns the project's actual `*.vercel.app` URL, set `NEXT_PUBLIC_SITE_URL` to that exact HTTPS URL in Vercel environment settings, then redeploy to generate correct canonical and social-sharing URLs.
4. A custom domain may be connected later; no domain is required to start.

**GitHub stores the source; Vercel hosts the Next.js website.** GitHub Pages is not configured for this dynamic Next.js deployment.

## Content updates

- Name, professional title, public contact, job history, skills and project names: `src/lib/site.ts`
- English and natural Persian text: `src/lib/copy.ts`
- Styling: `src/app/globals.css`
- Metadata: `src/app/[lang]/layout.tsx`

Professional project details and links are deliberately withheld until provided. There is no invented work metric, testimonial, employer, demo or screenshot.

## Open items before full launch

- Confirm whether the Front-end Team Lead role continues after the originally documented period (Feb 2021 onwards)
- Supply a real profile portrait with permission to publish
- Supply a reviewed PDF resume before enabling a download CTA
- Supply project-specific descriptions, public screenshots, contribution details and links
- Confirm whether publicly displaying the supplied phone number is desirable
- Set up Vercel project and verify production URL, preview card, browser accessibility and mobile RTL
- A full contact form is intentionally not enabled; currently the reliable contact route is a direct `mailto:` link. A secure form needs a configured backend/mail service and anti-spam controls.

## Status

Feature implementation committed for review. GitHub CI is configured, but a passing CI build and deployment have **not yet been verified**.
