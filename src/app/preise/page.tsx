import type { Metadata } from 'next';
import { HOME_FAQS } from '@/lib/data';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { PageHero } from '@/components/sections/PageHero';
import { PriceTable } from '@/components/sections/PriceTable';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Preise Autoaufbereitung Lilienthal & Bremen | ab 60 €',
  description:
    'Preise Fahrzeugaufbereitung Lilienthal: ✓ Innenraum ab 60 € ✓ Polster ab 70 € ✓ Hochglanz ab 250 € ✓ Nano ab 350 €. Anrufen: 0152 / 345 510 63',
  path: '/preise',
});

const PRICE_FAQS = HOME_FAQS.filter((f) => f.q.startsWith('Was kostet') || f.q.startsWith('Wie lange'));

export default function PreisePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Preise', path: '/preise' }])} />
      <JsonLd data={faqLd(PRICE_FAQS)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Preise' }]}
        eyebrow="Preise"
        title="Preise für Fahrzeugaufbereitung in Lilienthal"
        lead="Klare „ab“-Preise für jede Leistung – und ein persönliches Angebot nach kurzer Begutachtung Ihres Fahrzeugs."
        img="lambo"
        imgAlt="Gelber Lamborghini Huracán vor dem Studio in Lilienthal"
        imgPosition="50% 55%"
      >
        <Btn href="/termin" cursor="Termin">Angebot anfragen</Btn>
      </PageHero>

      <section className="curtain bg-paper py-[clamp(88px,12vw,180px)] text-ink">
        <PriceTable />
      </section>

      <section className="light bg-white section-y" aria-labelledby="preis-faq">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="preis-faq" className="h2 max-w-[13ch]">Fragen zu Preisen &amp; Dauer</h2>
          </div>
          <Faq items={PRICE_FAQS} idPrefix="preis-faq" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
