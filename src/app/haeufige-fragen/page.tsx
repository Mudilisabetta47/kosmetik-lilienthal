import type { Metadata } from 'next';
import { HOME_FAQS, SERVICES, SITE, type Faq as FaqType } from '@/lib/data';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Häufige Fragen zur Autoaufbereitung | Lilienthal & Bremen',
  description: `Antworten zu Preisen, Dauer, Lackaufbereitung, Versiegelung, Innenraum und Termin – alle FAQ von autokosmetik Lilienthal. Tel. ${SITE.phoneDisplay}`,
  path: '/haeufige-fragen',
});

export default function FaqPage() {
  const groups: { id: string; title: string; items: FaqType[] }[] = [
    { id: 'allgemein', title: 'Allgemein', items: HOME_FAQS },
    ...SERVICES.map((s) => ({ id: s.slug, title: s.name, items: s.faqs })),
  ];
  const seen = new Set<string>();
  const all = groups.flatMap((g) => g.items).filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', path: '/' }, { name: 'Häufige Fragen', path: '/haeufige-fragen' }])} />
      <JsonLd data={faqLd(all)} />
      <PageHero
        crumbs={[{ name: 'Startseite', href: '/' }, { name: 'Häufige Fragen' }]}
        eyebrow="FAQ"
        title="Häufige Fragen zur Autoaufbereitung"
        lead="Alle Antworten auf einen Blick: Preise, Dauer, Ablauf und Details zu jeder Leistung."
        img="hero"
        imgAlt="Wassertropfen auf einem frisch versiegelten Fahrzeuglack"
        imgPosition="60% 50%"
      />
      <section className="light curtain bg-white section-y">
        <div className="wrap grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <nav aria-label="Themen" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">Themen</p>
            <ul className="flex flex-wrap gap-2 lg:block lg:space-y-1">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-block rounded-full border border-[#14224a]/20 px-4 py-2 text-[0.9rem] transition-colors hover:border-brand hover:text-brand lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-1.5">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`h-${g.id}`}>
                <h2 id={`h-${g.id}`} className="h3 mb-6">{g.title}</h2>
                <Faq items={g.items} idPrefix={`faq-${g.id}`} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
