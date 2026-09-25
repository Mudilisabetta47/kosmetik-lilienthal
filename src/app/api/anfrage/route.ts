import { NextResponse } from 'next/server';
import { SERVICES, SITE, VEHICLE_TYPES } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const hits = new Map<string, number[]>();
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '');
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');

/**
 * Terminanfrage → E-Mail über Resend. Ohne RESEND_API_KEY + REQUEST_TO_EMAIL antwortet die
 * Route mit 503 „not_configured“; das Formular zeigt dann den Anruf-Fallback.
 */
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  // Honeypot / zu schnell ausgefüllt → still „erfolgreich“, aber nichts senden
  if (clean(body.website, 50) || Number(body.elapsed) < 2500) return NextResponse.json({ ok: true });

  const services = Array.isArray(body.services) ? body.services.map((s) => clean(s, 60)) : [];
  const valid = new Set([...SERVICES.map((s) => s.slug), 'beratung']);
  const names = services.filter((s) => valid.has(s)).map((s) => (s === 'beratung' ? 'Beratung gewünscht' : SERVICES.find((x) => x.slug === s)!.name));
  const vehicle = clean(body.vehicle, 80);
  const vt = VEHICLE_TYPES.find((v) => v.id === body.vehicleType)?.label ?? '–';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ? clean(body.date, 10) : '';
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const message = clean(body.message, 1200);

  if (!names.length || vehicle.length < 2 || name.length < 2 || phone.replace(/\D/g, '').length < 6 || body.consent !== true) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.REQUEST_TO_EMAIL;
  const from = process.env.REQUEST_FROM_EMAIL ?? `${SITE.name} <onboarding@resend.dev>`;
  if (!key || !to) {
    console.warn('[anfrage] RESEND_API_KEY / REQUEST_TO_EMAIL nicht gesetzt – Anfrage wurde nicht versendet.');
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const text = [
    'Neue Terminanfrage über die Website',
    '',
    `Leistung(en): ${names.join(', ')}`,
    `Fahrzeug:     ${vehicle}`,
    `Fahrzeugart:  ${vt}`,
    `Wunschdatum:  ${date || 'flexibel'}`,
    '',
    `Name:         ${name}`,
    `Telefon:      ${phone}`,
    `E-Mail:       ${email || '–'}`,
    '',
    'Nachricht:',
    message || '–',
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        ...(email ? { reply_to: email } : {}),
        subject: oneLine(`Terminanfrage: ${names.join(', ')} – ${name}`).slice(0, 200),
        text,
      }),
    });
    if (!res.ok) {
      console.error('[anfrage] Resend-Fehler', res.status, await res.text());
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[anfrage] Versand fehlgeschlagen', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
