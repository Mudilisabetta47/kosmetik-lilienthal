'use client';

import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Img } from '@/components/ui/Img';
import { useMotion } from '@/components/motion/useMotion';

/**
 * Interaktiver Vorher/Nachher-Vergleich. Der Trenner lässt sich mit Maus, Finger oder
 * Tastatur (←/→) verschieben. `pos` (0–100) gehört dem Elternteil: Der scrollt den Trenner
 * automatisch, bis die Person ihn selbst anfasst (`onTouch`).
 */
export function CompareSlider({
  before,
  after,
  alt,
  pos,
  onTouch,
  sizes = '(min-width:1024px) 60vw, 100vw',
  className = '',
}: {
  before: string;
  after: string;
  alt: string;
  pos: MotionValue<number>;
  onTouch?: () => void;
  sizes?: string;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const labelBefore = useTransform(pos, [0, 14, 22], [0, 0, 1]);
  const labelAfter = useTransform(pos, [78, 86, 100], [1, 0, 0]);

  const setFromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className={`on-photo relative select-none overflow-hidden rounded-[22px] bg-graphite touch-pan-y ${className}`}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        onTouch?.();
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 0 && e.pointerType === 'mouse') return;
        if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) setFromX(e.clientX);
      }}
      data-cursor="Ziehen"
    >
      <Img k={after} alt={`${alt} – nachher`} fill sizes={sizes} className="pointer-events-none object-cover" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ clipPath: clip }}>
        <Img k={before} alt={`${alt} – vorher`} fill sizes={sizes} className="object-cover" />
      </motion.div>

      <motion.span style={{ opacity: labelBefore }} className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
        Vorher
      </motion.span>
      <motion.span style={{ opacity: labelAfter }} className="pointer-events-none absolute right-4 top-4 rounded-full bg-bone px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink">
        Nachher
      </motion.span>

      <motion.div className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.6)]" style={{ left }}>
        <button
          type="button"
          role="slider"
          aria-label="Vergleich verschieben: Vorher / Nachher"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              e.preventDefault();
              onTouch?.();
              pos.set(Math.min(98, Math.max(2, pos.get() + (e.key === 'ArrowLeft' ? -6 : 6))));
            }
          }}
          className="ba-handle pointer-events-auto absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-ink/50 text-white backdrop-blur-md"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

/** Hook: sweept den Trenner einmalig beim Eintritt in den Viewport (mobil / Reduced-Motion-freundlich). */
export function useSweepOnView(pos: MotionValue<number>, touched: { current: boolean }, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const profile = useMotion();
  useEffect(() => {
    if (!enabled || !inView || touched.current) return;
    if (profile === 'none') {
      pos.set(50);
      return;
    }
    const c = animate(pos, [8, 92, 50], { duration: 3, ease: 'easeInOut', times: [0, 0.55, 1] });
    return () => c.stop();
  }, [enabled, inView, pos, touched, profile]);
  return ref;
}

export const usePos = (initial = 50) => useMotionValue(initial);
