import Image from 'next/image';
import { getImage } from '@/lib/img';

/**
 * Bild aus dem optimierten Bestand (Key aus images.generated.ts).
 * Feste Ursprungsmaße + Blur-Platzhalter → kein Layout Shift.
 * `fill` füllt den Elterncontainer (muss position:relative und eine Größe haben).
 */
export function Img({
  k,
  alt,
  sizes,
  priority,
  fill,
  className,
  position,
  quality = 78,
}: {
  k: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  position?: string;
  quality?: number;
}) {
  const img = getImage(k);
  return (
    <Image
      src={img.src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      className={className}
      style={position ? { objectPosition: position } : undefined}
      {...(fill ? { fill: true } : { width: img.width, height: img.height })}
    />
  );
}
