import React from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="surface-dark data-grid-bg section-editorial" style={{ paddingTop: 'clamp(80px, 12vw, 120px)', paddingBottom: 'clamp(60px, 8vw, 90px)' }}>
      <div className="container-editorial" style={{ textAlign: 'center' }}>
        
        <span
          className="mono-tag"
          style={{
            fontSize: '11px',
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'block',
            marginBottom: '16px'
          }}
        >
          08 / INITIATE CONVERSATION
        </span>

        <h2
          className="serif-display"
          style={{
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 400,
            color: 'var(--text-light)',
            lineHeight: 1.1,
            marginBottom: '20px'
          }}
        >
          Have a data challenge <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--bg-surface)' }}>
            worth solving?
          </em>
        </h2>

        <p
          style={{
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'var(--border-light)',
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.65
          }}
        >
          Currently available for full-time opportunities, high-impact data analytics roles, and forward-thinking AI/ML positions.
        </p>

        {/* Primary CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <a
            href="mailto:richardat125@gmail.com"
            className="btn-editorial-primary"
            style={{ padding: '16px 36px', fontSize: '12px' }}
          >
            LET&apos;S TALK: richardat125@gmail.com <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Quick Access Channels */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
            maxWidth: '700px',
            margin: '0 auto'
          }}
        >
          <a
            href="mailto:richardat125@gmail.com"
            className="btn-editorial-ghost-dark"
            style={{ fontSize: '11px', padding: '10px 18px' }}
          >
            <Mail size={14} /> Email
          </a>
          <a
            href={`${import.meta.env.BASE_URL}Richard_AT_Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-ghost-dark"
            style={{ fontSize: '11px', padding: '10px 18px' }}
          >
            <Download size={14} /> Download Resume
          </a>
          <a
            href="https://linkedin.com/in/richard-a-t"
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-ghost-dark"
            style={{ fontSize: '11px', padding: '10px 18px' }}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <a
            href="https://github.com/ATR1285"
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-ghost-dark"
            style={{ fontSize: '11px', padding: '10px 18px' }}
          >
            <Github size={14} /> GitHub (20+ Repos)
          </a>
        </div>

      </div>
    </section>
  );
}
