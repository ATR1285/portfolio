import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { ArrowUpRight, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, X } from 'lucide-react';
import { useReveal } from './useReveal';

const EMAIL = 'richardat125@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/richard-a-t';
const GITHUB = 'https://github.com/ATR1285';

const nav = [
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Skills', 'skills'],
  ['Experience', 'experience'],
  ['Education', 'education'],
] as const;

const projects = [
  {
    title: 'CareerPilot AI',
    type: 'Generative AI application',
    text: 'Career guidance platform that turns a learner’s profile into structured recommendations, skill tracking, assessments and learning roadmaps.',
    points: ['Structured Gemini generation gateway', 'SQLite-backed user and progress state', 'React front end with a FastAPI service layer'],
    stack: ['Python', 'FastAPI', 'React', 'Gemini API', 'SQLite'],
    href: GITHUB,
    label: 'GitHub profile',
  },
  {
    title: 'CreditBridge',
    type: 'Machine learning · Fintech',
    text: 'Credit risk assessment prototype that combines behavioural financial indicators with document information extraction and an XGBoost classifier.',
    points: ['Six behavioural financial indicators as model inputs', 'Gemini-assisted extraction from documents', 'Containerised with Docker'],
    stack: ['Python', 'XGBoost', 'Gemini API', 'FastAPI', 'Docker'],
    href: 'https://github.com/ATR1285/Credit-Bridge',
    label: 'View repository',
  },
  {
    title: 'Customer Churn Analytics',
    type: 'Data analytics · Business intelligence',
    text: 'Exploratory analysis of the IBM Telco Customer Churn dataset to find the behaviours linked to customer retention and present them clearly.',
    points: ['Data cleaning and preparation in Pandas', 'SQL analysis on a SQLite database', 'Visual reporting in Power BI'],
    stack: ['Python', 'SQL', 'SQLite', 'Pandas', 'Power BI'],
    href: 'https://github.com/ATR1285/Customer-Churn-Analytics-Retention-Intelligence-System',
    label: 'View repository',
  },
];

const skills = [
  ['Data and analytics', ['Python', 'SQL', 'Pandas', 'NumPy', 'Excel', 'Power BI', 'EDA', 'Data validation']],
  ['AI and machine learning', ['Scikit-learn', 'XGBoost', 'Classification', 'Model evaluation', 'Gemini API', 'Prompt engineering']],
  ['Development and tools', ['FastAPI', 'REST APIs', 'React', 'TypeScript', 'SQLite', 'MySQL', 'Docker', 'Git and GitHub']],
] as const;

const experience = [
  {
    period: 'Jun 2026 – Oct 2026',
    role: 'XML Intern',
    org: 'Dare On Private Limited',
    place: 'Coimbatore, India',
    bullets: [
      'Validated XML content against project-specific structural and quality requirements.',
      'Found tagging, structural and content inconsistencies and supported their correction.',
      'Maintained task trackers, checklists and technical documentation for delivery.',
    ],
    tags: ['XML', 'JATS', 'Validation', 'Quality control'],
  },
  {
    period: 'Internship',
    role: 'AI/ML Intern',
    org: 'Elewayte',
    place: 'India',
    bullets: [
      'Took part in data collection, cleaning, preprocessing and exploratory analysis.',
      'Supported machine learning workflows and model evaluation.',
      'Documented analytical observations and project work.',
    ],
    tags: ['Python', 'Preprocessing', 'Machine learning'],
  },
];

const education = [
  ['2026 – present', 'MBA, Systems', 'Bharathidasan University, Tiruchirappalli (online)'],
  ['2023 – 2026', 'B.Sc., Computer Technology', 'Dr. SNS Rajalakshmi College of Arts and Science, Coimbatore'],
];

const credentials = [
  ['AWS Academy Graduate', 'Cloud Foundations'],
  ['Data Analytics Job Simulation', 'Deloitte'],
  ['Exploring SAP Platform Capabilities', 'SAP Business Technology Platform'],
  ['Data Analysis Using SQL', 'Analytics Vidhya'],
  ['Python for Data Science', 'Analytics Vidhya'],
  ['The Complete Power BI Blueprint', 'Analytics Vidhya'],
];

type StaggerStyle = CSSProperties & { '--i': number };

function staggerStyle(index: number): StaggerStyle {
  return { '--i': index };
}

function StaggerItem({ index, children }: { index: number; children: ReactNode }) {
  return <div className="stagger-item" style={staggerStyle(index)}>{children}</div>;
}

