'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { EASE, scaleFor, useMotion } from './useMotion';

/**
 * Bildfläche mit Clip-Path-Reveal (Maske öffnet sich), Scale-Reveal und Blur-to-Sharp,
 * danach – solange sichtbar – sanfter Scroll-Zoom und Parallax im Inneren.
 * Der Container braucht eine feste Größe/Aspect-Ratio (per className).
 */
export function ImageReveal({
  children,
  className,
  zoom = 0.1,
  shift = 6,
  radius = 24,
  delay = 0,
  from = 'bottom',
}: {
  children: ReactNode;
  className?: string;
  /** zusätzlicher Scroll-Zoom (0.1 = 10 %) */
  zoom?: number;
  /** vertikale Innenverschiebung in % */
  shift?: number;
  radius?: number;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const profile = useMotion();
  const k = scaleFor(profile);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 + zoom * k, 1 + zoom * 0.4 * k, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift * k}%`, `${shift * k}%`]);

  if (profile === 'none') {
    return (
      <div className={`relative overflow-hidden ${className ?? ''}`} style={{ borderRadius: radius }}>
        {children}
      </div>
    );
  }

  const inset =
    from === 'left'
      ? `inset(0% 100% 0% 0% round ${radius}px)`
      : from === 'right'
        ? `inset(0% 0% 0% 100% round ${radius}px)`
        : `inset(100% 0% 0% 0% round ${radius}px)`;

  return (
    <motion.div
      data-reveal
      ref={ref}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{ borderRadius: radius }}
      initial={{ clipPath: inset }}
      whileInView={{ clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: profile === 'lite' ? 0.9 : 1.3, delay, ease: EASE }}
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale, y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
