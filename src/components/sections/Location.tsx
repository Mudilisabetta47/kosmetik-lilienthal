import { SITE } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { MapEmbed } from './MapEmbed';
import { OpenNow } from './OpenNow';

/** Standort: großes Studiobild, Adresse, Öffnungszeiten, Karte (Click-to-load) und Termin-CTA. */
export function Location({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as 'h1' | 'h2';
  return (
    <section id="standort" className="relative scroll-mt-20 light curtain bg-paper section-y" aria-labelledby="standort-title">
      <div className="wrap">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Standort
        </p>
        <H id="standort-title" className="display max-w-[14ch] text-[clamp(2.4rem,7.4vw,7.6rem)]">
          <SplitText text={'Besuchen Sie uns\nin *Lilienthal.*'} />
        </H>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="card-glass h-full rounded-[28px] p-7 md:p-10">
              <p className="eyebrow mb-5">Adresse</p>
              <address className="not-italic">
                <p className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {SITE.street}
                  <br />
                  {SITE.zip} {SITE.city}
                </p>
                <p className="mt-3 flex items-center gap-2 text-mute">
                  <Icon name="pin" className="h-4 w-4" /> {SITE.landmark}
                </p>
              </address>

              <p className="eyebrow mb-3 mt-10">Telefon</p>
              <a href={SITE.phoneHref} data-cursor="Anrufen" className="tabular inline-flex items-center gap-3 text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-tight hover:underline">
                <Icon name="phone" className="h-6 w-6" />
                {SITE.phoneDisplay}
              </a>

              <div className="mb-3 mt-10 flex items-center justify-between gap-3">
                <p className="eyebrow">Öffnungszeiten</p>
                <OpenNow />
              </div>
              <ul className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-bone/85">{h.day}</span>
                    <span className={`tabular ${h.open ? 'font-semibold text-bone' : 'text-mute'}`}>{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.85rem] text-mute">Termine nach Vereinbarung.</p>

              <div className="mt-9 flex flex-col gap-3">
                <Btn href="/termin" cursor="Termin">Termin in Lilienthal vereinbaren</Btn>
                <Btn href={SITE.mapsRoute} variant="ghost" icon="up-right" cursor="Route">Route planen</Btn>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            <Parallax from={-3} to={3}>
              <ImageReveal className="on-photo aspect-[16/10] w-full" radius={28} from="right" zoom={0.08}>
                <Img k="shopPorsches" alt="Das Studio autokosmetik Lilienthal in der Falkenberger Landstraße mit aufbereiteten Porsche 911 Fahrzeugen" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 text-[0.95rem] font-medium">Unser Studio in der Falkenberger Landstraße</p>
              </ImageReveal>
            </Parallax>
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
