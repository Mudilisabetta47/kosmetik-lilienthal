import { SALE_SCOPE, SERVICE_BY_SLUG } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Verkaufsaufbereitung – seriös formuliert, ohne Preisversprechen. */
export function SaleSection() {
  const s = SERVICE_BY_SLUG['verkaufsaufbereitung'];
  return (
    <section id="verkauf" className="relative scroll-mt-20 overflow-hidden curtain bg-graphite section-y" aria-labelledby="sale-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="lg:order-2">
          <Parallax from={-5} to={5}>
            <ImageReveal className="aspect-[4/3] w-full lg:aspect-[5/6]" radius={28} from="right" zoom={0.12}>
              <Img k="m850iFront" alt="Weißes BMW M850i Cabrio nach der Verkaufsaufbereitung vor dem Studio" fill sizes="(min-width:1024px) 46vw, 100vw" position="50% 55%" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-ink/70 px-5 py-3 backdrop-blur">
                <p className="eyebrow">Komplettpaket</p>
                <p className="tabular text-[1.7rem] font-semibold tracking-tight">
                  <span className="mr-1.5 text-[0.9rem] font-medium text-mute">ab</span>{s.priceFrom} €
                </p>
              </div>
            </ImageReveal>
          </Parallax>
        </div>

        <div className="lg:order-1">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Verkaufsaufbereitung
          </p>
          <h2 id="sale-title" className="display text-[clamp(2.3rem,6.6vw,6.6rem)]">
            <SplitText text={'Mehr Eindruck\nbeim Fahrzeug-\n*verkauf.*'} />
          </h2>
          <Reveal>
            <p className="lede mt-8 max-w-[50ch]">
              Eine professionelle Verkaufsaufbereitung sorgt dafür, dass Ihr Fahrzeug gepflegter wirkt und beim ersten Kontakt einen besseren Eindruck macht – für Privatverkauf, Händlerabgabe oder Leasingrückgabe.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {SALE_SCOPE.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.05} blur={false} className="flex gap-4 border-t border-white/[0.1] py-5">
                <span className="tabular pt-0.5 font-serif text-[1.1rem] italic text-brand">0{i + 1}</span>
                <span>
                  <span className="block text-[1.1rem] font-semibold tracking-tight">{it.title}</span>
                  <span className="mt-0.5 block text-[0.9rem] text-mute">{it.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Btn href="/termin?leistung=verkaufsaufbereitung" cursor="Termin">Verkaufsaufbereitung anfragen</Btn>
            <Btn href="/leistungen/verkaufsaufbereitung" variant="ghost" icon="up-right" cursor="Details">Mehr Details</Btn>
          </div>
          <p className="mt-6 max-w-[52ch] text-[0.82rem] leading-relaxed text-mute">
            Wir bereiten Ihr Fahrzeug sorgfältig vor – eine Zusage zu einem bestimmten Verkaufspreis können wir nicht geben.
          </p>
        </div>
      </div>
    </section>
  );
}
