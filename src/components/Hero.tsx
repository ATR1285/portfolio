import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Volume2, Square } from 'lucide-react';
import { voiceService } from '../services/voiceService';

interface HeroProps {
  isSpeaking?: boolean;
  setIsSpeaking?: (speaking: boolean) => void;
}

export default function Hero({ isSpeaking = false, setIsSpeaking }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleExplainClick = () => {
    if (isSpeaking) {
      voiceService.stopSpeech();
      setIsSpeaking?.(false);
    } else {
      voiceService.speakSection('hero', {
        onStart: () => setIsSpeaking?.(true),
        onEnd: () => setIsSpeaking?.(false),
        onError: () => setIsSpeaking?.(false),
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 360;
    let height = 360;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 360;
      height = rect.height || 360;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    for (let i = 0; i < 28; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.38;
      const intensity = isSpeaking ? 1.8 : 1.0;

      // Concentric rings
      const rings = 4;
      for (let i = 0; i < rings; i++) {
        const r = maxRadius * ((i + 1) / rings);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(109, 220, 255, ${0.12 * intensity})`;
        ctx.lineWidth = i === 1 ? 1.5 : 0.8;
        ctx.stroke();
      }

      // Rotating processing ellipses
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.0004 * (i % 2 === 0 ? 1 : -1) * intensity);
        ctx.beginPath();
        ctx.ellipse(0, 0, maxRadius * 0.9, maxRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(114, 217, 255, ${0.18 * intensity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Center core glow
      const glowR = maxRadius * (0.3 + Math.sin(time * 0.003 * intensity) * 0.08);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(118, 224, 255, ${0.5 * intensity})`);
      glow.addColorStop(0.5, `rgba(57, 178, 255, ${0.15 * intensity})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Neural nodes & connections
      nodes.forEach((node) => {
        node.x += node.vx * intensity;
        node.y += node.vy * intensity;
        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.3 * intensity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 211, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(165, 237, 255, ${0.7 * intensity})`;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isSpeaking]);

  return (
    <>
      <section className="hero section" id="hero" data-section="hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">AI • FRONTEND • DATA • TECHNOLOGY</p>
          <h1 className="hero-title">RICHARD A T</h1>
          <p className="hero-subtitle">COMPUTER TECHNOLOGY | DEVELOPER • DATA • AI</p>
          <p className="lead">
            I build reproducible data pipelines, predictive ML models, credit-risk decision platforms, and AI automation agents that turn complex enterprise datasets into clear, actionable outcomes.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              EXPLORE WORK <ArrowUpRight size={18} />
            </a>
            <button 
              type="button" 
              className={`button ghost ${isSpeaking ? 'button--speaking' : ''}`}
              onClick={handleExplainClick}
            >
              {isSpeaking ? <Square size={16} /> : <Volume2 size={16} />} EXPLAIN
            </button>
          </div>
        </div>

        <div className="hero-core-visual" aria-label="Intelligence Core Visualizer">
          <canvas ref={canvasRef} className="hero-core-canvas" />
          <div className="hero-core-status">
            <span>{isSpeaking ? 'PROCESSING SPEECH...' : 'THE SYSTEM IS STILL PROCESSING'}</span>
          </div>
        </div>
      </section>

      <section className="ticker" data-section="hero">
        <span>GEN AI</span><i>/</i>
        <span>AGENTIC AI</span><i>/</i>
        <span>CREDIT RISK MODELS</span><i>/</i>
        <span>DYNAMIC PRICING</span><i>/</i>
        <span>PYTHON & SQL</span><i>/</i>
        <span>MACHINE LEARNING</span><i>/</i>
        <span>BUSINESS INTELLIGENCE</span>
      </section>
    </>
  );
}
