import Link from "next/link";
import {notFound} from "next/navigation";
import {isLocale,site} from "@/lib/site";

export default async function Home({params}:{params:Promise<{lang:string}>}){
 const {lang}=await params;if(!isLocale(lang))notFound();
 const fa=lang==="fa";
 return <main className="landing" id="main" lang={lang} dir={fa?"rtl":"ltr"}>
  <div className="landing-language"><Link href={fa?"/en":"/fa"} hrefLang={fa?"en":"fa"} aria-label={fa?"Switch to English":"تغییر زبان به فارسی"}>{fa?"EN":"FA"}</Link></div>
  <div className="landing-content">
   <div className="landing-avatar"><img src="/personal-brand-website/portrait.svg" alt={fa?"تصویر پرویز بهرامی":"Portrait of Parviz Bahrami"} width="188" height="188"/></div>
   <p className="landing-intro">{fa?"سلام، من":"Hi, I'm"}</p>
   <h1>{site.name[lang]}<span className="landing-dot">.</span></h1>
   <p className="landing-role">{site.title[lang]}</p>
   <p className="landing-subtitle">{fa?"نرم‌افزار می‌سازم، ایده‌ها را کشف می‌کنم و به آینده فناوری کنجکاوم.":"I build software, explore ideas, and stay curious about what's next."}</p>
   <Link className="landing-more" href={`/${lang}/details/`}>{fa?"بیشتر درباره من":"More about me"} <span aria-hidden="true">↗</span></Link>
   <nav className="landing-links" aria-label={fa?"لینک‌های ارتباطی":"Social links"}>
    <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
    <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    <a href={`mailto:${site.email}`}>Email ↗</a>
   </nav>
  </div>
  <footer className="landing-footer">© {new Date().getFullYear()} {site.name[lang]}<span>{fa?"با کنجکاوی ساخته شده":"Made with curiosity"}</span></footer>
 </main>;
}
