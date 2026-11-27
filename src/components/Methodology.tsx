import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './motion/Reveal';
import TextReveal from './motion/TextReveal';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';
import { TRANSITIONS } from '../motion/tokens';

const steps = [
  {
    num: '01',
    phase: 'STAGE 01 · DIAGNOSTIC',
    title: 'Audit & Ingestion',
    desc: 'Diagnosing data anomalies, structural missingness, and distribution drift before a single model is initialized.',
    deliverable: 'Audited source schema & drift report',
  },
  {
    num: '02',
    phase: 'STAGE 02 · MODELING',
    title: 'Signal Modeling',
    desc: 'Engineering robust features with high predictive power and calibrating cross-validated statistical baselines.',
    deliverable: 'Cross-validated model baselines',
  },
  {
    num: '03',
    phase: 'STAGE 03 · CALIBRATION',
    title: 'Decision Thresholds',
    desc: 'Translating ROC curves into bottom-line P&L thresholds: precision vs recall risk tolerance calibrated to business cost.',
    deliverable: 'Cost-sensitive operational cutoff',
  },
  {
    num: '04',
    phase: 'STAGE 04 · PRODUCTION',
    title: 'Executive Delivery',
    desc: 'Packaging results into interactive BI dashboards and automated agent workflows ready for leadership action.',
    deliverable: 'Executive BI & automated pipelines',
  },
];

export default function Methodology() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section id="methodology" className="surface-light section-editorial">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              03 / HOW I WORK
            </span>
            <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
              ANALYTICAL FRAMEWORK
            </span>
          </div>
        </Reveal>

        <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
          <h2
            className="serif-display"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
          >
            <TextReveal text="A disciplined 4-phase methodology for" delay={0.1} />{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>verifiable outcomes.</em>
          </h2>
        </div>

        {/* Desktop Progressive Connected Workflow Visualizer */}
        <div
          className="desktop-pipeline-connector"
          style={{
            position: 'relative',
            marginBottom: '32px',
            padding: '0 20px',
            display: 'block',
          }}
          aria-hidden="true"
        >
          {/* Animated Connecting SVG Path */}
          <svg
            width="100%"
            height="36"
            viewBox="0 0 1000 36"
            fill="none"
            preserveAspectRatio="none"
            style={{ overflow: 'visible', display: 'block' }}
          >
            {/* Background hairline guide */}
            <line x1="20" y1="18" x2="980" y2="18" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Progressive drawing stroke */}
            <motion.line
              x1="20"
              y1="18"
              x2="980"
              y2="18"
              stroke="var(--accent)"
              strokeWidth="2"
              initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: TRANSITIONS.editorial.ease }}
            />

            {/* 4 Connected Milestone Nodes */}
            {[125, 375, 625, 875].map((cx, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <g key={idx}>
                  <circle cx={cx} cy="18" r="8" fill="#ffffff" stroke="var(--border-light)" strokeWidth="1.5" />
                  <motion.circle
                    cx={cx}
                    cy="18"
                    r={isCurrent ? 6 : 4}
                    fill={isCurrent ? 'var(--accent)' : 'var(--accent-subtle)'}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 * (idx + 1), duration: 0.4 }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* 4 Steps Progressive Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {steps.map((step, idx) => {
            const isHovered = activeStep === idx;
            return (
              <Reveal key={step.num} direction="up" delay={0.12 * (idx + 1)}>
                <TiltCard
                  maxTilt={3}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '260px',
                    boxShadow: isHovered
                      ? '0 12px 32px rgba(197, 106, 69, 0.08)'
                      : '0 4px 16px rgba(23, 25, 28, 0.03)',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  <div
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        className="serif-display"
                        style={{
                          fontSize: '32px',
                          color: isHovered ? 'var(--accent)' : 'var(--text-dark)',
                          fontStyle: 'italic',
                          fontWeight: 500,
                          transition: 'color 0.25s',
                        }}
                      >
                        {step.num}
                      </span>
                      <span className="mono-tag" style={{ fontSize: '9px', color: 'var(--accent)' }}>
                        {step.phase.split(' · ')[1]}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--text-dark)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '10px',
                      }}
                    >
                      {step.title}
                    </h4>

                    <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.6, marginBottom: '16px' }}>
                      {step.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '12px',
                      marginTop: 'auto',
                    }}
                  >
                    <span
                      className="mono-tag"
                      style={{
                        fontSize: '10px',
                        color: 'var(--accent-subtle)',
                        display: 'block',
                      }}
                    >
                      OUTPUT: {step.deliverable}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
