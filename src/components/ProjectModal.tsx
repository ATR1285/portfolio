import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';
import ProjectArchitectureVisualizer from './ProjectArchitectureVisualizer';
import { useReducedMotion } from '../motion/useReducedMotion';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const prefersReduced = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Capture active element before opening, restore upon closing
  useEffect(() => {
    if (project) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
    }
  }, [project]);

  // Handle ESC key, focus trap, and background scroll locking
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the initial interactive element inside modal
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;

        // Select all focusable interactive elements
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus to triggering control
      lastFocusedElementRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="lightbox-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(23, 25, 28, 0.88)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        aria-describedby="modal-project-desc"
      >
        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: 'var(--card-dark)',
            border: '1px solid var(--border-dark)',
            borderRadius: '2px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-dark)',
              backgroundColor: '#17191C',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="serif-display" style={{ fontSize: '18px', color: 'var(--accent)' }}>
                {project.num}
              </span>
              <span style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-dark)' }} />
              <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                {project.category} · ARCHITECTURAL CASE STUDY
              </span>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close Case Study Modal"
              className="modal-action-btn"
              style={{
                background: 'none',
                border: '1px solid var(--border-dark)',
                borderRadius: '2px',
                color: 'var(--text-light)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-dark)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div
            style={{
              padding: '28px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Title & Short Description */}
            <div>
              <h2
                id="modal-project-title"
                className="serif-display"
                style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 600, color: 'var(--text-light)', marginBottom: '8px' }}
              >
                {project.title}
              </h2>
              <p
                id="modal-project-desc"
                style={{ fontSize: '15px', color: 'var(--border-light)', lineHeight: 1.6 }}
              >
                {project.shortDesc}
              </p>
            </div>

            {/* Problem & Approach Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#17191C',
                  border: '1px solid var(--border-dark)',
                  padding: '18px',
                  borderRadius: '2px',
                }}
              >
                <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  CORE PROBLEM STATEMENT
                </span>
                <p style={{ fontSize: '13px', color: 'var(--border-light)', lineHeight: 1.6, margin: 0 }}>
                  {project.problem}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#17191C',
                  border: '1px solid var(--border-dark)',
                  padding: '18px',
                  borderRadius: '2px',
                }}
              >
                <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  QUANTITATIVE APPROACH
                </span>
                <p style={{ fontSize: '13px', color: 'var(--border-light)', lineHeight: 1.6, margin: 0 }}>
                  {project.approach}
                </p>
              </div>
            </div>

            {/* Interactive Architecture Flowchart */}
            <div>
              <ProjectArchitectureVisualizer project={project} />
            </div>

            {/* Implementation & Verified Deliverables */}
            <div
              style={{
                backgroundColor: '#17191C',
                border: '1px solid var(--border-dark)',
                padding: '20px',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div>
                <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  IMPLEMENTATION SPECIFICATION
                </span>
                <p style={{ fontSize: '13px', color: 'var(--border-light)', lineHeight: 1.6, margin: 0 }}>
                  {project.implementation}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '12px', color: 'var(--text-light)', display: 'block' }}>
                    Verified Deliverable &amp; Artifact:
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--accent-subtle)' }}>
                    {project.outcome}
                  </span>
                </div>
              </div>
            </div>

            {/* Technologies Pills */}
            <div>
              <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)', display: 'block', marginBottom: '8px' }}>
                VERIFIED TECH STACK
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="mono-tag"
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#17191C',
                      border: '1px solid var(--border-dark)',
                      color: 'var(--text-light)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-dark)',
              backgroundColor: '#17191C',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </span>

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-primary"
              style={{ fontSize: '11px', padding: '10px 18px' }}
            >
              INSPECT CODE ON GITHUB <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
