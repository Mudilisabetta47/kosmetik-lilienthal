// Quellbilder aus raw/ -> public/img/*.webp (max. 2200px) + Blur-Platzhalter.
// Ausgabe: src/lib/images.generated.ts (Maße + blurDataURL, verhindert Layout Shift).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const RAW = 'raw';
const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

// key -> [Quelldatei, optionaler Zuschnitt (Anteil unten abschneiden)]
const MAP = {
  hero: ['hero-car.jpg'],
  polish: ['detailing.jpg'],
  interiorAfter: ['after-interior.jpg'],
  interiorBefore: ['before-interior.jpg'],
  paintAfter: ['after-paint.jpg'],
  paintBefore: ['before-paint.jpg'],
  sealAfter: ['after-seal.jpg'],
  sealBefore: ['before-seal.jpg'],
  taycan: ['taycan.jpg'],
  lambo: ['lambo.jpg'],
  porsche911Turbo: ['porsche-911-turbo.jpg'],
  mustang: ['mustang.webp'],
  carreraS: ['porsche-911-carrera-s.jpg'],
  porsche991: ['porsche-991-seite.jpg'],
  g63Front: ['g63-front.jpg'],
  g63Heck: ['g63-heck.jpg'],
  g63HeckShop: ['g63-heck-shop.jpg'],
  m850iFront: ['m850i-front.jpg'],
  m850iSeite: ['m850i-seite.jpg'],
  m850iHeck: ['m850i-heck.jpg'],
  porsche997Front: ['porsche-997-front.jpg'],
  porsche997Heck: ['porsche-997-heck.jpg'],
  boxster: ['boxster.jpg'],
  porsche924: ['porsche-924.jpg'],
  porsche924Seite: ['porsche-924-seite.jpg'],
  cCabrio: ['mercedes-c-cabrio.jpg'],
  x6M40i: ['x6-m40i-heck.jpg'],
  x6: ['x6-heck.jpg'],
  amgGtShop: ['amg-gt-shop.jpg'],
  amgGtFront: ['amg-gt-front.jpg'],
  rangeRover: ['range-rover-sport.jpg'],
  // Street-View-Ausschnitt: unteren Rand mit Fremdtext abschneiden
  shopPorsches: ['shop-front-porsches.png', 0.09],
  // Startbild (Kundenfoto): unteren Rand abschneiden (Straße + Wasserzeichen)
  shop: ['shop-front.png', 0.1],
};

const out = {};
for (const [key, [file, cropBottom]] of Object.entries(MAP)) {
  let img = sharp(path.join(RAW, file)).rotate();
  const meta = await img.metadata();
  let w = meta.width;
  let h = meta.height;
  if (cropBottom) {
    h = Math.round(h * (1 - cropBottom));
    img = sharp(await img.extract({ left: 0, top: 0, width: w, height: h }).toBuffer());
  }
  const maxW = 2200;
  if (w > maxW) {
    h = Math.round((h * maxW) / w);
    w = maxW;
    img = img.resize({ width: maxW });
  }
  await img.webp({ quality: 82, effort: 5 }).toFile(path.join(OUT, `${key}.webp`));
  const blur = await sharp(path.join(OUT, `${key}.webp`))
    .resize(20)
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  out[key] = { src: `/img/${key}.webp`, width: w, height: h, blurDataURL: `data:image/webp;base64,${blur.toString('base64')}` };
  console.log(key, `${w}x${h}`, (fs.statSync(path.join(OUT, `${key}.webp`)).size / 1024).toFixed(0) + ' KB');
}

// Logo (heller Hintergrund, nur für Markup/Favicon/JSON-LD): zuschneiden + Favicon
await sharp(path.join(RAW, 'logo.png')).trim({ threshold: 20 }).extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#ffffff' }).png({ compressionLevel: 9 }).toFile('public/logo.png');
const icon = await sharp(path.join(RAW, 'logo.png')).extract({ left: 70, top: 240, width: 1120, height: 300 }).resize(512, 512, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
fs.writeFileSync('public/icon.png', icon);

// Open-Graph-Bild 1200x630 aus dem Hero
const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1633" stop-opacity=".25"/><stop offset="1" stop-color="#0b1633" stop-opacity=".92"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="64" y="500" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="700" fill="#eef2f8">autokosmetik Lilienthal</text><text x="64" y="556" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#8fd0f5">Premium Fahrzeugaufbereitung · Lilienthal / Bremen</text></svg>`);
await sharp(path.join(RAW, 'shop-front.png')).resize(1200, 630, { fit: 'cover', position: 'attention' }).composite([{ input: svg }]).jpeg({ quality: 84 }).toFile('public/og.jpg');

const ts = `// AUTO-GENERIERT von scripts/optimize-images.mjs – nicht von Hand ändern.\nexport type ImageAsset = { src: string; width: number; height: number; blurDataURL: string };\nexport const IMAGES = ${JSON.stringify(out, null, 2)} as const satisfies Record<string, ImageAsset>;\nexport type ImageKey = keyof typeof IMAGES;\n`;
fs.writeFileSync('src/lib/images.generated.ts', ts);
console.log('done');