function updateCardSpotlight(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`);
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  const sectionRef = useReveal<HTMLElement>();
  const headRef = useReveal<HTMLElement>();
  const bodyRef = useReveal<HTMLDivElement>();

  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`} ref={sectionRef}>
      <div className="wrap section-grid">
        <header className="section-head reveal" ref={headRef}>
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        <div className="section-body reveal" ref={bodyRef}>{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useReveal<HTMLElement>();
  const contactContentRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const els = nav.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const updateIndicator = () => {
      const activeLink = navElement.querySelector<HTMLElement>('a.is-active');
      if (!activeLink) return;
      navElement.style.setProperty('--nav-x', `${activeLink.offsetLeft}px`);
      navElement.style.setProperty('--nav-scale', `${activeLink.offsetWidth}`);
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const syncVisibility = () => {
      document.documentElement.classList.toggle('is-hidden', document.hidden);
    };

    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      document.removeEventListener('visibilitychange', syncVisibility);
      document.documentElement.classList.remove('is-hidden');
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-blob ambient-blob-mint" />
        <span className="ambient-blob ambient-blob-violet" />
        <span className="ambient-blob ambient-blob-blue" />
        <span className="ambient-grid" />
      </div>
      <div className="scroll-progress" aria-hidden="true" ref={progressRef} />
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#top" aria-label="Richard A T, home">Richard A T</a>
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="site-nav" ref={navRef} className={open ? 'nav is-open' : 'nav'} aria-label="Main">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a className="btn btn-small" href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <span className="nav-indicator" aria-hidden="true" />
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap">
            <p className="hero-meta hero-load" style={staggerStyle(0)}><MapPin size={14} /> Coimbatore, Tamil Nadu, India</p>
            <h1 className="hero-load" style={staggerStyle(1)}>Richard A T</h1>
            <p className="hero-role hero-load" style={staggerStyle(2)}>Data, machine learning and software</p>
            <p className="hero-text hero-load" style={staggerStyle(3)}>
              Computer Technology graduate building practical projects in data analytics, machine learning and generative AI.
              Looking for entry-level data analyst, ML and operations roles.
            </p>
            <div className="actions hero-load" style={staggerStyle(4)}>
              <a className="btn" href="#projects">View projects</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>Email me</a>
            </div>
            <dl className="facts hero-load" style={staggerStyle(5)}>
              <div><dt>Education</dt><dd>B.Sc. Computer Technology, MBA (Systems) in progress</dd></div>
              <div><dt>Focus</dt><dd>Python, SQL, Power BI, ML, FastAPI</dd></div>
              <div><dt>Experience</dt><dd>XML intern, AI/ML intern</dd></div>
            </dl>
          </div>
        </section>

        <Section id="about" title="About">
          <p className="lead">I like problems where the details matter: clean data, careful validation and software that people can actually use.</p>
          <p>I hold a B.Sc. in Computer Technology from Dr. SNS Rajalakshmi College of Arts and Science and am pursuing an online MBA in Systems at Bharathidasan University.</p>
          <p>My hands-on work covers XML quality validation, data preparation, Python-based analysis, machine learning projects and applications that integrate generative AI. I document what I build and explain it in plain language.</p>
        </Section>

        <Section id="projects" title="Projects" intro="Selected work across generative AI, machine learning and analytics.">
          <div className="stack-list stagger">
            {projects.map((p, index) => (
              <StaggerItem index={index} key={p.title}>
                <article className="card project" onMouseMove={updateCardSpotlight}>
                  <p className="eyebrow">{p.type}</p>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <ul className="points">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                  <ul className="tags" aria-label="Tech stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                  <a className="link" href={p.href} target="_blank" rel="noreferrer">{p.label} <ArrowUpRight size={16} /></a>
                </article>
              </StaggerItem>
            ))}
          </div>
          <p className="more">More repositories on <a className="link" href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a></p>
        </Section>

        <Section id="skills" title="Skills" intro="Practised through projects, coursework and internships.">
          <div className="skill-grid stagger">
            {skills.map(([name, list], index) => (
              <StaggerItem index={index} key={name}>
                <div className="card" onMouseMove={updateCardSpotlight}>
                  <h3>{name}</h3>
                  <ul className="tags">{list.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="stack-list stagger">
            {experience.map((e, index) => (
              <StaggerItem index={index} key={e.role}>
                <article className="card" onMouseMove={updateCardSpotlight}>
                  <div className="row"><h3>{e.role}</h3><span className="muted">{e.period}</span></div>
                  <p className="org">{e.org} <span className="muted">· {e.place}</span></p>
                  <ul className="points">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <ul className="tags">{e.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
              </StaggerItem>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education and certifications">
          <div className="stack-list stagger">
            <StaggerItem index={0}>
              <div className="card" onMouseMove={updateCardSpotlight}>
                <h3 className="icon-title"><GraduationCap size={18} /> Education</h3>
                {education.map(([when, what, where]) => (
                  <div className="edu" key={what}><span className="muted">{when}</span><strong>{what}</strong><span>{where}</span></div>
                ))}
              </div>
            </StaggerItem>
            <StaggerItem index={1}>
              <div className="card" onMouseMove={updateCardSpotlight}>
                <h3>Certifications</h3>
                <ul className="cred stagger">{credentials.map(([t, s], index) => <li key={t} style={staggerStyle(index)}><strong>{t}</strong><span>{s}</span></li>)}</ul>
                <p className="muted small">Also learning: IBM SkillsBuild prompt engineering (in progress) and Databricks data engineering fundamentals.</p>
              </div>
            </StaggerItem>
          </div>
        </Section>

        <section className="section contact" id="contact" aria-labelledby="contact-title" ref={contactSectionRef}>
          <div className="wrap reveal" ref={contactContentRef}>
            <h2 id="contact-title">Get in touch</h2>
            <p className="lead">Open to entry-level roles, collaborations and conversations about data, AI and software.</p>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="actions">
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}><Mail size={16} /> Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Richard A T</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
