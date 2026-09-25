'use client';

import { useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { BEFORE_AFTER } from '@/lib/data';
import { CompareSlider, useSweepOnView } from './CompareSlider';

/** Eigenständiger Vorher/Nachher-Vergleich für Unterseiten (öffnet sich beim Eintritt einmal selbst). */
export function CompareBlock({ id, className = '' }: { id: 'lack' | 'innenraum' | 'versiegelung'; className?: string }) {
  const s = BEFORE_AFTER.find((b) => b.id === id)!;
  const pos = useMotionValue(50);
  const touched = useRef(false);
  const ref = useSweepOnView(pos, touched, true);
  return (
    <div ref={ref}>
      <CompareSlider before={s.before} after={s.after} alt={s.alt} pos={pos} onTouch={() => (touched.current = true)} className={`aspect-[4/3] w-full ${className}`} />
    </div>
  );
}
