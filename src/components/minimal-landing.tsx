import Link from "next/link";
import {site,type Locale} from "@/lib/site";

const Icons = {
 github:<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.13c-3.1.67-3.75-1.33-3.75-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1 1.53-.8 1.88-1.23-2.48-.29-5.1-1.24-5.1-5.54 0-1.22.44-2.23 1.15-3.02-.11-.29-.5-1.44.11-2.99 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.22 2.7.11 2.99.72.79 1.15 1.8 1.15 3.02 0 4.31-2.62 5.25-5.12 5.53.4.35.75 1.01.75 2.05v3.04c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>,
 linkedin:<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2H3.5C2.67 2 2 2.67 2 3.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5ZM8.06 18.7H4.97V9.34h3.09v9.36ZM6.52 8.06a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm12.18 10.64h-3.08v-4.55c0-1.09-.02-2.48-1.51-2.48-1.51 0-1.74 1.18-1.74 2.4v4.63H9.29V9.34h2.95v1.28h.04a3.23 3.23 0 0 1 2.91-1.6c3.11 0 3.68 2.04 3.68 4.7v4.98h-.17Z"/></svg>,
 email:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.8" y="5" width="18.4" height="14" rx="2"/><path d="m3.6 6.2 8.4 6.8 8.4-6.8"/></svg>,
 arrow:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

export function MinimalLanding({lang}:{lang:Locale}) {
 const fa=lang==="fa";
 return <main className="minimal-page" lang={lang} dir={fa?"rtl":"ltr"}>
   <Link className="minimal-language" href={fa?"/en/":"/fa/"} hrefLang={fa?"en":"fa"}>{fa?"EN":"FA"}</Link>
   <div className="minimal-center">
     <img className="minimal-portrait" src="/personal-brand-website/parviz-photo.svg" width="180" height="180" alt={fa?"عکس پرویز بهرامی":"Parviz Bahrami"} />
     <h1>{site.name[lang]}</h1>
     <p className="minimal-role">{fa?"توسعه‌دهنده ارشد فرانت‌اند":"A Senior Front-end Developer"}</p>
     <nav className="minimal-socials" aria-label={fa?"شبکه‌های اجتماعی و تماس":"Social and contact links"}>
       <a href={site.github} aria-label="GitHub" title="GitHub" target="_blank" rel="noopener noreferrer">{Icons.github}</a>
       <a href={site.linkedin} aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">{Icons.linkedin}</a>
       <a href={`mailto:${site.email}`} aria-label="Email" title="Email">{Icons.email}</a>
     </nav>
     <Link className="minimal-about" href={`/${lang}/details/`}>{fa?"بیشتر درباره من":"More about me"} {Icons.arrow}</Link>
   </div>
 </main>;
}
