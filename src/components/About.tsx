import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './motion/Reveal';
import TextReveal from './motion/TextReveal';
import TiltCard from './motion/TiltCard';
import Magnetic from './motion/Magnetic';
import { useReducedMotion } from '../motion/useReducedMotion';
import { TRANSITIONS } from '../motion/tokens';

const pillars = [
  {
    num: '01 · RIGOUR',
    title: 'Zero Black Boxes',
    desc: 'Every data transformation is traceable to raw source records with auditable business logic and validated statistical assumptions.',
  },
  {
    num: '02 · CLARITY',
    title: 'Executive Translation',
    desc: 'Complex probability distributions, ROC thresholds, and cohort decay signals translated into intuitive decision interfaces for leadership.',
  },
  {
    num: '03 · IMPACT',
    title: 'Bottom-Line Alignment',
    desc: 'Analysis calibrated around operational outcomes: preventing credit defaults, recovering pricing margins, and intercepting customer churn.',
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Gentle portrait parallax depth on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <section id="about" ref={containerRef} className="surface-light section-editorial">
      <div className="container-editorial">
        {/* Section Metadata Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              01 / ABOUT ME
            </span>
            <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
              PROFILE &amp; APPROACH
            </span>
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Main Narrative with Depth Portrait Frame */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <motion.div
                style={{
                  position: 'relative',
                  y: prefersReduced ? 0 : portraitY,
                  willChange: 'transform',
                }}
              >
                {/* Dimensional offset backdrop frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-3px -3px 3px 3px',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '2px',
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />
                <img
                  src={`${import.meta.env.BASE_URL}richard.webp`}
                  alt="Richard A T"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '84px',
                    height: '84px',
                    borderRadius: '2px',
                    objectFit: 'cover',
                    objectPosition: '50% 15%',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#ffffff',
                    display: 'block',
                  }}
                />
              </motion.div>

              <div>
                <h3 className="serif-display" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>
                  Richard A T
                </h3>
                <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', display: 'block', marginTop: '2px' }}>
                  Computer Technology · Data &amp; AI
                </span>
                <span style={{ fontSize: '12px', color: 'var(--accent-subtle)' }}>
                  Tamil Nadu, India · Remote / Hybrid
                </span>
              </div>
            </div>

            <h2
              className="serif-display"
              style={{
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 400,
                color: 'var(--text-dark)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              <TextReveal text="Built to bridge raw enterprise data and" delay={0.1} />{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>high-stakes decisions.</em>
            </h2>

            <Reveal direction="up" delay={0.15}>
              <p style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.7, marginBottom: '16px' }}>
                I am an analytics and AI practitioner with a degree specialisation in Computer Technology. I treat data not as passive dashboards, but as active operational levers. From credit-risk decision platforms to dynamic pricing engines and executive visual analytics, I build solutions that are mathematically sound, reproducible, and immediately actionable.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.7, marginBottom: '28px' }}>
                My technical background allows me to move effortlessly across the analytics lifecycle: engineering performant SQL schemas, training machine learning classifiers in Python, deploying FastAPI endpoints, and translating metrics into stakeholder-ready visual intelligence in Power BI and Tableau.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.35}>
              <Magnetic strength={0.2}>
                <a href="#contact" className="btn-editorial-primary" aria-label="Start a conversation with Richard">
                  START A CONVERSATION <ArrowUpRight size={14} />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* Three Core Pillars with Dimensional Tilt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.num} direction="up" delay={0.12 * (idx + 1)}>
                <TiltCard
                  maxTilt={4}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(23, 25, 28, 0.04)',
                  }}
                >
                  <span
                    className="mono-tag"
                    style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '6px' }}
                  >
                    {pillar.num}
                  </span>
                  <h4
                    className="serif-display"
                    style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}
                  >
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
