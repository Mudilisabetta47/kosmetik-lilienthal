import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-[0.8rem] text-mute">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-bone">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-bone/80">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
