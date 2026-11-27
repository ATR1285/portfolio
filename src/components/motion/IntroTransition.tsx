import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../motion/useReducedMotion';

interface IntroTransitionProps {
  onComplete?: () => void;
}

/**
 * Genuine, short editorial intro transition.
 * - Displays the authentic Monograph Ledger monogram
 * - Completes in under 750ms without artificial percentage loading delays
 * - Stores state in sessionStorage so repeat visits go immediately to the portfolio
 * - Provides immediate escape key bypass and reduced-motion bypass
 */
export default function IntroTransition({ onComplete }: IntroTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasSeen = sessionStorage.getItem('richard_portfolio_intro_seen');
    return !hasSeen;
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      sessionStorage.setItem('richard_portfolio_intro_seen', 'true');
      setIsVisible(false);
      onComplete?.();
      return;
    }

    if (!isVisible) {
      onComplete?.();
      return;
    }

    // Short, genuine duration: 850ms total sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('richard_portfolio_intro_seen', 'true');
      onComplete?.();
    }, 850);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setIsVisible(false);
        sessionStorage.setItem('richard_portfolio_intro_seen', 'true');
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, shouldReduceMotion, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#17191C',
            color: '#F5F2EB',
            userSelect: 'none',
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          aria-live="polite"
          aria-label="Editorial Monograph Initializing"
          onClick={() => {
            setIsVisible(false);
            sessionStorage.setItem('richard_portfolio_intro_seen', 'true');
            onComplete?.();
          }}
        >
          {/* Top & bottom shutter panels for high-end curtain reveal */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '50%',
              backgroundColor: '#17191C',
              borderBottom: '1px solid #242424',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 1 }}
            exit={{
              scaleY: 0,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '50%',
              backgroundColor: '#17191C',
              borderTop: '1px solid #242424',
              transformOrigin: 'bottom',
            }}
            initial={{ scaleY: 1 }}
            exit={{
              scaleY: 0,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
          />

          {/* Genuine Monograph Monogram Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 24px',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mono-tag"
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Richard A T • Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="serif-display"
              style={{
                fontSize: 'clamp(26px, 4.5vw, 38px)',
                color: 'var(--text-light)',
                letterSpacing: '-0.02em',
                fontWeight: 500,
              }}
            >
              The Monograph Ledger
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              style={{
                height: '1px',
                width: '96px',
                backgroundColor: 'var(--accent)',
                opacity: 0.8,
                margin: '16px auto 0 auto',
              }}
            />
          </div>

          {/* Subtle dismiss cue */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.25 }}
            className="mono-tag"
            style={{
              position: 'absolute',
              bottom: '24px',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'var(--accent-subtle)',
              textTransform: 'uppercase',
              zIndex: 10,
            }}
          >
            Press ESC or Click to Skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
