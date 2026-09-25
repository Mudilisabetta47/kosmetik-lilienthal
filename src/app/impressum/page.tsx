import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = pageMeta({
  title: 'Impressum | autokosmetik Lilienthal',
  description: 'Impressum von autokosmetik Lilienthal, Inhaber Izzeddin AK, Falkenberger Landstraße 75, 28865 Lilienthal – Angaben gemäß § 5 TMG.',
  path: '/impressum',
});

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p className="mt-2 font-medium">Betreiber der Website</p>
        <p>
          autokosmetik (Einzelunternehmer)<br />
          Inhaber: {SITE.owner}<br /><br />
          {SITE.street}<br />{SITE.zip} {SITE.city}<br /><br />
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a><br />
          E-Mail: <a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a>
        </p>
      </section>
      <section>
        <h2>Steuernummer</h2>
        <p>{SITE.taxId}</p>
      </section>
      <section>
        <h2>Kontakt für rechtliche Fragen</h2>
        <p>Bei rechtlichen Fragen wenden Sie sich bitte an <a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a>.</p>
      </section>
      <section>
        <h2>Haftungsausschluss</h2>
        <div className="space-y-4">
          <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        </div>
      </section>
      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>
    </LegalPage>
  );
}
