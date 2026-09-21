import { ArrowUpRight, BarChart3, BrainCircuit, Code2, Download, Github, Linkedin, Mail, MapPin, Menu, Sparkles } from 'lucide-react';

const projects = [
  { title: 'Credit Bridge', type: 'Financial Analytics', text: 'Credit-risk assessment and decisioning platform with solvency scoring, DSCR diagnostics, and financial-health signals.', tags: ['Python', 'Risk analytics', 'Decisioning'], url: 'https://github.com/ATR1285/Credit-Bridge' },
  { title: 'OptiPrice AI', type: 'Machine Learning', text: 'Dynamic pricing engine that models demand, price elasticity, and competitor signals to recommend optimal prices.', tags: ['ML', 'Forecasting', 'Revenue'], url: 'https://github.com/ATR1285/OptiPrice-AI' },
  { title: 'Customer Churn Intelligence', type: 'Business Analytics', text: 'Retention framework that surfaces churn drivers through LTV cohorts, predictive classification, and intervention playbooks.', tags: ['Power BI', 'Cohorts', 'Classification'], url: 'https://github.com/ATR1285/Customer-Churn-Analytics-Retention-Intelligence-System' },
  { title: 'AI Payment Agent', type: 'Fintech & GenAI', text: 'Automated receivables agent for prioritising past-due accounts, routing reminders, and reconciling payment ledgers.', tags: ['GenAI', 'Automation', 'Fintech'], url: 'https://github.com/ATR1285/AI-AGENT----PAYMENT-' },
];
const tools = ['SQL', 'Python', 'Power BI', 'Tableau', 'scikit-learn', 'XGBoost', 'FastAPI', 'Docker', 'Git', 'REST APIs'];

export default function App() {
  return <div>
    <header className="nav"><a className="brand" href="#top">Richard<span> A T</span></a><nav><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav><a className="nav-cta" href="mailto:richardat125@gmail.com">Let’s talk <ArrowUpRight size={16}/></a><button className="menu" aria-label="Open menu"><Menu size={22}/></button></header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={15}/> DATA ANALYST · ML PRACTITIONER</p><h1>Turning complex data<br/>into <em>clear decisions.</em></h1><p className="lead">I design analytical systems, predictive models, and executive-ready dashboards that make the next best move obvious.</p><div className="hero-actions"><a className="button primary" href="#work">Explore selected work <ArrowUpRight size={18}/></a><a className="button ghost" href="https://github.com/ATR1285" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a></div></div>
        <div className="hero-art" aria-label="Data analysis visualisation"><div className="orb orb-a"/><div className="orb orb-b"/><div className="data-card top-card"><span>MODEL CONFIDENCE</span><strong>94.7%</strong><div className="meter"><i/></div></div><div className="data-card graph-card"><span>DECISION SIGNALS</span><div className="bars"><i/><i/><i/><i/><i/><i/></div><b>↑ 28.4% <small>vs. prior period</small></b></div><div className="portrait"><div className="avatar">RA</div><p>Richard A. T.</p><small>Data & AI</small></div></div>
      </section>
      <section className="ticker"><span>ANALYTICS</span><i/> <span>MACHINE LEARNING</span><i/> <span>BUSINESS INTELLIGENCE</span><i/> <span>INTELLIGENT AUTOMATION</span><i/></section>
      <section className="about section" id="about">
        <p className="section-label">01 / ABOUT</p>
        <div className="about-inner">
          <h2>Built to bridge<br/>data <em>and decisions.</em></h2>
          <div className="about-layout">
            <div className="about-profile-card">
              <div className="about-avatar-lg">RA</div>
              <p className="about-name">Richard A T</p>
              <p className="about-role">Data &amp; AI Professional</p>
              <div className="about-tags">
                <span>Data Analytics</span>
                <span>Machine Learning</span>
                <span>Business Intelligence</span>
                <span>GenAI</span>
              </div>
            </div>
            <div className="about-text">
              <p>I'm Richard A T — a data professional who turns messy, fragmented datasets into reliable systems that drive real business outcomes. From credit-risk models to pricing engines and executive dashboards, I build work that's verifiable, understandable, and immediately useful.</p>
              <p>My background spans analytics, machine learning, and business intelligence — giving me the rare ability to move fluently from raw SQL pipelines all the way to stakeholder-ready visual intelligence.</p>
              <div className="about-values">
                <div className="about-value">
                  <strong>Rigour</strong>
                  <span>Every insight is reproducible and fully traceable to the data.</span>
                </div>
                <div className="about-value">
                  <strong>Clarity</strong>
                  <span>Complex models translated into plain, actionable language.</span>
                </div>
                <div className="about-value">
                  <strong>Impact</strong>
                  <span>Analysis that makes the next best move obvious.</span>
                </div>
              </div>
              <a className="button primary about-cta" href="#contact">Start a conversation <ArrowUpRight size={18}/></a>
            </div>
          </div>
        </div>
      </section>
      <section className="work section" id="work"><div className="section-head"><div><p className="section-label">02 / SELECTED WORK</p><h2>Proof in the <em>projects.</em></h2></div><a className="text-link" href="https://github.com/ATR1285" target="_blank" rel="noreferrer">View all repositories <ArrowUpRight size={16}/></a></div><div className="project-grid">{projects.map((p, i) => <a className={'project project-'+i} href={p.url} target="_blank" rel="noreferrer" key={p.title}><div className="project-visual"><span>{String(i + 1).padStart(2, '0')}</span>{i === 0 && <BarChart3/>}{i === 1 && <BrainCircuit/>}{i === 2 && <Code2/>}{i === 3 && <Sparkles/>}</div><div className="project-info"><p>{p.type}</p><h3>{p.title} <ArrowUpRight size={18}/></h3><span>{p.text}</span><div>{p.tags.map(t => <b key={t}>{t}</b>)}</div></div></a>)}</div></section>
      <section className="numbers"><div><strong>20<span>+</span></strong><p>Repositories<br/>and experiments</p></div><div><strong>4</strong><p>Core disciplines:<br/>data, BI, ML, engineering</p></div><div><strong>1</strong><p>Focus: creating<br/>useful intelligence</p></div></section>
      <section className="capabilities section"><p className="section-label">03 / TOOLKIT</p><div><h2>From the query<br/>to the <em>outcome.</em></h2><div className="tool-list">{tools.map((tool, i) => <span key={tool}><b>{String(i + 1).padStart(2, '0')}</b>{tool}</span>)}</div></div></section>
      <section className="contact" id="contact"><p className="eyebrow"><Sparkles size={15}/> OPEN TO NEW OPPORTUNITIES</p><h2>Have a data challenge<br/>worth solving?</h2><a href="mailto:richardat125@gmail.com">Let’s make it useful <ArrowUpRight size={24}/></a><div className="contact-meta"><span><MapPin size={15}/> Global remote / hybrid</span><span><Mail size={15}/> richardat125@gmail.com</span></div></section>
    </main>
    <footer><a className="brand" href="#top">Richard<span> A T</span></a><p>© 2026 Richard A. T. Built around data, decisions, and momentum.</p><div><a href="https://linkedin.com/in/richard-a-t" aria-label="LinkedIn"><Linkedin size={18}/></a><a href="https://github.com/ATR1285" aria-label="GitHub"><Github size={18}/></a></div></footer>
  </div>;
}
