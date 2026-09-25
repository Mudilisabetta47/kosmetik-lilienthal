import Link from 'next/link';
import { GROUPS, PRICE_NOTE, SERVICES, servicesOf, type GroupId, type Service } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';

const ORDER: GroupId[] = ['lack', 'interieur', 'spezial'];

/** „Individuell“, „Nach Begutachtung“ … aus dem Preishinweis der Leistung */
const noPriceLabel = (s: Service) => {
  if (s.priceNote.startsWith('Individuell')) return 'Individuell';
  const t = s.priceNote.replace(/^Preis /, '');
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/**
 * Preisübersicht als Kartenraster (heller Bereich). Zeigt nur die realen „ab“-Preise der
 * bisherigen Website – Leistungen ohne genannten Preis erscheinen als „Individuell“ bzw. „Auf Anfrage“.
 */
export function PriceTable({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as 'h1' | 'h2';
  return (
    <div className="wrap">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow-dark mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-neutral-400" aria-hidden="true" /> Preise
          </p>
          <H className="h2 max-w-[16ch] text-ink">
            Was kostet eine professionelle <span className="serif-i text-neutral-500">Aufbereitung?</span>
          </H>
        </div>
        <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-neutral-600">
          Transparent und ohne Überraschungen: Hier sehen Sie unsere „ab“-Preise für {SERVICES.length} Leistungen. Den genauen Preis für Ihr Fahrzeug nennen wir nach kurzer Begutachtung.
        </p>
      </div>

      <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
        {ORDER.map((g) => (
          <div key={g}>
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between border-b-2 border-ink pb-4">
                <h3 className="text-[1.5rem] font-semibold tracking-tight text-ink">{GROUPS[g].label}</h3>
                <p className="hidden text-[0.9rem] text-neutral-500 sm:block">{GROUPS[g].title}</p>
              </div>
            </Reveal>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {servicesOf(g).map((s, i) => (
                <Reveal as="li" key={s.slug} delay={(i % 3) * 0.07} blur={false} className="h-full">
                  <article className="flex h-full flex-col rounded-[28px] border border-white bg-white p-7 shadow-[0_24px_60px_-34px_rgba(20,34,74,0.35)] transition-transform duration-500 ease-out hover:-translate-y-1">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand font-serif text-[1.15rem] italic text-ink">
                        {String(SERVICES.indexOf(s) + 1).padStart(2, '0')}
                      </span>
                      <p className="text-right text-ink">
                        <span className="block text-[0.72rem] font-medium uppercase tracking-[0.16em] text-neutral-500">
                          {s.priceFrom ? 'ab' : 'Preis'}
                        </span>
                        {s.priceFrom ? (
                          <span className="tabular text-[clamp(1.7rem,2.6vw,2.2rem)] font-semibold leading-none tracking-tight">
                            <CountUp to={s.priceFrom} decimals={2} duration={1300} /> €
                          </span>
                        ) : (
                          <span className="text-[clamp(1.35rem,2.1vw,1.7rem)] font-semibold leading-tight tracking-tight">{noPriceLabel(s)}</span>
                        )}
                      </p>
                    </div>
                    <h4 className="mt-6 text-[1.35rem] font-semibold tracking-tight text-ink">
                      <Link href={`/leistungen/${s.slug}`} className="hover:underline">{s.name}</Link>
                    </h4>
                    <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-neutral-600">{s.short}</p>
                    <div className="mt-6">
                      <Btn href={`/termin?leistung=${s.slug}`} variant="dark" cursor="Termin" magnetic={false} className="w-full">
                        Termin anfragen
                      </Btn>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Reveal className="mt-14 md:mt-20">
        <div className="grid gap-8 rounded-[28px] bg-ink p-7 text-bone md:p-10 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Preishinweis</p>
            <p className="text-[1rem] leading-relaxed text-bone/90">{PRICE_NOTE.base} {PRICE_NOTE.more}</p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {PRICE_NOTE.surcharges.map((x) => (
              <li key={x.label} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-[0.95rem] text-bone/85">{x.label}</span>
                <span className="tabular font-semibold">{x.value}</span>
              </li>
            ))}
          </ul>
          <Btn href="/leistungen" cursor="Leistungen">Alle Leistungen im Detail</Btn>
        </div>
      </Reveal>
    </div>
  );
}
