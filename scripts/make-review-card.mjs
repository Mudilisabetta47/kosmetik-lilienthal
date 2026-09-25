// Druckbare Bewertungskarte (A6, 300 dpi) mit QR-Code → https://<domain>/bewerten → Google-Bewertungsformular.
// Aufruf: node scripts/make-review-card.mjs [https://autokosmetik-lilienthal.de]
import sharp from 'sharp';
import QRCode from 'qrcode';
import fs from 'node:fs';

const BASE = (process.argv[2] ?? 'https://autokosmetik-lilienthal.de').replace(/\/$/, '');
const W = 1240, H = 1748;
const qr = await QRCode.toBuffer(`${BASE}/bewerten`, { width: 620, margin: 1, color: { dark: '#14224a', light: '#ffffff' }, errorCorrectionLevel: 'M' });
const logo = await sharp('public/logo.png').resize({ width: 560 }).toBuffer();
const logoH = (await sharp(logo).metadata()).height;

const star = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="m12 3.6 2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8Z" fill="#f5b942"/>`;
const stars = [0, 1, 2, 3, 4].map((i) => star(W / 2 - 215 + i * 90, 700, 3.6)).join('');
const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#182552"/><stop offset="1" stop-color="#0d1730"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="${(W - 640) / 2}" y="110" width="640" height="${logoH + 60}" rx="40" fill="#ffffff"/>
  <text x="${W / 2}" y="470" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#eef2f8">Zufrieden mit Ihrer</text>
  <text x="${W / 2}" y="565" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#eef2f8">Aufbereitung?</text>
  ${stars}
  <text x="${W / 2}" y="850" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="42" fill="#c9d6ec">Ihre Google-Bewertung hilft uns –</text>
  <text x="${W / 2}" y="905" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="42" fill="#c9d6ec">und dem nächsten Kunden.</text>
  <rect x="${W / 2 - 350}" y="960" width="700" height="700" rx="48" fill="#ffffff"/>
  <text x="${W / 2}" y="1700" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="40" fill="#8fd0f5">QR-Code scannen · 30 Sekunden</text>
</svg>`);

const out = await sharp(svg)
  .composite([
    { input: logo, left: Math.round((W - 560) / 2), top: 140 },
    { input: qr, left: Math.round((W - 620) / 2), top: 1000 },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();
fs.writeFileSync('marketing/bewertungskarte-A6.png', out);
fs.writeFileSync('marketing/bewertungs-qr.png', qr);
console.log(`ok – QR zeigt auf ${BASE}/bewerten (Logo-Höhe ${logoH}px)`);
