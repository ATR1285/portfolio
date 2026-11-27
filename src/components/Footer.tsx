import React from 'react';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="surface-dark"
      style={{
        borderTop: '1px solid var(--border-dark)',
        paddingTop: '28px',
        paddingBottom: '28px',
        fontSize: '11px'
      }}
    >
      <div
        className="container-editorial mono-tag"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          color: 'var(--accent-subtle)'
        }}
      >
        <span>
          &copy; {new Date().getFullYear()} RICHARD A T · ALL RIGHTS RESERVED
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a
            href="https://github.com/ATR1285"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--border-light)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--border-light)')}
          >
            GITHUB ↗
          </a>
          <a
            href="https://linkedin.com/in/richard-a-t"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--border-light)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--border-light)')}
          >
            LINKEDIN ↗
          </a>
          <a
            href="#hero"
            onClick={scrollToTop}
            style={{ color: 'var(--accent)', transition: 'color 0.2s' }}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
