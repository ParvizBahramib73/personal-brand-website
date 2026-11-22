import type { Locale } from "@/lib/site";

/** Presentation strings; facts, URLs and project lists live in typed profile modules. */
type Messages = {
  home: {
    role: string;
    about: string;
    languageLabel: string;
    socialLabel: string;
    portraitAlt: string;
  };
  details: {
    back: string;
    eyebrow: string;
    headline: string;
    intro: string;
    aboutHeading: string;
    aboutBody: string;
    experienceHeading: string;
    experienceNote: string;
    skillsHeading: string;
    projectsHeading: string;
    projectsNote: string;
    educationHeading: string;
    educationBody: string;
    contactHeading: string;
    contactBody: string;
    email: string;
  };
};

export const messages = {
  en: {
    home: {
      role: "A Senior Front-end Developer",
      about: "More about me",
      languageLabel: "Switch to Persian",
      socialLabel: "Social and contact links",
      portraitAlt: "Portrait of Parviz Bahrami",
    },
    details: {
      back: "Home",
      eyebrow: "A LITTLE MORE ABOUT ME",
      headline: "Engineering, curiosity, and useful products.",
      intro:
        "I'm Parviz Bahrami, a senior front-end developer focused on Angular, TypeScript and thoughtful, maintainable web experiences. I enjoy making complex applications simpler for the people who use them.",
      aboutHeading: "About",
      aboutBody:
        "My experience spans enterprise interfaces, team collaboration, code reviews and building front-end features for business needs. I'm also exploring AI, automation and product thinking — as interests, not claims of specialist experience.",
      experienceHeading: "Experience",
      experienceNote:
        "The end date of my latest Jumbula role has not been reconfirmed.",
      skillsHeading: "Technologies I work with",
      projectsHeading: "Selected project names",
      projectsNote: "Project details and public links will be added once verified.",
      educationHeading: "Education",
      educationBody:
        "B.Sc. in Computer Software Engineering · Malayer University · 2013–2017",
      contactHeading: "Let's connect",
      contactBody:
        "Have a front-end challenge or an idea worth exploring? I'd be glad to hear about it.",
      email: "Email me",
    },
  },
  fa: {
    home: {
      role: "توسعه‌دهنده ارشد فرانت‌اند",
      about: "بیشتر درباره من",
      languageLabel: "تغییر زبان به انگلیسی",
      socialLabel: "شبکه‌های اجتماعی و راه‌های ارتباطی",
      portraitAlt: "عکس پرویز بهرامی",
    },
    details: {
      back: "خانه",
      eyebrow: "کمی بیشتر درباره من",
      headline: "مهندسی نرم‌افزار، کنجکاوی و ساخت محصول کاربردی.",
      intro:
        "من پرویز بهرامی هستم، توسعه‌دهنده ارشد فرانت‌اند با تمرکز بر Angular و TypeScript. دوست دارم نرم‌افزارهای پیچیده را به تجربه‌هایی ساده، قابل نگهداری و کاربردی تبدیل کنم.",
      aboutHeading: "درباره من",
      aboutBody:
        "در توسعه رابط‌های سازمانی، همکاری تیمی، بازبینی کد و ساخت قابلیت‌های متناسب با نیاز کسب‌وکار تجربه دارم. در کنار این مسیر، هوش مصنوعی، خودکارسازی و تفکر محصول را دنبال می‌کنم؛ به‌عنوان زمینه‌های علاقه و یادگیری.",
      experienceHeading: "سوابق حرفه‌ای",
      experienceNote:
        "تاریخ پایان آخرین سمت من در Jumbula هنوز دوباره تأیید نشده است.",
      skillsHeading: "فناوری‌های اصلی",
      projectsHeading: "چند نام از پروژه‌ها",
      projectsNote: "جزئیات و لینک‌های عمومی پروژه‌ها پس از تأیید تکمیل می‌شوند.",
      educationHeading: "تحصیلات",
      educationBody:
        "کارشناسی مهندسی نرم‌افزار کامپیوتر · دانشگاه ملایر · ۲۰۱۳ تا ۲۰۱۷",
      contactHeading: "در ارتباط باشیم",
      contactBody:
        "برای یک چالش فرانت‌اند یا ایده‌ای که ارزش بررسی دارد، خوشحال می‌شوم گفت‌وگو کنیم.",
      email: "ارسال ایمیل",
    },
  },
} as const satisfies Record<Locale, Messages>;
