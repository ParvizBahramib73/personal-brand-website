# Bilingual Search Visibility: SEO & AI Search

## Pages and intent

| URL            | Intent                                                      | Language        |
| -------------- | ----------------------------------------------------------- | --------------- |
| `/`            | Canonical neutral homepage / international entry            | English default |
| `/en/`         | Personal introduction and quick profile                     | English         |
| `/fa/`         | معرفی شخصی                                                  | Persian         |
| `/en/details/` | Professional background, Angular work, experience, projects | English         |
| `/fa/details/` | سوابق، مهارت‌های Angular و پروژه‌ها                         | Persian         |

Each page has a self-referencing canonical URL, except no invented regional targeting. Both language versions point to each other using reciprocal hreflang annotations; `x-default` points to the general entry (or English details). The XML sitemap lists all five URLs and these alternates.

## Implemented

- Distinct human-readable English and Persian titles/descriptions for home and details pages
- Canonical URLs and alternate language URLs
- Schema.org `Person`, `ProfilePage` and `WebSite` JSON-LD using confirmed personal details
- Real LinkedIn and GitHub `sameAs` identifiers
- Descriptive Open Graph and social sharing metadata
- Sitemap and robots routes compatible with Next.js static export on GitHub Pages
- Existing server-rendered HTML copy and visible cross-page links

### Content integrity

No fabricated certifications, employer dates, case studies, customer testimonials, project metrics or nonexistent articles. Avoid unverified `Review`, `FAQPage`, `AggregateRating` and `JobPosting` markup. Structured data must correspond to visible content. Employment status for Jumbula is intentionally unconfirmed.

## Search Console onboarding (site owner action)

1. Open https://search.google.com/search-console and verify **URL-prefix property** `https://parvizbahramib73.github.io/personal-brand-website/` (not a domain property for github.io). GitHub Pages cannot control apex github.io DNS.
2. Prefer HTML file verification if available: download the exact Google verification file and add it to `public/` at the expected URL. **Do not invent** a verification token or copy a token from another site.
3. After a successful deployment, submit `https://parvizbahramib73.github.io/personal-brand-website/sitemap.xml`.
4. Use URL Inspection for homepage, English profile, Persian profile, and both details pages; request indexing where appropriate.
5. Review indexing and Core Web Vitals reports, search impressions, queries, CTR and affected landing pages. Ranking is not guaranteed.

## Suggested measurement

Track branded queries (`Parviz Bahrami`, `پرویز بهرامی`) separately from service/skill queries (`Angular front-end developer`, `توسعه‌دهنده Angular`). Use organic clicks/impressions, index coverage, referral sources and performance rather than blanket promises of a #1 position.

## AI search discoverability

Google says its AI Overviews and AI Mode use fundamental Google indexing/search eligibility, not a special new markup requirement. Keep factual content, identity links and professional work evidence clear and easily accessible.

A supported crawler (such as OAI-SearchBot) should be able to request the public pages if GitHub Pages exposes them without authentication and robots rules allow crawling. Being crawlable does **not** guarantee inclusion, citations or any ranking in an AI answer.

For genuine improvement, expand 2–4 **verified** project case studies containing problem, contribution, technical decisions, trade-offs and outcomes that can be supported. Publishing first-person technical notes in both languages is more valuable than generating many thin, near-duplicate SEO pages.

## QA checklist after deployment

- Fetch all five public URLs and confirm HTTP 200 plus expected language-specific HTML
- Inspect source for appropriate title, description, canonical, hreflang and JSON-LD
- Verify `/sitemap.xml` and `/robots.txt` return 200
- Validate JSON-LD with https://validator.schema.org/ and Google Rich Results Test; some valid schema may not qualify for Google rich results
- Inspect Open Graph images and test social sharing
- Test mobile layouts, Persian RTL, contrast, and navigation
- Run Lighthouse and track LCP, CLS, INP on real devices

## Future work

- Confirm final employment status and publish accurate, relevant content updates
- Add reviewed public project case studies, screenshots and distinct project URLs
- Add reviewed writing section only once genuine articles exist
- Move to a custom domain when ready, with 301 redirects, sitemap/canonical/hreflang updates and Search Console re-verification
- Connect analytics or Search Console metrics for informed improvements

**No implementation can promise first place in Google or AI answers.** Search position varies by query, searcher, competitors and algorithms.
