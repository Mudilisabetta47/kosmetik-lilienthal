'use client';

import { useMemo, useState } from 'react';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/motion/Reveal';

type Item = { img: string; title: string; sub: string };

/** Kategorien werden aus den vorhandenen Bildunterschriften abgeleitet (keine erfundenen Details). */
const CATS = [
  { id: 'all', label: 'Alle', test: () => true },
  { id: 'lack', label: 'Lackaufbereitung & Politur', test: (s: string) => /lackaufbereitung|politur|hochglanz/i.test(s) && !/versiegelung/i.test(s) },
  { id: 'versiegelung', label: 'Versiegelung', test: (s: string) => /versiegelung/i.test(s) },
  { id: 'komplett', label: 'Komplettaufbereitung', test: (s: string) => /komplettaufbereitung|nach der aufbereitung/i.test(s) },
  { id: 'oldtimer', label: 'Oldtimer', test: (s: string) => /oldtimer/i.test(s) },
] as const;

const ASPECTS = ['aspect-[4/3]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[5/4]'];

export function GalleryFilter({ items }: { items: Item[] }) {
  const [cat, setCat] = useState<(typeof CATS)[number]['id']>('all');
  const counts = useMemo(() => Object.fromEntries(CATS.map((c) => [c.id, items.filter((i) => c.test(i.sub)).length])), [items]);
  const test = CATS.find((c) => c.id === cat)!.test;
  const shown = items.filter((i) => test(i.sub));

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Galerie filtern">
        {CATS.filter((c) => counts[c.id] > 0).map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-5 py-2.5 text-[0.9rem] font-medium transition-colors ${
              cat === c.id ? 'border-[#14224a] bg-[#14224a] !text-white' : 'border-[#14224a]/25 text-[#14224a] hover:border-[#14224a]'
            }`}
          >
            {c.label} <span className="tabular opacity-60">({counts[c.id]})</span>
          </button>
        ))}
      </div>
      <ul key={cat} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((g, i) => (
          <Reveal as="li" key={g.img} blur={false} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
            <figure className="img-zoom on-photo group relative overflow-hidden rounded-[22px] bg-graphite" data-cursor="Ansehen">
              <div className={`relative ${ASPECTS[i % ASPECTS.length]}`}>
                <Img k={g.img} alt={`${g.title} – ${g.sub}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute inset-x-5 bottom-4">
                <p className="text-[1.02rem] font-semibold tracking-tight">{g.title}</p>
                <p className="text-[0.82rem] text-bone/70">{g.sub}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
