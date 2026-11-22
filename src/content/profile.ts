import type { Locale } from "@/lib/site";

export type Translated = Readonly<Record<Locale, string>>;

export type Employment = Readonly<{
  id: string;
  organization: string;
  position: Translated;
  period: Translated;
}>;

/** Dates and names are owner-provided. Do not assume current employment. */
export const experience = [
  {
    id: "jumbula-lead",
    organization: "Jumbula",
    position: {
      en: "Front-end Team Lead (Angular)",
      fa: "سرپرست تیم فرانت‌اند (Angular)",
    },
    period: {
      en: "Feb 2021 – End date not confirmed",
      fa: "فوریه ۲۰۲۱ – تاریخ پایان تأیید نشده",
    },
  },
  {
    id: "jumbula-developer",
    organization: "Jumbula",
    position: {
      en: "Front-end Angular Developer",
      fa: "توسعه‌دهنده فرانت‌اند Angular",
    },
    period: {
      en: "Nov 2020 – Feb 2021",
      fa: "نوامبر ۲۰۲۰ – فوریه ۲۰۲۱",
    },
  },
  {
    id: "freelance",
    organization: "Freelance",
    position: {
      en: "Front-end Developer",
      fa: "توسعه‌دهنده مستقل فرانت‌اند",
    },
    period: {
      en: "Jul 2015 – Jul 2019",
      fa: "ژوئیه ۲۰۱۵ – ژوئیه ۲۰۱۹",
    },
  },
] as const satisfies readonly Employment[];

export const coreSkills = [
  "Angular",
  "TypeScript",
  "JavaScript",
  "RxJS",
  "NgRx",
  "SCSS",
  "AG Grid",
  "Cypress",
] as const;

/** Names only: do not fabricate links, ownership claims, outcomes or case studies. */
export const selectedProjects = [
  "Jumbula Dashboard",
  "Jumbula Marketplace",
  "Jumbula Widget",
  "FamilyHub",
] as const;
