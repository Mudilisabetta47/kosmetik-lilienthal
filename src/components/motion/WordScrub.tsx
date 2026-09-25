'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useMotion } from './useMotion';

function Word({ children, p, a, b, accent }: { children: string; p: MotionValue<number>; a: number; b: number; accent: boolean }) {
  const o = useTransform(p, [a, b], [0.14, 1]);
  return (
    <motion.span style={{ opacity: o }} className={accent ? 'serif-i silver-text pr-[0.05em]' : undefined}>
      {children}{' '}
    </motion.span>
  );
}

/** Statement, dessen Wörter beim Scrollen nacheinander „eingeschaltet“ werden. */
export function WordScrub({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const profile = useMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] });
  const words = text.split(/(\*[^*]+\*|\s+)/).filter((w) => w && !/^\s+$/.test(w));

  if (profile === 'none') {
    return <p className={className}>{text.replace(/\*/g, '')}</p>;
  }
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {words.map((w, i) => {
        const accent = w.startsWith('*');
        const a = i / words.length;
        return (
          <Word key={i} p={scrollYProgress} a={a * 0.9} b={Math.min(1, a * 0.9 + 0.12)} accent={accent}>
            {accent ? w.slice(1, -1) : w}
          </Word>
        );
      })}
    </p>
  );
}
