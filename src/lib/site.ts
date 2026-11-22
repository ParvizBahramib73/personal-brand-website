/**
 * Public identity and routing configuration.
 * Avoid adding information here unless the site owner has verified it.
 */
export const site = {
  basePath: "/personal-brand-website",
  url: "https://parvizbahramib73.github.io/personal-brand-website",
  name: { en: "Parviz Bahrami", fa: "پرویز بهرامی" },
  title: { en: "Senior Front-end Developer", fa: "توسعه‌دهنده ارشد فرانت‌اند" },
  email: "rozbehb73@gmail.com",
  linkedin: "https://www.linkedin.com/in/parviz-bahrami-b9030b123",
  github: "https://github.com/ParvizBahramib73",
} as const;

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export type Section = "home" | "details";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "fa" : "en";
}

/** Next.js Link resolves the configured basePath automatically. */
export function localePath(locale: Locale, section: Section = "home"): string {
  return section === "home" ? \`/\${locale}/\` : \`/\${locale}/details/\`;
}

/** Public assets referenced by plain HTML elements need the Pages basePath. */
export function assetPath(filename: string): string {
  return \`\${site.basePath}/\${filename}\`;
}
