import type { Metadata } from 'next';
import { HOME_FAQS } from '@/lib/data';
import { faqLd, pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { StickyStory } from '@/components/sections/StickyStory';
import { ServicesStory } from '@/components/sections/ServicesStory';
import { PriceTable } from '@/components/sections/PriceTable';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { HorizontalGallery } from '@/components/sections/HorizontalGallery';
import { WhyStory } from '@/components/sections/WhyStory';
import { SaleSection } from '@/components/sections/SaleSection';
import { Reviews } from '@/components/sections/Reviews';
import { Location } from '@/components/sections/Location';
import { Faq } from '@/components/sections/Faq';
import { RequestSection } from '@/components/sections/RequestSection';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

export const metadata: Metadata = pageMeta({
  title: 'Autoaufbereitung Lilienthal & Bremen | autokosmetik Lilienthal',
  description:
    'Autoaufbereitung Lilienthal & Bremen: ✓ Lackaufbereitung ✓ Versiegelung ✓ Innenreinigung ✓ Verkaufsaufbereitung ✓ 4,8/5 Google. Jetzt anrufen: 0152 / 345 510 63',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <StickyStory />
      <ServicesStory />

      <section id="preise" className="curtain scroll-mt-20 bg-paper py-[clamp(88px,12vw,180px)] text-ink">
        <PriceTable />
      </section>

      <BeforeAfter />
      <HorizontalGallery />
      <WhyStory />
      <SaleSection />
      <Reviews />
      <Location />

      <section id="faq" className="light relative scroll-mt-20 bg-white section-y" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> FAQ
            </p>
            <h2 id="faq-title" className="h2 max-w-[13ch]">
              <SplitText text={'Häufige Fragen zur\n*Autoaufbereitung*'} />
            </h2>
            <Reveal>
              <p className="lede mt-6 max-w-[38ch]">Antworten zu Leistungen, Preisen und Ablauf – für Kundinnen und Kunden aus Lilienthal, Osterholz-Scharmbeck, Bremen und Umgebung.</p>
            </Reveal>
          </div>
          <Faq items={HOME_FAQS} idPrefix="home-faq" />
        </div>
      </section>
      <JsonLd data={faqLd(HOME_FAQS)} />

      <RequestSection />
    </>
  );
}
