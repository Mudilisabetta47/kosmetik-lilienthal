'use client';

import { useState } from 'react';
import type { Faq as FaqType } from '@/lib/data';
import Link from 'next/link';
import { PLACE_LINKS } from '@/lib/places';
import { Icon } from '@/components/ui/Icon';

/** Akkordeon. Antworten stehen immer im DOM (grid-rows-Transition), damit FAQPage-Markup den sichtbaren Inhalten entspricht. */
export function Faq({ items, idPrefix = 'faq', tone = 'dark' }: { items: FaqType[]; idPrefix?: string; tone?: 'dark' | 'light' }) {
  const [open, setOpen] = useState<number | null>(null);
  const light = tone === 'light';
  return (
    <ul className={`divide-y ${light ? 'divide-neutral-300 border-y border-neutral-300' : 'divide-white/[0.1] border-y border-white/[0.1]'}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-${i}`}
                id={`${idPrefix}-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                data-cursor={isOpen ? 'Schließen' : 'Öffnen'}
                className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className={`text-[1.1rem] font-semibold leading-snug tracking-tight md:text-[1.3rem] ${light ? 'text-ink' : ''}`}>{f.q}</span>
                <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform duration-500 ${light ? 'border-neutral-400 text-ink' : 'border-white/25'} ${isOpen ? 'rotate-45' : ''}`}>
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${idPrefix}-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-btn-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className={`max-w-[68ch] text-[1.02rem] leading-relaxed ${light ? 'text-neutral-600' : 'text-mute'} ${f.list ? '' : 'pb-7'}`}>{f.a}</p>
                {f.list && (
                  <div className="pb-7 pt-4">
                    {f.listIntro && <p className="mb-3 text-[0.95rem] font-medium">{f.listIntro}</p>}
                    <ul className="flex flex-wrap gap-2">
                      {f.list.map((name) => {
                        const href = PLACE_LINKS[name];
                        return (
                          <li key={name}>
                            {href ? (
                              <Link href={href} tabIndex={isOpen ? 0 : -1} className="inline-block rounded-full border border-white/20 px-3.5 py-1.5 text-[0.88rem] transition-colors hover:border-brand hover:text-brand">
                                {name}
                              </Link>
                            ) : (
                              <span className="inline-block rounded-full border border-white/20 px-3.5 py-1.5 text-[0.88rem]">{name}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
