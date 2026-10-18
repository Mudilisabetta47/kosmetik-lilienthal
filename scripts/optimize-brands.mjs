// Markenlogos (raw/brands, vom Inhaber bereitgestellt) → public/brands/*.webp + src/lib/brands.generated.ts
// Herkunft/Lizenzhinweise: docs/logo-quellen.json, docs/logo-hinweise.txt
import sharp from 'sharp';
import fs from 'node:fs';

const FILES = {
  bmw: 'bmw.png',
  chevrolet: 'chevrolet.png',
  ferrari: 'ferrari.png',
  ford: 'ford.png',
  lamborghini: 'lamborghini.png',
  'mercedes-benz': 'mercedes-benz.png',
  'mercedes-amg': 'mercedes-amg.png',
  porsche: 'porsche.png',
  'range-rover': 'range-rover.svg',
};
fs.mkdirSync('public/brands', { recursive: true });
const out = {};
for (const [key, file] of Object.entries(FILES)) {
  const input = sharp(`raw/brands/${file}`, file.endsWith('.svg') ? { density: 220 } : {});
  const buf = await input.trim({ threshold: 8 }).resize({ width: 420, height: 200, fit: 'inside', withoutEnlargement: false }).png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  await sharp(buf).webp({ quality: 92, alphaQuality: 100, effort: 5 }).toFile(`public/brands/${key}.webp`);
  out[key] = { src: `/brands/${key}.webp`, width, height };
  console.log(key, `${width}x${height}`, (fs.statSync(`public/brands/${key}.webp`).size / 1024).toFixed(1) + ' KB');
}
fs.writeFileSync(
  'src/lib/brands.generated.ts',
  `// AUTO-GENERIERT von scripts/optimize-brands.mjs – nicht von Hand ändern.\nexport const BRAND_LOGOS = ${JSON.stringify(out, null, 2)} as const;\nexport type BrandLogoKey = keyof typeof BRAND_LOGOS;\n`,
);
