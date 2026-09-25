'use client';

import { useSyncExternalStore } from 'react';
import { parseConsent, readRaw, subscribeConsent, type Consent } from '@/lib/consent';

/** null = noch keine Auswahl getroffen (auf dem Server immer null). */
export function useConsent(): Consent | null {
  const raw = useSyncExternalStore(subscribeConsent, readRaw, () => '');
  return parseConsent(raw);
}
