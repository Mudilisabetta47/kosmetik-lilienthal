import { SITE } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { Img } from '@/components/ui/Img';

/**
 * Google-Bewertungen. Es gibt nur den echten Durchschnittswert (4,8 / 5) –
 * bewusst keine erfundenen Kundenzitate.
 */
export function Reviews() {
  const Stars = ({ className = '' }: { className?: string }) => (
    <span className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" fill className="h-[clamp(26px,3.6vw,46px)] w-[clamp(26px,3.6vw,46px)]" />
      ))}
    </span>
  );
  return (
    <section className="relative isolate overflow-hidden bg-ink section-y" aria-labelledby="reviews-title">
      <div className="absolute inset-0 -z-10 opacity-[0.16]">
        <Img k="hero" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      <div className="wrap text-center">
        <Reveal>
          <p className="eyebrow mb-6">Google Bewertungen</p>
          <h2 id="reviews-title" className="mx-auto max-w-[20ch] text-[clamp(1.6rem,3.4vw,3rem)] font-semibold leading-tight tracking-[-0.02em]">
            Das sagen unsere <span className="serif-i silver-text">Kunden.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center">
          <p className="flex items-baseline justify-center gap-3 leading-none">
            <span className="silver-text text-[clamp(7rem,22vw,19rem)] font-semibold tracking-[-0.06em]">
              <CountUp to={4.8} decimals={1} duration={1800} />
            </span>
            <span className="text-[clamp(1.4rem,4vw,3.4rem)] font-medium text-mute">/ 5</span>
          </p>
          <div className="relative mt-6" role="img" aria-label="4,8 von 5 Sternen">
            <Stars className="text-white/15" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: '96%' }}>
              <Stars className="w-max text-silver" />
            </div>
          </div>
          <p className="mt-6 text-[1.05rem] text-bone/85">Bewertungen auf Google</p>
          <p className="mx-auto mt-3 max-w-[52ch] text-mute">
            Kundinnen und Kunden aus Lilienthal, Bremen und Osterholz-Scharmbeck bewerten uns auf Google.
          </p>
          <div className="mt-9">
            <Btn href={SITE.reviewsUrl} variant="ghost" icon="up-right" cursor="Google">Alle Bewertungen lesen</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
