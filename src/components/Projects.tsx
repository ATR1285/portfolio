import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import Reveal from './motion/Reveal';
import TextReveal from './motion/TextReveal';
import TiltCard from './motion/TiltCard';
import Magnetic from './motion/Magnetic';
import { useReducedMotion } from '../motion/useReducedMotion';

type CategoryFilter = 'ALL' | 'FINANCIAL ANALYTICS' | 'BUSINESS INTELLIGENCE' | 'MACHINE LEARNING' | 'GENERATIVE & AGENTIC AI';

const FILTERS: { label: string; value: CategoryFilter }[] = [
  { label: 'ALL WORK', value: 'ALL' },
  { label: 'FINANCIAL ANALYTICS', value: 'FINANCIAL ANALYTICS' },
  { label: 'BUSINESS INTELLIGENCE', value: 'BUSINESS INTELLIGENCE' },
  { label: 'MACHINE LEARNING', value: 'MACHINE LEARNING' },
  { label: 'GENAI & AGENTS', value: 'GENERATIVE & AGENTIC AI' },
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const prefersReduced = useReducedMotion();

  const filteredProjects = selectedFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="surface-light section-editorial">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                04 / FEATURED PROJECTS
              </span>
              <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
              <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
                SYSTEMS &amp; ARCHITECTURE
              </span>
            </div>

            <Magnetic strength={0.15}>
              <a
                href="https://github.com/ATR1285"
                target="_blank"
                rel="noreferrer"
                className="mono-tag"
                style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                aria-label="View all repositories on GitHub"
              >
                ALL REPOSITORIES (20+) <ArrowUpRight size={13} />
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Headline */}
        <div style={{ marginBottom: '32px', maxWidth: '640px' }}>
          <h2
            className="serif-display"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
          >
            <TextReveal text="Engineering data systems that drive" delay={0.1} />{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>measurable decisions.</em>
          </h2>
        </div>

        {/* Category Filter Navigation */}
        <Reveal direction="up" delay={0.15}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '36px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '16px',
            }}
            role="tablist"
            aria-label="Filter projects by discipline"
          >
            {FILTERS.map((f) => {
              const isActive = selectedFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setSelectedFilter(f.value)}
                  role="tab"
                  aria-selected={isActive}
                  className="mono-tag"
                  style={{
                    fontSize: '11px',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'var(--accent)' : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--text-dark)',
                    cursor: 'pointer',
                    transition: prefersReduced ? 'none' : 'all 0.2s ease-out',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Featured Projects Grid */}
        <motion.div
          layout={!prefersReduced}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((p, idx) => (
              <motion.article
                key={p.id}
                layout={!prefersReduced}
                initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, delay: prefersReduced ? 0 : idx * 0.08 }}
                style={{ height: '100%' }}
              >
                <TiltCard
                  maxTilt={4}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxShadow: '0 4px 20px rgba(23, 25, 28, 0.04)',
                  }}
                >
                  <div>
                    {/* Card Top Metadata Bar */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '1px solid var(--border-light)',
                        paddingBottom: '14px',
                        marginBottom: '16px',
                      }}
                    >
                      <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
                        {p.category}
                      </span>
                      <span className="serif-display" style={{ fontSize: '20px', color: 'var(--accent-subtle)' }}>
                        {p.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="serif-display"
                      onClick={() => setActiveModalProject(p)}
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--text-dark)',
                        marginBottom: '12px',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dark)')}
                    >
                      {p.title}
                    </h3>

                    {/* Problem / Approach Narrative */}
                    <div style={{ fontSize: '13px', color: '#4A4A4A', lineHeight: 1.6, marginBottom: '20px' }}>
                      <p style={{ marginBottom: '8px' }}>
                        <strong style={{ color: 'var(--text-dark)' }}>Problem: </strong>
                        {p.problem}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong style={{ color: 'var(--text-dark)' }}>Approach: </strong>
                        {p.approach}
                      </p>
                    </div>

                    {/* Tech Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="mono-tag"
                          style={{
                            fontSize: '10px',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-dark)',
                            padding: '4px 8px',
                            borderRadius: '2px',
                            border: '1px solid var(--border-light)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dual Card Actions: Interactive Modal & Direct GitHub */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '20px',
                    }}
                  >
                    <button
                      onClick={() => setActiveModalProject(p)}
                      className="btn-editorial-primary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}
                      aria-label={`Explore architectural case study for ${p.title}`}
                      aria-haspopup="dialog"
                    >
                      EXPLORE ARCHITECTURE &amp; FLOW <Layers size={14} />
                    </button>

                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-editorial-ghost-light"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '11px', textAlign: 'center' }}
                      aria-label={`Inspect ${p.title} repository on GitHub`}
                    >
                      GITHUB REPOSITORY <ArrowUpRight size={13} />
                    </a>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
