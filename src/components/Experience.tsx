import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import Reveal from './motion/Reveal';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';

interface ExperienceItem {
  id: string;
  step: string;
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'space-murak',
    step: '01',
    company: 'Space Murak',
    role: 'Computer Graphic Designer',
    type: 'Part-Time / Remote',
    period: 'March 2025 – Present',
    location: 'Remote',
    summary: 'Designs digital graphic assets and manages creative collateral, optimizing production workflows through systematic content performance analysis.',
    responsibilities: [
      'Engineered digital graphic collateral and visual branding assets adhering strictly to corporate style guidelines.',
      'Monitored and evaluated audience engagement metrics and performance indicators across digital distribution channels.',
      'Collaborated remotely across multi-disciplinary teams to meet rapid asset delivery schedules.',
    ],
    skills: ['Graphic Systems', 'Performance Analysis', 'Brand Compliance', 'Remote Workflow'],
  },
  {
    id: 'dare-on',
    step: '02',
    company: 'Dare On Private Limited',
    role: 'XML Intern',
    type: 'Industry Practice',
    period: 'Structured Internship',
    location: 'Coimbatore, India',
    summary: 'Focused on enterprise XML data formatting, schema validation, and digital document publishing pipelines.',
    responsibilities: [
      'Validated structured XML datasets against document type definitions (DTDs) and hierarchical schema specifications.',
      'Maintained data integrity across digital publishing pipelines and automated text extraction workflows.',
      'Identified and remediated schema discrepancies to ensure compliance with enterprise documentation standards.',
    ],
    skills: ['XML Schemas', 'DTD Validation', 'Data Integrity', 'Publishing Pipelines'],
  },
  {
    id: 'elewayte',
    step: '03',
    company: 'Elewayte',
    role: 'AI/ML Intern',
    type: 'Internship',
    period: 'May 2024 – June 2024',
    location: 'Remote / Practice',
    summary: 'Engineered machine learning pipelines across practical problem statements, covering data preprocessing, model evaluation, and deployment workflows.',
    responsibilities: [
      'Built and evaluated machine learning classifiers across benchmark datasets using Python and Scikit-learn.',
      'Conducted exploratory data analysis, missing-value imputation, categorical encoding, and feature scaling.',
      'Generated comparative evaluation reports utilizing cross-validation, confusion matrices, and precision-recall dynamics.',
    ],
    skills: ['Machine Learning', 'Python', 'Feature Engineering', 'Model Evaluation', 'Scikit-Learn'],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>('space-murak');
  const prefersReduced = useReducedMotion();

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="surface-stone section-editorial" aria-labelledby="experience-heading">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              05 / PROFESSIONAL EXPERIENCE
            </span>
            <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
              CAREER MILESTONES
            </span>
          </div>

          <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
            <h2
              id="experience-heading"
              className="serif-display"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
            >
              Practical engagements &amp; <em style={{ fontStyle: 'italic', fontWeight: 300 }}>organizational impact.</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#555555', marginTop: '12px', lineHeight: 1.6 }}>
              A progressive timeline of industry internships and specialized roles delivering quantitative precision, structured data pipelines, and visual design assets.
            </p>
          </div>
        </Reveal>

        {/* Editorial Timeline Container */}
        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>
          {/* Vertical Continuous Spine Line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '16px',
              bottom: '16px',
              width: '2px',
              backgroundColor: 'var(--border-light)',
              display: 'block',
            }}
            aria-hidden="true"
          />

          {/* Timeline Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {experiences.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;

              return (
                <Reveal key={exp.id} direction="up" delay={prefersReduced ? 0 : idx * 0.1}>
                  <div
                    style={{
                      position: 'relative',
                      paddingLeft: '56px',
                    }}
                  >
                    {/* Node Milestone Marker */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '28px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: isExpanded ? 'var(--accent)' : '#ffffff',
                        border: '2px solid var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isExpanded ? '#ffffff' : 'var(--accent)',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '10px',
                        fontWeight: 700,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.25s ease',
                      }}
                      aria-hidden="true"
                    >
                      {exp.step}
                    </div>

                    {/* Timeline Card */}
                    <TiltCard
                      maxTilt={2}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-light)',
                        borderRadius: '2px',
                        padding: '28px',
                        boxShadow: '0 4px 20px rgba(23, 25, 28, 0.04)',
                      }}
                    >
                      {/* Card Header Bar */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          borderBottom: '1px solid var(--border-light)',
                          paddingBottom: '14px',
                          marginBottom: '16px',
                          flexWrap: 'wrap',
                          gap: '12px',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
                              {exp.type.toUpperCase()}
                            </span>
                            <span style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-light)' }} />
                            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                              MILESTONE {exp.step}
                            </span>
                          </div>

                          <h3 className="serif-display" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                            {exp.company}
                          </h3>
                        </div>

                        {/* Date and Location Badges */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          <span
                            className="mono-tag"
                            style={{
                              fontSize: '11px',
                              color: 'var(--accent)',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Calendar size={13} /> {exp.period}
                          </span>
                          <span
                            className="mono-tag"
                            style={{
                              fontSize: '10px',
                              color: 'var(--accent-subtle)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            <MapPin size={11} /> {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Role & Summary */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <Briefcase size={15} color="var(--accent)" />
                          <strong style={{ fontSize: '15px', color: 'var(--text-dark)', fontWeight: 600 }}>
                            {exp.role}
                          </strong>
                        </div>
                        <p style={{ fontSize: '13.5px', color: '#4A4A4A', lineHeight: 1.6, margin: 0 }}>
                          {exp.summary}
                        </p>
                      </div>

                      {/* Expandable Key Responsibilities */}
                      <div>
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`exp-details-${exp.id}`}
                          className="mono-tag"
                          style={{
                            background: 'none',
                            border: '1px solid var(--border-light)',
                            borderRadius: '2px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            color: 'var(--text-dark)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: isExpanded ? '14px' : '16px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.color = 'var(--text-dark)';
                          }}
                        >
                          {isExpanded ? 'HIDE RESPONSIBILITIES' : 'EXPLORE RESPONSIBILITIES'}
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <ChevronDown size={14} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              id={`exp-details-${exp.id}`}
                              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div
                                style={{
                                  backgroundColor: 'var(--bg-surface)',
                                  borderLeft: '3px solid var(--accent)',
                                  padding: '14px 18px',
                                  marginBottom: '16px',
                                  borderRadius: '0 2px 2px 0',
                                }}
                              >
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {exp.responsibilities.map((resp, rIdx) => (
                                    <li
                                      key={rIdx}
                                      style={{
                                        fontSize: '12.5px',
                                        color: '#333333',
                                        lineHeight: 1.55,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                      }}
                                    >
                                      <CheckCircle2 size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Technical Skills Applied Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          borderTop: '1px solid var(--border-light)',
                          paddingTop: '14px',
                        }}
                      >
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="mono-tag"
                            style={{
                              fontSize: '10px',
                              backgroundColor: 'var(--bg-surface)',
                              color: 'var(--text-dark)',
                              padding: '3px 8px',
                              borderRadius: '2px',
                              border: '1px solid var(--border-light)',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
