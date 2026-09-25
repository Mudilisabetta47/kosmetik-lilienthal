// Inhalts- und Konsistenzprüfungen (node --test). Keine Abhängigkeiten, keine Server nötig.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as data from '../src/lib/data.ts';

const { SERVICES, SITE, GALLERY, GALLERY_ALL, BEFORE_AFTER, STORY_SCENES, EXTRA_IMAGES, REGION_GROUPS, STATIC_ROUTES, HOME_FAQS, PRICE_NOTE, NAV } = data;
const generated = fs.readFileSync('src/lib/images.generated.ts', 'utf8');
const imageKeys = new Set([...generated.matchAll(/^ {2}"([A-Za-z0-9]+)": \{/gm)].map((m) => m[1]));

// Quelle: bestehende Website autokosmetik-lilienthal.de (Preiskarten + Detailseiten)
const REAL_PRICES = {
  verkaufsaufbereitung: 260,
  innenreinigung: 60,
  'polster-leder': 70,
  hochglanzversiegelung: 250,
  'nano-versiegelung': 350,
  motorwaesche: 80,
  'orsun-geruchsentfernung': 100,
};
const NO_PRICE = ['lackaufbereitung', 'carnauba-wachs', 'folienentfernung', 'wohnwagen-aufbereitung'];

test('Preise entsprechen exakt den Angaben der bisherigen Website', () => {
  for (const [slug, price] of Object.entries(REAL_PRICES)) {
    assert.equal(SERVICES.find((s) => s.slug === slug)?.priceFrom, price, slug);
  }
  for (const slug of NO_PRICE) {
    assert.equal(SERVICES.find((s) => s.slug === slug)?.priceFrom, null, `${slug} darf keinen erfundenen Preis haben`);
  }
});

test('Preishinweis: Mittelklasse, +20 % und +40 %', () => {
  assert.match(PRICE_NOTE.base, /Mittelklasse/);
  assert.deepEqual(PRICE_NOTE.surcharges.map((s) => s.value), ['+ 20 %', '+ 40 %']);
});

test('11 Leistungen mit den geforderten Slugs', () => {
  const slugs = SERVICES.map((s) => s.slug).sort();
  assert.equal(new Set(slugs).size, slugs.length, 'Slugs eindeutig');
  for (const s of ['lackaufbereitung', 'innenreinigung', 'hochglanzversiegelung', 'nano-versiegelung', 'carnauba-wachs', 'polster-leder', 'orsun-geruchsentfernung', 'motorwaesche', 'folienentfernung', 'verkaufsaufbereitung', 'wohnwagen-aufbereitung']) {
    assert.ok(slugs.includes(s), `Slug fehlt: ${s}`);
  }
  assert.equal(SERVICES.length, 11);
});

test('Jede Leistung hat Ablauf, Vorteile, FAQ, Meta-Daten in sinnvoller Länge', () => {
  for (const s of SERVICES) {
    assert.equal(s.steps.length, 4, `${s.slug}: Schritte`);
    assert.ok(s.benefits.length >= 4, `${s.slug}: Vorteile`);
    assert.ok(s.faqs.length >= 3, `${s.slug}: FAQ`);
    assert.ok(s.metaTitle.length <= 66, `${s.slug}: Title ${s.metaTitle.length} Zeichen`);
    assert.ok(s.metaDescription.length >= 100 && s.metaDescription.length <= 170, `${s.slug}: Description ${s.metaDescription.length} Zeichen`);
    assert.match(s.h1, /Lilienthal/, `${s.slug}: H1 nennt Lilienthal`);
    for (const r of s.related) assert.ok(SERVICES.some((x) => x.slug === r), `${s.slug}: related ${r}`);
  }
  const titles = SERVICES.map((s) => s.metaTitle);
  assert.equal(new Set(titles).size, titles.length, 'Titles eindeutig');
  const descs = SERVICES.map((s) => s.metaDescription);
  assert.equal(new Set(descs).size, descs.length, 'Descriptions eindeutig');
});

test('Keine Garantie-/Superlativ-Versprechen', () => {
  const all = JSON.stringify([SERVICES, HOME_FAQS]).toLowerCase();
  for (const bad of ['garantiert teurer', 'höchster verkaufspreis', 'preisgarantie', 'zertifiziert', 'ausgezeichnet']) {
    assert.ok(!all.includes(bad), `verbotene Formulierung: ${bad}`);
  }
});

test('Alle referenzierten Bild-Keys existieren im optimierten Bestand', () => {
  const keys = [
    ...SERVICES.map((s) => s.img),
    ...GALLERY.map((g) => g.img),
    ...GALLERY_ALL.map((g) => g.img),
    ...BEFORE_AFTER.flatMap((b) => [b.before, b.after]),
    ...STORY_SCENES.map((s) => s.img),
    ...Object.values(EXTRA_IMAGES).flat(),
    'hero', 'shopPorsches', 'porsche991', 'm850iFront', 'carreraS', 'porsche997Front', 'lambo', 'taycan',
  ];
  for (const k of keys) assert.ok(imageKeys.has(k), `Bild-Key fehlt: ${k}`);
  for (const f of imageKeys) assert.ok(fs.existsSync(`public/img/${f}.webp`), `Datei fehlt: ${f}`);
});

test('Stammdaten: Adresse, Telefon, Öffnungszeiten, Bewertung', () => {
  assert.equal(SITE.street, 'Falkenberger Landstraße 75');
  assert.equal(SITE.zip, '28865');
  assert.equal(SITE.phoneDisplay, '0152 / 345 510 63');
  assert.equal(SITE.phoneHref, 'tel:+4915234551063');
  assert.equal(SITE.landmark, 'gegenüber Opel Meyer');
  assert.equal(SITE.rating, '4,8');
  assert.equal(SITE.hours[0].time, '8:00 – 17:00 Uhr');
  assert.equal(SITE.hours[1].time, 'nach Absprache');
});

test('Alle 19 Orte aus dem bestehenden Einzugsgebiet sind enthalten', () => {
  const places = REGION_GROUPS.flatMap((g) => g.places);
  for (const p of ['Lilienthal', 'Bremen', 'Osterholz-Scharmbeck', 'Worpswede', 'Ritterhude', 'Grasberg', 'Schwanewede', 'Lemwerder', 'Achim', 'Oyten', 'Ottersberg', 'Tarmstedt', 'Delmenhorst', 'Stuhr', 'Weyhe', 'Syke', 'Verden', 'Rotenburg', 'Zeven']) {
    assert.ok(places.includes(p), `Ort fehlt: ${p}`);
  }
  assert.equal(new Set(places).size, places.length, 'keine Duplikate');
});

test('Jede Route hat eine Seitendatei; Navigation zeigt nur auf existierende Routen', () => {
  const exists = (route) => {
    const dir = route === '/' ? 'src/app' : path.join('src/app', route);
    return fs.existsSync(path.join(dir, 'page.tsx'));
  };
  for (const r of STATIC_ROUTES) assert.ok(exists(r), `Seite fehlt: ${r}`);
  assert.ok(fs.existsSync('src/app/leistungen/[slug]/page.tsx'));
  for (const n of NAV.main) {
    const base = n.href.split('#')[0] || '/';
    assert.ok(exists(base), `Nav-Ziel fehlt: ${n.href}`);
  }
});

test('Keine nahezu identischen Regionalseiten: nur Hub + Bremen', () => {
  const regionPages = fs.readdirSync('src/app').filter((d) => /aufbereitung-|einzugsgebiet|autoaufbereitung-/.test(d));
  assert.deepEqual(regionPages.sort(), ['einzugsgebiet', 'fahrzeugaufbereitung-bremen']);
});
