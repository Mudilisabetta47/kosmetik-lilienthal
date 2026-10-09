import { IMAGES } from './images.generated';

/**
 * Statischer Bild-Loader (ohne /_next/image): wählt aus den vorab erzeugten Breiten-Varianten
 * (scripts/optimize-images.mjs) die kleinste, die ≥ der gewünschten Breite ist. Läuft auf jedem Host,
 * z. B. Cloudflare Workers, wo der Next-Bildoptimierer nicht zuverlässig verfügbar ist.
 */
const LADDER = [480, 828, 1280, 1920];
const ORIGINAL_WIDTH: Record<string, number> = Object.fromEntries(Object.values(IMAGES).map((i) => [i.src, i.width]));

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const orig = ORIGINAL_WIDTH[src];
  if (!orig) return src; // z. B. /logo.png
  const pick = LADDER.find((w) => w >= width && w < orig);
  return pick ? src.replace(/\.webp$/, `-${pick}.webp`) : src;
}
