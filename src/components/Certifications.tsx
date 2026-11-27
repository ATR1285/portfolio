import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Reveal from './motion/Reveal';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';

interface CertItem {
  id: string;
  num: string;
  title: string;
  issuer: string;
  date: string;
  filename: string;
  category: string;
}

const certData: CertItem[] = [
  {
    id: 'cert-1',
    num: '01',
    title: 'Essentials of Excel: SNS',
    issuer: 'Analytics Vidhya',
    date: 'November 23, 2025',
    filename: 'cert-1',
    category: 'SPREADSHEET MODELING',
  },
  {
    id: 'cert-2',
    num: '02',
    title: 'The Complete Power BI Blueprint: SNS',
    issuer: 'Analytics Vidhya',
    date: 'January 21, 2026',
    filename: 'cert-2',
    category: 'BUSINESS INTELLIGENCE',
  },
  {
    id: 'cert-3',
    num: '03',
    title: 'Data Analysis using SQL: SNS',
    issuer: 'Analytics Vidhya',
    date: 'February 10, 2026',
    filename: 'cert-3',
    category: 'DATABASE QUERYING',
  },
  {
    id: 'cert-4',
    num: '04',
    title: 'Introduction to Python: SNS',
    issuer: 'Analytics Vidhya',
    date: 'February 28, 2026',
    filename: 'cert-4',
    category: 'PROGRAMMING FOUNDATIONS',
  },
  {
    id: 'cert-5',
    num: '05',
    title: 'Python for Data Science: SNS',
    issuer: 'Analytics Vidhya',
    date: 'March 11, 2026',
    filename: 'cert-5',
    category: 'DATA SCIENCE ECOSYSTEM',
  },
  {
    id: 'cert-6',
    num: '06',
    title: 'EDA & Statistics for Data Science: SNS',
    issuer: 'Analytics Vidhya',
    date: 'March 13, 2026',
    filename: 'cert-6',
    category: 'STATISTICAL INFERENCE',
  },
  {
    id: 'cert-7',
    num: '07',
    title: 'Building your First ML Model: SNS',
    issuer: 'Analytics Vidhya',
    date: 'March 14, 2026',
    filename: 'cert-7',
    category: 'APPLIED MACHINE LEARNING',
  },
  {
    id: 'cert-8',
    num: '08',
    title: 'Foundational ML Algorithms I: SNS',
    issuer: 'Analytics Vidhya',
    date: 'March 19, 2026',
    filename: 'cert-8',
    category: 'SUPERVISED CLASSIFICATION',
  },
  {
    id: 'cert-9',
    num: '09',
    title: 'Foundational ML Algorithms II: SNS',
    issuer: 'Analytics Vidhya',
    date: 'March 23, 2026',
    filename: 'cert-9',
    category: 'ADVANCED ALGORITHMS',
  },
];

const additionalCredentials = [
  {
    title: 'AWS Academy Cloud Foundations',
    subtitle: 'Cloud Architecture & Services',
    issuer: 'AWS Academy',
    focus: 'Cloud infrastructure, compute services, IAM security policies, storage architectures, and global networking.',
  },
  {
    title: 'Introducing SAP Business Data Cloud',
    subtitle: 'Enterprise Data Warehousing',
    issuer: 'SAP',
    focus: 'Enterprise data fabric, semantic modeling, unified data warehousing, and governed analytical data pipelines.',
  },
  {
    title: 'Discovering SAP IBP Foundation',
    subtitle: 'Integrated Business Planning',
    issuer: 'SAP',
    focus: 'Sales & operations planning (S&OP), supply chain demand sensing, inventory buffer balancing, and scenario modeling.',
  },
];

