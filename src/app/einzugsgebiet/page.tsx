import type { Metadata } from 'next';
import Link from 'next/link';
import { REGION_GROUPS, SERVICES, SITE, type Faq as FaqType } from '@/lib/data';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Einzugsgebiet: Autoaufbereitung Lilienthal, Bremen & Umland',
  description:
    'Autoaufbereitung für Lilienthal, Bremen, Osterholz-Scharmbeck, Worpswede, Achim, Oyten, Delmenhorst, Verden und Umland – Falkenberger Landstraße 75.',
  path: '/einzugsgebiet',
});

const FAQS: FaqType[] = [
  {
    q: 'Aus welchen Orten kommen Ihre Kunden?',
    a: 'Zu uns kommen Privatkunden, Geschäftskunden und Autohändler aus der gesamten Region – unter anderem aus Lilienthal, Osterholz-Scharmbeck, Bremen, Worpswede, Ritterhude, Grasberg, Schwanewede, Lemwerder, Achim, Oyten, Ottersberg, Tarmstedt, Delmenhorst, Stuhr, Weyhe, Syke, Verden, Rotenburg und Zeven.',
  },
  {
    q: 'Wo genau finde ich das Studio?',
    a: 'In der Falkenberger Landstraße 75, 28865 Lilienthal – gegenüber Opel Meyer.',
  },
  {
    q: 'Brauche ich einen Termin?',
    a: 'Ja, wir arbeiten nach Terminvereinbarung. Sie erreichen uns telefonisch unter 0152 / 345 510 63 oder über die Online-Terminanfrage.',
  },
];

export default function EinzugsgebietPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Einzugsgebiet', path: '/einzugsgebiet' }])} />
      <JsonLd data={faqLd(FAQS)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Einzugsgebiet' }]}
        eyebrow="Einzugsgebiet"
        title="Fahrzeugaufbereitung in Lilienthal und Umgebung"
        lead="Unser Studio liegt in der Falkenberger Landstraße in Lilienthal – verkehrsgünstig zwischen Bremen und Osterholz-Scharmbeck."
        img="shopPorsches"
        imgAlt="Das Studio autokosmetik Lilienthal mit aufbereiteten Porsche 911 Fahrzeugen"
      >
        <Btn href="/termin" cursor="Termin">Termin anfragen</Btn>
        <Btn href={SITE.mapsRoute} variant="ghost" icon="up-right" cursor="Route">Route planen</Btn>
      </PageHero>

      <section className="bg-ink section-y" aria-labelledby="orte">
        <div className="wrap">
          <p className="eyebrow mb-6">Orte</p>
          <h2 id="orte" className="h2 max-w-[20ch]">Kundinnen und Kunden aus der ganzen <span className="serif-i silver-text">Region.</span></h2>
          <p className="lede mt-6 max-w-[60ch]">
            Wir betreuen Privatkunden, Geschäftskunden und Autohändler. Wer zu uns kommt, bringt sein Fahrzeug ins Studio nach Lilienthal – hier ein Überblick, woher unsere Kundschaft kommt.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {REGION_GROUPS.map((g, i) => (
              <Reveal key={g.area} delay={(i % 2) * 0.08} className="card-glass rounded-[26px] p-7 md:p-9">
                <p className="eyebrow mb-5">{g.area}</p>
                <ul className="flex flex-wrap gap-2.5">
                  {g.places.map((p) => (
                    <li key={p} className={`rounded-full border px-4 py-2 text-[0.95rem] ${p === 'Lilienthal' ? 'border-bone bg-bone font-semibold text-ink' : 'border-white/15 text-bone/90'}`}>
                      {p}
                    </li>
                  ))}
                </ul>
                {g.area === 'Bremen' && (
                  <p className="mt-5 text-[0.92rem] text-mute">
                    Mehr dazu auf <Link href="/fahrzeugaufbereitung-bremen" className="text-bone underline underline-offset-4">Fahrzeugaufbereitung in Bremen</Link>.
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="anfahrt">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Anfahrt</p>
            <h2 id="anfahrt" className="h2 max-w-[14ch]">So finden Sie <span className="serif-i silver-text">uns.</span></h2>
            <address className="mt-8 not-italic text-[1.15rem] leading-relaxed">
              {SITE.street}<br />{SITE.zip} {SITE.city}<br />
              <span className="text-mute">{SITE.landmark}</span>
            </address>
            <a href={SITE.phoneHref} className="tabular mt-6 inline-flex items-center gap-3 text-[1.5rem] font-semibold hover:underline">
              <Icon name="phone" className="h-5 w-5" /> {SITE.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-5">Beliebte Leistungen</p>
            <ul className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
              {SERVICES.slice(0, 9).map((s) => (
                <li key={s.slug}>
                  <Link href={`/leistungen/${s.slug}`} className="group flex items-center justify-between gap-4 py-4 transition-[padding] hover:pl-2">
                    <span className="text-[1.05rem] font-medium">{s.name}</span>
                    <span className="tabular flex items-center gap-3 text-[0.9rem] text-mute">
                      {s.priceFrom ? `ab ${s.priceFrom} €` : 'Individuell'}
                      <Icon name="up-right" className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink section-y" aria-labelledby="faq-region">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="faq-region" className="h2 max-w-[13ch]">Fragen zum Einzugsgebiet</h2>
          </div>
          <Faq items={FAQS} idPrefix="faq-region" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
