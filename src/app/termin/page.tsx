import type { Metadata } from 'next';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { RequestSection } from '@/components/sections/RequestSection';

export const metadata: Metadata = pageMeta({
  title: 'Termin anfragen | Autoaufbereitung Lilienthal & Bremen',
  description:
    'Termin für Fahrzeugaufbereitung in Lilienthal: ✓ online anfragen ✓ danach kurz anrufen ✓ Festpreis nach Begutachtung. Tel. 0152 / 345 510 63',
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
