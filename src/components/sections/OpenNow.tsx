'use client';

import { useEffect, useState } from 'react';

function compute(): { open: boolean; text: string } {
  const parts = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const wd = get('weekday').toLowerCase().replace('.', '');
  const mins = Number(get('hour')) * 60 + Number(get('minute'));
  const weekday = ['mo', 'di', 'mi', 'do', 'fr'].includes(wd);
  if (weekday && mins >= 8 * 60 && mins < 17 * 60) return { open: true, text: 'Jetzt geöffnet · bis 17:00 Uhr' };
  return { open: false, text: 'Aktuell geschlossen' };
}

/** Zeigt clientseitig (Zeitzone Europe/Berlin), ob das Studio gerade geöffnet ist. */
export function OpenNow() {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    setS(compute());
    const id = setInterval(() => setS(compute()), 60_000);
    return () => clearInterval(id);
  }, []);
  if (!s) return <span className="h-6" aria-hidden="true" />;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.75rem] text-bone/85">
      <span className={`h-1.5 w-1.5 rounded-full ${s.open ? 'bg-emerald-400' : 'bg-neutral-500'}`} aria-hidden="true" />
      {s.text}
    </span>
  );
}
