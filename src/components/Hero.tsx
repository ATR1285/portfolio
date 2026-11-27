import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import Magnetic from './motion/Magnetic';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // Refined editorial entrance transition (0.8s – 1.05s total sequence)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const, // Editorial smooth cubic-bezier curve
      },
    },
  };

  return (
    <section
      id="hero"
      className="surface-dark data-grid-bg section-editorial"
      style={{
        position: 'relative',
        paddingTop: 'clamp(60px, 9vw, 105px)',
        paddingBottom: 'clamp(60px, 9vw, 105px)',
        overflow: 'hidden',
      }}
    >
      <div className="container-editorial" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Main Editorial Typography & Action Column */}
          <div style={{ maxWidth: '680px' }}>
            {/* 1. Technical Metadata Header */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
            >
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                COMPUTER TECHNOLOGY · DATA &amp; AI
              </span>
              <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-subtle)' }} />
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
                2026 EDITION
              </span>
            </motion.div>

            {/* 2. Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="serif-display"
              style={{
                fontSize: 'clamp(38px, 5.8vw, 76px)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-light)',
                marginBottom: '24px',
              }}
            >
              Turning fragmented datasets into{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--bg-surface)',
                  display: 'inline-block',
                }}
              >
                decisive intelligence.
              </em>
            </motion.h1>

            {/* 3. Subtitle Description */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                color: 'var(--border-light)',
                lineHeight: 1.65,
                fontWeight: 400,
                marginBottom: '32px',
                maxWidth: '580px',
              }}
            >
              I design reproducible SQL pipelines, predictive risk algorithms, and GenAI-powered automation agents that bridge mathematical modeling with executive enterprise outcomes.
            </motion.p>

            {/* 4. Dual CTAs & Resume Button */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}
            >
              <Magnetic strength={0.18}>
                <a href="#projects" className="btn-editorial-primary" aria-label="Explore Selected Projects">
                  EXPLORE SELECTED WORK <ArrowDownRight size={15} />
                </a>
              </Magnetic>

              <Magnetic strength={0.18}>
                <a href="#contact" className="btn-editorial-ghost-dark" aria-label="Navigate to Contact Section">
                  CONTACT ME <ArrowUpRight size={15} />
                </a>
              </Magnetic>

              <Magnetic strength={0.18}>
                <a
                  href={`${import.meta.env.BASE_URL}Richard_AT_Resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial-ghost-dark"
                  style={{ borderColor: 'var(--accent-subtle)' }}
                  aria-label="Download Verified Resume PDF"
                >
                  RESUME <Download size={14} />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Minimalist Data Telemetry Card (Static once loaded) */}
          <motion.div
            variants={itemVariants}
            style={{ maxWidth: '380px', justifySelf: 'end', width: '100%' }}
          >
            <TiltCard
              maxTilt={4}
              style={{
                backgroundColor: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                padding: '28px',
                borderRadius: '2px',
                boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-dark)',
                  paddingBottom: '12px',
                }}
              >
                <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                  TELEMETRY BENCHMARK (ILLUSTRATIVE)
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 6px var(--accent)',
                  }}
                  aria-label="Static Telemetry Signal"
                />
              </div>

              <div>
                <span
                  className="mono-tag"
                  style={{ fontSize: '10px', color: 'var(--accent-subtle)', display: 'block', marginBottom: '4px' }}
                >
                  PRIMARY SPECIALISATION
                </span>
                <strong
                  className="serif-display"
                  style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-light)', display: 'block' }}
                >
                  Data Analytics · Machine Learning
                </strong>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-dark)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }} className="mono-tag">
                  <span style={{ color: 'var(--accent-subtle)' }}>Benchmark Solvency Goal</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>94.7%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: 'var(--bg-dark)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: '94.7%',
                      backgroundColor: 'var(--accent)',
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }} className="mono-tag">
                  <span style={{ color: 'var(--accent-subtle)' }}>Target Lineage Integrity</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>100%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: 'var(--bg-dark)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'var(--accent-subtle)',
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>

              <p
                className="serif-display"
                style={{
                  fontStyle: 'italic',
                  fontSize: '12px',
                  color: 'var(--accent-subtle)',
                  borderTop: '1px solid var(--border-dark)',
                  paddingTop: '14px',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Analysis that makes the next best operational decision verifiable and obvious.&rdquo;
              </p>
              <span className="mono-tag" style={{ fontSize: '9px', color: 'var(--accent-subtle)', opacity: 0.75, display: 'block', marginTop: '-8px' }}>
                * Illustrative engineering target specifications
              </span>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
