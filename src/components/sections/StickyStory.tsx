'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { STORY_SCENES } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

const N = STORY_SCENES.length;

/**
 * Szene 3 – „Nicht einfach sauber.“ Desktop: das Bild bleibt stehen, Text und Motiv
 * wechseln szenenweise (Clip-Mask + langsamer Zoom je Szene). Mobil / Reduced Motion:
 * gestapelte Szenen mit Reveals. Nur der Szenenindex ist React-State.
 */
export function StickyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999)));
    setActive((p) => (p === i ? p : i));
  });

  return (
    <section className="relative bg-ink" aria-labelledby="story-title">
      <div className="wrap pb-16 pt-6 md:pb-24">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Der Unterschied
        </p>
        <h2 id="story-title" className="display text-[clamp(2.6rem,10vw,10rem)]">
          <SplitText text={'Nicht einfach\n*sauber.*'} />
        </h2>
      </div>

      {/* Desktop – Sticky-Bühne */}
      <div ref={ref} className="relative hidden h-[420vh] motion-safe:lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-[64%] [mask-image:linear-gradient(to_right,transparent_0%,#000_24%)]">
            {STORY_SCENES.map((s, i) => (
              <div
                key={s.kicker}
                data-state={i > active ? 'future' : i === active ? 'active' : 'past'}
                className="absolute inset-0 overflow-hidden transition-[clip-path] duration-[1100ms] ease-out [clip-path:inset(0_0_0_0)] data-[state=future]:[clip-path:inset(100%_0_0_0)]"
                style={{ zIndex: i }}
              >
                <div className="absolute inset-0 scale-[1.14] transition-transform duration-[7000ms] ease-out data-[on=true]:scale-100" data-on={i === active}>
                  <Img k={s.img} alt="" fill sizes="62vw" position={s.pos} className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent" />
              </div>
            ))}
            <div className="grain absolute inset-0 z-20" />
          </div>

          <div className="wrap relative z-30 grid h-full grid-cols-12 items-center">
            <div className="col-span-5">
              <div className="grid">
                {STORY_SCENES.map((s, i) => (
                  <div
                    key={s.kicker}
                    aria-hidden={i !== active}
                    className={`col-start-1 row-start-1 transition-[opacity,transform] duration-[800ms] ease-out ${
                      i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <p className="eyebrow mb-6">{s.kicker}</p>
                    <p className="h2 max-w-[13ch]">{s.title}</p>
                    <p className="lede mt-7 max-w-[40ch]">{s.text}</p>
                    <Link
                      href={s.href}
                      tabIndex={i === active ? 0 : -1}
                      className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-bone underline-offset-[6px] hover:underline"
                    >
                      Mehr erfahren <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-14 flex items-center gap-4" aria-hidden="true">
                <span className="tabular text-[0.8rem] text-mute">0{active + 1} / 0{N}</span>
                <div className="flex flex-1 gap-2">
                  {STORY_SCENES.map((s, i) => (
                    <span key={s.kicker} className="h-px flex-1 overflow-hidden bg-white/15">
                      <span className={`block h-full bg-bone transition-transform duration-[900ms] ease-out ${i <= active ? 'translate-x-0' : '-translate-x-full'}`} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil / Reduced Motion – gestapelte Szenen */}
      <div className="wrap space-y-20 pb-16 motion-safe:lg:hidden lg:space-y-28">
        {STORY_SCENES.map((s) => (
          <article key={s.kicker} className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <ImageReveal className="aspect-[4/5] w-full sm:aspect-[16/11]" radius={22}>
              <Img k={s.img} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" position={s.pos} className="object-cover" />
            </ImageReveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-4">{s.kicker}</p>
                <p className="h2">{s.title}</p>
                <p className="lede mt-5">{s.text}</p>
                <Link href={s.href} className="mt-6 inline-flex items-center gap-2 font-medium text-bone underline-offset-[6px] hover:underline">
                  Mehr erfahren <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
