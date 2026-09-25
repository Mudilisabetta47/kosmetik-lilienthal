'use client';

import { useEffect, useState } from 'react';
import { useConsent } from '@/components/layout/useConsent';
import { SITE } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

/**
 * Karte per Klick laden (Datenschutz: erst dann werden Daten an Google übertragen).
 * Feste Höhe/Ratio → kein Layout Shift beim Nachladen.
 */
export function MapEmbed() {
  const consent = useConsent();
  const [click, setClick] = useState(false);
  const allowed = consent?.maps === true;
  const on = allowed || click;
  useEffect(() => {
    if (consent && !consent.maps) setClick(false);
  }, [consent]);
  return (
    <div className="on-photo relative aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-white/[0.09] bg-graphite sm:aspect-[16/8]">
      {on ? (
        <iframe
          title="Karte: autokosmetik Lilienthal, Falkenberger Landstraße 75, 28865 Lilienthal"
          src={SITE.mapsEmbed}
          className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.92)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setClick(true)}
          data-cursor="Karte laden"
          className="group absolute inset-0 grid place-items-center text-center"
          aria-label="Interaktive Karte laden (Daten werden an Google übertragen)"
        >
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.16]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M-20 230 C 220 170, 380 300, 640 200 S 980 120, 1200 190" fill="none" stroke="white" strokeWidth="2" />
            <path d="M120 -20 C 180 120, 300 200, 360 420" fill="none" stroke="white" strokeWidth="1.2" />
          </svg>
          <span className="relative flex flex-col items-center gap-3 px-6">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:scale-110">
              <Icon name="pin" className="h-6 w-6" />
            </span>
            <span className="text-[1.05rem] font-semibold">Karte laden</span>
            <span className="max-w-[42ch] text-[0.8rem] leading-relaxed text-mute">
              Beim Laden der Karte werden Daten an Google übertragen. Dauerhaft erlauben können Sie das unter „Cookie-Einstellungen“ im Footer.
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
