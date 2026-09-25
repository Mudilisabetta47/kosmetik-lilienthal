import type { Metadata } from 'next';
import Link from 'next/link';
import { BREMEN_DISTRICTS, SERVICES, SITE, type Faq as FaqType } from '@/lib/data';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Fahrzeugaufbereitung Bremen | Autoaufbereitung in Lilienthal',
  description:
    'Fahrzeugaufbereitung für Bremen: Lackaufbereitung, Versiegelung, Innenreinigung und Verkaufsaufbereitung im Studio in Lilienthal – nordöstlich von Bremen. Termin anfragen.',
  path: '/fahrzeugaufbereitung-bremen',
});

const FAQS: FaqType[] = [
  {
    q: 'Wo liegt Ihr Studio im Verhältnis zu Bremen?',
    a: 'Das Studio befindet sich in der Falkenberger Landstraße 75 in Lilienthal, nordöstlich von Bremen und verkehrsgünstig zwischen Bremen und Osterholz-Scharmbeck.',
  },
  {
    q: 'Betreuen Sie auch Kunden aus den Bremer Stadtteilen?',
    a: `Ja. Zu uns kommen Kundinnen und Kunden aus ganz Bremen, unter anderem aus ${BREMEN_DISTRICTS.join(', ')}.`,
  },
  {
    q: 'Für wen arbeiten Sie?',
    a: 'Für Privatkunden, Geschäftskunden und Autohändler – mit persönlicher Beratung und einem Festpreis nach kurzer Begutachtung.',
  },
  {
    q: 'Was kostet eine Aufbereitung?',
    a: 'Die Preise starten bei 60 € (Innenaufbereitung). Alle Preise gelten für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand, größere Fahrzeuge erhalten einen Aufschlag. Details finden Sie auf der Preisseite.',
  },
];

const HOW = [
  { t: 'Anfragen', d: 'Per Online-Formular oder telefonisch – mit Leistung, Fahrzeug und Wunschdatum.' },
  { t: 'Begutachtung', d: 'Wir prüfen den Zustand und nennen Ihnen einen Festpreis.' },
  { t: 'Aufbereitung', d: 'Ihr Fahrzeug wird in unserem Studio in Lilienthal in Handarbeit aufbereitet.' },
];

export default function BremenPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Fahrzeugaufbereitung Bremen', path: '/fahrzeugaufbereitung-bremen' }])} />
      <JsonLd data={faqLd(FAQS)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Fahrzeugaufbereitung Bremen' }]}
        eyebrow="Bremen"
        title="Fahrzeugaufbereitung für Bremen – Ihr Studio in Lilienthal"
        lead="Autoaufbereitung in Handarbeit: Lack, Innenraum und Versiegelung – nordöstlich von Bremen, im Studio in der Falkenberger Landstraße."
        img="carreraS"
        imgAlt="Schwarzer Porsche 911 Carrera S vor dem Studio in Lilienthal"
        imgPosition="50% 60%"
      >
        <Btn href="/termin" cursor="Termin">Termin anfragen</Btn>
        <Btn href={SITE.phoneHref} variant="ghost" icon="phone" cursor="Anrufen">{SITE.phoneDisplay}</Btn>
      </PageHero>

      <section className="light curtain bg-white section-y" aria-labelledby="bremen-h">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Für Bremer Kunden</p>
            <h2 id="bremen-h" className="h2 max-w-[16ch]">Der Weg nach Lilienthal <span className="serif-i silver-text">lohnt sich.</span></h2>
            <div className="mt-8 max-w-[58ch] space-y-5 text-[1.1rem] leading-relaxed text-bone/80">
              <p>
                Unser Studio liegt in Lilienthal, nordöstlich von Bremen. Von hier aus betreuen wir Privatkunden, Geschäftskunden und Autohändler aus der Hansestadt und dem gesamten Umland.
              </p>
              <p>
                Statt Waschstraße erwartet Sie bei uns Handarbeit: Lackaufbereitung, Hochglanz- und Nano-Versiegelung, gründliche Innenreinigung, Polster- und Lederpflege – und persönliche Beratung durch den Inhaber.
              </p>
            </div>
            <p className="eyebrow mb-4 mt-12">Kunden aus den Bremer Stadtteilen</p>
            <ul className="flex flex-wrap gap-2.5">
              {BREMEN_DISTRICTS.map((d) => (
                <li key={d} className="rounded-full border border-white/15 px-4 py-2 text-[0.92rem] text-bone/90">{d}</li>
              ))}
            </ul>
          </div>
          <Reveal>
            <ImageReveal className="aspect-[4/5] w-full" radius={28} from="right">
              <Img k="porsche997Front" alt="Schwarzer Porsche 911 (997) Turbo nach der Politur" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </ImageReveal>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="ablauf-bremen">
        <div className="wrap">
          <p className="eyebrow mb-6">So läuft es ab</p>
          <h2 id="ablauf-bremen" className="h2 max-w-[16ch]">In drei Schritten zum <span className="serif-i silver-text">Termin.</span></h2>
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {HOW.map((h, i) => (
              <Reveal as="li" key={h.t} delay={i * 0.08} className="card-glass rounded-[26px] p-8">
                <span className="tabular font-serif text-[2.4rem] italic leading-none text-brand">0{i + 1}</span>
                <h3 className="mt-8 text-[1.4rem] font-semibold tracking-tight">{h.t}</h3>
                <p className="mt-3 text-mute">{h.d}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-14 text-[0.98rem] text-mute">
            Alle Orte im Umland finden Sie unter{' '}
            <Link href="/einzugsgebiet" className="text-bone underline underline-offset-4">Einzugsgebiet</Link>.
          </p>
        </div>
      </section>

      <section className="light bg-white section-y" aria-labelledby="leist-bremen">
        <div className="wrap">
          <p className="eyebrow mb-6">Leistungen</p>
          <h2 id="leist-bremen" className="h2 max-w-[16ch]">Was wir für Ihr Fahrzeug tun <span className="serif-i silver-text">können.</span></h2>
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-white/[0.1]">
                <Link href={`/leistungen/${s.slug}`} className="group flex items-center justify-between gap-4 py-5 transition-[padding] hover:pl-2">
                  <span className="text-[1.1rem] font-medium">{s.name}</span>
                  <span className="tabular flex items-center gap-3 text-[0.9rem] text-mute">
                    {s.priceFrom ? `ab ${s.priceFrom} €` : 'Individuell'}
                    <Icon name="up-right" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="faq-bremen">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="faq-bremen" className="h2 max-w-[13ch]">Fragen aus Bremen</h2>
          </div>
          <Faq items={FAQS} idPrefix="faq-bremen" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
