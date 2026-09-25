import type { ReactNode } from 'react';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-ink pb-32 pt-[calc(var(--header-h)+72px)]">
      <div className="wrap">
        <h1 className="h2 max-w-[18ch]">{title}</h1>
        <div className="mt-12 max-w-[74ch] space-y-10 text-[1.02rem] leading-relaxed text-bone/80 [&_a]:text-bone [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-bone">
          {children}
        </div>
      </div>
    </section>
  );
}
