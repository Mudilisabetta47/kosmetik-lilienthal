import { NextResponse } from 'next/server';
import { SITE } from '@/lib/data';

/** Kurzlink für Flyer/QR-Codes/SMS: leitet auf das Google-Bewertungsformular weiter. */
export function GET() {
  return NextResponse.redirect(SITE.reviewsUrl, 307);
}
