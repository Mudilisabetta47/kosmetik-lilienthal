import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPARE_BY_SLUG, EXTRA_IMAGES, GROUPS, PRICE_NOTE, SERVICES, SERVICE_BY_SLUG, SITE } from '@/lib/data';
import { breadcrumbLd, faqLd, pageMeta, serviceLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { CompareBlock } from '@/components/sections/CompareBlock';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICE_BY_SLUG[slug];
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/leistungen/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICE_BY_SLUG[slug];
  if (!s) notFound();
  const cmp = COMPARE_BY_SLUG[s.slug];
  const extra = EXTRA_IMAGES[s.slug] ?? [];
  const related = s.related.map((r) => SERVICE_BY_SLUG[r]).filter(Boolean);

  return (
    <>
      <JsonLd data={serviceLd(s)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Startseite', path: '/' },
          { name: 'Leistungen', path: '/leistungen' },
          { name: s.name, path: `/leistungen/${s.slug}` },
        ])}
      />
      <JsonLd data={faqLd(s.faqs)} />

      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Leistungen', href: '/leistungen' }, { name: s.name }]}
        eyebrow={GROUPS[s.group].label}
        title={s.h1}
        lead={s.lead}
        img={s.img}
        imgAlt={s.heroAlt}
        imgPosition={s.imgPosition}
        aside={
          <div className="card-glass rounded-3xl px-7 py-5 backdrop-blur">
            <p className="eyebrow mb-1">Preis</p>
            <p className="tabular text-[2rem] font-semibold leading-none tracking-tight">
              {s.priceFrom ? (<><span className="mr-1.5 text-[1rem] font-medium text-mute">ab</span>{s.priceFrom} €</>) : (<span className="text-[1.15rem]">{s.priceNote}</span>)}
            </p>
          </div>
        }
      >
        <Btn href={`/termin?leistung=${s.slug}`} cursor="Termin">Termin anfragen</Btn>
        <Btn href={SITE.phoneHref} variant="ghost" icon="phone" cursor="Anrufen">Anrufen</Btn>
      </PageHero>

      {/* Beschreibung + Vorteile */}
      <section className="light curtain bg-white section-y" aria-labelledby="was">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Die Leistung</p>
            <h2 id="was" className="h2 max-w-[16ch]">
              <SplitText text={`${s.name} –\n*so arbeiten wir.*`} />
            </h2>
            <div className="mt-8 space-y-5">
              {s.intro.map((p) => (
                <Reveal key={p}>
                  <p className="max-w-[58ch] text-[1.1rem] leading-relaxed text-bone/80 md:text-[1.2rem]">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="card-glass rounded-[28px] p-7 md:p-10">
              <h3 className="eyebrow mb-6">Ihre Vorteile</h3>
              <ul className="space-y-4">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-4 text-[1.02rem] leading-snug">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-ink">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-coal section-y" aria-labelledby="ablauf">
        <div className="wrap">
          <p className="eyebrow mb-6">Ablauf</p>
          <h2 id="ablauf" className="h2 max-w-[18ch]">
            <SplitText text={'In vier Schritten\nzum *Ergebnis.*'} />
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.09] md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 0.08} blur={false} className="bg-coal p-7 md:p-9">
                <span className="tabular font-serif text-[2.6rem] italic leading-none text-brand">0{i + 1}</span>
                <h3 className="mt-8 text-[1.3rem] font-semibold tracking-tight">{st.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-mute">{st.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Bilder */}
      <section className="light bg-white py-[clamp(72px,10vw,150px)]" aria-label={`Bilder: ${s.name}`}>
        <div className="wrap grid gap-5 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            {cmp ? (
              <CompareBlock id={cmp} className="md:!aspect-[4/3]" />
            ) : (
              <ImageReveal className="aspect-[4/3] w-full" radius={22}>
                <Img k={extra[0] ?? s.img} alt={`${s.name} – Ergebnis`} fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
              </ImageReveal>
            )}
          </div>
          <div className="grid gap-5 md:col-span-5 md:gap-6">
            {(cmp ? extra : extra.slice(1)).concat(cmp ? [] : [s.img]).slice(0, 2).map((k, i) => (
              <Parallax key={k + i} from={-3} to={3}>
                <ImageReveal className="aspect-[4/3] w-full" radius={22} delay={i * 0.1}>
                  <Img k={k} alt={`Aufbereitetes Fahrzeug aus unserem Studio in Lilienthal`} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
                </ImageReveal>
              </Parallax>
            ))}
          </div>
        </div>
        {cmp && <p className="wrap mt-4 text-[0.85rem] text-mute">Ziehen Sie den Regler, um Vorher und Nachher zu vergleichen.</p>}
      </section>

      {/* Preis */}
      <section className="curtain bg-paper py-[clamp(72px,10vw,150px)] text-ink" aria-labelledby="preis">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="eyebrow-dark mb-6">Preis</p>
            <h2 id="preis" className="h2 max-w-[14ch]">
              Was kostet {s.name}?
            </h2>
            <p className="tabular mt-8 text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em]">
              {s.priceFrom ? (<><span className="mr-2 text-[0.35em] font-medium tracking-normal text-neutral-500">ab</span>{s.priceFrom} €</>) : (<span className="text-[0.42em] leading-tight tracking-tight">{s.priceNote}</span>)}
            </p>
            {s.priceDetail && <p className="mt-4 text-neutral-600">{s.priceDetail}</p>}
          </div>
          <div>
            <p className="text-[1.05rem] leading-relaxed text-neutral-700">{PRICE_NOTE.base}</p>
            <ul className="mt-5 divide-y divide-neutral-300 border-y border-neutral-300">
              {PRICE_NOTE.surcharges.map((x) => (
                <li key={x.label} className="flex justify-between gap-4 py-3.5">
                  <span>{x.label}</span>
                  <span className="tabular font-semibold">{x.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.9rem] leading-relaxed text-neutral-600">{PRICE_NOTE.more}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Btn href={`/termin?leistung=${s.slug}`} variant="dark" cursor="Termin">Angebot anfragen</Btn>
              <Link href="/preise" className="inline-flex min-h-[52px] items-center gap-2 px-2 font-medium underline-offset-[6px] hover:underline">
                Alle Preise <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink section-y" aria-labelledby="faq-s">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="faq-s" className="h2 max-w-[13ch]">Häufige Fragen zu {s.name}</h2>
          </div>
          <Faq items={s.faqs} idPrefix={`faq-${s.slug}`} />
        </div>
      </section>

      {/* Interne Verlinkung */}
      <section className="light bg-white section-y" aria-labelledby="mehr">
        <div className="wrap">
          <p className="eyebrow mb-6">Passend dazu</p>
          <h2 id="mehr" className="h2 max-w-[16ch]">Weitere <span className="serif-i silver-text">Leistungen.</span></h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/leistungen/${r.slug}`} data-cursor="Ansehen" className="img-zoom group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                    <Img k={r.img} alt={r.heroAlt} fill sizes="(min-width:768px) 30vw, 100vw" position={r.imgPosition} className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-[1.3rem] font-semibold tracking-tight">{r.name}</h3>
                    <span className="tabular text-[0.9rem] text-mute">{r.priceFrom ? `ab ${r.priceFrom} €` : 'Individuell'}</span>
                  </div>
                  <p className="mt-2 text-[0.95rem] text-mute">{r.short}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-14 max-w-[70ch] text-[0.98rem] leading-relaxed text-mute">
            Unser Studio liegt in Lilienthal. Zu uns kommen Kundinnen und Kunden aus Bremen und dem Umland –{' '}
            <Link href="/fahrzeugaufbereitung-bremen" className="text-bone underline underline-offset-4">Fahrzeugaufbereitung für Bremen</Link>,{' '}
            <Link href="/einzugsgebiet" className="text-bone underline underline-offset-4">alle Orte im Einzugsgebiet</Link> und{' '}
            <Link href="/preise" className="text-bone underline underline-offset-4">unsere Preise</Link>.
          </p>
        </div>
      </section>

      <CtaBand service={s.slug} />
    </>
  );
}
