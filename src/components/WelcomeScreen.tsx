import React, { useEffect, useRef, useState } from "react";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WELCOME_DURATION = 2200;

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [stage, setStage] = useState<number>(0);
  const [fadingOut, setFadingOut] = useState<boolean>(false);
  const completedRef = useRef<boolean>(false);

  const handleEnter = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

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

    const particles: Array<{ x: number; y: number; size: number; alpha: number; vx: number; vy: number }> = [];
    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.4 + 0.1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }

    const render = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Staggered sequence
      if (elapsed >= 1800) setStage(4);
      else if (elapsed >= 1300) setStage(3);
      else if (elapsed >= 800) setStage(2);
      else if (elapsed >= 300) setStage(1);

      // Background
      ctx.fillStyle = "#010407";
      ctx.fillRect(0, 0, width, height);

      // Soft glow center
      const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.45);
      glow.addColorStop(0, "rgba(109, 220, 255, 0.08)");
      glow.addColorStop(1, "rgba(1, 4, 7, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Subtle technical grid
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = "#66d9ff";
      ctx.lineWidth = 0.5;
      const gridSize = 64;
      const offsetX = (timestamp * 0.005) % gridSize;
      for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Low opacity particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(118, 224, 255, ${p.alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (elapsed < WELCOME_DURATION) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        handleEnter();
      }
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={`welcome-screen ${fadingOut ? "welcome-screen--fade-out" : ""}`}>
      <canvas ref={canvasRef} className="welcome-screen__canvas" />
      <div className="welcome-screen__content">
        <h1 className={`welcome-title ${stage >= 1 ? "welcome-title--visible" : ""}`}>
          WELCOME
        </h1>
        <h2 className={`welcome-name ${stage >= 2 ? "welcome-name--visible" : ""}`}>
          RICHARD A T
        </h2>
        <p className={`welcome-subtitle ${stage >= 3 ? "welcome-subtitle--visible" : ""}`}>
          AI • FRONTEND • DATA • TECHNOLOGY
        </p>
        <div className={`welcome-tagline ${stage >= 4 ? "welcome-tagline--visible" : ""}`}>
          <span>IDEAS</span> <i>→</i> <span>CODE</span> <i>→</i> <span>SOLUTIONS</span>
        </div>
      </div>

      <button
        type="button"
        className="welcome-enter-btn"
        onClick={handleEnter}
        aria-label="Enter portfolio"
      >
        ENTER <span>→</span>
      </button>
    </div>
  );
}
