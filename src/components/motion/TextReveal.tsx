import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../motion/useReducedMotion';
import { TRANSITIONS } from '../../motion/tokens';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  tag = 'span',
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    const Tag = tag;
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: TRANSITIONS.editorial.ease,
      },
    },
  };

  const Component = motion[tag] as any;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      style={{ display: 'inline-block', overflow: 'hidden' }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: index === words.length - 1 ? 0 : '0.28em',
            verticalAlign: 'bottom',
          }}
        >
          <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
