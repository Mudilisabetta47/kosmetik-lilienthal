import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { PageHero } from '@/components/sections/PageHero';
import { Location } from '@/components/sections/Location';
import { RequestSection } from '@/components/sections/RequestSection';

export const metadata: Metadata = pageMeta({
  title: 'Kontakt & Anfahrt: Autoaufbereitung Lilienthal bei Bremen',
  description: `Kontakt autokosmetik Lilienthal: ✓ Falkenberger Landstraße 75 ✓ Mo–Fr 8–17 Uhr ✓ Anfahrt ✓ Termin. Jetzt anrufen: ${SITE.phoneDisplay}`,
  path: '/kontakt',
});

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Kontakt', path: '/kontakt' }])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Kontakt autokosmetik Lilienthal', url: `${SITE.url}/kontakt`, inLanguage: 'de-DE' }} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Kontakt' }]}
        eyebrow="Kontakt"
        title="Kontakt & Anfahrt – Autoaufbereitung in Lilienthal"
        lead="Am schnellsten erreichen Sie uns telefonisch. Wir beraten Sie persönlich und klären Termin, Umfang und Preis direkt."
        img="shop"
        imgAlt="Das Studio autokosmetik Lilienthal in der Falkenberger Landstraße"
      >
        <Btn href={SITE.phoneHref} icon="phone" cursor="Anrufen" className="!min-h-[60px] !px-9 !text-[1.1rem]">{SITE.phoneDisplay}</Btn>
        <Btn href="/termin" variant="ghost" cursor="Termin">Online anfragen</Btn>
      </PageHero>
      <Location />
      <RequestSection />
    </>
  );
}
