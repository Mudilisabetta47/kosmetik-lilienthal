'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Sehr dezente Scroll-Fortschrittslinie (2 px, nur transform). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-gradient-to-r from-brand/40 via-brand to-white"
      style={{ scaleX }}
    />
  );
}
