import type { ReactNode } from 'react';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="bg-ink pb-24 pt-[calc(var(--header-h)+64px)]">
        <div className="wrap">
          <h1 className="h2 max-w-[18ch]">{title}</h1>
        </div>
      </div>
      <section className="light curtain bg-white pb-32 pt-16">
        <div className="wrap">
          <div className="max-w-[74ch] space-y-10 text-[1.02rem] leading-relaxed text-[#33405f] [&_a]:font-medium [&_a]:text-[#1a6aa3] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#14224a] [&_p.font-medium]:text-[#14224a] [&_strong]:text-[#14224a]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
