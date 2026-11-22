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

## Deploy to GitHub Pages

1. The site uses Next.js `output: "export"`; the static build is written to `out/`.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Merge the feature pull request into `master` to trigger `.github/workflows/deploy-pages.yml`.
4. Check the **Actions** tab for a successful build and deploy. The intended URL is https://parvizbahramib73.github.io/personal-brand-website/.
5. GitHub Pages availability for a **private** repository depends on the account plan. If Pages cannot be enabled, switch the repository to **Public** under **Settings → General → Danger Zone** before deploying. This makes source history publicly visible. Do not publish private assets or secrets.
6. A custom domain can be configured later; update `src/lib/site.ts` canonical URL and `next.config.ts` `basePath` for that change.

**Hosting is GitHub Pages, not Vercel.** The published site is static; the contact option is a direct email link, not a server-side form.

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
- Enable GitHub Pages Actions and verify live URL, preview card, browser accessibility and mobile RTL
- A full contact form is intentionally not enabled; currently the reliable contact route is a direct `mailto:` link. A secure form needs a configured backend/mail service and anti-spam controls.

## Status

Feature implementation committed for review. GitHub CI is configured, but a passing CI build and deployment have **not yet been verified**.
