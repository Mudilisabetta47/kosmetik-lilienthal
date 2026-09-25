'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { SERVICES, SITE, VEHICLE_TYPES } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { EASE } from '@/components/motion/useMotion';
import Link from 'next/link';

type Form = {
  services: string[];
  vehicleType: string;
  vehicle: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  website: string;
};

const EMPTY: Form = { services: [], vehicleType: '', vehicle: '', date: '', name: '', phone: '', email: '', message: '', consent: false, website: '' };
const STEPS = ['Leistung', 'Fahrzeug', 'Termin', 'Kontakt'] as const;
type Status = 'idle' | 'sending' | 'success' | 'unavailable' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Terminanfrage als Funnel: Leistung → Fahrzeug (+ optional Größe) → Wunschdatum → Kontakt → Senden.
 * Mobil gedacht: große Tippflächen, native Eingabetypen, ein Gedanke pro Schritt.
 */
export function RequestFunnel({ initialService }: { initialService?: string }) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [minDate, setMinDate] = useState('');
  const started = useRef(Date.now());
  const head = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    const q = new URLSearchParams(window.location.search).get('leistung') ?? initialService;
    if (q && (SERVICES.some((s) => s.slug === q) || q === 'beratung')) setF((p) => ({ ...p, services: [q] }));
  }, [initialService]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    head.current?.focus({ preventScroll: true });
    const r = root.current?.getBoundingClientRect();
    if (r && (r.top < 60 || r.top > window.innerHeight * 0.5)) root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, status]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };
  const toggleService = (slug: string) =>
    set('services', f.services.includes(slug) ? f.services.filter((s) => s !== slug) : slug === 'beratung' ? ['beratung'] : [...f.services.filter((s) => s !== 'beratung'), slug]);

  const validate = (s: number) => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (s === 0 && f.services.length === 0) e.services = 'Bitte wählen Sie mindestens eine Leistung – oder „Beratung“.';
    if (s === 1 && f.vehicle.trim().length < 2) e.vehicle = 'Bitte nennen Sie Marke und Modell.';
    if (s === 3) {
      if (f.name.trim().length < 2) e.name = 'Bitte geben Sie Ihren Namen an.';
      if (f.phone.replace(/\D/g, '').length < 6) e.phone = 'Bitte geben Sie eine gültige Telefonnummer an.';
      if (f.email && !EMAIL_RE.test(f.email)) e.email = 'Bitte prüfen Sie die E-Mail-Adresse.';
      if (!f.consent) e.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 3) return next();
    if (!validate(3)) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, elapsed: Date.now() - started.current }),
      });
      if (res.ok) setStatus('success');
      else if (res.status === 503) setStatus('unavailable');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const chosen = f.services.map((s) => (s === 'beratung' ? 'Beratung' : SERVICES.find((x) => x.slug === s)?.name)).filter(Boolean);
  const isSuccess = status === 'success';

  return (
    <div ref={root} className="scroll-mt-24 rounded-[28px] border border-white/[0.1] bg-graphite/80 p-5 backdrop-blur-sm sm:p-8 md:p-10">
      {!isSuccess && (
        <div className="mb-8" aria-hidden={false}>
          <p className="mb-3 text-[0.8rem] text-mute md:hidden">Schritt {step + 1} von 4 · {STEPS[step]}</p>
          <ol className="flex gap-2">
            {STEPS.map((s, i) => (
              <li key={s} className="flex-1">
                <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full bg-bone transition-transform duration-700 ease-out ${i <= step ? 'translate-x-0' : '-translate-x-full'}`} />
                </div>
                <span className={`mt-2 hidden text-[0.78rem] md:block ${i === step ? 'text-bone' : 'text-mute'}`}>{i + 1}. {s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {isSuccess ? (
        <div role="status" className="py-8 text-center md:py-14">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-bone text-ink">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h3 ref={head} tabIndex={-1} className="h3 mt-6 outline-none">Vielen Dank, {f.name.split(' ')[0]}!</h3>
          <p className="mx-auto mt-4 max-w-[46ch] text-mute">
            Ihre Anfrage ist bei uns eingegangen. Wir melden uns schnellstmöglich bei Ihnen, um den Termin abzustimmen.
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-[0.9rem] text-mute">Dringend? Rufen Sie uns an: {SITE.phoneDisplay} (Mo–Fr 8:00–17:00 Uhr).</p>
          <div className="mt-8 flex justify-center">
            <Btn href={SITE.phoneHref} variant="ghost" icon="phone">Jetzt anrufen</Btn>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          {/* Honeypot */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="mb-1 outline-none"><h3 ref={head} tabIndex={-1} className="h3 outline-none">Welche Leistung interessiert Sie?</h3></legend>
                  <p className="mb-6 text-mute">Mehrfachauswahl möglich.</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {SERVICES.map((s) => {
                      const on = f.services.includes(s.slug);
                      return (
                        <label key={s.slug} className={`flex min-h-[60px] cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors ${on ? 'border-bone bg-white/[0.09]' : 'border-white/[0.12] hover:border-white/30'}`}>
                          <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleService(s.slug)} />
                          <span>
                            <span className="block text-[1rem] font-medium leading-tight">{s.name}</span>
                            <span className="mt-0.5 block text-[0.8rem] text-mute">{s.priceFrom ? `ab ${s.priceFrom} €` : s.priceNote}</span>
                          </span>
                          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${on ? 'border-bone bg-bone text-ink' : 'border-white/30'}`}>
                            {on && <Icon name="check" className="h-3.5 w-3.5" />}
                          </span>
                        </label>
                      );
                    })}
                    <label className={`flex min-h-[60px] cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed px-4 py-3 transition-colors sm:col-span-2 ${f.services.includes('beratung') ? 'border-bone bg-white/[0.09]' : 'border-white/25 hover:border-white/40'}`}>
                      <input type="checkbox" className="sr-only" checked={f.services.includes('beratung')} onChange={() => toggleService('beratung')} />
                      <span>
                        <span className="block text-[1rem] font-medium">Ich bin unsicher – bitte beraten Sie mich</span>
                        <span className="mt-0.5 block text-[0.8rem] text-mute">Wir empfehlen die passende Aufbereitung für Ihr Fahrzeug.</span>
                      </span>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${f.services.includes('beratung') ? 'border-bone bg-bone text-ink' : 'border-white/30'}`}>
                        {f.services.includes('beratung') && <Icon name="check" className="h-3.5 w-3.5" />}
                      </span>
                    </label>
                  </div>
                  {errors.services && <p role="alert" className="mt-4 text-[0.9rem] text-red-300">{errors.services}</p>}
                </fieldset>
              )}

              {step === 1 && (
                <div>
                  <h3 ref={head} tabIndex={-1} className="h3 mb-6 outline-none">Um welches Fahrzeug geht es?</h3>
                  <label htmlFor={`${uid}-vehicle`} className="mb-2 block text-[0.9rem] font-medium">Marke & Modell</label>
                  <input
                    id={`${uid}-vehicle`}
                    className="field"
                    placeholder="z. B. Porsche 911, BMW X6, VW Caravelle"
                    value={f.vehicle}
                    onChange={(e) => set('vehicle', e.target.value)}
                    autoComplete="off"
                    aria-invalid={!!errors.vehicle}
                    aria-describedby={errors.vehicle ? `${uid}-vehicle-err` : undefined}
                    maxLength={80}
                  />
                  {errors.vehicle && <p id={`${uid}-vehicle-err`} role="alert" className="mt-2 text-[0.9rem] text-red-300">{errors.vehicle}</p>}

                  <fieldset className="mt-8">
                    <legend className="mb-1 text-[0.9rem] font-medium">Fahrzeugart <span className="font-normal text-mute">(optional)</span></legend>
                    <p className="mb-3 text-[0.85rem] text-mute">Unsere Preise gelten für die Mittelklasse; größere Fahrzeuge erhalten einen Aufschlag.</p>
                    <div className="grid gap-2.5">
                      {VEHICLE_TYPES.map((v) => {
                        const on = f.vehicleType === v.id;
                        return (
                          <label key={v.id} className={`flex min-h-[56px] cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors ${on ? 'border-bone bg-white/[0.09]' : 'border-white/[0.12] hover:border-white/30'}`}>
                            <input type="radio" name={`${uid}-vt`} className="sr-only" checked={on} onChange={() => set('vehicleType', v.id)} />
                            <span className="text-[0.98rem] font-medium">{v.label}</span>
                            <span className="tabular shrink-0 text-[0.8rem] text-mute">{v.hint}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 ref={head} tabIndex={-1} className="h3 mb-2 outline-none">Wann passt es Ihnen?</h3>
                  <p className="mb-6 text-mute">Termine nach Vereinbarung – wir bestätigen Ihren Wunschtermin persönlich.</p>
                  <label htmlFor={`${uid}-date`} className="mb-2 block text-[0.9rem] font-medium">Wunschdatum <span className="font-normal text-mute">(optional)</span></label>
                  <input id={`${uid}-date`} type="date" className="field" min={minDate} value={f.date} onChange={(e) => set('date', e.target.value)} />
                  {f.date && new Date(f.date + 'T12:00:00').getDay() === 0 && (
                    <p className="mt-3 text-[0.9rem] text-amber-200/90">Sonntags ist das Studio geschlossen – wir machen Ihnen gern einen Alternativvorschlag.</p>
                  )}
                  {f.date && new Date(f.date + 'T12:00:00').getDay() === 6 && (
                    <p className="mt-3 text-[0.9rem] text-mute">Samstag ist nur nach Absprache möglich.</p>
                  )}
                  <ul className="mt-6 space-y-2 text-[0.9rem] text-mute">
                    {SITE.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4 border-b border-white/[0.08] pb-2">
                        <span>{h.day}</span>
                        <span className="tabular text-bone/85">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 ref={head} tabIndex={-1} className="h3 mb-6 outline-none">Wie erreichen wir Sie?</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${uid}-name`} className="mb-2 block text-[0.9rem] font-medium">Name</label>
                      <input id={`${uid}-name`} className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} maxLength={80} />
                      {errors.name && <p role="alert" className="mt-2 text-[0.85rem] text-red-300">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-phone`} className="mb-2 block text-[0.9rem] font-medium">Telefon</label>
                      <input id={`${uid}-phone`} className="field" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} maxLength={30} />
                      {errors.phone && <p role="alert" className="mt-2 text-[0.85rem] text-red-300">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`${uid}-email`} className="mb-2 block text-[0.9rem] font-medium">E-Mail <span className="font-normal text-mute">(optional)</span></label>
                      <input id={`${uid}-email`} className="field" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} maxLength={120} />
                      {errors.email && <p role="alert" className="mt-2 text-[0.85rem] text-red-300">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`${uid}-msg`} className="mb-2 block text-[0.9rem] font-medium">Nachricht <span className="font-normal text-mute">(optional)</span></label>
                      <textarea id={`${uid}-msg`} className="field min-h-[110px] resize-y" value={f.message} onChange={(e) => set('message', e.target.value)} maxLength={1200} placeholder="Besondere Wünsche, Zustand des Fahrzeugs, Fragen …" />
                    </div>
                  </div>

                  <dl className="mt-6 space-y-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-[0.88rem]">
                    <div className="flex gap-3"><dt className="w-24 shrink-0 text-mute">Leistung</dt><dd>{chosen.join(', ') || '–'}</dd></div>
                    <div className="flex gap-3"><dt className="w-24 shrink-0 text-mute">Fahrzeug</dt><dd>{f.vehicle || '–'}{f.vehicleType ? ` · ${VEHICLE_TYPES.find((v) => v.id === f.vehicleType)?.label}` : ''}</dd></div>
                    <div className="flex gap-3"><dt className="w-24 shrink-0 text-mute">Wunschdatum</dt><dd>{f.date ? new Date(f.date + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : 'flexibel'}</dd></div>
                  </dl>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-mute">
                    <input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-white" aria-invalid={!!errors.consent} />
                    <span>
                      Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Hinweise finden Sie in der{' '}
                      <Link href="/datenschutz" className="text-bone underline underline-offset-4">Datenschutzerklärung</Link>.
                    </span>
                  </label>
                  {errors.consent && <p role="alert" className="mt-2 text-[0.85rem] text-red-300">{errors.consent}</p>}

                  {status === 'unavailable' && (
                    <div role="alert" className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/[0.07] p-4 text-[0.92rem]">
                      Der Online-Versand ist gerade nicht verfügbar. Bitte rufen Sie uns kurz an – wir vereinbaren Ihren Termin direkt:{' '}
                      <a href={SITE.phoneHref} className="font-semibold underline underline-offset-4">{SITE.phoneDisplay}</a>
                    </div>
                  )}
                  {status === 'error' && (
                    <div role="alert" className="mt-5 rounded-2xl border border-red-300/30 bg-red-300/[0.07] p-4 text-[0.92rem]">
                      Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an:{' '}
                      <a href={SITE.phoneHref} className="font-semibold underline underline-offset-4">{SITE.phoneDisplay}</a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={back} className="min-h-[52px] rounded-full px-5 text-[0.95rem] text-mute transition-colors hover:text-bone">
                ← Zurück
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <Btn type="button" onClick={next} magnetic={false} className="min-w-[160px]">Weiter</Btn>
            ) : (
              <Btn type="submit" magnetic={false} disabled={status === 'sending'} icon={status === 'sending' ? 'none' : 'arrow'} className="min-w-[200px]">
                {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
              </Btn>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
