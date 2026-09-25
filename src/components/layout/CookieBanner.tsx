'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONSENT_OPEN_EVENT, writeConsent } from '@/lib/consent';
import { EASE } from '@/components/motion/useMotion';
import { useConsent } from './useConsent';

/**
 * Cookie-/Datenschutz-Hinweis. Die Website setzt keine Tracking- oder Werbe-Cookies; die Auswahl betrifft
 * nur externe Inhalte (Google Maps). „Nur notwendige“ und „Alle akzeptieren“ sind gleichwertig dargestellt.
 */
export function CookieBanner() {
  const consent = useConsent();
  const [mounted, setMounted] = useState(false);
  const [forced, setForced] = useState(false);
  const [details, setDetails] = useState(false);
  const [maps, setMaps] = useState(false);

  useEffect(() => {
    setMounted(true);
    const open = () => {
      setForced(true);
      setDetails(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (forced) setMaps(consent?.maps ?? false);
  }, [forced, consent]);

  const visible = mounted && (consent === null || forced);
  const save = (m: boolean) => {
    writeConsent(m);
    setForced(false);
    setDetails(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-[90] max-h-[calc(100svh-24px)] overflow-y-auto rounded-3xl border border-white/15 bg-ink/95 p-5 text-bone shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[460px] md:p-6"
        >
          <p id="cookie-title" className="text-[1.05rem] font-semibold tracking-tight">Ihre Privatsphäre</p>
          <p id="cookie-text" className="mt-2 text-[0.9rem] leading-relaxed text-bone/80">
            Wir setzen <strong className="font-semibold text-bone">keine Tracking- oder Werbe-Cookies</strong> ein. Für unsere Karte laden wir auf Wunsch Inhalte von Google Maps – dabei werden Daten an Google übertragen. Mehr in der{' '}
            <Link href="/datenschutz" className="text-bone underline underline-offset-4">Datenschutzerklärung</Link> und im{' '}
            <Link href="/impressum" className="text-bone underline underline-offset-4">Impressum</Link>.
          </p>

          {details && (
            <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[0.88rem]">
              <label className="flex items-start justify-between gap-4 opacity-80">
                <span>
                  <span className="block font-semibold">Notwendig</span>
                  <span className="text-bone/70">Speichert nur Ihre Auswahl hier. Immer aktiv.</span>
                </span>
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5 accent-white" aria-label="Notwendig (immer aktiv)" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block font-semibold">Externe Medien (Google Maps)</span>
                  <span className="text-bone/70">Karte automatisch laden. Google erhält dabei Ihre IP-Adresse.</span>
                </span>
                <input type="checkbox" checked={maps} onChange={(e) => setMaps(e.target.checked)} className="mt-1 h-5 w-5 accent-white" aria-label="Externe Medien (Google Maps) erlauben" />
              </label>
            </div>
          )}

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => save(false)}
              className="min-h-[48px] rounded-full border border-white/30 px-5 text-[0.92rem] font-semibold transition-colors hover:bg-white/10"
            >
              Nur notwendige
            </button>
            <button
              type="button"
              onClick={() => save(true)}
              className="min-h-[48px] rounded-full border border-white/30 px-5 text-[0.92rem] font-semibold transition-colors hover:bg-white/10"
            >
              Alle akzeptieren
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[0.85rem]">
            <button type="button" onClick={() => setDetails((d) => !d)} aria-expanded={details} className="text-bone/80 underline underline-offset-4 hover:text-white">
              {details ? 'Einstellungen ausblenden' : 'Einstellungen'}
            </button>
            {details && (
              <button type="button" onClick={() => save(maps)} className="rounded-full bg-brand px-4 py-2 font-semibold text-ink">
                Auswahl speichern
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
