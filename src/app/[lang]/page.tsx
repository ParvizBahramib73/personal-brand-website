import Link from "next/link";
import {notFound} from "next/navigation";
import {copy} from "@/lib/copy";
import {isLocale,site,jobs,skills,projectNames} from "@/lib/site";
import type {Locale} from "@/lib/site";

const anchors=["home","about","experience","skills","projects","education","beyond","contact"] as const;
function External({href,children}:{href:string;children:React.ReactNode}){return <a href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;}
function Heading({kicker,title}:{kicker:string;title:string}){return <div className="section-title"><p className="eyebrow">{kicker}</p><h2>{title}</h2></div>;}
function Page({lang}:{lang:Locale}){
 const t=copy[lang],other=lang==="en"?"fa":"en";
 return <>
  <a className="skip-link" href="#main">{t.skip}</a>
  <header className="site-header"><div className="wrap header-inner">
   <Link className="wordmark" href={"/"+lang+"#home"} aria-label={site.name[lang]}>{site.name[lang]}<b>.</b></Link>
   <nav aria-label={lang==="fa"?"فهرست اصلی":"Main navigation"} className="desktop-nav">{anchors.map((id,i)=><a key={id} href={"#"+id}>{t.nav[i]}</a>)}</nav>
   <div className="header-end"><Link className="language" href={"/"+other} hrefLang={other}>{lang==="en"?"FA / فارسی":"EN / English"}</Link><a className="header-contact" href="#contact">{t.contact}<span aria-hidden="true"> ↗</span></a></div>
   </div><nav className="mobile-nav wrap" aria-label={lang==="fa"?"بخش‌های صفحه":"Page sections"}>{anchors.map((id,i)=><a href={"#"+id} key={id}>{t.nav[i]}</a>)}</nav>
  </header>
  <main id="main">
   <section id="home" className="hero wrap">
    <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-mark"/> {t.eyebrow}</p>
     <p className="hero-name">{site.name[lang]} <span>/ {site.title[lang]}</span></p>
     <h1>{t.heroA}<br/><em>{t.heroB}</em></h1><p className="hero-description">{t.heroText}</p>
     <div className="actions"><a className="button solid" href="#projects">{t.seeWork} <span aria-hidden="true">↗</span></a><a className="button outline" href="#contact">{t.contact} <span aria-hidden="true">↗</span></a></div>
     <div className="hero-social"><External href={site.linkedin}>LinkedIn</External><External href={site.github}>GitHub</External><a href={"mailto:"+site.email}>Email ↗</a></div>
    </div>
    <div className="portrait-frame" role="img" aria-label={t.portrait}><div className="portrait-top"><span>PARVIZ / 001</span><span>✳</span></div><div className="portrait-art"><div className="circle circle-1"/><div className="circle circle-2"/><span>PB<span className="period">.</span></span></div><p>{t.portrait}</p><div className="portrait-bottom">ENGINEERING / CURIOSITY / BUILDING</div></div>
   </section>
   <section id="about" className="section wrap two-column"><Heading kicker={t.introLabel} title={t.aboutTitle}/><div className="rich-copy"><p>{t.aboutText}</p><blockquote>“{t.quote}”</blockquote></div></section>
   <section id="experience" className="section section-tint"><div className="wrap two-column"><Heading kicker={t.experienceLabel} title={t.experienceTitle}/><div><p className="helper">{t.experienceNote}</p><div className="timeline">{jobs.map((job,i)=><article className="job" key={i}><div className="job-head"><span className="job-number">0{i+1}</span><span className="job-date">{job.period[lang]}</span></div><h3>{job.title[lang]}</h3><p className="job-company">{job.company}</p><p className="job-description">{job.details[lang]}</p><div className="tags">{job.tech.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></div></div></section>
   <section id="skills" className="section wrap"><Heading kicker={t.skillsLabel} title={t.skillsTitle}/><p className="helper">{t.skillsNote}</p><div className="skills-grid">{skills.map((cat,i)=><article className="skill-group" key={cat.en}><p className="eyebrow">0{i+1}</p><h3>{cat[lang]}</h3><div className="tags">{cat.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></section>
   <section id="projects" className="section section-tint"><div className="wrap"><Heading kicker={t.projectsLabel} title={t.projectsTitle}/><p className="helper">{t.projectsNote}</p><div className="projects-grid">{projectNames.map((name,i)=><article className="project" key={name}><div className="project-visual"><span>{String(i+1).padStart(2,"0")}</span><div className="project-symbol" aria-hidden="true">{["◉","⌁","✳","◇"][i%4]}</div></div><div className="project-copy"><h3>{name}</h3><p>{t.pending}</p></div></article>)}</div></div></section>
   <section id="education" className="section wrap two-column"><Heading kicker={t.educationLabel} title={t.educationTitle}/><div className="education-panel"><span className="education-mark">↗</span><h3>{t.degree}</h3><p>{t.university}</p></div></section>
   <section id="beyond" className="section dark-section"><div className="wrap"><Heading kicker={t.beyondLabel} title={t.beyondTitle}/><p className="beyond-copy">{t.beyondText}</p><div className="interest-list">{t.interests.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}<span aria-hidden="true">↗</span></div>)}</div></div></section>
   <section id="contact" className="section wrap contact-section"><Heading kicker={t.contactLabel} title={t.contactTitle}/><p className="contact-intro">{t.contactText}</p><a className="contact-email" href={"mailto:"+site.email}>{site.email}<span aria-hidden="true">↗</span></a><div className="contact-details"><div><span>{t.call}</span><a href={"tel:"+site.phoneHref} dir="ltr">{site.phone}</a></div><div><span>{t.location}</span><strong>{site.location[lang]}</strong></div><div><span>Connect</span><External href={site.linkedin}>LinkedIn</External> · <External href={site.github}>GitHub</External></div></div></section>
  </main>
  <footer className="footer"><div className="wrap footer-inner"><span>© {new Date().getFullYear()} {site.name[lang]}</span><span>{t.footer}</span><a href="#home" aria-label="Back to top">↑</a></div></footer>
 </>;
}
export default async function Home({params}:{params:Promise<{lang:string}>}){const {lang}=await params;if(!isLocale(lang))notFound();return <Page lang={lang}/>;}
