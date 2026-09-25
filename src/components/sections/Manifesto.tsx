import { GALLERY_ALL, REGION_GROUPS, SERVICES, SITE } from '@/lib/data';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { WordScrub } from '@/components/motion/WordScrub';

const PLACES = REGION_GROUPS.flatMap((g) => g.places).length;

/** Szene 2 – Ruhepunkt nach dem Hero: ein Statement, das sich beim Scrollen „einschaltet“, plus echte Zahlen. */
export function Manifesto() {
  const stats = [
    { value: SERVICES.length, decimals: 0, label: 'Leistungen', sub: 'von Lack bis Wohnmobil' },
    { value: 4.8, decimals: 1, label: 'Google-Bewertung', sub: 'von maximal 5 Sternen' },
    { value: GALLERY_ALL.length, decimals: 0, label: 'Fahrzeuge in unserer Galerie', sub: 'echte Kundenfahrzeuge' },
    { value: PLACES, decimals: 0, label: 'Orte im Einzugsgebiet', sub: 'rund um Lilienthal & Bremen' },
  ];
  return (
    <section className="relative bg-ink section-y" aria-labelledby="manifest">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-silver/60" aria-hidden="true" /> Autokosmetik statt Autowäsche
          </p>
        </Reveal>
        <h2 id="manifest" className="sr-only">Autokosmetik ist keine Autowäsche</h2>
        <WordScrub
          className="max-w-[24ch] text-[clamp(1.9rem,4.9vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] md:max-w-[26ch]"
          text="Wir arbeiten in *Handarbeit* – schonend für Lack, Polster und Materialien. Das Ergebnis: ein sichtbar *gepflegtes* Auto, ein hygienischer Innenraum und spürbarer Werterhalt."
        />

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/[0.09] pt-12 md:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08}>
              <p className="text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.05em] silver-text">
                <CountUp to={s.value} decimals={s.decimals} />
              </p>
              <p className="mt-3 text-[0.95rem] font-medium text-bone">{s.label}</p>
              <p className="mt-1 text-[0.85rem] text-mute">{s.sub}</p>
            </Reveal>
          ))}
        </ul>
        <p className="sr-only">{SITE.name}</p>
      </div>
    </section>
  );
}
