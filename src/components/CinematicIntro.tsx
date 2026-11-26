import React, { useEffect, useRef, useState } from "react";
import "./CinematicIntro.css";

interface CinematicIntroProps {
  onComplete?: () => void;
}

type IntroPhase =
  | "dark"
  | "data"
  | "streams"
  | "network"
  | "core"
  | "identity"
  | "portfolio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char?: string;
  isText?: boolean;
  targetX?: number;
  targetY?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseProgress?: number;
}

const INTRO_DURATION = 4000;

const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    setVisible(false);

    window.setTimeout(() => {
      onComplete?.();
    }, 1200);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const particles: Particle[] = [];
    const dataChars = ["0", "1", "0", "1", "0x4F", "10", "01", "•", "0x9A", "110"];

    const isMobile = width < 700;
    const particleCount = isMobile ? 180 : 400;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const createParticle = (): Particle => {
      const isText = Math.random() < 0.45;
      return {
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.15, 0.15),
        vy: random(-0.15, 0.15),
        size: isText ? random(9, 13) : random(0.8, 2.2),
        alpha: random(0.2, 0.85),
        isText,
        char: dataChars[Math.floor(Math.random() * dataChars.length)],
        targetX: width / 2,
        targetY: height / 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );

      gradient.addColorStop(0, "#071522");
      gradient.addColorStop(0.5, "#020b13");
      gradient.addColorStop(1, "#010407");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = (time: number) => {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = "#66d9ff";
      ctx.lineWidth = 0.5;

      const gridSize = 64;
      const offsetX = (time * 0.004) % gridSize;
      const offsetY = (time * 0.0025) % gridSize;

      for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawIdentityParticles = (elapsed: number, progress: number) => {
      particles.forEach((p, index) => {
        if (progress > 0.75) {
          const angle = index * 0.05;
          const expandSpeed = 2.5 * ((progress - 0.75) / 0.25);
          p.x += Math.cos(angle) * expandSpeed;
          p.y += Math.sin(angle) * expandSpeed;
        } else {
          const targetX = width / 2 + Math.cos(index * 0.15) * (width * 0.22);
          const targetY = height / 2 + Math.sin(index * 0.15) * (height * 0.15);
          p.x += (targetX - p.x) * 0.015 * progress;
          p.y += (targetY - p.y) * 0.015 * progress;
        }

        const pulse = Math.sin(elapsed * 0.002 + index) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(118, 224, 255, ${0.45 * pulse * Math.min(progress * 1.5, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const render = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const overallProgress = Math.min(elapsed / INTRO_DURATION, 1);

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${overallProgress})`;
      }

      drawBackground();
      drawGrid(timestamp);
      drawIdentityParticles(elapsed, easeOut(overallProgress));

      if (elapsed < INTRO_DURATION) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        finishIntro();
      }
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="cinematic-intro cinematic-intro--identity">
      <canvas ref={canvasRef} className="cinematic-intro__canvas" />

      <div className="cinematic-intro__noise" />

      <div className="cinematic-intro__content">
        {/* ONLY WELCOME ANIMATION STAGE */}
        <div className="intro-stage intro-stage--identity intro-stage--active">
          <div className="identity-small">GEN AI • AGENTIC AI • DATA • TECHNOLOGY</div>
          <h1 className="identity-title">WELCOME</h1>
          <div className="identity-line" />
          <div className="identity-bottom">IDEAS → CODE → SOLUTIONS</div>
        </div>
      </div>

      {/* Top system indicator */}
      <div className="intro-topbar">
        <span>PORTFOLIO</span>
        <span className="intro-topbar__status">
          SYSTEM ONLINE <i />
        </span>
      </div>

      {/* Skip Intro */}
      <button
        type="button"
        className="intro-skip"
        onClick={finishIntro}
        aria-label="Skip portfolio introduction"
      >
        SKIP INTRO <span>↗</span>
      </button>

      {/* Progress */}
      <div className="intro-progress">
        <div
          ref={progressBarRef}
          className="intro-progress__bar"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="intro-footer">
        <span>DATA</span>
        <span>→</span>
        <span>GEN AI</span>
        <span>→</span>
        <span>AGENTIC AI</span>
        <span>→</span>
        <span>SOLUTIONS</span>
      </div>
    </div>
  );
};

export default CinematicIntro;