# autokosmetik Lilienthal – Premium-Relaunch

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3 · Framer Motion · Lenis

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint && npm test
BASE=http://localhost:3000 node scripts/qa-crawl.mjs   # Crawl-QA gegen laufenden Server
npm run images       # raw/ → public/img/*.webp + Blur-Platzhalter (raw/ ist nicht im Repo)
```

- **Inhalte & Preise:** `src/lib/data.ts` (einzige Quelle; Tests prüfen die Preise gegen die alte Website)
- **Motion-Konzept:** `docs/MOTION.md`
- **Terminanfrage:** `/api/anfrage` sendet über Resend. Variablen siehe `.env.example`.
  Ohne Konfiguration zeigt das Formular den Anruf-Fallback.
- **Farben:** Logo-Navy (`#14224a`-Familie) und Logo-Blau `#349ad6`, kein Schwarz.

## Marketing & SEO
- `docs/SEO.md` – was umgesetzt ist, Off-Page-Checkliste
- `docs/GOOGLE-PROFIL.md` – fertige Texte, Beiträge, Bewertungs-Vorlagen
- `docs/GOOGLE-ADS.md` – Kampagnenaufbau, Keywords, Anzeigentexte
- `marketing/bewertungskarte-A6.png` – Druckvorlage mit QR-Code (`node scripts/make-review-card.mjs <domain>`)
- `/bewerten` – Kurzlink zum Google-Bewertungsformular (für QR/SMS)
- Ratgeber: `src/lib/articles.ts` · Ortsseiten: `src/lib/places.ts`
- Optional: `NEXT_PUBLIC_REVIEW_COUNT` (echte Anzahl Google-Bewertungen) aktiviert AggregateRating im Markup

## Deployment
**Vercel:** Framework Next.js, Standard-Befehle (`npm ci`, `npm run build`) – nichts weiter nötig.

**Cloudflare Workers (OpenNext):** `wrangler.jsonc` und `open-next.config.ts` liegen im Repo.
Im Cloudflare-Projekt (Settings → Build) eintragen:
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Der Worker-Name in `wrangler.jsonc` (`kosmetik-lilienthal`) muss dem Projektnamen entsprechen – an zwei Stellen (`name` und `services[].service`).
- `NEXT_PUBLIC_*`-Variablen als Build-Variablen, `RESEND_API_KEY`/`REQUEST_TO_EMAIL`/`REQUEST_FROM_EMAIL` als Secrets (Runtime).
- Lokal testen: `npm run preview:cf`
