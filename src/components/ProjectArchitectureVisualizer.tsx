import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../data/projectsData';

interface VisualizerProps {
  project: ProjectItem;
}

export default function ProjectArchitectureVisualizer({ project }: VisualizerProps) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-dark)',
        border: '1px solid var(--border-dark)',
        borderRadius: '2px',
        padding: '24px',
        color: 'var(--text-light)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>
          SYSTEM ARCHITECTURE &amp; PIPELINE FLOW
        </span>
        <span className="mono-tag" style={{ fontSize: '9px', color: 'var(--accent-subtle)' }}>
          STEP {selectedStep + 1} OF {project.stages.length}
        </span>
      </div>

      {/* Responsive SVG Architecture Pipeline Diagram */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '20px' }}>
        <svg
          viewBox="0 0 740 120"
          style={{ width: '100%', minWidth: '580px', height: 'auto', display: 'block' }}
          aria-label={`Architecture flowchart for ${project.title}`}
        >
          {/* Connecting Background Line */}
          <line x1="80" y1="50" x2="660" y2="50" stroke="var(--border-dark)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Active Pipeline Progress Line */}
          <motion.line
            x1="80"
            y1="50"
            x2={80 + selectedStep * 193}
            y2="50"
            stroke="var(--accent)"
            strokeWidth="2.5"
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />

          {/* 4 Pipeline Stage Nodes */}
          {project.stages.map((st, idx) => {
            const cx = 80 + idx * 193;
            const isSelected = selectedStep === idx;
            const isPassed = selectedStep >= idx;
            const isFocused = focusedStep === idx;

            return (
              <g
                key={st.step}
                className="visualizer-stage-btn"
                onClick={() => setSelectedStep(idx)}
                onFocus={() => setFocusedStep(idx)}
                onBlur={() => setFocusedStep(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStep(idx);
                  }
                }}
                role="button"
                aria-label={`Select stage ${st.step}: ${st.name}`}
              >
                {/* Focus indicator glow if focused by keyboard */}
                {isFocused && (
                  <circle
                    cx={cx}
                    cy="50"
                    r="26"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity={0.8}
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  cx={cx}
                  cy="50"
                  r={isSelected ? '22' : '18'}
                  fill={isSelected ? '#17191C' : '#1F2327'}
                  stroke={isSelected ? 'var(--accent)' : isPassed ? 'var(--accent-subtle)' : 'var(--border-dark)'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  style={{ transition: 'all 0.25s' }}
                />

                {/* Step Number inside Circle */}
                <text
                  x={cx}
                  y="54"
                  textAnchor="middle"
                  fill={isSelected ? 'var(--accent)' : 'var(--text-light)'}
                  fontFamily="'DM Mono', monospace"
                  fontSize={isSelected ? '12px' : '11px'}
                  fontWeight={isSelected ? '700' : '400'}
                >
                  {st.step}
                </text>

                {/* Node Name underneath */}
                <text
                  x={cx}
                  y="92"
                  textAnchor="middle"
                  fill={isSelected ? 'var(--text-light)' : 'var(--accent-subtle)'}
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="11px"
                  fontWeight={isSelected ? '600' : '400'}
                >
                  {st.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Stage Detail Panel */}
      <div
        style={{
          backgroundColor: '#1F2327',
          borderLeft: '3px solid var(--accent)',
          padding: '16px 20px',
          borderRadius: '0 2px 2px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>
            STAGE {project.stages[selectedStep].step}
          </span>
          <span style={{ width: '16px', height: '1px', backgroundColor: 'var(--border-dark)' }} />
          <strong style={{ fontSize: '14px', color: 'var(--text-light)', fontWeight: 600 }}>
            {project.stages[selectedStep].name}
          </strong>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--border-light)', lineHeight: 1.6, margin: 0 }}>
          {project.stages[selectedStep].detail}
        </p>
      </div>

      {/* Navigation cues */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '11px' }}>
        <button
          onClick={() => setSelectedStep((prev) => Math.max(0, prev - 1))}
          disabled={selectedStep === 0}
          className="mono-tag visualizer-nav-btn"
          aria-label="Navigate to previous stage"
          style={{
            background: 'none',
            border: 'none',
            color: selectedStep === 0 ? '#4A4A4A' : 'var(--accent)',
            cursor: selectedStep === 0 ? 'default' : 'pointer',
            padding: '4px 8px',
          }}
        >
          ← PREVIOUS STAGE
        </button>

        <span className="mono-tag" style={{ color: 'var(--accent-subtle)', fontSize: '10px' }}>
          CLICK ANY NODE TO INSPECT
        </span>

        <button
          onClick={() => setSelectedStep((prev) => Math.min(project.stages.length - 1, prev + 1))}
          disabled={selectedStep === project.stages.length - 1}
          className="mono-tag visualizer-nav-btn"
          aria-label="Navigate to next stage"
          style={{
            background: 'none',
            border: 'none',
            color: selectedStep === project.stages.length - 1 ? '#4A4A4A' : 'var(--accent)',
            cursor: selectedStep === project.stages.length - 1 ? 'default' : 'pointer',
            padding: '4px 8px',
          }}
        >
          NEXT STAGE →
        </button>
      </div>
    </div>
  );
}
