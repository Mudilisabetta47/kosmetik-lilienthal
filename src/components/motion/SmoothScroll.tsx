'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis für sanftes Scrollen – nur Maus, nie bei reduzierter Bewegung. Der rAF-Loop
 * läuft ausschließlich während gescrollt wird und stoppt danach von selbst.
 */
let instance: Lenis | null = null;

/** Scrollt sanft zu einer y-Position – über Lenis, falls aktiv, sonst nativ. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

export function SmoothScroll() {
  const pathname = usePathname();
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
    ref.current = lenis;
    instance = lenis;
    let raf = 0;
    let running = false;
    let idle = 0;

    const loop = (t: number) => {
      lenis.raf(t);
      if (lenis.isScrolling) idle = 0;
      else idle++;
      if (idle > 40) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      idle = 0;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    wake();
    window.addEventListener('wheel', wake, { passive: true });
    window.addEventListener('keydown', wake, { passive: true });
    window.addEventListener('touchmove', wake, { passive: true });
    lenis.on('scroll', wake);

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || url.hash.length < 2) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      history.pushState(null, '', url.hash);
      wake();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
    };
    document.addEventListener('click', onAnchor);

    return () => {
      document.removeEventListener('click', onAnchor);
      window.removeEventListener('wheel', wake);
      window.removeEventListener('keydown', wake);
      window.removeEventListener('touchmove', wake);
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
      instance = null;
    };
  }, []);

  useEffect(() => {
    if (!location.hash) ref.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
