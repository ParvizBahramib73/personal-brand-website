import type { Metadata } from "next";
import { localePath, site, type Locale, type Section } from "@/lib/site";

export const origin = new URL(site.url).origin;
export const base = site.url;
export type PageKind = Section;

type SearchCopy = { title: string; description: string };

const searchCopy = {
  en: {
    home: {
      title: "Parviz Bahrami | Senior Front-end Developer & Angular Engineer",
      description:
        "Meet Parviz Bahrami, a senior front-end developer focused on Angular, TypeScript, web application architecture, team collaboration and thoughtful digital products.",
    },
    details: {
      title: "About Parviz Bahrami | Angular, Experience & Projects",
      description:
        "Explore Parviz Bahrami's front-end engineering experience at Jumbula, Angular and TypeScript skills, professional projects, education and contact details.",
    },
  },
  fa: {
    home: {
      title: "پرویز بهرامی | توسعه‌دهنده ارشد فرانت‌اند و متخصص Angular",
      description:
        "وب‌سایت شخصی پرویز بهرامی؛ توسعه‌دهنده ارشد فرانت‌اند با تمرکز بر Angular، TypeScript، طراحی رابط کاربری، معماری نرم‌افزار و محصولات دیجیتال.",
    },
    details: {
      title: "درباره پرویز بهرامی | سوابق کاری، مهارت‌ها و پروژه‌ها",
      description:
        "آشنایی با سوابق حرفه‌ای پرویز بهرامی در Jumbula، تجربه توسعه Angular، مهارت‌های فرانت‌اند، پروژه‌ها، تحصیلات و راه‌های ارتباطی.",
    },
  },
} as const satisfies Record<Locale, Record<PageKind, SearchCopy>>;

export function pageUrl(locale: Locale, page: PageKind): string {
  return `${site.url}${localePath(locale, page)}`;
}

export function pageMetadata(locale: Locale, page: PageKind): Metadata {
  const { title, description } = searchCopy[locale][page];
  const imageUrl = `${site.url}/${locale}/opengraph-image.png`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    applicationName: site.name.en,
    authors: [{ name: site.name.en, url: pageUrl("en", "home") }],
    creator: site.name.en,
    publisher: site.name.en,
    alternates: {
      canonical: pageUrl(locale, page),
      languages: {
        en: pageUrl("en", page),
        fa: pageUrl("fa", page),
        "x-default": page === "home" ? `${site.url}/` : pageUrl("en", "details"),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      url: pageUrl(locale, page),
      siteName: site.name.en,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: [locale === "fa" ? "en_US" : "fa_IR"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name[locale]} — ${site.title[locale]}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function structuredProfile(locale: Locale, page: PageKind) {
  const url = pageUrl(locale, page);
  const personId = `${site.url}/#person`;
  const person = {
    "@type": "Person",
    "@id": personId,
    name: site.name.en,
    alternateName: site.name.fa,
    url: `${site.url}/`,
    jobTitle: site.title[locale],
    description: searchCopy[locale][page].description,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    knowsAbout: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "Front-end Development",
      "Web Applications",
      "RxJS",
      "NgRx",
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Malayer University" },
    image: `${site.url}/parviz-photo.svg`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name.en,
        inLanguage: ["en", "fa"],
        publisher: { "@id": personId },
      },
      person,
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: searchCopy[locale][page].title,
        description: searchCopy[locale][page].description,
        inLanguage: locale,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${site.url}/#website` },
      },
    ],
  };
}

/** Keep untrusted strings from breaking out of the JSON-LD script element. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
