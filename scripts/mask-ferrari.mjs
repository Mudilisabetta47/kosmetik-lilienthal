// Ferrari-Fotos übernehmen; das lesbare Kennzeichen (Seitenansicht) wird überdeckt.
// Die übrigen Kennzeichen sind im Original bereits mit Folie abgedeckt.
// Aufruf: node scripts/mask-ferrari.mjs <ordner mit 5.jpg … 9.jpg>
import sharp from 'sharp';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) throw new Error('Ordner mit 5.jpg … 9.jpg angeben');

const copy = (src, dst) => sharp(path.join(dir, src)).rotate().jpeg({ quality: 92 }).toFile(`raw/${dst}`);
await copy('5.jpg', 'ferrari-portrait.jpg');
await copy('6.jpg', 'ferrari-innen.jpg');
await copy('7.jpg', 'ferrari-heck.jpg');
await copy('8.jpg', 'ferrari-front.jpg');

const poly = '1583,740 1591,741 1590,773 1563,850 1554,850 1546,798';
const svg = Buffer.from(`<svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${poly}" fill="#c9d0db" stroke="#33405f" stroke-width="2" stroke-linejoin="round"/>
</svg>`);
await sharp(path.join(dir, '9.jpg')).rotate().composite([{ input: svg }]).jpeg({ quality: 92 }).toFile('raw/ferrari-seite.jpg');
console.log('ok');
