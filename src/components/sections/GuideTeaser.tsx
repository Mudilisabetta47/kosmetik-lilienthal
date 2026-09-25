import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import { Icon } from '@/components/ui/Icon';
import { ArticleCard } from './ArticleCard';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Ratgeber-Teaser für die Startseite (interne Verlinkung + Long-Tail-Themen). */
export function GuideTeaser() {
  const pick = ['was-kostet-eine-autoaufbereitung', 'nano-versiegelung-oder-carnauba-wachs', 'autoaufbereitung-vor-der-leasingrueckgabe']
    .map((s) => ARTICLES.find((a) => a.slug === s)!)
    .filter(Boolean);
  return (
    <section className="light bg-paper section-y" aria-labelledby="guide-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Ratgeber
            </p>
            <h2 id="guide-title" className="h2 max-w-[16ch]">
              <SplitText text={'Wissen rund um\n*Autopflege.*'} />
            </h2>
          </div>
          <Link href="/ratgeber" className="inline-flex items-center gap-2 font-medium underline-offset-[6px] hover:underline">
            Alle Artikel <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {pick.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.08}>
              <ArticleCard a={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
