import type { Metadata } from "next";
import { site, type Locale } from "@/lib/site";

export const origin = "https://parvizbahramib73.github.io";
export const base = site.url;
export type PageKind = "home" | "details";
const copy = {
 en: {
  home: {
   title: "Parviz Bahrami | Senior Front-end Developer & Angular Engineer",
   description: "Meet Parviz Bahrami, a senior front-end developer focused on Angular, TypeScript, web application architecture, team collaboration and thoughtful digital products.",
  },
  details: {
   title: "About Parviz Bahrami | Angular, Experience & Projects",
   description: "Explore Parviz Bahrami's front-end engineering experience at Jumbula, Angular and TypeScript skills, professional projects, education and contact details.",
  }
 },
 fa: {
  home: {
   title: "پرویز بهرامی | توسعه‌دهنده ارشد فرانت‌اند و متخصص Angular",
   description: "وب‌سایت شخصی پرویز بهرامی؛ توسعه‌دهنده ارشد فرانت‌اند با تمرکز بر Angular، TypeScript، طراحی رابط کاربری، معماری نرم‌افزار و محصولات دیجیتال.",
  },
  details: {
   title: "درباره پرویز بهرامی | سوابق کاری، مهارت‌ها و پروژه‌ها",
   description: "آشنایی با سوابق حرفه‌ای پرویز بهرامی در Jumbula، تجربه توسعه Angular، مهارت‌های فرانت‌اند، پروژه‌ها، تحصیلات و راه‌های ارتباطی.",
  }
 }
} as const;
export function pageUrl(lang: Locale, kind: PageKind) {
 return `${base}/${lang}/${kind === "details" ? "details/" : ""}`;
}
export function pageMetadata(lang: Locale, kind: PageKind): Metadata {
 const {title,description} = copy[lang][kind];
 const url = pageUrl(lang,kind);
 const image = `${base}/${lang}/opengraph-image.png`;
 return {
  metadataBase: new URL(origin),
  title, description,
  applicationName: "Parviz Bahrami",
  authors: [{name: "Parviz Bahrami", url: base + "/en/"}],
  creator: "Parviz Bahrami",
  publisher: "Parviz Bahrami",
  alternates: {
   canonical: url,
   languages: {
    en: pageUrl("en",kind),
    fa: pageUrl("fa",kind),
    "x-default": kind === "home" ? base + "/" : pageUrl("en","details"),
   },
  },
  robots: {index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph: {
   type:"profile", title,description,url,
   siteName:"Parviz Bahrami",locale:lang === "fa"?"fa_IR":"en_US",
   alternateLocale:[lang==="fa"?"en_US":"fa_IR"],
   images:[{url:image,width:1200,height:630,alt:lang==="fa"?"پرویز بهرامی، توسعه‌دهنده ارشد فرانت‌اند":"Parviz Bahrami, Senior Front-end Developer"}]
  },
  twitter:{card:"summary_large_image",title,description,images:[image]},
 };
}
export function structuredProfile(lang:Locale, kind:PageKind) {
 const url = pageUrl(lang,kind);
 const personId = base + "/#person";
 const person = {
  "@type":"Person",
  "@id":personId,
  name:"Parviz Bahrami",
  alternateName:"پرویز بهرامی",
  url:base + "/",
  jobTitle:lang==="fa"?"توسعه‌دهنده ارشد فرانت‌اند":"Senior Front-end Developer",
  description:copy[lang][kind].description,
  email:"mailto:"+site.email,
  sameAs:[site.linkedin,site.github],
  knowsAbout:["Angular","TypeScript","JavaScript","Front-end Development","Web Applications","RxJS","NgRx"],
  alumniOf:{"@type":"CollegeOrUniversity",name:"Malayer University"},
  image:base+"/parviz-photo.svg",
 };
 const page = {
  "@type":"ProfilePage",
  "@id":url+"#webpage",
  url,
  name:copy[lang][kind].title,
  description:copy[lang][kind].description,
  inLanguage:lang,
  mainEntity:{"@id":personId},
  isPartOf:{"@id":base+"/#website"},
 };
 return {"@context":"https://schema.org","@graph":[
  {"@type":"WebSite","@id":base+"/#website",url:base+"/",name:"Parviz Bahrami",inLanguage:["en","fa"],publisher:{"@id":personId}},
  person,page
 ]};
}
export function jsonLd(data:unknown){return JSON.stringify(data).replace(/</g,"\\u003c");}
