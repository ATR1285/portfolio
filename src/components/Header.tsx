import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
}

const navItems = [
  { id: 'about', label: '01 ABOUT' },
  { id: 'skills', label: '02 SKILLS' },
  { id: 'methodology', label: '03 METHODOLOGY' },
  { id: 'projects', label: '04 PROJECTS' },
  { id: 'experience', label: '05 EXPERIENCE' },
  { id: 'education', label: '06 EDUCATION' },
  { id: 'certifications', label: '07 CERTIFICATIONS' },
  { id: 'contact', label: '08 CONTACT' },
];

export default function Header({ activeSection = 'hero' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header-bar" role="banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
          <a href="#hero" className="serif-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-light)', letterSpacing: '0.02em' }}>
            Richard A T
          </a>
          <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
            / DATA &amp; AI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop mono-tag" aria-label="Primary Navigation" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="#contact"
            className="mono-tag"
            style={{
              fontSize: '11px',
              padding: '6px 14px',
              borderRadius: '2px',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            HIRE ME ↗
          </a>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-light)',
              padding: '6px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-menu" role="dialog" aria-modal="true">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="serif-display" style={{ fontSize: '20px', color: 'var(--text-light)' }}>
              Richard A T
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`${import.meta.env.BASE_URL}Richard_AT_Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              DOWNLOAD RESUME ↗
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
