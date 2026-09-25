// Kennzeichen unkenntlich machen: node scripts/mask-plates.mjs <ordner-mit-1.jpg-2.jpg-3.jpg>
// Ausgabe: raw/corvette-seite.jpg, raw/corvette-front.jpg, raw/corvette-heck.jpg (nur diese kommen ins Repo)
import sharp from 'sharp';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) throw new Error('Ordner mit 1.jpg, 2.jpg, 3.jpg angeben');

const plate = (cx, cy, w, h, deg) => `
  <g transform="translate(${cx} ${cy}) rotate(${deg})">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * 0.12}" fill="#ffffff" stroke="#14224a" stroke-width="${h * 0.045}"/>
    <text x="0" y="${h * 0.12}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${h * 0.42}" fill="#14224a">auto<tspan fill="#349ad6" font-style="italic" font-weight="400">kosmetik</tspan></text>
    <text x="0" y="${h * 0.36}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${h * 0.17}" letter-spacing="${h * 0.03}" fill="#14224a">LILIENTHAL</text>
  </g>`;
const overlay = (inner) => Buffer.from(`<svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`);

// Front: Kennzeichen + Halter-Werbung
await sharp(path.join(dir, '2.jpg'))
  .composite([{ input: overlay(plate(899, 740, 436, 108, -0.3)) }])
  .jpeg({ quality: 92 })
  .toFile('raw/corvette-front.jpg');

// Heck: nur das Kennzeichen ersetzen (die orangefarbene Tafel links gehört autokosmetik und bleibt sichtbar)
await sharp(path.join(dir, '3.jpg'))
  .composite([{ input: overlay(plate(846, 730, 334, 106, 3.7)) }])
  .jpeg({ quality: 92 })
  .toFile('raw/corvette-heck.jpg');

// Seite: kaum lesbares Heckkennzeichen am Bildrand verwischen
const side = sharp(path.join(dir, '1.jpg'));
const blur = await sharp(path.join(dir, '1.jpg')).extract({ left: 1420, top: 585, width: 46, height: 90 }).blur(18).toBuffer();
await side.composite([{ input: blur, left: 1420, top: 585 }]).jpeg({ quality: 92 }).toFile('raw/corvette-seite.jpg');
console.log('ok');
