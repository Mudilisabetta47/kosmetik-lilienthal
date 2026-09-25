/**
 * Einwilligungsauswahl (Cookie-Banner). Gespeichert wird nur die Auswahl selbst im localStorage
 * (technisch notwendig, keine Tracking-Cookies). Kategorien: „notwendig“ (immer) und
 * „Externe Medien“ (Google Maps).
 */
export type Consent = { v: 1; maps: boolean; ts: number };

const KEY = 'akl-consent-v1';
export const CONSENT_EVENT = 'akl-consent-change';
export const CONSENT_OPEN_EVENT = 'akl-consent-open';

/** Roh-String (stabil für useSyncExternalStore) */
export function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
}

export function parseConsent(raw: string): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Consent;
    return c && c.v === 1 && typeof c.maps === 'boolean' ? c : null;
  } catch {
    return null;
  }
}

export function writeConsent(maps: boolean) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v: 1, maps, ts: Date.now() } satisfies Consent));
  } catch {
    /* Speicher blockiert – Auswahl gilt dann nur für diese Sitzung */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
