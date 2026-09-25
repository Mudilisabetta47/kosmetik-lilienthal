'use client';

import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { GALLERY } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Höhe (svh) und vertikale Position je Bild – bewusst unregelmäßig für ein Editorial-Layout. */
const LAYOUT: { h: number; align: 'start' | 'center' | 'end' }[] = [
  { h: 64, align: 'center' },
  { h: 46, align: 'start' },
  { h: 58, align: 'end' },
  { h: 70, align: 'center' },
  { h: 48, align: 'end' },
  { h: 62, align: 'start' },
  { h: 52, align: 'center' },
  { h: 68, align: 'end' },
  { h: 46, align: 'start' },
  { h: 60, align: 'center' },
  { h: 54, align: 'end' },
  { h: 66, align: 'start' },
];
const ALIGN = { start: 'self-start mt-[9svh]', center: 'self-center', end: 'self-end mb-[9svh]' } as const;

/**
 * Szene 7 – Fahrzeug-Showcase. Desktop: vertikales Scrollen schiebt ein gepinntes Band horizontal
 * (Bilder mit gegenläufiger Innen-Parallax). Mobil / Reduced Motion: nativer Swipe mit Snap.
 */
export function HorizontalGallery() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const maxX = useMotionValue(0);
  const [height, setHeight] = useState<string>('380svh');
  const { scrollYProgress: p } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform([p, maxX], ([a, b]) => -(a as number) * (b as number));
  const inner = useTransform(p, [0, 1], ['5%', '-5%']);
  const bar = useTransform(p, [0, 1], [0, 1]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const dist = Math.max(0, el.scrollWidth - window.innerWidth);
      maxX.set(dist);
      setHeight(`${Math.round(dist * 0.62 + window.innerHeight)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [maxX]);

  return (
    <section id="galerie" className="relative scroll-mt-20 bg-coal" aria-labelledby="showcase-title">
      {/* Desktop – gepinnt, horizontal */}
      <div ref={outer} className="relative hidden motion-safe:lg:block" style={{ height }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div ref={track} className="flex h-full w-max items-center gap-[3.6vw] pl-[var(--gutter)] pr-[12vw] will-change-transform" style={{ x }}>
            <div className="flex h-full w-[46vw] shrink-0 flex-col justify-center pr-[3vw]">
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Showcase
              </p>
              <h2 id="showcase-title" className="display text-[clamp(2.6rem,5.6vw,6.6rem)]">
                <SplitText text={'Fahrzeuge, die wir\nwieder zum\n*Strahlen* bringen.'} />
              </h2>
              <p className="lede mt-8 max-w-[38ch]">Echte Kundenfahrzeuge aus unserem Studio in Lilienthal – vom Porsche Taycan bis zum Ford Mustang GT.</p>
              <p className="mt-10 flex items-center gap-3 text-[0.8rem] text-mute">
                <span className="h-px w-10 bg-white/30" aria-hidden="true" /> Weiter scrollen
              </p>
            </div>

            {GALLERY.map((g, i) => {
              const l = LAYOUT[i % LAYOUT.length];
              return (
                <figure key={g.img} className={`relative shrink-0 ${ALIGN[l.align]}`} style={{ height: `${l.h}svh`, aspectRatio: '4 / 3' }}>
                  <ImageReveal className="h-full w-full" zoom={0} shift={0} radius={22}>
                    <motion.div className="absolute -inset-x-[8%] inset-y-0" style={{ x: inner }}>
                      <Img k={g.img} alt={`${g.title} – ${g.sub}`} fill sizes="90vh" className="object-cover" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  </ImageReveal>
                  <figcaption className="absolute bottom-5 left-6 right-6 z-10">
                    <p className="text-[1.05rem] font-semibold tracking-tight">{g.title}</p>
                    <p className="text-[0.82rem] text-bone/70">{g.sub}</p>
                  </figcaption>
                  <span className="tabular absolute right-5 top-4 text-[0.75rem] text-bone/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figure>
              );
            })}

            <div className="flex h-full w-[34vw] shrink-0 flex-col justify-center pl-[2vw]">
              <p className="h2 max-w-[11ch]">
                Ihr Fahrzeug <span className="serif-i silver-text">als Nächstes?</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="/termin" cursor="Termin">Ihr Fahrzeug anmelden</Btn>
                <Btn href="/galerie" variant="ghost" icon="up-right" cursor="Galerie">Alle Bilder</Btn>
              </div>
            </div>
          </motion.div>
          <div className="absolute inset-x-[var(--gutter)] bottom-8 h-px bg-white/10" aria-hidden="true">
            <motion.div className="h-full origin-left bg-bone" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>

      {/* Mobil / Reduced Motion – nativer Swipe */}
      <div className="motion-safe:lg:hidden">
        <div className="wrap section-y !pb-10">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Showcase
          </p>
          <h2 id="showcase-title-m" className="display text-[clamp(2.2rem,8vw,5rem)]">
            <SplitText text={'Fahrzeuge, die wir wieder zum *Strahlen* bringen.'} lineClassName="inline" />
          </h2>
          <Reveal>
            <p className="lede mt-6 max-w-[44ch]">Echte Kundenfahrzeuge aus unserem Studio in Lilienthal.</p>
          </Reveal>
        </div>
        <div className="snap-x-track flex gap-3 overflow-x-auto px-[var(--gutter)] pb-4" tabIndex={0} aria-label="Fahrzeuggalerie – seitlich wischen">
          {GALLERY.map((g, i) => (
            <figure key={g.img} className="relative aspect-[4/5] w-[78vw] max-w-[420px] shrink-0 overflow-hidden rounded-[22px] bg-graphite sm:aspect-[4/3] sm:w-[62vw] sm:max-w-[560px]">
              <Img k={g.img} alt={`${g.title} – ${g.sub}`} fill sizes="(min-width:640px) 62vw, 78vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-5 bottom-5">
                <p className="text-[1.05rem] font-semibold tracking-tight">{g.title}</p>
                <p className="text-[0.82rem] text-bone/70">{g.sub}</p>
              </figcaption>
              <span className="tabular absolute right-4 top-3 text-[0.75rem] text-bone/60">{String(i + 1).padStart(2, '0')}</span>
            </figure>
          ))}
        </div>
        <div className="wrap flex flex-wrap gap-3 pb-20 pt-6">
          <Btn href="/termin" cursor="Termin" magnetic={false}>Ihr Fahrzeug anmelden</Btn>
          <Btn href="/galerie" variant="ghost" icon="up-right" magnetic={false}>Alle Bilder</Btn>
        </div>
      </div>
    </section>
  );
}
