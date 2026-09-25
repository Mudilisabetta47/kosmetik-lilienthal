import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HOME_FAQS, PRICE_NOTE, SERVICE_BY_SLUG, SITE, type Faq as FaqType } from '@/lib/data';
import { PLACES, PLACE_BY_SLUG } from '@/lib/places';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const dynamicParams = false;
export const generateStaticParams = () => PLACES.map((p) => ({ ort: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ ort: string }> }): Promise<Metadata> {
  const { ort } = await params;
  const p = PLACE_BY_SLUG[ort];
  if (!p) return {};
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/einzugsgebiet/${p.slug}` });
}

export default async function PlacePage({ params }: { params: Promise<{ ort: string }> }) {
  const { ort } = await params;
  const p = PLACE_BY_SLUG[ort];
  if (!p) notFound();

  const region = HOME_FAQS.find((f) => f.q.startsWith('In welchen Orten'))!;
  const where = HOME_FAQS.find((f) => f.q.startsWith('Wo finde ich'))!;
  const price = HOME_FAQS.find((f) => f.q.startsWith('Was kostet'))!;
  const faqs: FaqType[] = [region, ...p.faqs, where, price];
  const neighbors = p.neighbors.map((n) => PLACE_BY_SLUG[n]).filter(Boolean);
  const crumbs = [
    { name: 'Startseite', path: '/' },
    { name: 'Einzugsgebiet', path: '/einzugsgebiet' },
    { name: p.name, path: `/einzugsgebiet/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={faqLd(faqs)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Einzugsgebiet', href: '/einzugsgebiet' }, { name: p.name }]}
        eyebrow={p.area}
        title={`Autoaufbereitung in ${p.name} – Ihr Studio in Lilienthal`}
        lead={p.lead}
        img={p.img}
        imgAlt={`Aufbereitetes Fahrzeug aus dem Studio autokosmetik Lilienthal – für Kunden aus ${p.name}`}
      >
        <Btn href="/termin" cursor="Termin">Termin anfragen</Btn>
        <Btn href={SITE.phoneHref} variant="ghost" icon="phone" cursor="Anrufen">{SITE.phoneDisplay}</Btn>
      </PageHero>

      <section className="light curtain bg-white section-y" aria-labelledby="ort-intro">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Für Fahrzeughalter aus {p.name}</p>
            <h2 id="ort-intro" className="h2 max-w-[18ch]">Fahrzeugaufbereitung mit kurzem Draht nach Lilienthal.</h2>
            <div className="mt-8 max-w-[60ch] space-y-5 text-[1.1rem] leading-relaxed text-mute">
              {p.intro.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="card-glass rounded-[28px] p-7 md:p-9">
              <p className="eyebrow mb-5">Auf einen Blick</p>
              <dl className="space-y-4 text-[0.98rem]">
                <div><dt className="text-mute">Ihr Ort</dt><dd className="font-semibold">{p.name} · {p.area}</dd></div>
                <div><dt className="text-mute">Unser Studio</dt><dd className="font-semibold">{SITE.street}, {SITE.zip} {SITE.city}</dd><dd className="text-mute">{SITE.landmark}</dd></div>
                <div><dt className="text-mute">Lage</dt><dd className="font-semibold">{p.name} liegt {p.where}.</dd></div>
                <div><dt className="text-mute">Öffnungszeiten</dt><dd className="font-semibold">Mo–Fr 8:00–17:00 Uhr</dd><dd className="text-mute">Samstag nach Absprache</dd></div>
              </dl>
              <div className="mt-7 flex flex-col gap-3">
                <Btn href={SITE.mapsRoute} variant="ghost" icon="up-right" cursor="Route">Route planen</Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="ort-leistungen">
        <div className="wrap">
          <p className="eyebrow mb-6">Leistungen</p>
          <h2 id="ort-leistungen" className="h2 max-w-[20ch]">Was wir für Ihr Fahrzeug aus {p.name} tun <span className="serif-i silver-text">können.</span></h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {p.focus.map((f, i) => {
              const s = SERVICE_BY_SLUG[f.service];
              return (
                <Reveal as="li" key={f.service} delay={i * 0.08} className="card-glass flex flex-col rounded-[26px] p-7">
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[18px]">
                    <Img k={s.img} alt={s.heroAlt} fill sizes="(min-width:768px) 30vw, 100vw" position={s.imgPosition} className="object-cover" />
                  </div>
                  <p className="tabular text-[0.85rem] text-mute">{s.priceFrom ? `ab ${s.priceFrom} €` : s.priceNote}</p>
                  <h3 className="mt-1 text-[1.4rem] font-semibold tracking-tight">
                    <Link href={`/leistungen/${s.slug}`} className="hover:underline">{s.name}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-mute">{f.text}</p>
                  <Link href={`/leistungen/${s.slug}`} className="mt-5 inline-flex items-center gap-2 text-[0.92rem] font-medium underline-offset-[6px] hover:underline">
                    Details <Icon name="up-right" className="h-4 w-4" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 max-w-[70ch] text-[0.9rem] leading-relaxed text-mute">
            {PRICE_NOTE.base} Großraumlimousinen und Geländewagen +20 %, Transporter +40 %. Alle Leistungen und Preise finden Sie unter <Link href="/preise" className="text-bone underline underline-offset-4">Preise</Link>.
          </p>
        </div>
      </section>

      <section className="light bg-white section-y" aria-labelledby="ort-faq">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="ort-faq" className="h2 max-w-[14ch]">Häufige Fragen aus {p.name}</h2>
          </div>
          <Faq items={faqs} idPrefix={`faq-${p.slug}`} />
        </div>
      </section>

      <section className="bg-coal section-y" aria-labelledby="ort-nachbarn">
        <div className="wrap">
          <p className="eyebrow mb-6">Auch in der Nähe</p>
          <h2 id="ort-nachbarn" className="h2 max-w-[18ch]">Weitere Orte in unserem <span className="serif-i silver-text">Einzugsgebiet.</span></h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {neighbors.map((n) => (
              <li key={n.slug}>
                <Link href={`/einzugsgebiet/${n.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 transition-colors hover:border-brand hover:text-brand">
                  {n.name} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </li>
            ))}
            <li><Link href="/einzugsgebiet" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 transition-colors hover:border-brand hover:text-brand">Alle Orte <Icon name="arrow" className="h-4 w-4" /></Link></li>
            <li><Link href="/fahrzeugaufbereitung-bremen" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 transition-colors hover:border-brand hover:text-brand">Bremen <Icon name="arrow" className="h-4 w-4" /></Link></li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
