import type { Metadata } from 'next';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { RequestSection } from '@/components/sections/RequestSection';

export const metadata: Metadata = pageMeta({
  title: 'Termin anfragen | autokosmetik Lilienthal',
  description:
    'Termin für Fahrzeugaufbereitung in Lilienthal anfragen: Leistung wählen, Fahrzeug angeben, Wunschdatum nennen – unverbindlich und persönlich. Telefon 0152 / 345 510 63.',
  path: '/termin',
});

export default function TerminPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Termin anfragen', path: '/termin' }])} />
      <div className="pt-[calc(var(--header-h)+24px)]">
        <RequestSection headingLevel={1} />
      </div>
    </>
  );
}
