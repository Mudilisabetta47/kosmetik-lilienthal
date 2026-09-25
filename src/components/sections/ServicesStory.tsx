'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GROUPS, SERVICES, servicesOf, type GroupId, type Service } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { useActiveIndex } from '@/components/motion/useActive';

const ORDER: GroupId[] = ['lack', 'interieur', 'spezial'];

function PriceBadge({ s, big = false }: { s: Service; big?: boolean }) {
  return (
    <span className={`tabular inline-flex items-baseline gap-1.5 ${big ? 'text-[1.6rem]' : 'text-[1.05rem]'} font-semibold`}>
      {s.priceFrom ? (
        <>
          <span className="text-[0.72em] font-medium text-mute">ab</span> {s.priceFrom} €
        </>
      ) : (
        <span className="text-[0.8em] font-medium text-bone/85">{s.priceNote}</span>
      )}
    </span>
  );
}

/**
 * Szene 4 – Leistungen als Story. Desktop: links eine Sticky-Bühne, deren Bild mit der
 * aktiven Leistung wechselt (Crossfade + Zoom, Glow wandert mit); rechts werden die Leistungen
 * in drei Gruppen gescrollt – die aktive ist hell, die anderen gedimmt. Mobil: jede Leistung
 * als große Karte mit eigenem Bild.
 */
export function ServicesStory() {
  const list = useRef<HTMLDivElement>(null);
  const active = useActiveIndex(list, '[data-idx]');
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));
  useEffect(() => {
    setLoaded((prev) => {
      const next = new Set(prev);
      [active - 1, active, active + 1].forEach((i) => i >= 0 && i < SERVICES.length && next.add(i));
      return next.size === prev.size ? prev : next;
    });
  }, [active]);

  const flat = ORDER.flatMap((g) => servicesOf(g));
  const current = flat[active] ?? flat[0];

  return (
    <section id="leistungen" className="relative scroll-mt-20 bg-coal" aria-labelledby="leistungen-title">
      <div className="wrap pt-[clamp(88px,12vw,180px)]">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Leistungen
        </p>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 id="leistungen-title" className="display text-[clamp(2.4rem,8vw,8rem)]">
            <SplitText text={'Pflege auf\n*höchstem* Niveau.'} />
          </h2>
          <Reveal className="max-w-[44ch]">
            <p className="lede">
              Vom schnellen Innen-Service bis zur kompletten Lackaufbereitung – alles für Ihr Fahrzeug aus einer Hand, geordnet nach Lack, Interieur und Spezialleistungen.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="wrap mt-16 grid gap-x-16 lg:mt-24 lg:grid-cols-[1fr_1.05fr]">
        {/* Sticky-Bühne (Desktop) */}
        <div className="relative hidden lg:block">
          <div className="sticky top-[96px] h-[calc(100svh-132px)] min-h-[520px] max-h-[820px]">
            <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-graphite">
              {flat.map((s, i) => (
                <div
                  key={s.slug}
                  aria-hidden="true"
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1000ms] ease-out ${
                    i === active ? 'scale-100 opacity-100' : 'scale-[1.07] opacity-0'
                  }`}
                >
                  {loaded.has(i) && <Img k={s.img} alt="" fill sizes="(min-width:1024px) 44vw, 100vw" position={s.imgPosition} className="object-cover" />}
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              {/* wandernder Glow */}
              <div
                aria-hidden="true"
                className="absolute -left-1/4 top-0 h-full w-3/4 bg-[radial-gradient(closest-side,rgba(52,154,214,0.22),transparent)] transition-transform duration-[1400ms] ease-out"
                style={{ transform: `translate3d(${(active / Math.max(1, flat.length - 1)) * 90}%, ${active % 2 ? 12 : -12}%, 0)` }}
              />
              <div className="grain absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
                <div>
                  <p className="eyebrow mb-2">{GROUPS[current.group].label}</p>
                  <p className="text-[1.5rem] font-semibold tracking-tight">{current.name}</p>
                </div>
                <PriceBadge s={current} big />
              </div>
              <div className="absolute right-6 top-6 tabular text-[0.8rem] text-bone/70">
                {String(active + 1).padStart(2, '0')} / {String(flat.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div ref={list}>
          {ORDER.map((g) => {
            const items = servicesOf(g);
            return (
              <div key={g} className="pb-6 lg:pb-16">
                <div className="mb-8 mt-4 border-t border-white/[0.1] pt-8 lg:mt-0 lg:pt-10">
                  <p className="eyebrow">{GROUPS[g].label}</p>
                  <p className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em]">{GROUPS[g].title}</p>
                  <p className="mt-3 max-w-[44ch] text-mute">{GROUPS[g].text}</p>
                </div>
                <ul>
                  {items.map((s) => {
                    const idx = flat.indexOf(s);
                    const isActive = idx === active;
                    return (
                      <li
                        key={s.slug}
                        data-idx={idx}
                        className={`py-8 transition-opacity duration-500 lg:flex lg:min-h-[46vh] lg:flex-col lg:justify-center lg:py-10 ${
                          isActive ? 'lg:opacity-100' : 'lg:opacity-[0.32]'
                        }`}
                      >
                        {/* mobiles Bild */}
                        <ImageReveal className="mb-6 aspect-[4/3] w-full lg:hidden" radius={20} zoom={0.06} shift={4}>
                          <Img k={s.img} alt={s.heroAlt} fill sizes="(min-width:768px) 90vw, 100vw" position={s.imgPosition} className="object-cover" />
                        </ImageReveal>
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="tabular text-[0.8rem] text-mute">{String(idx + 1).padStart(2, '0')}</p>
                          <PriceBadge s={s} />
                        </div>
                        <h3 className="h3 mt-3 lg:mt-4 lg:!text-[clamp(2rem,3.4vw,3.4rem)]">
                          <Link href={`/leistungen/${s.slug}`} className="hover:text-white">
                            {s.name}
                          </Link>
                        </h3>
                        <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-mute lg:text-[1.1rem]">{s.short}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <Btn href={`/termin?leistung=${s.slug}`} variant="ghost" cursor="Termin" className="!min-h-[46px] !px-5 !text-[0.9rem]">
                            Termin anfragen
                          </Btn>
                          <Link
                            href={`/leistungen/${s.slug}`}
                            data-cursor="Ansehen"
                            className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-bone underline-offset-[6px] hover:underline"
                          >
                            Details <Icon name="up-right" className="h-4 w-4" />
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-16 lg:h-28" />
    </section>
  );
}
