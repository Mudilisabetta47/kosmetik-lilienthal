import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = pageMeta({
  title: 'Datenschutzerklärung | autokosmetik Lilienthal',
  description: 'Datenschutzerklärung von autokosmetik Lilienthal – Informationen zur Verarbeitung Ihrer Daten.',
  path: '/datenschutz',
});

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p className="font-medium text-[#14224a]">Informationen zur Verarbeitung Ihrer Daten</p>
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>autokosmetik (Einzelunternehmer)<br />Inhaber: {SITE.owner}<br />{SITE.street}<br />{SITE.zip} {SITE.city}</p>
      </section>
      <section>
        <h2>2. Kontakt für rechtliche Fragen</h2>
        <p><a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a></p>
      </section>
      <section>
        <h2>3. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p>Personenbezogene Daten werden nur erhoben, wenn Sie diese im Rahmen einer Kontaktaufnahme (z. B. per Telefon oder E-Mail) freiwillig mitteilen. Wir verwenden die von Ihnen mitgeteilten Daten ausschließlich zur Bearbeitung Ihres Anliegens.</p>
      </section>
      <section>
        <h2>4. Terminanfrage über das Formular</h2>
        <p>
          Wenn Sie das Formular zur Terminanfrage nutzen, verarbeiten wir die von Ihnen eingegebenen Angaben (gewünschte Leistung, Fahrzeug, Wunschdatum, Name, Telefonnummer, optional E-Mail-Adresse und Nachricht) ausschließlich, um Ihre Anfrage zu beantworten und den Termin abzustimmen (Art. 6 Abs. 1 lit. b DSGVO). Die Anfrage wird per E-Mail an uns übermittelt; hierfür setzen wir einen technischen Dienstleister für den E-Mail-Versand ein. Eine Weitergabe zu anderen Zwecken erfolgt nicht.
        </p>
      </section>
      <section>
        <h2>5. Speicherdauer</h2>
        <p>Ihre personenbezogenen Daten werden nur so lange gespeichert, wie dies für die Erfüllung der Zwecke erforderlich ist, für die sie erhoben wurden, oder wie gesetzliche Aufbewahrungspflichten dies vorsehen.</p>
      </section>
      <section>
        <h2>6. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten, sowie auf Berichtigung, Löschung oder Einschränkung der Verarbeitung. Außerdem steht Ihnen ein Widerspruchsrecht gegen die Verarbeitung sowie das Recht auf Datenübertragbarkeit zu.</p>
        <p className="mt-3">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an den oben genannten Verantwortlichen oder an <a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a>.</p>
      </section>
      <section>
        <h2>7. Hosting &amp; technische Daten</h2>
        <p>Diese Website wird gehostet. Beim Zugriff auf die Website werden automatisch technische Daten (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage) durch den Hosting-Anbieter verarbeitet. Diese Daten sind für die technische Bereitstellung der Website erforderlich. Schriftarten werden lokal von unserem eigenen Server ausgeliefert; es gibt keine Verbindung zu Google Fonts.</p>
      </section>
      <section>
        <h2>8. Karte (Google Maps)</h2>
        <p>Auf der Startseite können Sie eine Karte von Google Maps laden. Eine Verbindung zu den Servern von Google wird erst hergestellt, wenn Sie im Cookie-Hinweis „Alle akzeptieren“ bzw. „Externe Medien“ erlauben oder auf „Karte laden“ klicken; dabei werden u. a. Ihre IP-Adresse und Angaben zu Ihrem Browser an Google übertragen (Rechtsgrundlage: Ihre Einwilligung, Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ohne Ihre Zustimmung findet keine Übertragung statt. Die Einwilligung können Sie jederzeit über „Cookie-Einstellungen“ im Seitenende widerrufen.</p>
      </section>
      <section>
        <h2>9. Cookies, lokale Speicherung und Tracking</h2>
        <p>Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken und verwendet keine Tracking-Dienste. Wir speichern lediglich Ihre Auswahl im Cookie-Hinweis im lokalen Speicher Ihres Browsers (localStorage, Schlüssel „akl-consent-v1“). Das ist technisch erforderlich, um Ihre Entscheidung zu berücksichtigen (§ 25 Abs. 2 Nr. 2 TDDDG), und enthält keine personenbezogenen Daten.</p>
      </section>
      <section>
        <h2>10. Änderungen dieser Erklärung</h2>
        <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte rechtliche Rahmenbedingungen oder bei Änderungen unserer Datenverarbeitung anzupassen.</p>
      </section>
    </LegalPage>
  );
}
