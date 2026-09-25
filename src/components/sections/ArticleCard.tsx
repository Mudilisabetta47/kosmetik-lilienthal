import Link from 'next/link';
import type { Article } from '@/lib/articles';
import { Img } from '@/components/ui/Img';

export function ArticleCard({ a, dark = false }: { a: Article; dark?: boolean }) {
  return (
    <article className="img-zoom group h-full">
      <Link href={`/ratgeber/${a.slug}`} data-cursor="Lesen" className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
          <Img k={a.img} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" position={a.imgPosition} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
        </div>
        <p className={`eyebrow mt-5 ${dark ? '' : ''}`}>{a.kicker} · {a.minutes} Min. Lesezeit</p>
        <h3 className="mt-2 text-[1.3rem] font-semibold leading-snug tracking-tight group-hover:underline">{a.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{a.lead}</p>
      </Link>
    </article>
  );
}
