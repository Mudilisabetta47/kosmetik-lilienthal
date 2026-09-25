import { Btn } from '@/components/ui/Btn';

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-ink px-6 pt-32 text-center">
      <div>
        <p className="eyebrow mb-6">Fehler 404</p>
        <h1 className="display text-[clamp(3rem,10vw,9rem)]">Seite nicht <span className="serif-i silver-text">gefunden.</span></h1>
        <p className="lede mx-auto mt-6 max-w-[46ch]">Die gesuchte Seite gibt es nicht (mehr). Hier geht es weiter:</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href="/">Zur Startseite</Btn>
          <Btn href="/leistungen" variant="ghost">Leistungen</Btn>
        </div>
      </div>
    </section>
  );
}
