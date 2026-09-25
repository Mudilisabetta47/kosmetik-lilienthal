import Link from 'next/link';
import { GROUPS, type Service } from '@/lib/data';
import { Btn } from '@/components/ui/Btn';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';

/** Große redaktionelle Leistungszeile: Bild, Kurztext, Preis, CTA, Link zur Detailseite. */
export function ServiceRow({ s, index, flip }: { s: Service; index: number; flip?: boolean }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Link
        href={`/leistungen/${s.slug}`}
        data-cursor="Ansehen"
        className={`img-zoom block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
        aria-label={`${s.name} – Details ansehen`}
      >
        <ImageReveal className="aspect-[4/3] w-full" radius={26} zoom={0.1} from={flip ? 'right' : 'left'}>
          <Img k={s.img} alt={s.heroAlt} fill sizes="(min-width:1024px) 56vw, 100vw" position={s.imgPosition} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </ImageReveal>
      </Link>
      <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="eyebrow mb-4">0{index + 1} — {GROUPS[s.group].label}</p>
        <h3 className="h2 !text-[clamp(2rem,4vw,3.8rem)]">
          <Link href={`/leistungen/${s.slug}`} className="hover:text-white">{s.name}</Link>
        </h3>
        <p className="mt-5 max-w-[44ch] text-[1.05rem] leading-relaxed text-mute">{s.short}</p>
        <p className="tabular mt-6 text-[1.6rem] font-semibold tracking-tight">
          {s.priceFrom ? (<><span className="mr-1.5 text-[0.9rem] font-medium text-mute">ab</span>{s.priceFrom} €</>) : (<span className="text-[1rem] font-medium text-bone/85">{s.priceNote}</span>)}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Btn href={`/termin?leistung=${s.slug}`} cursor="Termin" className="!min-h-[48px] !px-6 !text-[0.92rem]">Termin anfragen</Btn>
          <Link href={`/leistungen/${s.slug}`} className="inline-flex items-center gap-2 font-medium text-bone underline-offset-[6px] hover:underline">
            Details <Icon name="up-right" className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
