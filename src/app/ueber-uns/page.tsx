import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, SERVICES } from '@/lib/data';
import { abs, breadcrumbLd, pageMeta, ORG_ID } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

export const metadata: Metadata = pageMeta({
  title: 'Über uns: inhabergeführte Autoaufbereitung in Lilienthal',
  description: `autokosmetik Lilienthal: ✓ inhabergeführt ✓ Handarbeit ✓ persönliche Beratung ✓ Festpreis nach Begutachtung. Falkenberger Landstraße 75. Tel. ${SITE.phoneDisplay}`,
  path: '/ueber-uns',
});

const VALUES = [
  { t: 'Handarbeit statt Waschstraße', d: 'Wir arbeiten in Handarbeit – schonend für Lack, Polster und Materialien.' },
  { t: 'Persönliche Beratung', d: 'Wir besprechen mit Ihnen, was Ihr Fahrzeug braucht – und was nicht.' },
  { t: 'Festpreis nach Begutachtung', d: 'Erst prüfen wir den Zustand, dann nennen wir einen klaren Preis.' },
  { t: 'Hochwertige Produkte', d: 'Für sichtbare Ergebnisse und langanhaltenden Glanz.' },
];
const STEPS = [
  { t: 'Anfragen & anrufen', d: 'Online anfragen oder direkt anrufen – am Telefon klären wir Leistung und Termin.' },
  { t: 'Begutachtung', d: 'Wir prüfen Zustand und Umfang und nennen Ihnen einen Festpreis.' },
  { t: 'Aufbereitung', d: 'Ihr Fahrzeug wird in unserem Studio in Lilienthal in Handarbeit aufbereitet.' },
  { t: 'Übergabe', d: 'Wir übergeben Ihnen Ihr Fahrzeug und besprechen die Pflege danach.' },
];

export default function UeberUnsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Über uns', path: '/ueber-uns' }])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Über autokosmetik Lilienthal', url: abs('/ueber-uns'), about: { '@id': ORG_ID }, inLanguage: 'de-DE' }} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Über uns' }]}
        eyebrow="Über uns"
        title="Inhabergeführte Fahrzeugaufbereitung in Lilienthal"
        lead="Mit Sorgfalt, hochwertigen Produkten und ehrlicher Beratung – für Privatkunden, Geschäftskunden und Fahrzeughändler aus Lilienthal, Bremen und dem Umland."
        img="shopPorsches"
        imgAlt="Das Studio autokosmetik Lilienthal in der Falkenberger Landstraße mit zwei aufbereiteten Porsche 911"
      >
        <Btn href={SITE.phoneHref} icon="phone" cursor="Anrufen">{SITE.phoneDisplay}</Btn>
        <Btn href="/termin" variant="ghost" cursor="Termin">Termin anfragen</Btn>
      </PageHero>

      <section className="light curtain bg-white section-y" aria-labelledby="wer">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Wer wir sind</p>
            <h2 id="wer" className="h2 max-w-[16ch]"><SplitText text={'Ein Studio, ein\n*Anspruch.*'} /></h2>
            <div className="mt-8 max-w-[60ch] space-y-5 text-[1.1rem] leading-relaxed text-mute">
              <p>
                autokosmetik ist eine inhabergeführte KFZ-Aufbereitung in der Falkenberger Landstraße in Lilienthal – inhabergeführt von {SITE.owner}. Unser Anspruch: Ihr Fahrzeug soll nach dem Termin sichtbar gepflegter sein – innen wie außen.
              </p>
              <p>
                Anders als in der Waschanlage arbeiten wir in Handarbeit. Das kostet Zeit, schont aber Lack, Polster und Materialien und macht Ergebnisse möglich, die man sieht: tieferen Glanz, einen hygienischen Innenraum und spürbaren Werterhalt.
              </p>
            </div>
          </div>
          <Reveal>
            <ImageReveal className="aspect-[4/5] w-full" radius={28} from="right">
              <Img k="corvetteSeite" alt="Schwarze Chevrolet Corvette vor dem Studio autokosmetik Lilienthal" fill sizes="(min-width:1024px) 40vw, 100vw" position="55% 55%" className="object-cover" />
            </ImageReveal>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="werte">
        <div className="wrap">
          <p className="eyebrow mb-6">Was uns wichtig ist</p>
          <h2 id="werte" className="h2 max-w-[18ch]">Vier Dinge, auf die Sie sich verlassen <span className="serif-i silver-text">können.</span></h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.t} delay={i * 0.07} className="card-glass rounded-[26px] p-7">
                <span className="tabular font-serif text-[2rem] italic leading-none text-brand">0{i + 1}</span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight">{v.t}</h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-mute">{v.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="light bg-white section-y" aria-labelledby="ablauf-uns">
        <div className="wrap">
          <p className="eyebrow mb-6">So läuft ein Termin ab</p>
          <h2 id="ablauf-uns" className="h2 max-w-[16ch]">In vier Schritten zum <span className="serif-i silver-text">Ergebnis.</span></h2>
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.07} className="card-glass rounded-[26px] p-7">
                <span className="tabular font-serif text-[2rem] italic leading-none text-brand">0{i + 1}</span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-mute">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink section-y" aria-labelledby="fuer-wen">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Für wen</p>
            <h2 id="fuer-wen" className="h2 max-w-[14ch]">Privat, Gewerbe, Händler.</h2>
            <p className="lede mt-6 max-w-[48ch]">
              Wir betreuen Privatkunden, Geschäftskunden und Autohändler – vom Alltagsauto über Cabrios und Oldtimer bis zu Transportern, Wohnwagen und Wohnmobilen.
            </p>
            <p className="mt-6 text-mute">
              Unser Einzugsgebiet reicht von Lilienthal über Bremen bis in die Landkreise Osterholz, Verden, Diepholz und Rotenburg –{' '}
              <Link href="/einzugsgebiet" className="text-bone underline underline-offset-4">alle Orte im Überblick</Link>.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-white/[0.1]">
                <Link href={`/leistungen/${s.slug}`} className="group flex items-center justify-between gap-3 py-4 transition-[padding] hover:pl-2">
                  <span className="font-medium">{s.name}</span>
                  <Icon name="up-right" className="h-4 w-4 text-mute" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
