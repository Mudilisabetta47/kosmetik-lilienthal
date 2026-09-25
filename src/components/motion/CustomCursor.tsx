'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Dezenter Cursor-Follower (nur Maus, nie Touch/Reduced-Motion). Elemente mit
 * data-cursor="Text" lassen den Ring wachsen und zeigen das Label („Ansehen“, „Termin“).
 * Der rAF-Loop läuft nur, solange der Ring dem Zeiger nachläuft.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine) return;
    setOn(true);

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf = 0;
    let running = false;
    let shown = false;

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (Math.abs(mx - rx) < 0.3 && Math.abs(my - ry) < 0.3) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        rx = mx;
        ry = my;
        ring.current?.style.setProperty('opacity', '1');
        dot.current?.style.setProperty('opacity', '1');
      }
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, summary, [role="slider"]');
      if (!t) {
        setHover(false);
        setLabel('');
        return;
      }
      setHover(true);
      setLabel(t.dataset.cursor ?? '');
    };
    const leave = () => {
      shown = false;
      ring.current?.style.setProperty('opacity', '0');
      dot.current?.style.setProperty('opacity', '0');
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!on) return null;
  const size = label ? 92 : hover ? 56 : 34;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] opacity-0 transition-opacity duration-300"
      >
        <div
          className="grid place-items-center rounded-full border border-white/50 bg-white/0 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white mix-blend-difference transition-[width,height,margin,background-color] duration-300 ease-out"
          style={{ width: size, height: size, margin: `${-size / 2}px 0 0 ${-size / 2}px`, backgroundColor: label ? 'rgba(255,255,255,.14)' : undefined }}
        >
          {label}
        </div>
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ visibility: hover ? 'hidden' : 'visible' }}
      />
    </>
  );
}
