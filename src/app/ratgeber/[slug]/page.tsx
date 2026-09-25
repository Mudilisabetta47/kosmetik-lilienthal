import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, ARTICLE_BY_SLUG } from '@/lib/articles';
import { SERVICE_BY_SLUG, SITE } from '@/lib/data';
import { articleLd, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { Reveal } from '@/components/motion/Reveal';

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLE_BY_SLUG[slug];
  if (!a) return {};
  const m = pageMeta({ title: a.metaTitle, description: a.metaDescription, path: `/ratgeber/${a.slug}`, image: `/img/${a.img}.webp` });
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: a.date } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLE_BY_SLUG[slug];
  if (!a) notFound();
  const services = a.services.map((s) => SERVICE_BY_SLUG[s]).filter(Boolean);
  const related = a.related.map((r) => ARTICLE_BY_SLUG[r]).filter(Boolean);
  const date = new Date(a.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <>
      <JsonLd data={articleLd(a)} />
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Ratgeber', path: '/ratgeber' }, { name: a.title, path: `/ratgeber/${a.slug}` }])} />
      <JsonLd data={faqLd(a.faqs)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }, { name: a.kicker }]}
        eyebrow={`${a.kicker} · ${a.minutes} Min. Lesezeit`}
        title={a.title}
        lead={a.lead}
        img={a.img}
        imgAlt={a.title}
        imgPosition={a.imgPosition}
      />

      <section className="light curtain bg-white section-y">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
          <article className="max-w-[72ch]">
            <p className="mb-10 text-[0.9rem] text-mute">
              Von {SITE.name} · <time dateTime={a.date}>{date}</time>
            </p>
            {a.sections.map((s) => (
              <section key={s.h} className="mb-12">
                <h2 className="h3">{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-5 text-[1.1rem] leading-[1.75] text-mute">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-5 space-y-3">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-4 text-[1.05rem] leading-relaxed text-mute">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="on-photo rounded-[26px] bg-ink p-7 text-bone">
                <p className="eyebrow mb-3">Fragen? Ruf uns an</p>
                <a href={SITE.phoneHref} data-cursor="Anrufen" className="tabular inline-flex items-center gap-3 text-[1.6rem] font-semibold tracking-tight hover:underline">
                  <Icon name="phone" className="h-6 w-6" /> {SITE.phoneDisplay}
                </a>
                <p className="mt-2 text-[0.85rem] text-mute">Mo–Fr 8:00–17:00 Uhr · Samstag nach Absprache</p>
                <div className="mt-6"><Btn href="/termin" cursor="Termin" magnetic={false} className="w-full">Termin anfragen</Btn></div>
              </div>
              <div className="mt-6 rounded-[26px] border border-[#14224a]/10 p-7">
                <p className="eyebrow mb-4">Passende Leistungen</p>
                <ul className="space-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/leistungen/${s.slug}`} className="flex items-baseline justify-between gap-4 font-medium hover:underline">
                        <span>{s.name}</span>
                        <span className="tabular text-[0.85rem] text-mute">{s.priceFrom ? `ab ${s.priceFrom} €` : 'Individuell'}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="light bg-paper section-y" aria-labelledby="art-faq">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">FAQ</p>
            <h2 id="art-faq" className="h2 max-w-[13ch]">Kurz beantwortet</h2>
          </div>
          <Faq items={a.faqs} idPrefix={`art-${a.slug}`} />
        </div>
      </section>

      <section className="light bg-white section-y" aria-labelledby="art-more">
        <div className="wrap">
          <h2 id="art-more" className="h2 max-w-[16ch]">Weiterlesen</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}><ArticleCard a={r} /></li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand service={a.services[0]} />
    </>
  );
}
