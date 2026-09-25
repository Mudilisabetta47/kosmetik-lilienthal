import type { Metadata } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SITE } from '@/lib/data';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Btn } from '@/components/ui/Btn';
import { PageHero } from '@/components/sections/PageHero';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Ratgeber Autoaufbereitung: Tipps & Preise | Lilienthal & Bremen',
  description: `Ratgeber zur Fahrzeugaufbereitung: ✓ Kosten ✓ Lack ✓ Versiegelung ✓ Innenraum ✓ Leasingrückgabe ✓ Verkauf. Vom Studio in Lilienthal. Tel. ${SITE.phoneDisplay}`,
  path: '/ratgeber',
});

export default function RatgeberPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Ratgeber', path: '/ratgeber' }])} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber' }]}
        eyebrow="Ratgeber"
        title="Ratgeber Autoaufbereitung: Wissen aus dem Studio in Lilienthal"
        lead="Kosten, Lack, Versiegelung, Innenraum, Leasingrückgabe und Verkauf – verständlich erklärt und ehrlich eingeordnet."
        img="polish"
        imgAlt="Maschinelle Politur eines Fahrzeuglacks"
        imgPosition="50% 45%"
      >
        <Btn href={SITE.phoneHref} icon="phone" cursor="Anrufen">{SITE.phoneDisplay}</Btn>
        <Btn href="/termin" variant="ghost" cursor="Termin">Termin anfragen</Btn>
      </PageHero>
      <section className="light curtain bg-white section-y" aria-label="Alle Artikel">
        <div className="wrap">
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 3) * 0.07}>
                <ArticleCard a={a} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
