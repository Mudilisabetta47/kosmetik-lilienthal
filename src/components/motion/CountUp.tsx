'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotion } from './useMotion';

/** Zählt beim Eintritt in den Viewport einmalig hoch. Nur für echte Zahlen. */
export function CountUp({
  to,
  decimals = 0,
  duration = 1600,
  className,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const profile = useMotion();
  const [v, setV] = useState(profile === 'none' ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (profile === 'none') {
      setV(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, profile]);

  const shown = (profile === 'none' || inView ? v : 0).toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={`tabular ${className ?? ''}`}>
      {shown}
    </span>
  );
}
