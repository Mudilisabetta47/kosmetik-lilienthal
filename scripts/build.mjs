// Build-Einstieg: auf Cloudflare (Workers Builds / Pages) → OpenNext-Build + Cache befüllen,
// überall sonst (Vercel, lokal) → next build.
// Erzwingen: DEPLOY_TARGET=cloudflare bzw. DEPLOY_TARGET=next
import { spawnSync } from 'node:child_process';

const env = process.env;
const target = env.DEPLOY_TARGET ?? (env.VERCEL ? 'next' : env.WORKERS_CI || env.CF_PAGES ? 'cloudflare' : 'next');
if (target === 'cloudflare') env.IMAGE_MODE = 'static';
const steps =
  target === 'cloudflare'
    ? [
        ['opennextjs-cloudflare', 'build'],
        // Vorgerenderte Seiten in die Worker-Assets legen – ohne diesen Schritt liefern dynamische Routen 404.
        ['opennextjs-cloudflare', 'populateCache', 'local'],
      ]
    : [['next', 'build']];

console.log(`[build] Ziel: ${target}`);
for (const s of steps) {
  console.log(`[build] → npx ${s.join(' ')}`);
  const r = spawnSync('npx', s, { stdio: 'inherit', env });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
