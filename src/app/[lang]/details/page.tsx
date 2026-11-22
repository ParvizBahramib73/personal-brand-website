import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfilePage } from "@/components/profile-page";
import { isLocale } from "@/lib/site";
import { jsonLd, pageMetadata, structuredProfile } from "@/lib/seo";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, "details") : {};
}

export default async function DetailsPage({ params }: PageParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredProfile(lang, "details")) }}
      />
      <ProfilePage lang={lang} />
    </>
  );
}
