/**
 * Monograph Ledger - Global Motion Configuration
 * Unified animation tokens, spring physics, and timing curves
 */

export const TRANSITIONS = {
  // Editorial smooth snap (luxurious ease-out)
  editorial: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  // Responsive UI micro-interaction spring
  springResponsive: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  // Tactile magnetic hover spring
  springMagnetic: {
    type: 'spring' as const,
    stiffness: 250,
    damping: 18,
    mass: 0.5,
  },
  // Deep modal / drawer layout transition
  layoutSpring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 32,
    mass: 1,
  },
  // Fast fade for clean exits
  fadeFast: {
    duration: 0.25,
    ease: 'easeOut' as const,
  },
} as const;

export const VARIANTS = {
  // Fade and rise
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  // Subtle scale and fade for cards
  cardEnter: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  // Horizontal reveal for metadata and ledgers
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  // Parent container stagger
  staggerContainer: (staggerChildren = 0.08, delayChildren = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),
};
