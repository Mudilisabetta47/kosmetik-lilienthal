'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { scaleFor, useMotion } from './useMotion';

/** Ebene, die sich beim Scrollen mit eigener Geschwindigkeit bewegt (Prozent der Eigenhöhe). */
export function Parallax({
  children,
  from = -8,
  to = 8,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const profile = useMotion();
  const k = scaleFor(profile);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${from * k}%`, `${to * k}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
