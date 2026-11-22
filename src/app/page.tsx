import type { Metadata } from "next";
import { MinimalLanding } from "@/components/minimal-landing";
import { localePath, site } from "@/lib/site";
import { jsonLd, pageMetadata, structuredProfile } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata("en", "home"),
  alternates: {
    canonical: \`\${site.url}/\`,
    languages: {
      en: \`\${site.url}\${localePath("en")}\`,
      fa: \`\${site.url}\${localePath("fa")}\`,
      "x-default": \`\${site.url}/\`,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredProfile("en", "home")) }}
      />
      <MinimalLanding lang="en" />
    </>
  );
}
