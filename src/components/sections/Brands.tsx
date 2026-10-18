import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/**
 * „Diese Marken waren bereits bei uns“ – bewusst als Schriftleiste ohne Herstellerlogos:
 * Logos sind eingetragene Marken und könnten eine offizielle Partnerschaft suggerieren.
 */
export function Brands() {
  return (
    <section className="light bg-paper py-[clamp(72px,10vw,150px)]" aria-labelledby="brands-title">
      <div className="wrap">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Kundenfahrzeuge
        </p>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <h2 id="brands-title" className="h2 max-w-[16ch]">
            <SplitText text={'Diese Marken waren\n*bereits bei uns.*'} />
          </h2>
          <Reveal>
            <p className="text-[1.05rem] leading-relaxed text-mute">
              Vom sportlichen Cabrio bis zum klassischen Liebhaberfahrzeug: Entdecken Sie ausgewählte Kundenfahrzeuge aus unserer Aufbereitung in Lilienthal.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 border-l border-t border-[#14224a]/12 sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((b, i) => (
            <Reveal as="li" key={b} blur={false} delay={(i % 4) * 0.06} className="border-b border-r border-[#14224a]/12">
              <Link
                href="/galerie"
                data-cursor="Galerie"
                className="group flex min-h-[112px] items-center justify-center px-4 py-8 text-center transition-colors duration-500 hover:bg-[#14224a] md:min-h-[140px]"
              >
                <span className="text-[clamp(1.05rem,2.2vw,1.7rem)] font-semibold uppercase leading-tight tracking-[0.14em] text-[#14224a] transition-colors duration-500 group-hover:text-white">
                  {b}
                </span>
              </Link>
            </Reveal>
          ))}
          <li className="flex items-center justify-center border-b border-r border-[#14224a]/12 px-4 py-8 text-center font-serif text-[1.3rem] italic text-mute">
            … und viele mehr
          </li>
        </ul>

        <Reveal className="mt-10">
          <Link href="/galerie" className="inline-flex items-center gap-2 text-[1rem] font-medium text-[#14224a] underline-offset-[6px] hover:underline">
            Fahrzeuge in der Galerie ansehen <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
