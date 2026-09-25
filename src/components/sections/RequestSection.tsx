import { SITE } from '@/lib/data';
import { RequestFunnel } from '@/components/form/RequestFunnel';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

/** Terminanfrage-Funnel als eigene Szene (Startseite und /termin). */
export function RequestSection({ headingLevel = 2, initialService }: { headingLevel?: 1 | 2; initialService?: string }) {
  const H = `h${headingLevel}` as 'h1' | 'h2';
  return (
    <section id="termin" className="curtain scroll-mt-20 overflow-hidden bg-ink section-y" aria-labelledby="termin-title">
      <div aria-hidden="true" className="pointer-events-none absolute -left-1/4 bottom-0 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Termin
          </p>
          <H id="termin-title" className="display text-[clamp(2.4rem,6.6vw,6.4rem)]">
            <SplitText text={'Termin\n*anfragen.*'} />
          </H>
          <Reveal>
            <p className="lede mt-7 max-w-[42ch]">
              In vier kurzen Schritten zu Ihrem Wunschtermin – unverbindlich und persönlich. Wir melden uns bei Ihnen, um Umfang und Termin abzustimmen.
            </p>
            <ul className="mt-8 space-y-3 text-[0.98rem] text-bone/85">
              {['Unverbindliche Anfrage', 'Persönliche Beratung durch den Inhaber', 'Festpreis nach kurzer Begutachtung'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/25"><Icon name="check" className="h-3.5 w-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl border border-white/[0.09] bg-white/[0.03] p-6">
              <p className="eyebrow mb-3">Lieber direkt sprechen?</p>
              <a href={SITE.phoneHref} data-cursor="Anrufen" className="tabular inline-flex items-center gap-3 text-[1.7rem] font-semibold tracking-tight hover:underline">
                <Icon name="phone" className="h-6 w-6" /> {SITE.phoneDisplay}
              </a>
              <p className="mt-2 text-[0.88rem] text-mute">Mo–Fr 8:00–17:00 Uhr · Samstag nach Absprache</p>
            </div>
          </Reveal>
        </div>
        <Reveal blur={false}>
          <RequestFunnel initialService={initialService} />
        </Reveal>
      </div>
    </section>
  );
}
