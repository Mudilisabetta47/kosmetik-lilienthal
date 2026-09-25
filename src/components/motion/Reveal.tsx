'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, useMotion } from './useMotion';

type Dir = 'up' | 'left' | 'right' | 'none';

/** Fade + kurzer Versatz + Blur-to-Sharp. Einmalig beim Eintritt in den Viewport. */
export function Reveal({
  children,
  delay = 0,
  dir = 'up',
  distance = 28,
  blur = true,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  dir?: Dir;
  distance?: number;
  blur?: boolean;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span' | 'section' | 'article';
}) {
  const profile = useMotion();
  const Tag = motion[as] as typeof motion.div;
  if (profile === 'none') {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  const d = profile === 'lite' ? distance * 0.6 : distance;
  const from = { x: dir === 'left' ? -d : dir === 'right' ? d : 0, y: dir === 'up' ? d : 0 };
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, ...from, ...(blur ? { filter: 'blur(8px)' } : {}) }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        // Blur immer zurücksetzen (auch nach dem Wechsel des Bewegungsprofils) und danach ganz entfernen –
        // ein stehengebliebener filter macht Text auf Mobilgeräten unscharf.
        ...(blur ? { filter: 'blur(0px)', transitionEnd: { filter: 'none' } } : {}),
      }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: profile === 'lite' ? 0.7 : 1.05, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
