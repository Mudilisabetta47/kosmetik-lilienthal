import Link from 'next/link';
import { SERVICES, SITE } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { Btn } from '@/components/ui/Btn';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-coal pb-28 pt-20 md:pb-12 md:pt-28">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/[0.08] pb-14 md:flex-row md:items-end">
          <p className="h2 max-w-[16ch]">
            Ihr Fahrzeug, <span className="serif-i silver-text">in besten Händen.</span>
          </p>
          <Btn href="/termin" cursor="Termin">Termin in Lilienthal vereinbaren</Btn>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <address className="mt-6 not-italic leading-relaxed text-bone/80">
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}
              <br />
              <span className="text-mute">{SITE.landmark}</span>
            </address>
            <a href={SITE.phoneHref} className="mt-4 inline-flex items-center gap-2 text-[1.1rem] font-semibold text-bone hover:underline">
              <Icon name="phone" className="h-4 w-4" />
              <span className="tabular">{SITE.phoneDisplay}</span>
            </a>
            <dl className="mt-6 space-y-1.5 text-[0.92rem]">
              <p className="eyebrow mb-3">Öffnungszeiten</p>
              {SITE.hours.map((h) => (
                <div key={h.day} className="flex max-w-[280px] justify-between gap-4">
                  <dt className="text-mute">{h.day}</dt>
                  <dd className="tabular text-bone/90">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Leistungen">
            <p className="eyebrow mb-5">Leistungen</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/leistungen/${s.slug}`} className="text-bone/80 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Entdecken">
            <p className="eyebrow mb-5">Entdecken</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[
                ['/preise', 'Preise'],
                ['/#vorher-nachher', 'Vorher / Nachher'],
                ['/galerie', 'Galerie'],
                ['/#standort', 'Standort'],
                ['/termin', 'Termin anfragen'],
                ['/fahrzeugaufbereitung-bremen', 'Fahrzeugaufbereitung Bremen'],
                ['/einzugsgebiet', 'Einzugsgebiet'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-bone/80 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <p className="eyebrow mb-5">Rechtliches</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li><Link href="/impressum" className="text-bone/80 hover:text-white">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-bone/80 hover:text-white">Datenschutz</Link></li>
              <li>
                <a href={SITE.reviewsUrl} target="_blank" rel="noopener noreferrer" className="text-bone/80 hover:text-white">
                  Google-Bewertungen
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-8 text-[0.82rem] text-mute md:flex-row">
          <p>© {new Date().getFullYear()} autokosmetik Lilienthal · Inhabergeführte KFZ-Aufbereitung</p>
          <p>Falkenberger Landstraße 75 · 28865 Lilienthal</p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none mt-10 select-none whitespace-nowrap text-center text-[clamp(3rem,15.5vw,15rem)] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.035]"
      >
        autokosmetik
      </p>
    </footer>
  );
}
