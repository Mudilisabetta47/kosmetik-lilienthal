import { WHY } from '@/lib/data';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Szene 8 – Warum professionelle Fahrzeugaufbereitung? Editorial: Bildfläche mit Parallax + sechs Argumente. */
export function WhyStory() {
  return (
    <section className="relative overflow-hidden bg-ink section-y" aria-labelledby="why-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(52,154,214,0.16),transparent)]"
      />
      <div className="wrap relative">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Warum aufbereiten?
        </p>
        <h2 id="why-title" className="display max-w-[16ch] text-[clamp(2.3rem,7.2vw,7.4rem)]">
          <SplitText text={'Warum professionelle\n*Fahrzeugaufbereitung?*'} />
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Parallax from={-4} to={4}>
              <ImageReveal className="aspect-[4/5] w-full" radius={28} zoom={0.12} from="left">
                <Img k="porsche991" alt="Schwarzer Porsche 991 mit Hochglanz-Lack nach der Lackaufbereitung" fill sizes="(min-width:1024px) 42vw, 100vw" position="60% 50%" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </ImageReveal>
            </Parallax>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[30ch] text-[clamp(1.3rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight text-bone/90">
                Ein gepflegtes Fahrzeug fährt nicht nur schöner – es <span className="serif-i silver-text">behält auch seinen Wert.</span>
              </p>
            </Reveal>
          </div>

          <ol>
            {WHY.map((w, i) => (
              <Reveal as="li" key={w.title} blur={false} delay={0.04} className="group border-t border-white/[0.1] py-9 first:border-t-0 first:pt-0 md:py-12">
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 md:gap-x-10">
                  <span className="tabular pt-1 font-serif text-[1.4rem] italic text-brand md:text-[1.8rem]">0{i + 1}</span>
                  <div className="transition-transform duration-700 ease-out group-hover:translate-x-2">
                    <h3 className="text-[clamp(1.6rem,3vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.025em]">{w.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[1.02rem] leading-relaxed text-mute md:text-[1.1rem]">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