export default function Certifications() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveTriggerRef = useRef<HTMLElement | null>(null);

  const getWebpUrl = (baseName: string) => `${import.meta.env.BASE_URL}certs/${baseName}.webp`;
  const getJpgUrl = (baseName: string) => `${import.meta.env.BASE_URL}certs/${baseName}.jpg`;

  const handleOpen = (idx: number, e: React.MouseEvent | React.KeyboardEvent) => {
    lastActiveTriggerRef.current = e.currentTarget as HTMLElement;
    setSelectedIdx(idx);
  };

  const handleClose = () => {
    setSelectedIdx(null);
  };

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % certData.length);
    }
  };

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + certData.length) % certData.length);
    }
  };

  // Keyboard navigation, focus trapping, initial focus, and scroll lock
  useEffect(() => {
    if (selectedIdx === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      lastActiveTriggerRef.current?.focus();
    };
  }, [selectedIdx]);

  return (
    <section id="certifications" className="surface-light section-editorial" aria-labelledby="certifications-heading">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                07 / CERTIFICATIONS &amp; CREDENTIALS
              </span>
              <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
                VERIFIED CREDENTIALS
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--accent)" />
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                9 VERIFIED CERTIFICATES · CLICK TO ENLARGE
              </span>
            </div>
          </div>

          <div style={{ maxWidth: '680px', marginBottom: '44px' }}>
            <h2
              id="certifications-heading"
              className="serif-display"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
            >
              Analytics Vidhya <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Specialisation Series.</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#555555', marginTop: '12px', lineHeight: 1.6 }}>
              A progressive curriculum across relational SQL engineering, exploratory data analysis, applied statistical modeling, and foundational machine learning architectures.
            </p>
          </div>
        </Reveal>

        {/* 9 Certificate Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {certData.map((c, i) => (
            <Reveal key={c.id} direction="up" delay={prefersReduced ? 0 : i * 0.05}>
              <TiltCard
                maxTilt={3}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: '2px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(23, 25, 28, 0.04)',
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Open certificate details for ${c.title}`}
                  onClick={(e) => handleOpen(i, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpen(i, e);
                    }
                  }}
                  style={{ outline: 'none' }}
                  className="cert-trigger-btn"
                >
                  {/* Thumbnail Picture Container */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      backgroundColor: 'var(--bg-surface)',
                      aspectRatio: '1.414 / 1',
                      marginBottom: '14px',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <picture>
                      <source srcSet={getWebpUrl(c.filename)} type="image/webp" />
                      <img
                        src={getJpgUrl(c.filename)}
                        alt={`Certificate preview: ${c.title}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          display: 'block',
                          transition: prefersReduced ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </picture>

                    {/* Step Number Tag */}
                    <span
                      className="mono-tag"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        fontSize: '9px',
                        backgroundColor: '#17191C',
                        color: 'var(--text-light)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontWeight: 600,
                      }}
                    >
                      {c.num}
                    </span>
                  </div>

                  {/* Category & Title */}
                  <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {c.issuer.toUpperCase()} · {c.category}
                  </span>
                  <h3 className="serif-display" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: '8px' }}>
                    {c.title}
                  </h3>
                </div>

                {/* Card Footer: Date & View Action */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    marginTop: '12px',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
                    {c.date}
                  </span>
                  <button
                    onClick={(e) => handleOpen(i, e)}
                    aria-label={`Enlarge ${c.title} certificate`}
                    className="mono-tag"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '2px 4px',
                    }}
                  >
                    ENLARGE <ArrowUpRight size={13} />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Additional Technical Credentials (AWS & SAP) */}
        <Reveal direction="up" delay={0.15}>
          <div style={{ marginTop: '56px', paddingTop: '36px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Award size={15} color="var(--accent)" />
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>
                ADDITIONAL TECHNICAL CREDENTIALS &amp; INDUSTRY FOUNDATIONS
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {additionalCredentials.map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-light)',
                    padding: '20px',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    boxShadow: '0 2px 12px rgba(23, 25, 28, 0.03)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
                        {item.issuer}
                      </span>
                      <span className="mono-tag" style={{ fontSize: '9px', color: 'var(--accent-subtle)' }}>
                        VERIFIED FOUNDATION
                      </span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)', display: 'block', marginBottom: '10px' }}>
                      {item.subtitle}
                    </span>

                    <p style={{ fontSize: '12.5px', color: '#555555', lineHeight: 1.55, margin: 0 }}>
                      {item.focus}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="var(--accent)" />
                    <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                      CURRICULUM COMPLETED &amp; RECOGNIZED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Accessible Interactive Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            aria-describedby="cert-modal-desc"
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(23, 25, 28, 0.92)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <motion.div
              ref={modalRef}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                borderRadius: '2px',
                width: '100%',
                maxWidth: '920px',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7)',
                padding: '24px',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid var(--border-dark)',
                  paddingBottom: '16px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
                      {certData[selectedIdx].issuer.toUpperCase()} · {certData[selectedIdx].category}
                    </span>
                    <span style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-dark)' }} />
                    <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                      RECORD {certData[selectedIdx].num} / 09
                    </span>
                  </div>

                  <h3
                    id="cert-modal-title"
                    className="serif-display"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--text-light)', margin: '0 0 4px 0' }}
                  >
                    {certData[selectedIdx].title}
                  </h3>

                  <p id="cert-modal-desc" style={{ fontSize: '12px', color: 'var(--accent-subtle)', margin: 0 }} className="mono-tag">
                    Verified Completion Date: {certData[selectedIdx].date}
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close certificate lightbox"
                  className="mono-tag modal-action-btn"
                  style={{
                    backgroundColor: '#17191C',
                    border: '1px solid var(--border-dark)',
                    color: 'var(--border-light)',
                    padding: '8px 14px',
                    fontSize: '11px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-dark)')}
                >
                  CLOSE [ESC] <X size={14} />
                </button>
              </div>

              {/* Certificate Image Viewer */}
              <div
                style={{
                  backgroundColor: '#111315',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flex: 1,
                  maxHeight: '62vh',
                  padding: '12px',
                }}
              >
                <picture>
                  <source srcSet={getWebpUrl(certData[selectedIdx].filename)} type="image/webp" />
                  <img
                    src={getJpgUrl(certData[selectedIdx].filename)}
                    alt={`Full certificate display for ${certData[selectedIdx].title}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      borderRadius: '2px',
                      display: 'block',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  />
                </picture>
              </div>

              {/* Modal Footer Controls */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  marginTop: '16px',
                  borderTop: '1px solid var(--border-dark)',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Navigate to previous certificate (Left Arrow)"
                  className="mono-tag modal-action-btn"
                  style={{
                    backgroundColor: '#17191C',
                    border: '1px solid var(--border-dark)',
                    color: 'var(--text-light)',
                    padding: '8px 16px',
                    fontSize: '11px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-dark)')}
                >
                  <ChevronLeft size={14} /> PREVIOUS [←]
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={14} color="var(--accent)" />
                  <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
                    CERTIFICATE {selectedIdx + 1} OF {certData.length} · VERIFIED CREDENTIAL
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Navigate to next certificate (Right Arrow)"
                  className="mono-tag modal-action-btn"
                  style={{
                    backgroundColor: '#17191C',
                    border: '1px solid var(--border-dark)',
                    color: 'var(--text-light)',
                    padding: '8px 16px',
                    fontSize: '11px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-dark)')}
                >
                  NEXT [→] <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
