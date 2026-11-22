import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, site, jobs, type Locale } from "@/lib/site";
import { pageMetadata, structuredProfile, jsonLd } from "@/lib/seo";

const ui = {
 en: {
  back:"Home",switch:"فارسی",eyebrow:"A LITTLE MORE ABOUT ME",
  h1:"Engineering, curiosity, and useful products.",
  intro:"I'm Parviz Bahrami, a senior front-end developer focused on Angular, TypeScript and thoughtful, maintainable web experiences. I enjoy making complex applications simpler for the people who use them.",
  about:"About",aboutText:"My experience spans enterprise interfaces, team collaboration, code reviews and building front-end features for business needs. I'm also exploring AI, automation and product thinking — as interests, not claims of specialist experience.",
  experience:"Experience",experienceNote:"The end date of my latest Jumbula role has not been reconfirmed.",
  stack:"Technologies I work with",projects:"Selected project names",
  projectNote:"Project details and public links will be added once verified.",
  education:"Education",educationText:"B.Sc. in Computer Software Engineering · Malayer University · 2013–2017",
  contact:"Let's connect",contactText:"Have a front-end challenge or an idea worth exploring? I'd be glad to hear about it.",
  email:"Email me",
  projectNames:["Jumbula Dashboard","Jumbula Marketplace","Jumbula Widget","FamilyHub"],
 },
 fa: {
  back:"خانه",switch:"English",eyebrow:"کمی بیشتر درباره من",
  h1:"مهندسی نرم‌افزار، کنجکاوی و ساخت محصول کاربردی.",
  intro:"من پرویز بهرامی هستم، توسعه‌دهنده ارشد فرانت‌اند با تمرکز بر Angular و TypeScript. دوست دارم نرم‌افزارهای پیچیده را به تجربه‌هایی ساده، قابل نگهداری و کاربردی تبدیل کنم.",
  about:"درباره من",aboutText:"در توسعه رابط‌های سازمانی، همکاری تیمی، بازبینی کد و ساخت قابلیت‌های متناسب با نیاز کسب‌وکار تجربه دارم. در کنار این مسیر، هوش مصنوعی، خودکارسازی و تفکر محصول را دنبال می‌کنم؛ به‌عنوان زمینه‌های علاقه و یادگیری.",
  experience:"سوابق حرفه‌ای",experienceNote:"تاریخ پایان آخرین سمت من در Jumbula هنوز دوباره تأیید نشده است.",
  stack:"فناوری‌های اصلی",projects:"چند نام از پروژه‌ها",
  projectNote:"جزئیات و لینک‌های عمومی پروژه‌ها پس از تأیید تکمیل می‌شوند.",
  education:"تحصیلات",educationText:"کارشناسی مهندسی نرم‌افزار کامپیوتر · دانشگاه ملایر · ۲۰۱۳ تا ۲۰۱۷",
  contact:"در ارتباط باشیم",contactText:"برای یک چالش فرانت‌اند یا ایده‌ای که ارزش بررسی دارد، خوشحال می‌شوم گفت‌وگو کنیم.",
  email:"ارسال ایمیل",
  projectNames:["Jumbula Dashboard","Jumbula Marketplace","Jumbula Widget","FamilyHub"],
 },
} as const;

export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;
 return isLocale(lang)?pageMetadata(lang,"details"):{};
}

export default async function Details({params}:{params:Promise<{lang:string}>}){
 const {lang}=await params;
 if(!isLocale(lang))notFound();
 return <Profile lang={lang}/>;
}

function Profile({lang}:{lang:Locale}){
 const t=ui[lang], fa=lang==="fa";
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredProfile(lang,"details"))}}/>
  <div className="profile-page" lang={lang} dir={fa?"rtl":"ltr"}>
   <header className="profile-header">
    <Link href={`/${lang}/`} className="profile-back">← {t.back}</Link>
    <Link href={`/${fa?"en":"fa"}/details/`} hrefLang={fa?"en":"fa"} className="profile-switch">{t.switch}</Link>
   </header>
   <main className="profile-main">
    <div className="profile-opening">
     <p className="profile-eyebrow">{t.eyebrow}</p>
     <h1>{t.h1}</h1>
     <p className="profile-lead">{t.intro}</p>
    </div>
    <section className="profile-section" aria-labelledby="profile-about"><h2 id="profile-about">{t.about}</h2><p>{t.aboutText}</p></section>
    <section className="profile-section" aria-labelledby="profile-experience">
     <h2 id="profile-experience">{t.experience}</h2>
     <div className="profile-jobs">
     {jobs.map((job,i)=><article key={i} className="profile-job">
      <div><h3>{job.title[lang]}</h3><p className="profile-company">{job.company}</p></div>
      <p className="profile-date">{job.period[lang]}</p>
     </article>)}
     </div>
     <p className="profile-disclaimer">{t.experienceNote}</p>
    </section>
    <section className="profile-section" aria-labelledby="profile-stack">
     <h2 id="profile-stack">{t.stack}</h2>
     <div className="profile-tags">{["Angular","TypeScript","JavaScript","RxJS","NgRx","SCSS","AG Grid","Cypress"].map(x=><span key={x}>{x}</span>)}</div>
    </section>
    <section className="profile-section" aria-labelledby="profile-projects">
     <h2 id="profile-projects">{t.projects}</h2>
     <div className="profile-projects">{t.projectNames.map(name=><span key={name}>{name}</span>)}</div>
     <p className="profile-disclaimer">{t.projectNote}</p>
    </section>
    <section className="profile-section" aria-labelledby="profile-education">
     <h2 id="profile-education">{t.education}</h2><p>{t.educationText}</p>
    </section>
    <section className="profile-section profile-contact" aria-labelledby="profile-contact">
     <h2 id="profile-contact">{t.contact}</h2><p>{t.contactText}</p>
     <div className="profile-links">
      <a href={`mailto:${site.email}`}>{t.email} ↗</a>
      <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
     </div>
    </section>
   </main>
   <footer className="profile-footer">© {new Date().getFullYear()} {site.name[lang]}</footer>
  </div>
 </>;
}
