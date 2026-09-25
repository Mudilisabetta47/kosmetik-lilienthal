import type { Metadata } from 'next';
import { GALLERY_ALL } from '@/lib/data';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { GalleryFilter } from '@/components/sections/GalleryFilter';

export const metadata: Metadata = pageMeta({
  title: 'Galerie: Fahrzeugaufbereitung Lilienthal & Bremen | autokosmetik',
  description:
    'Echte Fahrzeuge aus dem Studio in Lilienthal: ✓ Porsche ✓ Mercedes-AMG ✓ BMW ✓ Lamborghini ✓ Ford Mustang nach Lack- und Komplettaufbereitung.',
  path: '/galerie',
});


export default function GaleriePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Galerie', path: '/galerie' }])} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Galerie' }]}
        eyebrow="Galerie"
        title="Fahrzeuge, die wir wieder zum Strahlen bringen."
        lead="Echte Kundenfahrzeuge aus unserem Studio in der Falkenberger Landstraße – aufgenommen vor Ort nach der Aufbereitung."
        img="corvetteSeite"
        imgAlt="Schwarze Chevrolet Corvette mit Bronze-Felgen vor dem Studio autokosmetik Lilienthal"
        imgPosition="50% 55%"
      >
        <Btn href="/termin" cursor="Termin">Ihr Fahrzeug anmelden</Btn>
      </PageHero>

      <section className="light curtain bg-white pb-24 pt-20 md:pb-40 md:pt-28" aria-label="Fahrzeuggalerie">
        <div className="wrap">
          <GalleryFilter items={GALLERY_ALL} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
