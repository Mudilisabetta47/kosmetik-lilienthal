'use client';

import { motionValue, useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { BEFORE_AFTER } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { scrollToY } from '@/components/motion/SmoothScroll';
import { useSticky } from '@/components/motion/useMotion';
import { CompareSlider, useSweepOnView } from './CompareSlider';

const N = BEFORE_AFTER.length;

const sweep = (t: number) => (t < 0.62 ? 8 + (t / 0.62) * 84 : 92 - ((t - 0.62) / 0.38) * 42);

function Scene({
  i,
  active,
  pos,
  touched,
  sticky,
}: {
  i: number;
  active: number;
  pos: MotionValue<number>;
  touched: { current: boolean };
  sticky: boolean;
}) {
  const s = BEFORE_AFTER[i];
  const ref = useSweepOnView(pos, touched, !sticky);
  const on = i === active;
  return (
    <article
      ref={ref}
      data-active={on}
      className="grid gap-6 transition-[opacity,transform] duration-[800ms] ease-out motion-safe:lg:col-start-1 motion-safe:lg:row-start-1 motion-safe:lg:grid-cols-12 motion-safe:lg:items-end motion-safe:lg:gap-10 motion-safe:lg:data-[active=false]:pointer-events-none motion-safe:lg:data-[active=false]:translate-y-6 motion-safe:lg:data-[active=false]:opacity-0"
      aria-hidden={sticky && !on ? true : undefined}
    >
      <CompareSlider
        before={s.before}
        after={s.after}
        alt={s.alt}
        pos={pos}
        onTouch={() => (touched.current = true)}
        className="aspect-[4/3] w-full motion-safe:lg:col-span-8 motion-safe:lg:max-h-[66svh]"
      />
      <div className="motion-safe:lg:col-span-4 motion-safe:lg:pb-2">
        <p className="eyebrow mb-4">0{i + 1} — {s.label}</p>
        <h3 className="h3">{s.title}</h3>
        <p className="mt-4 max-w-[38ch] text-mute">{s.text}</p>
        <Link href={s.href} tabIndex={sticky && !on ? -1 : 0} className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-bone underline-offset-[6px] hover:underline">
          Zur Leistung <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/**
 * Szene 6 – Vorher/Nachher. Desktop: Sticky-Bühne mit drei Kategorien; der Trenner öffnet sich
 * beim Scrollen (8 % → 92 % → 50 %), bis die Person ihn selbst zieht. Mobil: drei gestapelte
 * Vergleiche, die sich beim Eintritt ins Bild einmal öffnen.
 */
export function BeforeAfter() {
  const outer = useRef<HTMLDivElement>(null);
  const sticky = useSticky();
  const [active, setActive] = useState(0);
  const [poss] = useState(() => BEFORE_AFTER.map(() => motionValue(50)));
  const touched = useRef(BEFORE_AFTER.map(() => ({ current: false })));
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!sticky) return;
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999)));
    setActive((p) => (p === i ? p : i));
    const local = v * N - i;
    if (!touched.current[i].current) poss[i].set(sweep(Math.min(1, Math.max(0, local))));
  });

  const jump = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    scrollToY(top + (i / N + 0.02) * range);
  };

  return (
    <section id="vorher-nachher" className="relative scroll-mt-20 curtain bg-ink" aria-labelledby="ba-title">
      <div className="wrap pt-[clamp(80px,11vw,170px)]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Vorher / Nachher
            </p>
            <h2 id="ba-title" className="display text-[clamp(2.4rem,8vw,8rem)]">
              <SplitText text={'Sichtbare\n*Ergebnisse.*'} />
            </h2>
          </div>
          <Reveal className="max-w-[44ch]">
            <p className="lede">Ziehen Sie den Regler und sehen Sie den Unterschied – für Lack, Innenraum und Versiegelung.</p>
          </Reveal>
        </div>
      </div>

      <div ref={outer} className="relative mt-12 motion-safe:lg:h-[330vh]">
        <div className="motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:flex motion-safe:lg:h-[100svh] motion-safe:lg:flex-col motion-safe:lg:justify-end motion-safe:lg:pb-[5svh] motion-safe:lg:pt-[calc(var(--header-h)+10px)]">
          <div className="wrap w-full">
            {/* Tabs (nur Sticky) */}
            <div className="mb-6 hidden items-center gap-2 motion-safe:lg:flex" role="tablist" aria-label="Kategorie">
              {BEFORE_AFTER.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => jump(i)}
                  className={`rounded-full border px-5 py-2 text-[0.85rem] font-medium transition-colors ${
                    i === active ? 'border-bone bg-bone text-ink' : 'border-white/20 text-bone/80 hover:border-white/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="grid gap-16 pb-20 motion-safe:lg:pb-0">
              {BEFORE_AFTER.map((s, i) => (
                <Scene key={s.id} i={i} active={active} pos={poss[i]} touched={touched.current[i]} sticky={sticky} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
