import Image from 'next/image';
import Link from 'next/link';
import { BRANDS, BRAND_DISCLAIMER, BRAND_LOGO_KEYS } from '@/lib/data';
import { BRAND_LOGOS, type BrandLogoKey } from '@/lib/brands.generated';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/**
 * „Diese Marken waren bereits bei uns“ – Herstellerlogos (vom Inhaber bereitgestellt, Quellen: docs/logo-quellen.json),
 * einheitlich entfärbt und beim Hover in Originalfarbe. Mit Hinweis, dass keine Partnerschaft besteht.
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

        <ul className="mt-12 grid grid-cols-2 border-l border-t border-[#14224a]/12 bg-white sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((b, i) => (
            <Reveal as="li" key={b} blur={false} delay={(i % 4) * 0.06} className="border-b border-r border-[#14224a]/12">
              <Link
                href="/galerie"
                data-cursor="Galerie"
                aria-label={`${b} – Fahrzeuge in der Galerie ansehen`}
                className="group flex min-h-[150px] flex-col items-center justify-center gap-4 px-4 py-8 text-center transition-colors duration-500 hover:bg-paper md:min-h-[190px]"
              >
                <span className="flex min-h-[64px] flex-col items-center justify-center gap-3 md:min-h-[76px]">
                  {BRAND_LOGO_KEYS[b].map((k, idx) => {
                    const logo = BRAND_LOGOS[k as BrandLogoKey];
                    const small = BRAND_LOGO_KEYS[b].length > 1 && idx > 0;
                    return (
                      <Image
                        key={k}
                        src={logo.src}
                        width={logo.width}
                        height={logo.height}
                        alt={idx === 0 ? b : ''}
                        sizes="160px"
                        className={`w-auto object-contain opacity-70 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0 ${
                          small
                            ? 'max-h-[16px] max-w-[110px] md:max-h-[18px]'
                            : logo.width / logo.height > 8
                              ? 'max-w-[150px] md:max-w-[200px]'
                              : 'max-h-[56px] max-w-[130px] md:max-h-[68px] md:max-w-[160px]'
                        }`}
                      />
                    );
                  })}
                </span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-mute">{b}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Link href="/galerie" className="inline-flex items-center gap-2 text-[1rem] font-medium text-[#14224a] underline-offset-[6px] hover:underline">
              Fahrzeuge in der Galerie ansehen <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <p className="max-w-[62ch] text-[0.78rem] leading-relaxed text-mute">{BRAND_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}
