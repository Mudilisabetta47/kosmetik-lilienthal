import Image from 'next/image';

/** Originallogo (helle Fläche) als abgerundete Plakette – bleibt auf dunklem Navy-Grund unverändert lesbar. */
export function Logo({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`inline-flex overflow-hidden rounded-[14px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] ${className}`}>
      <Image
        src="/logo.png"
        alt="autokosmetik Lilienthal – Professionelle KFZ-Aufbereitung"
        width={1139}
        height={390}
        priority={priority}
        sizes="160px"
        className="h-[46px] w-auto md:h-[52px]"
      />
    </span>
  );
}
