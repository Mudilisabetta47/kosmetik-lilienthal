'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Welches Kind-Element (data-idx) kreuzt gerade die Viewport-Mitte? Nur Index-State, nie pro Frame. */
export function useActiveIndex(container: RefObject<HTMLElement | null>, selector = '[data-idx]') {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [container, selector]);
  return active;
}
