# Motion-Konzept – autokosmetik Lilienthal

**Leitidee:** Die Website ist ein Kurzfilm in acht Szenen. Scrollen ist der Schnitt.
Jede Bewegung hat eine Aufgabe: Aufmerksamkeit lenken, Hierarchie schaffen oder den
Übergang zwischen zwei Szenen tragen. Keine Bewegung zur Dekoration.

## Bausteine (src/components/motion)

| Baustein | Aufgabe | Technik |
|---|---|---|
| `useMotion()` | Ein Profil für alles: `full` (Desktop), `lite` (Touch/schmal), `none` (prefers-reduced-motion) | matchMedia, einmalig |
| `SplitText` | Zeilen-/Wort-Reveal großer Headlines aus einer Maske | `clip`/`translateY`, IntersectionObserver via `whileInView` |
| `WordScrub` | Statement, dessen Wörter beim Scrollen von gedimmt zu hell wechseln | `useScroll` → `useTransform(opacity)` |
| `Reveal` | Fade + 24px Versatz + Blur-to-Sharp | `opacity/transform/filter`, einmalig |
| `ImageReveal` | Clip-Path-Maske + Scale + Blur-to-Sharp für Bilder | `clip-path`, `scale` |
| `Parallax` | Ebenen mit unterschiedlicher Geschwindigkeit | `useScroll` → `y`; Faktor je Profil |
| `Magnetic` | Buttons folgen dem Cursor leicht | Spring, nur Maus |
| `CountUp` | Zahlen zählen beim Eintritt hoch (nur echte Zahlen) | rAF, einmalig |
| `ScrollProgress` | 2px-Fortschrittslinie im Header | `scaleX`, Spring |
| `CustomCursor` | Ring + Label („Ansehen“, „Termin“) | nur `pointer: fine` |
| `SmoothScroll` | Lenis, nur Maus | rAF nur solange gescrollt wird |

**Easing:** `cubic-bezier(.16,1,.3,1)` (expo-out) für alles Eintretende. **Dauer:** 0.9–1.3 s
für Reveals, 0.5 s für Hover. **Nur `transform`, `opacity`, `clip-path`, `filter` (einmalig).**

## Die Szenen der Startseite

1. **Hero – „Ihr Fahrzeug verdient mehr als eine Wäsche.“** Bild startet bei Scale 1.12
   (Ken Burns, 2.4 s) und läuft beim Scrollen langsam heraus, Hintergrund driftet
   nach oben, Overlay wird dunkler. Headline zeilenweise, Subline +0.5 s, CTAs +0.8 s.
   Beim Verlassen: Hero blendet in die Farbe der nächsten Szene (Verlauf), Inhalt wandert
   schneller nach oben als das Bild (Parallax-Ebenen: Bild 0.35×, Text 0.8×).
2. **Manifest** – Ein Satz, Wort für Wort „eingeschaltet“ (WordScrub). Ruhepunkt nach dem Hero.
3. **Sticky Story „Nicht einfach sauber.“** – 4 Szenen à ~100 vh. Bild bleibt stehen,
   wechselt per Clip-Mask; Text tauscht Zeile für Zeile; Bild zoomt pro Szene leicht;
   Zähler 01–04 + Fortschrittsleiste. Mobile: Szenen als gestapelte Karten mit Reveal.
4. **Leistungen (Services Story)** – Links Sticky-Bühne mit Bildwechsel, rechts die
   Leistungen in drei Gruppen. Die aktive Leistung ist hell, die übrigen gedimmt; Hintergrund-
   Glow wandert mit. Mobile: jede Leistung mit eigenem Bild, gestapelt.
5. **Preise (hell)** – harter Wechsel dunkel→hell als „Kapitelbruch“; Zeilen reveal,
   Preise zählen hoch.
6. **Vorher/Nachher** – Sticky, 3 Kategorien. Der Trenner öffnet sich beim Scrollen
   (12 % → 88 % → 50 %); sobald der Nutzer zieht, übernimmt er die Kontrolle.
7. **Fahrzeug-Showcase** – vertikales Scrollen bewegt ein pinned Bandes horizontal;
   Bilder in unterschiedlichen Größen, gegenläufige Parallax im Bild. Mobile: nativer
   Swipe mit Snap.
8. **Warum aufbereiten? / Verkauf / Bewertungen / Standort / Termin** – ruhigere Szenen:
   große Textreveals, ein Parallax-Bild je Szene, Zahlen zählen hoch.

## Übergänge zwischen Szenen

- Dunkel→Dunkel: 160 px Verlauf + Bild-Scale der nächsten Szene.
- Dunkel→Hell (Preise) und Hell→Dunkel (Vorher/Nachher): abgerundete Sektionskante
  („Vorhang“), die beim Eintritt von 0 auf 48 px Radius wächst.

## Mobile-Profil (`lite`)

Parallax ×0.35, keine Sticky-Szenen mit Bildwechsel (gestapelt), Galerie nativ,
kein Custom Cursor, kein Lenis, Blur-Reveals ohne `filter` (nur Opacity/Transform),
höchstens zwei Bewegungen gleichzeitig im Viewport.

## Reduced Motion (`none`)

Alles statisch sichtbar, Sticky-Szenen gestapelt, Zähler zeigen Endwert, keine Parallax,
kein Lenis, kein Cursor.

## Performance-Regeln

- Kein Layout-Thrash: nur Transform/Opacity/Clip-Path; Maße per `ResizeObserver` gecacht.
- Scroll-Werte über framer-motion `useScroll` (passive, in einem rAF gebündelt).
- React-State nur bei Szenenwechsel (Index), nie pro Scroll-Frame.
- `will-change` nur auf großen, tatsächlich animierten Ebenen.
- Bilder: AVIF/WebP via `next/image`, feste Maße + Blur-Platzhalter (kein Layout Shift).
