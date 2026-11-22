import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { BinaryBackground } from "@/components/binary-background";
import { messages } from "@/content/messages";
import { alternateLocale, assetPath, localePath, site, type Locale } from "@/lib/site";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Intentionally sparse landing; detailed career content belongs on /details/. */
export function MinimalLanding({ lang }: { lang: Locale }) {
  const nextLocale = alternateLocale(lang);
  const t = messages[lang].home;

  return (
    <main className="minimal-page" lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <BinaryBackground />
      <Link
        className="minimal-language"
        href={localePath(nextLocale)}
        hrefLang={nextLocale}
        aria-label={t.languageLabel}
      >
        {nextLocale.toUpperCase()}
      </Link>

      <div className="minimal-center">
        <Image
          className="minimal-portrait"
          src={assetPath("parviz-photo.svg")}
          width={180}
          height={180}
          alt={t.portraitAlt}
          priority
          unoptimized
        />
        <h1>{site.name[lang]}</h1>
        <p className="minimal-role">{t.role}</p>
        <SocialLinks label={t.socialLabel} />
        <Link className="minimal-about" href={localePath(lang, "details")}>
          {t.about} <ArrowIcon />
        </Link>
      </div>
    </main>
  );
}
