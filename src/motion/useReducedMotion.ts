import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook to detect if the user has requested reduced motion in their system preferences.
 * Ensures strict accessibility compliance across all animated components.
 * Supports '?motion=1' query parameter override for development and verification testing.
 */
export function useReducedMotion(): boolean {
  const prefersReduced = useFramerReducedMotion();

  if (typeof window !== 'undefined' && window.location.search.includes('motion=1')) {
    return false;
  }

  return Boolean(prefersReduced);
}
