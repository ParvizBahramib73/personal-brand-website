import Link from "next/link";
import type { ReactNode } from "react";
import { experience, coreSkills, selectedProjects } from "@/content/profile";
import { messages } from "@/content/messages";
import { alternateLocale, localePath, site, type Locale } from "@/lib/site";

function ProfileSection({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={\`profile-section \${className}\`.trim()} aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

function ExperienceList({ lang }: { lang: Locale }) {
  return (
    <div className="profile-jobs">
      {experience.map(({ id, organization, position, period }) => (
        <article key={id} className="profile-job">
          <div>
            <h3>{position[lang]}</h3>
            <p className="profile-company">{organization}</p>
          </div>
          <p className="profile-date">{period[lang]}</p>
        </article>
      ))}
    </div>
  );
}

export function ProfilePage({ lang }: { lang: Locale }) {
  const t = messages[lang].details;
  const other = alternateLocale(lang);

  return (
    <div className="profile-page" lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <a className="skip-link" href="#main-content">
        {lang === "fa" ? "رفتن به محتوا" : "Skip to content"}
      </a>

      <header className="profile-header">
        <Link href={localePath(lang)} className="profile-back">
          {lang === "fa" ? "→" : "←"} {t.back}
        </Link>
        <Link href={localePath(other, "details")} hrefLang={other} className="profile-switch">
          {other === "fa" ? "فارسی" : "English"}
        </Link>
      </header>

      <main id="main-content" className="profile-main">
        <div className="profile-opening">
          <p className="profile-eyebrow">{t.eyebrow}</p>
          <h1>{t.headline}</h1>
          <p className="profile-lead">{t.intro}</p>
        </div>

        <ProfileSection id="profile-about" title={t.aboutHeading}>
          <p>{t.aboutBody}</p>
        </ProfileSection>

        <ProfileSection id="profile-experience" title={t.experienceHeading}>
          <ExperienceList lang={lang} />
          <p className="profile-disclaimer">{t.experienceNote}</p>
        </ProfileSection>

        <ProfileSection id="profile-stack" title={t.skillsHeading}>
          <div className="profile-tags">
            {coreSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection id="profile-projects" title={t.projectsHeading}>
          <div className="profile-projects">
            {selectedProjects.map((project) => (
              <span key={project}>{project}</span>
            ))}
          </div>
          <p className="profile-disclaimer">{t.projectsNote}</p>
        </ProfileSection>

        <ProfileSection id="profile-education" title={t.educationHeading}>
          <p>{t.educationBody}</p>
        </ProfileSection>

        <ProfileSection id="profile-contact" title={t.contactHeading} className="profile-contact">
          <p>{t.contactBody}</p>
          <div className="profile-links">
            <a href={\`mailto:\${site.email}\`}>{t.email} ↗</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </ProfileSection>
      </main>

      <footer className="profile-footer">© {new Date().getFullYear()} {site.name[lang]}</footer>
    </div>
  );
}
