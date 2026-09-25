import Link from 'next/link';
import { GROUPS, PRICE_NOTE, servicesOf, type GroupId } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';

const ORDER: GroupId[] = ['lack', 'interieur', 'spezial'];

/** Preisübersicht (heller Bereich). Nur reale „ab“-Preise der bisherigen Website. */
export function PriceTable({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as 'h1' | 'h2';
  return (
    <div className="wrap">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow-dark mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-neutral-400" aria-hidden="true" /> Preise
          </p>
          <H className="h2 max-w-[14ch] text-ink">
            Was kostet eine professionelle <span className="serif-i text-neutral-500">Aufbereitung?</span>
          </H>
          <p className="mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed text-neutral-600">
            Transparent und ohne Überraschungen: Hier sehen Sie unsere „ab“-Preise. Den genauen Preis für Ihr Fahrzeug nennen wir nach kurzer Begutachtung.
          </p>

          <div className="mt-10 rounded-3xl bg-ink p-7 text-bone">
            <p className="eyebrow mb-4">Preishinweis</p>
            <p className="text-[0.98rem] leading-relaxed text-bone/85">{PRICE_NOTE.base}</p>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {PRICE_NOTE.surcharges.map((s) => (
                <li key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-[0.95rem] text-bone/85">{s.label}</span>
                  <span className="tabular font-semibold">{s.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.85rem] leading-relaxed text-mute">{PRICE_NOTE.more}</p>
            <div className="mt-6">
              <Btn href="/termin" cursor="Termin">Angebot anfragen</Btn>
            </div>
          </div>
        </div>

        <div className="space-y-14">
          {ORDER.map((g) => (
            <div key={g}>
              <Reveal>
                <div className="mb-2 flex items-baseline justify-between border-b-2 border-ink pb-4">
                  <h3 className="text-[1.6rem] font-semibold tracking-tight text-ink">{GROUPS[g].label}</h3>
                  <p className="hidden text-[0.9rem] text-neutral-500 sm:block">{GROUPS[g].title}</p>
                </div>
              </Reveal>
              <ul>
                {servicesOf(g).map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={i * 0.05} blur={false} className="group border-b border-neutral-300">
                    <Link
                      href={`/leistungen/${s.slug}`}
                      data-cursor="Details"
                      className="flex items-center justify-between gap-6 py-5 transition-[padding] duration-500 hover:pl-3 md:py-6"
                    >
                      <span>
                        <span className="block text-[1.15rem] font-semibold tracking-tight text-ink md:text-[1.35rem]">{s.name}</span>
                        <span className="mt-1 hidden max-w-[46ch] text-[0.9rem] text-neutral-500 md:block">{s.short}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-4 text-right">
                        {s.priceFrom ? (
                          <span className="tabular text-ink">
                            <span className="mr-1.5 text-[0.85rem] font-medium text-neutral-500">ab</span>
                            <span className="text-[1.6rem] font-semibold tracking-tight md:text-[2rem]">
                              <CountUp to={s.priceFrom} duration={1300} /> €
                            </span>
                          </span>
                        ) : (
                          <span className="max-w-[16ch] text-[0.88rem] font-medium leading-snug text-neutral-600">{s.priceNote}</span>
                        )}
                        <Icon name="up-right" className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-ink" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
