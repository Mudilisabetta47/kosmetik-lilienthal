'use client';

import { motion } from 'framer-motion';
import { Fragment, type ElementType } from 'react';
import { EASE, useMotion } from './useMotion';

/**
 * Zeilen-/Wort-Reveal aus einer Maske. `text`: Zeilen mit \n trennen,
 * *Wort* setzt ein Akzentwort in Serif-Kursiv.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.07,
  immediate = false,
  lineClassName = 'block',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** sofort animieren (Hero) statt beim Eintritt in den Viewport */
  immediate?: boolean;
  lineClassName?: string;
}) {
  const profile = useMotion();
  const lines = text.split('\n');
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  let n = 0;

  const render = (word: string, accent: boolean) => {
    const cls = accent ? 'serif-i silver-text pr-[0.06em] normal-case' : '';
    if (profile === 'none') return <span className={cls}>{word}</span>;
    const i = n++;
    const t = { duration: profile === 'lite' ? 0.8 : 1.15, delay: delay + i * stagger, ease: EASE };
    return (
      <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.14em', marginBottom: '-0.14em', paddingTop: '0.2em', marginTop: '-0.2em' }}>
        <motion.span
          className={`split-inner inline-block will-change-transform ${cls}`}
          initial={{ y: '112%' }}
          {...(immediate ? { animate: { y: '0%' } } : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -8% 0px' } })}
          transition={t}
        >
          {word}
        </motion.span>
      </span>
    );
  };

  return (
    <Tag className={className} aria-label={plain}>
      {lines.map((line, li) => (
        <span key={li} className={lineClassName} aria-hidden="true">
          {line
            .split(/(\*[^*]+\*|\s+)/)
            .filter((p) => p && !/^\s+$/.test(p))
            .map((tok, wi, arr) => {
              const accent = tok.startsWith('*');
              const word = accent ? tok.slice(1, -1) : tok;
              return (
                <Fragment key={wi}>
                  {render(word, accent)}
                  {wi < arr.length - 1 ? ' ' : null}
                </Fragment>
              );
            })}
        </span>
      ))}
    </Tag>
  );
}
