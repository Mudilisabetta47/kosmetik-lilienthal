import type { MetadataRoute } from 'next';
import { SERVICES, SITE, STATIC_ROUTES } from '@/lib/data';

const LEGAL = new Set(['/impressum', '/datenschutz']);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((p) => ({
    url: p === '/' ? SITE.url : `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: (p === '/' ? 'weekly' : LEGAL.has(p) ? 'yearly' : 'monthly') as 'weekly' | 'monthly' | 'yearly',
    priority: p === '/' ? 1 : p === '/leistungen' || p === '/termin' ? 0.9 : LEGAL.has(p) ? 0.2 : 0.7,
  }));
  const services = SERVICES.map((s) => ({
    url: `${SITE.url}/leistungen/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [...staticEntries, ...services];
}
