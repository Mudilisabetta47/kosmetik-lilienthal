import type { Metadata } from 'next';
import { GROUPS, servicesOf, SERVICES, type GroupId } from '@/lib/data';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceRow } from '@/components/sections/ServiceRow';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Leistungen: Fahrzeugaufbereitung Lilienthal | autokosmetik',
  description:
    'Alle Leistungen: Lackaufbereitung, Hochglanz- und Nano-Versiegelung, Innenreinigung, Polster & Leder, Motorwäsche, Folienentfernung und Verkaufsaufbereitung in Lilienthal.',
  path: '/leistungen',
});

const ORDER: GroupId[] = ['lack', 'interieur', 'spezial'];

export default function LeistungenPage() {
  let n = 0;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Leistungen', path: '/leistungen' }])} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Leistungen' }]}
        title="Unsere Leistungen – Fahrzeugaufbereitung in Lilienthal, Bremen & Umland"
        lead="Von der Lackaufbereitung über die Innenraumpflege bis zur kompletten Verkaufsaufbereitung: Elf Leistungen, in Handarbeit ausgeführt – geordnet nach Lack, Interieur und Spezial."
        img="hero"
        imgAlt="Wassertropfen auf einem frisch versiegelten Fahrzeuglack"
        imgPosition="60% 50%"
        eyebrow="Leistungen"
      >
        <Btn href="/termin" cursor="Termin">Termin anfragen</Btn>
        <Btn href="/preise" variant="ghost" cursor="Preise">Preise ansehen</Btn>
      </PageHero>

      <section className="bg-ink pb-24 pt-10 md:pb-32">
        <div className="wrap">
          {ORDER.map((g) => (
            <div key={g} className="mb-24 last:mb-0 md:mb-36">
              <Reveal>
                <div className="mb-12 flex flex-col justify-between gap-4 border-t border-white/[0.1] pt-8 md:mb-20 md:flex-row md:items-end">
                  <div>
                    <p className="eyebrow mb-3">{GROUPS[g].label}</p>
                    <h2 className="h2">{GROUPS[g].title}</h2>
                  </div>
                  <p className="max-w-[44ch] text-mute">{GROUPS[g].text}</p>
                </div>
              </Reveal>
              <div className="space-y-20 md:space-y-32">
                {servicesOf(g).map((s, i) => {
                  const idx = n++;
                  return <ServiceRow key={s.slug} s={s} index={idx} flip={i % 2 === 1} />;
                })}
              </div>
            </div>
          ))}
          <p className="sr-only">{SERVICES.length} Leistungen</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
