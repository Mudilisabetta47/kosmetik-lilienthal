import Link from 'next/link';
import type { ReactNode } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { Icon } from './Icon';

type Variant = 'primary' | 'ghost' | 'dark';

// Literale Klassennamen, damit Tailwind sie beim Scannen findet (kein dynamisches Zusammensetzen).
const VARIANT: Record<Variant, string> = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
  dark: 'btn btn-dark',
};

/** Einheitlicher Button: Fill-Shift beim Hover, Pfeil-Animation, optional magnetisch + Cursor-Label. */
export function Btn({
  href,
  children,
  variant = 'primary',
  cursor,
  magnetic = true,
  icon = 'arrow',
  className = '',
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  cursor?: string;
  magnetic?: boolean;
  icon?: 'arrow' | 'phone' | 'up-right' | 'arrow-down' | 'none';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const cls = `${VARIANT[variant]} ${className}`;
  const inner = (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="relative">{children}</span>
      {icon !== 'none' && <Icon name={icon} className="btn-arrow relative h-[1.05em] w-[1.05em]" />}
    </>
  );
  const el = !href ? (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled} data-cursor={cursor} className={`${cls} disabled:opacity-50`}>
      {inner}
    </button>
  ) : /^(tel:|mailto:|https?:)/.test(href) ? (
    <a
      href={href}
      data-cursor={cursor}
      className={cls}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} data-cursor={cursor} className={cls}>
      {inner}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
