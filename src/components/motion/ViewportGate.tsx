import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface ViewportGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

/**
 * High-performance viewport observer.
 * Pauses or unmounts resource-heavy rendering (such as 3D WebGL canvases or intense RAF loops)
 * when the component is outside the visible viewport.
 */
export default function ViewportGate({
  children,
  fallback = null,
  rootMargin = '150px 0px 150px 0px',
  threshold = 0,
  className = '',
}: ViewportGateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}
