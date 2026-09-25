import type { Metadata } from 'next';
import { GALLERY_ALL } from '@/lib/data';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Img } from '@/components/ui/Img';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Galerie: aufbereitete Fahrzeuge aus Lilienthal | autokosmetik',
  description:
    'Echte Kundenfahrzeuge aus unserem Studio in Lilienthal: Porsche, Mercedes-AMG, BMW, Lamborghini, Ford Mustang nach Lackaufbereitung und Versiegelung.',
  path: '/galerie',
});

const ASPECTS = ['aspect-[4/3]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[5/4]'];

export default function GaleriePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Galerie', path: '/galerie' }])} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Galerie' }]}
        eyebrow="Galerie"
        title="Fahrzeuge, die wir wieder zum Strahlen bringen."
        lead="Echte Kundenfahrzeuge aus unserem Studio in der Falkenberger Landstraße – aufgenommen vor Ort nach der Aufbereitung."
        img="taycan"
        imgAlt="Porsche Taycan vor dem Studio autokosmetik Lilienthal"
        imgPosition="50% 55%"
      >
        <Btn href="/termin" cursor="Termin">Ihr Fahrzeug anmelden</Btn>
      </PageHero>

      <section className="bg-ink pb-24 pt-8 md:pb-40" aria-label="Fahrzeuggalerie">
        <div className="wrap">
          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {GALLERY_ALL.map((g, i) => (
              <Reveal as="li" key={g.img} blur={false} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
                <figure className="img-zoom group relative overflow-hidden rounded-[22px] bg-graphite" data-cursor="Ansehen">
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
        </div>
      </section>
      <CtaBand />
    </>
  );
}
