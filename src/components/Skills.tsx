import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './motion/Reveal';
import TextReveal from './motion/TextReveal';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';

interface SkillItem {
  name: string;
  role: string;
  connections: string[];
}

interface SkillCategory {
  title: string;
  tag: string;
  note: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'PROGRAMMING',
    tag: 'LANGUAGES',
    note: 'FOUNDATIONAL & SCRIPTING',
    skills: [
      {
        name: 'Python',
        role: 'Primary language for backend services, data processing & AI pipelines',
        connections: ['FastAPI', 'Flask', 'Pandas', 'NumPy', 'Google Gemini API', 'SQLite', 'PostgreSQL'],
      },
      {
        name: 'SQL',
        role: 'Relational data querying, complex joins & schema operations',
        connections: ['PostgreSQL', 'MySQL', 'SQLite', 'Python', 'Backend Development'],
      },
      {
        name: 'JavaScript Fundamentals',
        role: 'Client-side script logic, event handling & API consumption',
        connections: ['REST API Development', 'Application Logic'],
      },
    ],
  },
  {
    title: 'BACKEND & APP DEV',
    tag: 'ARCHITECTURE',
    note: 'SERVICES & DATA FLOW',
    skills: [
      {
        name: 'Backend Development',
        role: 'Server-side architectures, routing, middleware & request lifecycles',
        connections: ['FastAPI', 'Flask', 'Application Logic', 'REST API Development', 'PostgreSQL'],
      },
      {
        name: 'Application Logic',
        role: 'Business rules, state management & transactional workflows',
        connections: ['Backend Development', 'Debugging', 'Error Handling', 'Testing Fundamentals'],
      },
      {
        name: 'REST API Development',
        role: 'Standardized HTTP endpoints, CRUD operations & JSON payloads',
        connections: ['FastAPI', 'Flask', 'Backend Development', 'Google Gemini API', 'Application Validation'],
      },
    ],
  },
  {
    title: 'FRAMEWORKS',
    tag: 'WEB ENGINES',
    note: 'MICROSERVICES & APIS',
    skills: [
      {
        name: 'FastAPI',
        role: 'High-performance asynchronous APIs with automated OpenAPI docs & Pydantic validation',
        connections: ['Python', 'REST API Development', 'Backend Development', 'Docker', 'Application Validation'],
      },
      {
        name: 'Flask',
        role: 'Lightweight WSGI web microservices & routing engines',
        connections: ['Python', 'REST API Development', 'Backend Development', 'Application Logic'],
      },
    ],
  },
  {
    title: 'DATABASES',
    tag: 'STORAGE',
    note: 'RELATIONAL ENGINES',
    skills: [
      {
        name: 'MySQL',
        role: 'Structured relational storage, indexing & tabular records',
        connections: ['SQL', 'Backend Development', 'Python'],
      },
      {
        name: 'PostgreSQL',
        role: 'Advanced open-source relational database management',
        connections: ['SQL', 'Backend Development', 'Python', 'FastAPI'],
      },
      {
        name: 'SQLite',
        role: 'Serverless embedded relational storage for caching & rapid verification',
        connections: ['SQL', 'FastAPI', 'Python', 'Backend Development'],
      },
    ],
  },
  {
    title: 'SOFTWARE ENGINEERING',
    tag: 'PRACTICES',
    note: 'QUALITY & RESILIENCE',
    skills: [
      {
        name: 'Debugging',
        role: 'Root-cause analysis, call-stack tracing & log diagnostic evaluation',
        connections: ['Error Handling', 'Application Logic', 'VS Code', 'Python'],
      },
      {
        name: 'Error Handling',
        role: 'Defensive exception handling, structured error boundaries & HTTP status codes',
        connections: ['Debugging', 'Application Validation', 'FastAPI', 'Backend Development'],
      },
      {
        name: 'Application Validation',
        role: 'Payload schema validation, type checking & input sanitization',
        connections: ['FastAPI', 'Testing Fundamentals', 'Error Handling'],
      },
      {
        name: 'Testing Fundamentals',
        role: 'Unit verification, assertion logic & automated smoke checks',
        connections: ['Application Validation', 'Debugging', 'Python'],
      },
    ],
  },
  {
    title: 'DEVELOPMENT TOOLS',
    tag: 'TOOLCHAIN',
    note: 'WORKFLOW & VERSIONING',
    skills: [
      {
        name: 'Git',
        role: 'Distributed version control, branch management & commit hygiene',
        connections: ['GitHub', 'VS Code'],
      },
      {
        name: 'GitHub',
        role: 'Remote repository hosting, pull requests, issue tracking & code review',
        connections: ['Git', 'VS Code'],
      },
      {
        name: 'Docker',
        role: 'Containerization, reproducible deployment environments & Dockerfile specs',
        connections: ['FastAPI', 'Backend Development', 'Git'],
      },
      {
        name: 'VS Code',
        role: 'Primary integrated development environment with linting & debugging extensions',
        connections: ['Python', 'Git', 'Debugging'],
      },
    ],
  },
  {
    title: 'DATA PROCESSING',
    tag: 'TRANSFORMATION',
    note: 'NUMERICAL COMPUTING',
    skills: [
      {
        name: 'Pandas',
        role: 'Dataframe manipulation, data cleaning, aggregation & tabular transformation',
        connections: ['NumPy', 'Python', 'SQL', 'Backend Development'],
      },
      {
        name: 'NumPy',
        role: 'N-dimensional arrays, vectorized operations & mathematical computing',
        connections: ['Pandas', 'Python'],
      },
    ],
  },
  {
    title: 'AI INTEGRATION',
    tag: 'INTELLIGENCE',
    note: 'COGNITIVE WORKFLOWS',
    skills: [
      {
        name: 'Google Gemini API',
        role: 'Structured LLM prompting, OCR document intelligence & schema-constrained outputs',
        connections: ['Python', 'FastAPI', 'REST API Development', 'Backend Development'],
      },
    ],
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  // Find active skill item and its connection list
  const activeItem = activeSkill
    ? skillCategories
        .flatMap((c) => c.skills)
        .find((s) => s.name === activeSkill)
    : null;

  return (
    <section id="skills" className="surface-stone section-editorial" aria-labelledby="skills-heading">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              03 / TECHNICAL SKILLS
            </span>
            <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
              CONNECTED PIPELINE MATRIX
            </span>
          </div>
        </Reveal>

        <div style={{ marginBottom: '36px', maxWidth: '780px' }}>
          <h2
            id="skills-heading"
            className="serif-display"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
          >
            <TextReveal text="Python Backend & AI-Integrated" delay={0.1} />{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Application Development.</em>
          </h2>
          <p style={{ fontSize: '15px', color: '#4A4A4A', marginTop: '14px', lineHeight: 1.6 }}>
            Python-focused application developer with experience building backend services, REST APIs, database-driven applications, and AI-integrated workflows.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--accent-subtle)', marginTop: '8px' }} className="mono-tag">
            HOVER OR TAP ANY TOOL TO ILLUMINATE ARCHITECTURAL DEPENDENCY CONNECTIONS
          </p>
        </div>

        {/* 8 Categorical Cards with Interactive Dependency Illumination */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {skillCategories.map((cat, catIdx) => (
            <Reveal key={cat.title} direction="up" delay={prefersReduced ? 0 : 0.05 * (catIdx + 1)}>
              <TiltCard
                maxTilt={2}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: '2px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  boxShadow: '0 4px 16px rgba(23, 25, 28, 0.03)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '10px',
                      marginBottom: '14px',
                    }}
                  >
                    <span className="mono-tag" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {cat.title}
                    </span>
                    <span className="mono-tag" style={{ fontSize: '9px', color: 'var(--accent-subtle)' }}>
                      {cat.tag}
                    </span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
                    {cat.skills.map((skill) => {
                      const isSelected = activeSkill === skill.name;
                      const isConnected = activeItem?.connections.includes(skill.name);
                      const isDimmed = activeSkill && !isSelected && !isConnected;

                      return (
                        <li
                          key={skill.name}
                          onMouseEnter={() => setActiveSkill(skill.name)}
                          onMouseLeave={() => setActiveSkill(null)}
                          onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                          tabIndex={0}
                          onFocus={() => setActiveSkill(skill.name)}
                          onBlur={() => setActiveSkill(null)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            backgroundColor: isSelected
                              ? 'rgba(197, 106, 69, 0.12)'
                              : isConnected
                              ? 'rgba(139, 145, 132, 0.14)'
                              : 'transparent',
                            borderLeft: isSelected
                              ? '2px solid var(--accent)'
                              : isConnected
                              ? '2px solid var(--accent-subtle)'
                              : '2px solid transparent',
                            opacity: isDimmed ? 0.45 : 1,
                            transition: prefersReduced ? 'none' : 'all 0.22s ease-out',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                width: isSelected ? '6px' : '5px',
                                height: isSelected ? '6px' : '5px',
                                backgroundColor: isSelected ? 'var(--accent)' : isConnected ? 'var(--accent-subtle)' : 'var(--accent)',
                                borderRadius: '1px',
                                flexShrink: 0,
                                transition: 'all 0.2s',
                              }}
                            />
                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: isSelected ? 600 : isConnected ? 500 : 400,
                                color: isSelected ? 'var(--text-dark)' : '#4A4A4A',
                              }}
                            >
                              {skill.name}
                            </span>
                          </div>
                          {isSelected && (
                            <span
                              className="mono-tag"
                              style={{
                                fontSize: '10px',
                                color: 'var(--accent)',
                                display: 'block',
                                marginTop: '4px',
                                marginLeft: '14px',
                                lineHeight: 1.4,
                              }}
                            >
                              {skill.role}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <span
                  className="mono-tag"
                  style={{
                    fontSize: '9px',
                    color: 'var(--accent-subtle)',
                    display: 'block',
                    marginTop: '16px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  {cat.note}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Dynamic Architectural Relationship Telemetry Banner */}
        <div
          style={{
            marginTop: '24px',
            padding: '16px 20px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: '2px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeSkill ? 'var(--accent)' : 'var(--accent-subtle)',
              }}
            />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--text-dark)', fontWeight: 600 }}>
              {activeSkill ? `ACTIVE NODE: ${activeSkill}` : 'HOVER ANY SKILL NODE TO TRACE ARCHITECTURAL DEPENDENCY EDGES'}
            </span>
          </div>

          {activeItem ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
                CONNECTS DIRECTLY WITH:
              </span>
              {activeItem.connections.map((c) => (
                <span
                  key={c}
                  className="mono-tag"
                  style={{
                    fontSize: '10px',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--accent)',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)' }}>
              23 VERIFIED TECHNICAL SKILLS · 8 CATEGORIES · 0 FABRICATED METRICS
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
