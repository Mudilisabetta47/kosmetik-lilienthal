import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Img } from '@/components/ui/Img';
import { Parallax } from '@/components/motion/Parallax';
import { SplitText } from '@/components/motion/SplitText';

/** Premium-Hero für Unterseiten: Bild mit Parallax, Breadcrumbs, große H1, Lead und CTAs. */
export function PageHero({
  crumbs,
  title,
  lead,
  img,
  imgAlt,
  imgPosition,
  children,
  eyebrow,
  aside,
}: {
  crumbs: { name: string; href?: string }[];
  title: string;
  lead?: string;
  img: string;
  imgAlt: string;
  imgPosition?: string;
  children?: ReactNode;
  eyebrow?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink pt-[calc(var(--header-h)+56px)]">
      <Parallax from={0} to={14} className="absolute inset-0 -z-10">
        <div className="absolute -inset-y-[12%] inset-x-0">
          <Img k={img} alt={imgAlt} fill priority sizes="100vw" position={imgPosition} className="object-cover" />
        </div>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,22,51,0.9),rgba(11,22,51,0.55)_55%,rgba(11,22,51,0.25))] max-md:bg-[linear-gradient(180deg,rgba(11,22,51,0.5),rgba(11,22,51,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="wrap w-full pb-14 md:pb-20">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mb-5 mt-8">{eyebrow}</p>}
        <h1 className={`display max-w-[18ch] text-[clamp(2.2rem,6.4vw,6.4rem)] ${eyebrow ? '' : 'mt-8'}`}>
          <SplitText text={title} immediate delay={0.1} stagger={0.06} lineClassName="inline" />
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            {lead && <p className="lede max-w-[56ch] text-bone/80">{lead}</p>}
            {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
