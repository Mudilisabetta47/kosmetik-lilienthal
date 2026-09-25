'use client';

import { useSyncExternalStore } from 'react';

/**
 * Ein Bewegungsprofil für die ganze Seite:
 *  full – Desktop mit Maus: volle Choreografie
 *  lite – Touch / schmale Viewports: kompaktere Reveals, kleine Parallax-Werte
 *  none – prefers-reduced-motion: alles statisch
 * Layout-Umschaltungen laufen ausschließlich über CSS – das Profil steuert nur Intensität.
 */
export type Profile = 'full' | 'lite' | 'none';

const QUERIES = [
  '(prefers-reduced-motion: reduce)',
  '(hover: hover) and (pointer: fine)',
  '(min-width: 768px)',
] as const;

function read(): Profile {
  if (typeof window === 'undefined') return 'full';
  if (window.matchMedia(QUERIES[0]).matches) return 'none';
  const fine = window.matchMedia(QUERIES[1]).matches;
  const wide = window.matchMedia(QUERIES[2]).matches;
  return fine && wide ? 'full' : 'lite';
}

function subscribe(cb: () => void) {
  const mqs = QUERIES.map((q) => window.matchMedia(q));
  mqs.forEach((m) => m.addEventListener('change', cb));
  return () => mqs.forEach((m) => m.removeEventListener('change', cb));
}

export function useMotion(): Profile {
  return useSyncExternalStore(subscribe, read, () => 'full');
}

/** Skalierungsfaktor für Wege/Parallax je Profil */
export const scaleFor = (p: Profile) => (p === 'full' ? 1 : p === 'lite' ? 0.35 : 0);

export const EASE = [0.16, 1, 0.3, 1] as const;

const STICKY_Q = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const subSticky = (cb: () => void) => {
  const m = window.matchMedia(STICKY_Q);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
/** true, wenn Sticky-/Pinned-Szenen aktiv sind (Desktop ≥1024px, keine reduzierte Bewegung). */
export function useSticky(): boolean {
  return useSyncExternalStore(subSticky, () => window.matchMedia(STICKY_Q).matches, () => false);
}
