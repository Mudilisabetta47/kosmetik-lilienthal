'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SITE } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { EASE, scaleFor, useMotion } from '@/components/motion/useMotion';
import { SplitText } from '@/components/motion/SplitText';

/**
 * Szene 1 – Cinematic Hero. Ebenen mit unterschiedlicher Geschwindigkeit:
 * Bild 0.35× (Ken Burns + Scroll-Zoom), Licht-Sweep, Text 0.8×. Beim Verlassen
 * dunkelt das Overlay ab und der Verlauf am unteren Rand geht in die nächste Szene über.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const profile = useMotion();
  const k = scaleFor(profile);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imgY = useTransform(p, [0, 1], ['0%', `${26 * k}%`]);
  const imgScale = useTransform(p, [0, 1], [1, 1 + 0.16 * k]);
  const veil = useTransform(p, [0, 0.9], [0.0, 0.85]);
  const textY = useTransform(p, [0, 1], ['0%', `${-18 * k}%`]);
  const textOpacity = useTransform(p, [0, 0.62], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink" aria-label="Einleitung">
      {/* Ebene 1: Hintergrundbild – Scroll-Parallax außen, Ken-Burns innen */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: imgY, scale: imgScale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        >
          <Img k="shop" alt="Studio autokosmetik Lilienthal in der Falkenberger Landstraße mit einem weißen Porsche 911 und einem schwarzen Porsche 911 Cabrio" fill priority sizes="100vw" quality={85} position="50% 38%" className="object-cover" />
        </motion.div>
      </motion.div>

      {/* Verläufe: Lesbarkeit links, Übergang nach unten */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,22,51,0.9)_0%,rgba(11,22,51,0.58)_42%,rgba(11,22,51,0.08)_100%)] max-md:bg-[linear-gradient(180deg,rgba(11,22,51,0.55)_0%,rgba(11,22,51,0.72)_55%,rgba(11,22,51,0.94)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} aria-hidden="true" />

      {/* Licht-Sweep beim Laden (einmalig) */}
      {profile !== 'none' && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-10 left-0 w-[45%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
          initial={{ x: '-120%' }}
          animate={{ x: '320%' }}
          transition={{ duration: 2.6, delay: 0.5, ease: EASE }}
        />
      )}
      <div className="grain absolute inset-0" />

      {/* Ebene 2: Text */}
      <motion.div className="relative z-10 flex h-full flex-col justify-end will-change-transform" style={{ y: textY, opacity: textOpacity }}>
        <div className="wrap pb-[clamp(96px,12vh,150px)] pt-[calc(var(--header-h)+40px)]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="eyebrow mb-6 flex items-center gap-3 md:mb-8"
          >
            <span className="h-px w-8 bg-silver/70" aria-hidden="true" />
            {SITE.tagline}
          </motion.p>

          <h1 className="display max-w-[18ch] text-[clamp(2.2rem,min(8.4vw,12.5svh),8.6rem)]">
            <SplitText text={'Ihr Fahrzeug\nverdient *mehr*\nals eine Wäsche.'} immediate delay={0.25} stagger={0.09} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="lede mt-7 max-w-[54ch] text-bone/75 md:mt-9"
          >
            Professionelle Fahrzeugaufbereitung in Lilienthal – für tiefen Glanz, gepflegte Innenräume und nachhaltigen Werterhalt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11"
          >
            <Btn href="/termin" cursor="Termin">Termin anfragen</Btn>
            <Btn href="#leistungen" variant="ghost" icon="arrow-down" cursor="Explore">Leistungen entdecken</Btn>
          </motion.div>
        </div>

        {/* Fakten-Leiste */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="border-t border-white/[0.1] bg-ink/30 backdrop-blur-[2px]"
        >
          <ul className="wrap flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-[0.82rem] text-bone/75">
            <li className="flex items-center gap-2">
              <Icon name="star" className="h-4 w-4 text-silver" fill />
              <span className="tabular">{SITE.rating} / 5</span> bei Google
            </li>
            <li className="flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-silver" /> Mo–Fr 8:00–17:00 Uhr
            </li>
            <li className="hidden items-center gap-2 sm:flex">
              <Icon name="pin" className="h-4 w-4 text-silver" /> {SITE.street}, {SITE.city}
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
