'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SITE } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';

/** Feste Aktionsleiste am unteren Rand (nur Mobil): Anrufen + Termin. Erscheint nach dem Hero. */
export function MobileBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const s = y > 420;
    setShow((p) => (p === s ? p : s));
  });
  if (pathname === '/termin') return null;
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 110, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-[50] px-3 md:hidden"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2 rounded-[28px] border border-white/10 bg-ink/85 p-2 backdrop-blur-xl">
        <Btn href={SITE.phoneHref} variant="ghost" icon="phone" magnetic={false} className="!min-h-[50px] !gap-2 !px-4 whitespace-nowrap">
          Anrufen
        </Btn>
        <Btn href="/termin" magnetic={false} icon="none" className="!min-h-[50px] !px-4 whitespace-nowrap">
          Termin anfragen
        </Btn>
      </div>
    </motion.div>
  );
}
