// QA gegen einen laufenden Server:  BASE=http://localhost:3100 node scripts/qa-crawl.mjs
// Prüft Sitemap, Robots, alle Seiten (Status, Title, Description, Canonical, OG, H1, JSON-LD),
// alle internen Links + Bilder (keine 404) und Konsistenz von FAQPage-Markup mit sichtbaren Fragen.
const BASE = (process.env.BASE ?? 'http://localhost:3100').replace(/\/$/, '');
let failures = 0;
const fail = (m) => { failures++; console.log('  ✗', m); };
const ok = (m) => console.log('  ✓', m);

const get = async (p) => fetch(p.startsWith('http') ? p : BASE + p, { redirect: 'manual' });

console.log('robots.txt');
const robots = await (await get('/robots.txt')).text();
/Sitemap:\s*\S+\/sitemap\.xml/.test(robots) ? ok('verweist auf Sitemap') : fail('Sitemap-Zeile fehlt');
/Disallow:\s*\/api\//.test(robots) ? ok('sperrt /api/') : fail('/api/ nicht gesperrt');

console.log('sitemap.xml');
const smRes = await get('/sitemap.xml');
const sm = await smRes.text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
smRes.status === 200 && urls.length > 0 ? ok(`${urls.length} URLs`) : fail('Sitemap leer/nicht erreichbar');
const paths = urls.map((u) => new URL(u).pathname);

const seenLinks = new Map();
const seenImgs = new Set();
for (const p of paths) {
  console.log(p);
  const res = await get(p);
  if (res.status !== 200) { fail(`Status ${res.status}`); continue; }
  const html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&');
  const desc = (html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&');
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const og = /<meta property="og:title"/.test(html) && /<meta property="og:image"/.test(html);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  title.length > 10 && title.length <= 70 ? ok(`title (${title.length}): ${title}`) : fail(`title ungeeignet: "${title}"`);
  desc.length >= 90 && desc.length <= 175 ? ok(`description (${desc.length})`) : fail(`description Länge ${desc.length}`);
  canon.endsWith(p === '/' ? '' : p) && canon.startsWith('http') ? ok('canonical') : fail(`canonical: ${canon}`);
  og ? ok('Open Graph') : fail('OG fehlt');
  h1 === 1 ? ok('genau ein H1') : fail(`H1-Anzahl: ${h1}`);
  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let types = [];
  for (const raw of ld) {
    try { const j = JSON.parse(raw); const graph = j['@graph'] ?? [j]; types.push(...graph.flatMap((g) => [].concat(g['@type']))); if (j['@type'] === 'FAQPage') {
      const qs = j.mainEntity.map((q) => q.name);
      const visible = qs.every((q) => html.includes(q.replace(/&/g, '&amp;')) || html.includes(q));
      visible ? ok(`FAQPage: ${qs.length} Fragen sichtbar im HTML`) : fail('FAQPage-Frage nicht im sichtbaren HTML');
    } } catch (e) { fail('JSON-LD ungültig: ' + e.message); }
  }
  ok(`JSON-LD: ${[...new Set(types)].join(', ')}`);
  if (p.startsWith('/leistungen/')) {
    ['Service', 'BreadcrumbList', 'FAQPage'].forEach((t) => (types.includes(t) ? null : fail(`JSON-LD ${t} fehlt`)));
  }
  // Links & Bilder einsammeln
  for (const m of html.matchAll(/<a [^>]*href="([^"#]+)(#[^"]*)?"/g)) {
    const h = m[1];
    if (h.startsWith('/') && !h.startsWith('//')) seenLinks.set(h.replace(/\/$/, '') || '/', p);
  }
  for (const m of html.matchAll(/(?:src|srcSet)="([^"]*\/_next\/image[^"]+)"/g)) for (const part of m[1].replace(/&amp;/g, '&').split(/,\s+(?=\/_next)/)) seenImgs.add(part.trim().split(/\s+/)[0]);
}

console.log('\nInterne Links');
let dead = 0;
for (const [href, from] of seenLinks) {
  const r = await get(href);
  if (r.status >= 400) { fail(`${href} → ${r.status} (gefunden auf ${from})`); dead++; }
}
dead === 0 ? ok(`${seenLinks.size} eindeutige interne Links, keine 404`) : null;

console.log('\nBilder (Stichprobe)');
let bad = 0;
for (const src of [...seenImgs].slice(0, 60)) {
  const r = await get(src);
  if (r.status !== 200) { fail(`${src} → ${r.status}`); bad++; }
}
bad === 0 ? ok(`${Math.min(seenImgs.size, 60)} Bild-URLs geprüft`) : null;

console.log('\n404-Seite');
const nf = await get('/gibt-es-nicht');
nf.status === 404 ? ok('unbekannte Route liefert 404') : fail(`Status ${nf.status}`);

console.log(failures ? `\n${failures} Fehler` : '\nAlle Prüfungen bestanden');
process.exit(failures ? 1 : 0);
