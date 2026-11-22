import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Metadata routes must be explicitly static for Next.js output: "export".
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "fa"] as const).map(lang => ({
    url: `${site.url}/${lang}/`,
    lastModified: new Date("2026-11-22"),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: { en: `${site.url}/en/`, fa: `${site.url}/fa/` } },
  }));
}
