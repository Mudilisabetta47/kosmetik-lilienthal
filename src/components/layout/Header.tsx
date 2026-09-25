'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GROUPS, NAV, SERVICES, SITE, servicesOf, type GroupId } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { EASE } from '@/components/motion/useMotion';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const s = y > 32;
    setScrolled((prev) => (prev === s ? prev : s));
  });

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setMega(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const open = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || menu ? 'border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
        onMouseLeave={close}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="autokosmetik Lilienthal – Startseite" className="relative z-10 shrink-0" data-cursor="Start">
            <Logo priority />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {NAV.main.map((item) =>
              item.href === '/leistungen' ? (
                <div key={item.href} className="relative" onMouseEnter={open} onFocus={open}>
                  <Link
                    href={item.href}
                    aria-expanded={mega}
                    className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] text-bone/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <Icon name="chevron" className={`h-4 w-4 transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.92rem] text-bone/85 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.92rem] text-bone/85 transition-colors hover:text-white xl:flex"
              aria-label={`Anrufen: ${SITE.phoneDisplay}`}
            >
              <Icon name="phone" className="h-4 w-4" />
              <span className="tabular">{SITE.phoneDisplay}</span>
            </a>
            <div className="hidden md:block">
              <Btn href="/termin" cursor="Termin" className="!min-h-[46px] !px-6 !text-[0.9rem]">
                Termin anfragen
              </Btn>
            </div>
            <a
              href={SITE.phoneHref}
              aria-label={`Anrufen: ${SITE.phoneDisplay}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-bone md:hidden"
            >
              <Icon name="phone" className="h-[18px] w-[18px]" />
            </a>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? 'Menü schließen' : 'Menü öffnen'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-bone lg:hidden"
            >
              <Icon name={menu ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mega-Menü Leistungen (Desktop) */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              onMouseEnter={open}
              onMouseLeave={close}
              className="absolute inset-x-0 top-full hidden border-b border-white/[0.07] bg-ink/95 backdrop-blur-2xl lg:block"
            >
              <div className="wrap grid grid-cols-[1.1fr_repeat(3,1fr)] gap-10 py-10">
                <div>
                  <p className="eyebrow">Leistungen</p>
                  <p className="mt-4 max-w-[26ch] text-[1.5rem] font-semibold leading-tight tracking-tight">
                    Handarbeit, die man <span className="serif-i silver-text">sieht.</span>
                  </p>
                  <Link href="/leistungen" className="mt-6 inline-flex items-center gap-2 text-[0.9rem] text-bone underline-offset-4 hover:underline">
                    Alle Leistungen <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
                {(Object.keys(GROUPS) as GroupId[]).map((g) => (
                  <div key={g}>
                    <p className="eyebrow mb-4">{GROUPS[g].label}</p>
                    <ul className="space-y-1">
                      {servicesOf(g).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/leistungen/${s.slug}`}
                            className="group flex items-baseline justify-between gap-4 rounded-lg py-1.5 text-[0.95rem] text-bone/85 transition-colors hover:text-white"
                          >
                            <span>{s.name}</span>
                            <span className="tabular text-[0.78rem] text-mute transition-colors group-hover:text-silver">
                              {s.priceFrom ? `ab ${s.priceFrom} €` : 'Individuell'}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobiles Menü */}
      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-ink pt-[calc(var(--header-h)+12px)] lg:hidden"
          >
            <div className="wrap pb-40">
              <nav aria-label="Mobile Navigation">
                <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {NAV.main.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                    >
                      <Link href={item.href} className="flex items-center justify-between py-5 text-[1.7rem] font-semibold tracking-tight">
                        {item.label}
                        <Icon name="arrow" className="h-5 w-5 text-mute" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <p className="eyebrow mb-3 mt-10">Direkt zu</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/leistungen/${s.slug}`} className="block py-2 text-[0.95rem] text-bone/80">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid gap-3">
                <Btn href="/termin" magnetic={false}>Termin anfragen</Btn>
                <Btn href={SITE.phoneHref} variant="ghost" icon="phone" magnetic={false}>
                  {SITE.phoneDisplay}
                </Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
