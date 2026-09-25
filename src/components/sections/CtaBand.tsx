import { SITE } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Abschluss-Szene für Unterseiten. */
export function CtaBand({ title = 'Bereit für\n*Glanz?*', service }: { title?: string; service?: string }) {
  return (
    <section className="relative overflow-hidden curtain bg-graphite section-y" aria-label="Termin anfragen">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[50vw] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
      <div className="wrap relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <p className="display text-[clamp(2.6rem,9vw,9rem)]">
          <SplitText text={title} />
        </p>
        <Reveal className="max-w-[44ch]">
          <p className="lede">Wir beraten Sie persönlich und nennen Ihnen nach kurzer Begutachtung einen fairen Preis.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Btn href={service ? `/termin?leistung=${service}` : '/termin'} cursor="Termin">Termin anfragen</Btn>
            <Btn href={SITE.phoneHref} variant="ghost" icon="phone" cursor="Anrufen">{SITE.phoneDisplay}</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
