import React from 'react';
import { Award, GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import Reveal from './motion/Reveal';
import TiltCard from './motion/TiltCard';
import { useReducedMotion } from '../motion/useReducedMotion';

interface EducationItem {
  id: string;
  step: string;
  degree: string;
  specialization?: string;
  institution: string;
  location: string;
  period: string;
  statusBadge: string;
  isCompleted: boolean;
  honors?: string;
  cgpa?: string;
  summary: string;
  coursework: string[];
}

const educationData: EducationItem[] = [
  {
    id: 'bsc-ct',
    step: '01',
    degree: 'B.Sc. Computer Technology',
    institution: 'Dr. SNS Rajalakshmi College of Arts and Science',
    location: 'Coimbatore, Tamil Nadu',
    period: '2023 – 2026',
    statusBadge: 'GRADUATED · 2026',
    isCompleted: true,
    cgpa: '7.7 CGPA',
    honors: 'Bronze Award — Best Outgoing Graduate (BOG)',
    summary: 'Comprehensive undergraduate computing curriculum bridging foundational computational theory, database systems, statistical data processing, and object-oriented software engineering.',
    coursework: [
      'Relational Database Management (RDBMS)',
      'Data Structures & Algorithms',
      'Python & Applied Programming',
      'Operating Systems & System Architecture',
      'Statistical Computing & Discrete Mathematics',
      'Software Engineering Methodologies',
    ],
  },
  {
    id: 'mba-systems',
    step: '02',
    degree: 'Master of Business Administration (MBA)',
    specialization: 'Specialization in Systems',
    institution: 'Bharathidasan University',
    location: 'Tiruchirappalli, Tamil Nadu',
    period: '2026 – 2028',
    statusBadge: 'CURRENTLY PURSUING · DISTANCE MODE',
    isCompleted: false,
    summary: 'Postgraduate management program focused on enterprise information systems, quantitative managerial decision-making, operational optimization, and corporate analytics strategy.',
    coursework: [
      'Enterprise Systems & IT Strategy',
      'Managerial Economics & Decision Modeling',
      'Quantitative Business Analytics',
      'Operations & Supply Chain Optimization',
      'Corporate Financial Analysis',
      'Organizational Leadership & Strategy',
    ],
  },
];

export default function Education() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="education" className="surface-light section-editorial" aria-labelledby="education-heading">
      <div className="container-editorial">
        {/* Section Header */}
        <Reveal direction="left" delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              06 / EDUCATION
            </span>
            <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent-subtle)' }}>
              ACADEMIC FOUNDATIONS
            </span>
          </div>

          <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
            <h2
              id="education-heading"
              className="serif-display"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.15 }}
            >
              Academic foundations &amp; <em style={{ fontStyle: 'italic', fontWeight: 300 }}>managerial breadth.</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#555555', marginTop: '12px', lineHeight: 1.6 }}>
              A dual-track academic background coupling rigorous computer technology fundamentals with strategic enterprise systems and quantitative business management.
            </p>
          </div>
        </Reveal>

        {/* Education Editorial Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {educationData.map((edu, idx) => (
            <Reveal key={edu.id} direction="up" delay={prefersReduced ? 0 : idx * 0.12}>
              <TiltCard
                maxTilt={3}
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
                  {/* Top Metadata Bar */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '14px',
                      marginBottom: '18px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
                      ACADEMIC TRACK {edu.step}
                    </span>

                    <span
                      className="mono-tag"
                      style={{
                        fontSize: '9.5px',
                        backgroundColor: edu.isCompleted ? 'rgba(197, 106, 69, 0.1)' : 'var(--bg-surface)',
                        color: edu.isCompleted ? 'var(--accent)' : 'var(--text-dark)',
                        padding: '3px 8px',
                        borderRadius: '2px',
                        border: '1px solid var(--border-light)',
                        fontWeight: 600,
                      }}
                    >
                      {edu.statusBadge}
                    </span>
                  </div>

                  {/* Degree & Specialization */}
                  <div style={{ marginBottom: '14px' }}>
                    <h3 className="serif-display" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {edu.degree}
                    </h3>
                    {edu.specialization && (
                      <span className="mono-tag" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        {edu.specialization}
                      </span>
                    )}
                    <strong style={{ fontSize: '14px', color: 'var(--text-dark)', display: 'block', marginBottom: '2px' }}>
                      {edu.institution}
                    </strong>
                  </div>

                  {/* Period, Location & CGPA */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '16px', fontSize: '11px', color: 'var(--accent-subtle)' }}>
                    <span className="mono-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={13} color="var(--accent)" /> {edu.period}
                    </span>
                    <span className="mono-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={13} color="var(--accent)" /> {edu.location}
                    </span>
                    {edu.cgpa && (
                      <span className="mono-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--accent)', fontWeight: 700 }}>
                        <GraduationCap size={13} /> {edu.cgpa}
                      </span>
                    )}
                  </div>

                  {/* Academic Honors Badge (if applicable) */}
                  {edu.honors && (
                    <div
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderLeft: '3px solid var(--accent)',
                        padding: '10px 14px',
                        marginBottom: '18px',
                        borderRadius: '0 2px 2px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Award size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 600 }}>
                        {edu.honors}
                      </span>
                    </div>
                  )}

                  {/* Summary */}
                  <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.6, marginBottom: '20px' }}>
                    {edu.summary}
                  </p>
                </div>

                {/* Coursework Tags */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <BookOpen size={13} color="var(--accent-subtle)" />
                    <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent-subtle)', fontWeight: 600 }}>
                      CORE SYLLABUS &amp; DISCIPLINES
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
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
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
