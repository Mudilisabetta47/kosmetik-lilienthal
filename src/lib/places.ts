/**
 * Ortsseiten /einzugsgebiet/[ort]. Jede Seite hat einen eigenen redaktionellen Text.
 * Es werden nur belastbare geografische Angaben gemacht (Landkreis, Himmelsrichtung
 * relativ zu Lilienthal/Bremen) – keine erfundenen Entfernungen, Fahrzeiten oder Kundenzahlen.
 * Keine Imports – wird auch von den Node-Tests gelesen.
 */

export type Place = {
  slug: string;
  name: string;
  area: string;
  /** Lage relativ zu Lilienthal / Bremen */
  where: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  intro: [string, string];
  /** Drei Leistungen, die für diese Ortsseite im Fokus stehen, mit ortsbezogener Begründung */
  focus: { service: string; text: string }[];
  faqs: { q: string; a: string }[];
  neighbors: string[];
  img: string;
};

export const PLACES: Place[] = [
  {
    slug: 'osterholz-scharmbeck',
    name: 'Osterholz-Scharmbeck',
    area: 'Landkreis Osterholz',
    where: 'nördlich von Lilienthal',
    metaTitle: 'Autoaufbereitung Osterholz-Scharmbeck | Studio Lilienthal',
    metaDescription:
      'Autoaufbereitung Osterholz-Scharmbeck: ✓ Verkaufsaufbereitung ✓ Innenreinigung ✓ Hochglanzversiegelung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Als Kreisstadt des Landkreises Osterholz liegt Osterholz-Scharmbeck nördlich von Lilienthal – Ihr Aufbereitungsstudio ist also im eigenen Landkreis zu finden.',
    intro: [
      'Osterholz-Scharmbeck ist die Kreisstadt des Landkreises Osterholz. Unser Studio in der Falkenberger Landstraße liegt im selben Landkreis, südlich der Kreisstadt – für Sie also kein Umweg in eine andere Region, sondern ein Ansprechpartner vor der Haustür.',
      'Zu uns kommen Privatkunden ebenso wie Geschäftskunden und Autohändler. Wer in Osterholz-Scharmbeck einen Firmenwagen, ein Leasingfahrzeug oder das Familienauto gepflegt wissen möchte, bekommt bei uns Handarbeit statt Waschstraße – mit persönlicher Beratung vor der Auftragsvergabe. Wir prüfen zuerst den Zustand, besprechen mit Ihnen den sinnvollen Umfang und nennen einen Festpreis, bevor die Arbeit beginnt.',
    ],
    focus: [
      { service: 'verkaufsaufbereitung', text: 'Ob Leasingrückgabe, Händlerabgabe oder Privatverkauf: Die Komplettaufbereitung bereitet Ihr Fahrzeug gezielt darauf vor.' },
      { service: 'innenreinigung', text: 'Pendler- und Familienfahrzeuge sammeln im Alltag Krümel, Staub und Tierhaare – die Innenaufbereitung bringt den Innenraum zurück in Form.' },
      { service: 'hochglanzversiegelung', text: 'Politur und Schutzschicht in einem Arbeitsgang – für Lack, der nach der Behandlung sichtbar glänzt und Wasser abperlen lässt.' },
    ],
    faqs: [
      { q: 'Wo finde ich das Studio von Osterholz-Scharmbeck aus?', a: 'Das Studio liegt in der Falkenberger Landstraße 75 in Lilienthal, gegenüber Opel Meyer – südlich von Osterholz-Scharmbeck und ebenfalls im Landkreis Osterholz.' },
      { q: 'Lohnt sich die Aufbereitung vor der Leasingrückgabe?', a: 'Die Verkaufsaufbereitung ist auch für die Leasingrückgabe ausgerichtet: Sie soll das Fahrzeug in einem gepflegten Zustand zurückgeben helfen. Den Umfang besprechen wir vorab mit Ihnen.' },
    ],
    neighbors: ['ritterhude', 'worpswede', 'grasberg', 'schwanewede'],
    img: 'porsche991',
  },
  {
    slug: 'worpswede',
    name: 'Worpswede',
    area: 'Landkreis Osterholz',
    where: 'nordöstlich von Lilienthal',
    metaTitle: 'Autoaufbereitung Worpswede | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Worpswede: ✓ Carnauba-Wachs ✓ Lackaufbereitung ✓ Nano-Versiegelung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Worpswede liegt im Landkreis Osterholz nordöstlich von Lilienthal – für Liebhaberfahrzeuge und Alltagsautos gleichermaßen ein gutes Ziel für Handarbeit.',
    intro: [
      'Worpswede im Teufelsmoor ist als Künstlerdorf bekannt. Wer hier zu Hause ist, fährt oft über Landstraßen und Alleen – dabei bleiben Insekten, Baumharz und Feinstaub nicht aus. Unser Studio in Lilienthal erreichen Sie innerhalb des gleichen Landkreises.',
      'Besonders gern arbeiten wir an Fahrzeugen, die mehr sind als ein Fortbewegungsmittel: Cabrios, Oldtimer und Liebhaberstücke. Hier gibt es klassische Wachsversiegelung ebenso wie moderne Nano-Versiegelung – wir beraten, was zu Ihrem Fahrzeug und Ihrem Nutzungsprofil passt. Nach der Begutachtung nennen wir Ihnen einen Preis; für Cabrios und Oldtimer planen wir ausreichend Zeit ein, damit jedes Detail sorgfältig bearbeitet wird.',
    ],
    focus: [
      { service: 'carnauba-wachs', text: 'Warmer, satter Glanz von Hand aufgetragen – die klassische Wahl für Liebhaberfahrzeuge und Oldtimer.' },
      { service: 'lackaufbereitung', text: 'Feine Kratzer und Hologramme aus Jahren auf Landstraßen und in Waschanlagen entfernen wir mit mehrstufiger Politur.' },
      { service: 'nano-versiegelung', text: 'Für Fahrzeuge, die viel im Freien stehen: 1–3 Jahre Schutz bei normaler Pflege, mit starkem Abperleffekt.' },
    ],
    faqs: [
      { q: 'Eignet sich Ihr Studio auch für Oldtimer?', a: 'Ja. Für Liebhaberfahrzeuge und Oldtimer bieten wir unter anderem die Carnauba-Wachsversiegelung an, die in mehreren dünnen Schichten von Hand aufgetragen wird.' },
      { q: 'Wie komme ich von Worpswede nach Lilienthal?', a: 'Worpswede und Lilienthal liegen beide im Landkreis Osterholz. Das Studio finden Sie in der Falkenberger Landstraße 75, gegenüber Opel Meyer.' },
    ],
    neighbors: ['grasberg', 'osterholz-scharmbeck', 'tarmstedt', 'ritterhude'],
    img: 'porsche924',
  },
  {
    slug: 'ritterhude',
    name: 'Ritterhude',
    area: 'Landkreis Osterholz',
    where: 'nordwestlich von Lilienthal',
    metaTitle: 'Autoaufbereitung Ritterhude | KFZ-Aufbereitung Lilienthal',
    metaDescription:
      'Autoaufbereitung Ritterhude: ✓ Innenreinigung ✓ Polster & Leder ✓ Motorwäsche – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Ritterhude liegt zwischen Bremen und Osterholz-Scharmbeck – und damit auf dem Weg zu unserem Studio in Lilienthal.',
    intro: [
      'Ritterhude gehört zum Landkreis Osterholz und liegt zwischen Bremen und Osterholz-Scharmbeck. Für Fahrzeughalter aus Ritterhude ist unser Studio in Lilienthal eine Adresse im gleichen Landkreis, erreichbar ohne große Umwege.',
      'Familienautos und Pendlerfahrzeuge brauchen erfahrungsgemäß vor allem einen gepflegten Innenraum: Sitze, Teppiche, Kunststoffflächen und Leder. Auf Wunsch runden wir das Ganze mit einer Motorwäsche und Lackpflege ab. Ihr Termin läuft unkompliziert: Anfrage senden, kurze Begutachtung, Festpreis – und Ihr Fahrzeug bekommt genau die Pflege, die es braucht, nicht mehr und nicht weniger.',
    ],
    focus: [
      { service: 'innenreinigung', text: 'Aussaugen, Sprühextraktion und Kunststoffpflege – für einen Innenraum, in dem man sich wieder wohlfühlt.' },
      { service: 'polster-leder', text: 'Reinigung, Pflege und optionale Imprägnierung für stark beanspruchte Sitze und Türverkleidungen.' },
      { service: 'motorwaesche', text: 'Ein sauberer Motorraum erleichtert die Werkstattarbeit und macht beim Verkauf einen gepflegten Eindruck.' },
    ],
    faqs: [
      { q: 'Wie lange dauert eine Innenreinigung?', a: 'Eine Standardreinigung dauert in der Regel 3–5 Stunden, eine intensive Aufbereitung einen ganzen Tag. Termine sprechen wir individuell ab.' },
      { q: 'Kann ich Innenraum und Lack in einem Termin kombinieren?', a: 'Ja, viele Leistungen lassen sich kombinieren. Nennen Sie uns in der Terminanfrage einfach mehrere Wünsche – wir stellen den Umfang mit Ihnen zusammen.' },
    ],
    neighbors: ['osterholz-scharmbeck', 'schwanewede', 'worpswede'],
    img: 'x6M40i',
  },
  {
    slug: 'grasberg',
    name: 'Grasberg',
    area: 'Landkreis Osterholz',
    where: 'östlich von Lilienthal',
    metaTitle: 'Autoaufbereitung Grasberg | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Grasberg: ✓ Wohnwagen-Aufbereitung ✓ Lackaufbereitung ✓ Motorwäsche – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Grasberg grenzt östlich an Lilienthal – ein kurzer Nachbarschaftsweg zu Handarbeit für Auto, Wohnwagen und Wohnmobil.',
    intro: [
      'Grasberg liegt im Landkreis Osterholz östlich von Lilienthal, am Rand des Teufelsmoors. Als direkte Nachbargemeinde sind wir für Fahrzeughalter aus Grasberg der nächstgelegene Aufbereiter.',
      'Neben Pkw kümmern wir uns auch um größere Fahrzeuge: Wohnwagen und Wohnmobile, die viel im Freien stehen, bekommen mit der Zeit Algen und schwarze Streifen. Wir entfernen diese und polieren matte Oberflächen auf – nach kurzer Begutachtung zum Festpreis. Größere Fahrzeuge bewerten wir nach Größe und Zustand; wie bei allen Leistungen gilt: erst Begutachtung, dann ein klarer Preis ohne Überraschungen.',
    ],
    focus: [
      { service: 'wohnwagen-aufbereitung', text: 'Außenhülle gründlich reinigen, schwarze Streifen entfernen und matte Flächen polieren – auf Wunsch samt Innenraum.' },
      { service: 'lackaufbereitung', text: 'Für Pkw mit mattem oder verkratztem Lack: mehrstufige Politur für Tiefe und Farbe.' },
      { service: 'motorwaesche', text: 'Gründlich und schonend gereinigt, mit anschließender Pflege der Kunststoffteile.' },
    ],
    faqs: [
      { q: 'Bereiten Sie auch Wohnwagen und Wohnmobile auf?', a: 'Ja. Nach einer kurzen Begutachtung nennen wir Ihnen einen Festpreis. Außen reinigen und polieren wir, den Innenraum bereiten wir auf Wunsch ebenfalls auf.' },
      { q: 'Wie weit ist es von Grasberg zum Studio?', a: 'Grasberg und Lilienthal sind Nachbargemeinden im Landkreis Osterholz. Das Studio liegt in der Falkenberger Landstraße 75, gegenüber Opel Meyer.' },
    ],
    neighbors: ['worpswede', 'tarmstedt', 'osterholz-scharmbeck', 'ottersberg'],
    img: 'g63HeckShop',
  },
  {
    slug: 'schwanewede',
    name: 'Schwanewede',
    area: 'Landkreis Osterholz',
    where: 'nordwestlich von Lilienthal, nördlich von Bremen-Vegesack',
    metaTitle: 'Autoaufbereitung Schwanewede | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Schwanewede: ✓ Nano-Versiegelung ✓ Folienentfernung ✓ Innenreinigung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Schwanewede liegt nördlich von Bremen-Vegesack im Landkreis Osterholz – und gehört zu den Orten, aus denen Kunden zu uns nach Lilienthal kommen.',
    intro: [
      'Schwanewede grenzt an den Bremer Norden und gehört zum Landkreis Osterholz. Von hier aus ist unser Studio im gleichen Landkreis zu erreichen – wir betreuen Privat- und Geschäftskunden aus der ganzen Region.',
      'Ob ein Fahrzeug neu foliert wurde und die Folie wieder runter soll, der Lack dauerhaft geschützt werden muss oder der Innenraum eine Auffrischung braucht: Wir stimmen den Umfang vorab mit Ihnen ab und nennen nach der Begutachtung einen Festpreis. So wissen Sie vor dem Termin, was auf Sie zukommt – und Ihr Fahrzeug erhält genau die Behandlung, die zu Zustand und Nutzung passt.',
    ],
    focus: [
      { service: 'nano-versiegelung', text: 'Langlebiger Lackschutz mit Abperleffekt – optional mit Felgenversiegelung und Ozonbehandlung.' },
      { service: 'folienentfernung', text: 'Werbe-, Schutz- und Designfolien samt Kleberesten schonend entfernt – auch bei älteren Folierungen.' },
      { service: 'innenreinigung', text: 'Für einen Innenraum, der wieder gepflegt aussieht und riecht.' },
    ],
    faqs: [
      { q: 'Wird der Lack bei der Folienentfernung beschädigt?', a: 'Wir arbeiten mit kontrollierter, schonender Erwärmung. Nach Wunsch frischen wir den Lack im Bereich der Folierung anschließend auf.' },
      { q: 'Nehmen Sie auch Firmenfahrzeuge an?', a: 'Ja, wir betreuen neben Privatkunden auch Geschäftskunden und Autohändler. Für Transporter gilt laut unserer Preisliste ein Aufschlag von 40 %.' },
    ],
    neighbors: ['ritterhude', 'lemwerder', 'osterholz-scharmbeck'],
    img: 'taycan',
  },
  {
    slug: 'lemwerder',
    name: 'Lemwerder',
    area: 'Landkreis Wesermarsch',
    where: 'gegenüber von Bremen-Vegesack an der Weser',
    metaTitle: 'Autoaufbereitung Lemwerder | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Lemwerder: ✓ Nano-Versiegelung ✓ Geruchsentfernung ✓ Carnauba-Wachs – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Lemwerder liegt an der Weser gegenüber von Bremen-Vegesack – auch aus der Wesermarsch kommen Kunden zu uns nach Lilienthal.',
    intro: [
      'Lemwerder gehört zum Landkreis Wesermarsch und liegt am westlichen Weserufer, Bremen-Vegesack gegenüber. Wir freuen uns über Kundschaft von der anderen Weserseite.',
      'Nähe zum Wasser bedeutet oft feuchte Luft und Vogelkot auf dem Lack, manchmal auch muffige Innenräume. Genau dafür haben wir passende Leistungen: Versiegelungen, die Wasser abperlen lassen, und eine Ozonbehandlung, die Gerüche neutralisiert statt überdeckt. Sprechen Sie uns auf Ihr Fahrzeug an: Wir prüfen den Zustand, empfehlen den passenden Umfang und nennen Ihnen nach kurzer Begutachtung einen konkreten Preis.',
    ],
    focus: [
      { service: 'nano-versiegelung', text: 'Schutz vor UV, Vogelkot, Insekten und Streusalz – 1–3 Jahre bei normaler Pflege.' },
      { service: 'ozon-geruchsentfernung', text: 'Hilft bei muffigem oder Schimmelgeruch und wirkt auch in Lüftung und Klimaanlage.' },
      { service: 'carnauba-wachs', text: 'Klassisches Naturwachs für warmen Tiefenglanz – von Hand aufgetragen.' },
    ],
    faqs: [
      { q: 'Hilft die Ozonbehandlung gegen muffigen Geruch?', a: 'Ja, sie ist für hartnäckige Gerüche wie Rauch, Tiergeruch und muffigen oder Schimmelgeruch gedacht und wirkt auch in Lüftung und Klimaanlage.' },
      { q: 'Nehmen Sie Kunden aus der Wesermarsch an?', a: 'Selbstverständlich. Zu uns kommen Kundinnen und Kunden aus der gesamten Region, unter anderem aus Lemwerder. Das Studio liegt in Lilienthal, Falkenberger Landstraße 75.' },
    ],
    neighbors: ['schwanewede', 'delmenhorst', 'ritterhude'],
    img: 'amgGtShop',
  },
  {
    slug: 'achim',
    name: 'Achim',
    area: 'Landkreis Verden',
    where: 'südöstlich von Bremen',
    metaTitle: 'Autoaufbereitung Achim | KFZ-Aufbereitung Lilienthal',
    metaDescription:
      'Autoaufbereitung Achim: ✓ Lackaufbereitung ✓ Verkaufsaufbereitung ✓ Polster & Leder – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Achim liegt im Landkreis Verden südöstlich von Bremen – Kunden aus Achim gehören zum festen Einzugsgebiet unseres Studios.',
    intro: [
      'Achim ist eine Stadt im Landkreis Verden, südöstlich von Bremen. Ausdrücklich nennen wir Achim in unserem Kundenradius: Auch von hier kommen Fahrzeughalter zu uns nach Lilienthal, um ihr Auto aufbereiten zu lassen.',
      'Typische Themen sind Lackaufbereitung nach Jahren im Alltag oder die Vorbereitung eines Verkaufs. Wir prüfen zuerst den Zustand, besprechen mit Ihnen das Machbare und arbeiten dann Schritt für Schritt – vom Waschen über die Politur bis zum Finish. Das Ergebnis ist ein Fahrzeug, das sichtbar gepflegter wirkt – ob für den Eigengebrauch oder für die nächste Übergabe.',
    ],
    focus: [
      { service: 'lackaufbereitung', text: 'Hologramme, Swirls und matte Stellen werden in mehreren Stufen herauspoliert.' },
      { service: 'verkaufsaufbereitung', text: 'Komplettpaket aus Außen-, Innen- und Lackpflege für Privatverkauf oder Händlerabgabe.' },
      { service: 'polster-leder', text: 'Sichtbar saubere Sitze und geschmeidiges Leder, auf Wunsch imprägniert.' },
    ],
    faqs: [
      { q: 'Kommen auch Kunden aus dem Landkreis Verden zu Ihnen?', a: 'Ja – unter anderem aus Achim, Oyten, Ottersberg und Verden. Das Studio liegt in Lilienthal, Falkenberger Landstraße 75.' },
      { q: 'Wie lange dauert eine Lackaufbereitung?', a: 'Je nach Zustand des Lacks rechnen wir mit 4–8 Stunden.' },
    ],
    neighbors: ['oyten', 'verden', 'ottersberg'],
    img: 'boxster',
  },
  {
    slug: 'oyten',
    name: 'Oyten',
    area: 'Landkreis Verden',
    where: 'südöstlich von Bremen, zwischen Bremen und Achim',
    metaTitle: 'Autoaufbereitung Oyten | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Oyten: ✓ Innenreinigung ✓ Hochglanzversiegelung ✓ Motorwäsche – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Oyten liegt zwischen Bremen und Achim im Landkreis Verden – auch von hier kommen Kunden regelmäßig zu uns.',
    intro: [
      'Oyten liegt südöstlich von Bremen im Landkreis Verden, zwischen der Hansestadt und Achim. Wir nennen Oyten ausdrücklich in unserem Einzugsgebiet.',
      'Sinnvoll sind oft Kombinationen: erst Innenreinigung, dann Hochglanzversiegelung für dauerhaften Glanz, gelegentlich eine Motorwäsche als Ergänzung. Was für Ihr Fahrzeug sinnvoll ist, klären wir vor Ort in einer kurzen Begutachtung. Wer aus Oyten anfragt, erhält von uns eine klare Empfehlung, welche Leistungen sich für das Fahrzeug lohnen und welche nicht. Nach der Begutachtung steht der Preis fest, und Sie können in Ruhe entscheiden. Auf Wunsch stimmen wir mehrere Leistungen so aufeinander ab, dass Ihr Fahrzeug nur einmal zu uns kommen muss.',
    ],
    focus: [
      { service: 'innenreinigung', text: 'Innenaufbereitung ab 60 € – individuell nach Absprache auf Ihr Fahrzeug abgestimmt.' },
      { service: 'hochglanzversiegelung', text: 'Tiefer, gleichmäßiger Hochglanz und 6–12 Monate Lackschutz bei normaler Pflege.' },
      { service: 'motorwaesche', text: 'Ein gepflegter Motorraum: schonend gewaschen, sauber abgedeckt, Kunststoff gepflegt.' },
    ],
    faqs: [
      { q: 'Darf ich nach der Hochglanzversiegelung direkt in die Waschanlage?', a: 'Wir empfehlen, 1–2 Wochen zu warten und danach bevorzugt per Handwäsche zu reinigen.' },
      { q: 'Lassen sich Leistungen kombinieren?', a: 'Ja – etwa Innenaufbereitung und Versiegelung in einem Termin. Nennen Sie uns Ihre Wünsche in der Terminanfrage.' },
    ],
    neighbors: ['achim', 'ottersberg', 'verden'],
    img: 'porsche997Front',
  },
  {
    slug: 'ottersberg',
    name: 'Ottersberg',
    area: 'Landkreis Verden',
    where: 'östlich von Bremen',
    metaTitle: 'Autoaufbereitung Ottersberg | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Ottersberg: ✓ Carnauba-Wachs ✓ Wohnwagen-Aufbereitung ✓ Lackaufbereitung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Ottersberg liegt im Landkreis Verden östlich von Bremen – für Cabrio, Caravan und Alltagsauto haben wir die passende Aufbereitung.',
    intro: [
      'Ottersberg gehört zum Landkreis Verden und liegt östlich von Bremen. Die Gemeinde steht in unserer Liste der Orte, aus denen unsere Kundschaft kommt – der Weg nach Lilienthal führt Sie in Richtung Bremer Osten.',
      'Wer ein Cabrio, einen Oldtimer oder einen Caravan besitzt, will das Fahrzeug auch in der Saison pflegen: Carnauba-Wachs für den warmen Glanz, eine Politur für matte Flächen oder die gründliche Reinigung des Wohnwagens. Wir beraten Sie gern, welche Kombination zu Ihrem Fahrzeug passt. Nach der Begutachtung erhalten Sie einen Preis und einen Termin, der zu Ihrer Saison passt.',
    ],
    focus: [
      { service: 'carnauba-wachs', text: 'Klassische Hartwachsversiegelung für Liebhaberfahrzeuge, von Hand aufgetragen.' },
      { service: 'wohnwagen-aufbereitung', text: 'Für Caravan und Reisemobil: Außenhülle reinigen, Streifen entfernen, Politur – Festpreis nach Begutachtung.' },
      { service: 'lackaufbereitung', text: 'Individuell auf Lacktyp und Zustand abgestimmte, mehrstufige Politur.' },
    ],
    faqs: [
      { q: 'Wie lange hält Carnauba-Wachs?', a: 'Carnauba ist ein Naturwachs mit warmem Glanz und hält etwa 3–6 Monate. Die Nano-Versiegelung ist härter und hält 1–3 Jahre.' },
      { q: 'Ist ein Termin am Samstag möglich?', a: 'Samstags arbeiten wir nach Absprache; unter der Woche sind wir von Montag bis Freitag von 8:00 bis 17:00 Uhr für Sie da.' },
    ],
    neighbors: ['oyten', 'grasberg', 'achim', 'verden'],
    img: 'mustang',
  },
  {
    slug: 'tarmstedt',
    name: 'Tarmstedt',
    area: 'Landkreis Rotenburg (Wümme)',
    where: 'nordöstlich von Lilienthal',
    metaTitle: 'Autoaufbereitung Tarmstedt | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Tarmstedt: ✓ Nano-Versiegelung ✓ Folienentfernung ✓ Verkaufsaufbereitung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Tarmstedt liegt im Landkreis Rotenburg (Wümme) nordöstlich von Lilienthal – auch von dort kommen Kunden zu uns.',
    intro: [
      'Tarmstedt gehört zum Landkreis Rotenburg (Wümme) und liegt nordöstlich von Lilienthal. Wir nennen den Ort ausdrücklich in unserem Einzugsgebiet: Privatkunden, Gewerbetreibende und Händler aus dem Raum Tarmstedt sind bei uns willkommen.',
      'Für Transporter und Firmenfahrzeuge gilt unser Preisaufschlag von 40 %, für Geländewagen und Großraumlimousinen 20 %. Wenn Sie sich unsicher sind, was Ihr Fahrzeug braucht, hilft eine kurze Begutachtung – danach erhalten Sie einen konkreten Preis. Auch bei Firmenfahrzeugen legen wir Wert auf Sorgfalt: Wir besprechen Umfang und Zeitrahmen vorab, damit der Fahrzeugausfall so kurz wie möglich bleibt.',
    ],
    focus: [
      { service: 'nano-versiegelung', text: 'Premium-Lackschutz für Fahrzeuge, die täglich im Einsatz sind – 1–3 Jahre bei normaler Pflege.' },
      { service: 'folienentfernung', text: 'Alte Werbe- oder Schutzfolien rückstandslos entfernen – ideal vor Verkauf oder Neubeklebung.' },
      { service: 'verkaufsaufbereitung', text: 'Alles aus einer Hand: Außen, Innen, Lackpflege und Finish.' },
    ],
    faqs: [
      { q: 'Gilt für Transporter ein Aufschlag?', a: 'Ja. Unsere „ab“-Preise gelten für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand; für Transporter berechnen wir +40 %, für Geländewagen und Großraumlimousinen +20 %.' },
      { q: 'Liegt Tarmstedt in Ihrem Einzugsgebiet?', a: 'Ja, Tarmstedt gehört zu den Orten, aus denen Kundinnen und Kunden zu uns nach Lilienthal kommen.' },
    ],
    neighbors: ['worpswede', 'grasberg', 'zeven', 'rotenburg'],
    img: 'lambo',
  },
  {
    slug: 'delmenhorst',
    name: 'Delmenhorst',
    area: 'kreisfreie Stadt',
    where: 'westlich von Bremen',
    metaTitle: 'Autoaufbereitung Delmenhorst | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Delmenhorst: ✓ Verkaufsaufbereitung ✓ Lackaufbereitung ✓ Geruchsentfernung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Delmenhorst liegt westlich von Bremen – auch aus der kreisfreien Stadt kommen Kunden für Lack, Innenraum und Verkauf zu uns.',
    intro: [
      'Delmenhorst ist eine kreisfreie Stadt und liegt westlich von Bremen. Für Fahrzeughalter von dort liegt Lilienthal auf der anderen Seite Bremens – dafür bekommen Sie Aufbereitung in Handarbeit und persönliche Beratung.',
      'Typische Anliegen sind Fahrzeuge, die für den Verkauf vorbereitet werden sollen, Autos mit hartnäckigen Gerüchen und Lack, der nach Jahren im Alltag stumpf geworden ist. Wir betreuen Privatkunden ebenso wie Autohändler. Vor dem Termin klären wir telefonisch oder per Anfrage, was Ihr Fahrzeug braucht, und nennen nach der Begutachtung einen Festpreis.',
    ],
    focus: [
      { service: 'verkaufsaufbereitung', text: 'Für Privatverkauf, Händlerabgabe oder Leasingrückgabe – ab 260 €, Umfang nach Absprache.' },
      { service: 'lackaufbereitung', text: 'Wenn der Lack matt wirkt: Politur und, wenn gewünscht, anschließende Versiegelung.' },
      { service: 'ozon-geruchsentfernung', text: 'Gegen Rauch-, Tier- und Muffgeruch – neutralisiert statt überdeckt.' },
    ],
    faqs: [
      { q: 'Arbeiten Sie auch für Autohändler?', a: 'Ja, wir betreuen Privatkunden, Geschäftskunden und Autohändler aus der gesamten Region.' },
      { q: 'Was kostet die Verkaufsaufbereitung?', a: 'Sie startet ab 260 € für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand. Für größere oder stark verschmutzte Fahrzeuge gibt es einen Aufschlag – den genauen Preis nennen wir nach kurzer Begutachtung.' },
    ],
    neighbors: ['lemwerder', 'stuhr', 'syke'],
    img: 'm850iFront',
  },
  {
    slug: 'stuhr',
    name: 'Stuhr',
    area: 'Landkreis Diepholz',
    where: 'südlich von Bremen, an der Bremer Stadtgrenze',
    metaTitle: 'Autoaufbereitung Stuhr | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Stuhr: ✓ Polster & Leder ✓ Innenreinigung ✓ Nano-Versiegelung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Stuhr grenzt im Süden an Bremen und gehört zum Landkreis Diepholz – Kunden von dort gehören zu unserem Einzugsgebiet.',
    intro: [
      'Stuhr liegt im Landkreis Diepholz und grenzt südlich an die Stadt Bremen. Das Studio in Lilienthal liegt auf der anderen Seite der Stadt – doch wer Handarbeit und Beratung schätzt, nimmt den Weg gern in Kauf. Stuhr steht ausdrücklich in unserer Liste der bedienten Orte.',
      'Typische Themen rund um den Innenraum: Leder, das trocken geworden ist, Polster mit alten Flecken, Gerüche. Wir reinigen per Sprühextraktion, pflegen Leder und imprägnieren auf Wunsch. Nach der Begutachtung wissen Sie, was möglich ist und was es kostet – erst dann beginnen wir mit der Arbeit.',
    ],
    focus: [
      { service: 'polster-leder', text: 'Ab 70 €: Reinigung, Lederpflege und optionale Imprägnierung.' },
      { service: 'innenreinigung', text: 'Vom Ausräumen über die Sprühextraktion bis zum Finish mit Innenscheiben.' },
      { service: 'nano-versiegelung', text: 'Wenn der Lack dauerhaft geschützt werden soll – mit starkem Abperleffekt.' },
    ],
    faqs: [
      { q: 'Lassen sich alte Flecken aus Polstern entfernen?', a: 'In den meisten Fällen ja, wir arbeiten mit Spezialreinigern. Eine Garantie können wir nicht geben.' },
      { q: 'Wie lange trocknen die Polster?', a: 'Je nach Witterung 2–4 Stunden.' },
    ],
    neighbors: ['weyhe', 'delmenhorst', 'syke'],
    img: 'cCabrio',
  },
  {
    slug: 'weyhe',
    name: 'Weyhe',
    area: 'Landkreis Diepholz',
    where: 'südlich von Bremen',
    metaTitle: 'Autoaufbereitung Weyhe | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Weyhe: ✓ Hochglanzversiegelung ✓ Innenreinigung ✓ Folienentfernung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Weyhe liegt südlich von Bremen im Landkreis Diepholz – Ihr Fahrzeug bekommt bei uns Handarbeit für Glanz und Innenraum.',
    intro: [
      'Weyhe gehört zum Landkreis Diepholz und liegt südlich von Bremen. Wir zählen Weyhe zu den Orten, aus denen unsere Kunden kommen – Privatkunden, Geschäftskunden und Autohändler gleichermaßen.',
      'Wer aus Weyhe zu uns kommt, plant meist einen festen Termin: Fahrzeug abgeben, gemeinsam den Zustand prüfen, Umfang und Preis abstimmen. Dieser Ablauf gibt Ihnen Sicherheit und uns die Möglichkeit, jedes Detail sorgfältig zu bearbeiten. Fragen zu Umfang, Dauer oder Preis beantworten wir gern vorab telefonisch – damit Sie Ihren Termin ohne offene Punkte planen können.',
    ],
    focus: [
      { service: 'hochglanzversiegelung', text: 'Politur und Versiegelung in einem Arbeitsgang – ab 250 €.' },
      { service: 'innenreinigung', text: 'Für einen Innenraum mit spürbar besserer Luft und sauberen Flächen.' },
      { service: 'folienentfernung', text: 'Folien und Klebereste rückstandslos entfernt, Festpreis nach Begutachtung.' },
    ],
    faqs: [
      { q: 'Wie läuft eine Terminvereinbarung ab?', a: 'Sie fragen online an und rufen uns danach kurz an – am Telefon stimmen wir Umfang, Preis und Termin ab. Vor der Arbeit prüfen wir den Zustand Ihres Fahrzeugs.' },
      { q: 'Wie lange hält die Hochglanzversiegelung?', a: 'Je nach Pflege 6–12 Monate.' },
    ],
    neighbors: ['stuhr', 'syke', 'achim'],
    img: 'porsche911Turbo',
  },
  {
    slug: 'syke',
    name: 'Syke',
    area: 'Landkreis Diepholz',
    where: 'südlich von Bremen',
    metaTitle: 'Autoaufbereitung Syke | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Syke: ✓ Lackaufbereitung ✓ Geruchsentfernung ✓ Verkaufsaufbereitung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Auch aus Syke südlich von Bremen kommen Kunden zu uns nach Lilienthal – für Lack, Innenraum und Verkaufsvorbereitung.',
    intro: [
      'Syke liegt im Landkreis Diepholz südlich von Bremen und steht in unserer Liste der bedienten Orte. Der Weg nach Lilienthal ist länger als in die nächste Waschstraße – dafür arbeiten wir an Ihrem Fahrzeug in Handarbeit und beraten Sie persönlich.',
      'Ein häufiges Thema bei Fahrzeugen mit Tieren an Bord: Hundehaare, Tiergeruch, Kratzer im Kunststoff. Für Tierhaare arbeiten wir mit Spezialwerkzeug und Tiefenreinigung, gegen Gerüche hilft die Ozonbehandlung. Wie umfangreich die Behandlung sein muss, entscheiden wir gemeinsam nach der Begutachtung – mit einem Festpreis vorab.',
    ],
    focus: [
      { service: 'lackaufbereitung', text: 'Mehrstufige Politur für tieferen Glanz und weniger sichtbare Kratzer.' },
      { service: 'ozon-geruchsentfernung', text: 'Entfernt Tier- und Hundegeruch dauerhaft und hilft bei Rauch und Muff.' },
      { service: 'verkaufsaufbereitung', text: 'Wenn das Fahrzeug den Besitzer wechseln soll: gepflegt und gut vorbereitet.' },
    ],
    faqs: [
      { q: 'Werden Tierhaare vollständig entfernt?', a: 'Wir entfernen Tierhaare mit Spezialwerkzeug und Tiefenreinigung.' },
      { q: 'Wie lange dauert die Ozonbehandlung?', a: 'Wenige Stunden – idealerweise bleibt das Fahrzeug einen Tag bei uns, damit sich das Ozon vollständig verteilen kann.' },
    ],
    neighbors: ['weyhe', 'stuhr', 'delmenhorst'],
    img: 'rangeRover',
  },
  {
    slug: 'verden',
    name: 'Verden',
    area: 'Landkreis Verden',
    where: 'südöstlich von Bremen, an der Aller',
    metaTitle: 'Autoaufbereitung Verden | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Verden: ✓ Nano-Versiegelung ✓ Carnauba-Wachs ✓ Wohnwagen-Aufbereitung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Verden ist die Kreisstadt des Landkreises Verden an der Aller – auch von dort kommen Kunden zu uns nach Lilienthal.',
    intro: [
      'Verden an der Aller ist Kreisstadt des Landkreises Verden und liegt südöstlich von Bremen. Wir haben Verden in unserem Kundenradius aufgeführt: Wer Wert auf Handarbeit und ein Studio mit persönlicher Beratung legt, findet uns in Lilienthal.',
      'Sinnvoll ist hier oft langlebiger Schutz – Nano-Versiegelung für den Alltagswagen, Carnauba für den Zweitwagen und Liebhaberstücke, Aufbereitung für Wohnwagen und Wohnmobil. Für jedes dieser Fahrzeuge gibt es bei uns einen passenden Ablauf. Nach kurzer Begutachtung nennen wir Ihnen einen Preis, damit Sie wissen, was auf Sie zukommt.',
    ],
    focus: [
      { service: 'nano-versiegelung', text: 'Premium-Schutz mit Abperleffekt, ab 350 € – optional mit Felgen und Ozonbehandlung.' },
      { service: 'carnauba-wachs', text: 'Warmer Glanz von Hand – Preis auf Anfrage.' },
      { service: 'wohnwagen-aufbereitung', text: 'Caravan und Reisemobil außen gründlich gereinigt, poliert und auf Wunsch auch innen aufbereitet.' },
    ],
    faqs: [
      { q: 'Was unterscheidet Nano-Versiegelung und Carnauba?', a: 'Carnauba ist ein Naturwachs mit warmem Glanz (3–6 Monate), die Nano-Versiegelung ist synthetisch, härter und hält 1–3 Jahre.' },
      { q: 'Wie kann ich einen Termin vereinbaren?', a: 'Über die Online-Terminanfrage oder telefonisch unter 0152 / 345 510 63 – Termine nach Vereinbarung.' },
    ],
    neighbors: ['achim', 'oyten', 'ottersberg'],
    img: 'porsche924Seite',
  },
  {
    slug: 'rotenburg',
    name: 'Rotenburg (Wümme)',
    area: 'Landkreis Rotenburg (Wümme)',
    where: 'nordöstlich von Bremen, zwischen Bremen und Hamburg',
    metaTitle: 'Autoaufbereitung Rotenburg (Wümme) | Studio Lilienthal',
    metaDescription:
      'Autoaufbereitung Rotenburg (Wümme): ✓ Verkaufsaufbereitung ✓ Motorwäsche ✓ Hochglanzversiegelung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Rotenburg (Wümme) liegt zwischen Bremen und Hamburg – wer Aufbereitung in Handarbeit sucht, findet uns in Lilienthal.',
    intro: [
      'Rotenburg (Wümme) ist Kreisstadt des gleichnamigen Landkreises und liegt nordöstlich von Bremen. Wir nennen Rotenburg in unserem Einzugsgebiet und freuen uns über Kundschaft, die für eine Aufbereitung den Weg nach Lilienthal in Kauf nimmt.',
      'Wer eine weitere Anreise hat, plant gern gebündelt: Motorwäsche, Hochglanzversiegelung und Innenaufbereitung in einem Termin. Sprechen Sie uns in der Anfrage darauf an – wir stellen den Umfang zusammen und nennen nach kurzer Begutachtung den Preis. So nutzen Sie die Anfahrt optimal und Ihr Fahrzeug verlässt das Studio in dem Zustand, den Sie sich vorgenommen haben.',
    ],
    focus: [
      { service: 'verkaufsaufbereitung', text: 'Rundum-Aufbereitung für Privatverkauf, Händlerabgabe oder Leasingrückgabe, ab 260 €.' },
      { service: 'motorwaesche', text: 'Ab 80 €: gründlich, schonend und mit Kunststoffpflege.' },
      { service: 'hochglanzversiegelung', text: 'Für Glanz und Schutz in einem Arbeitsgang, ab 250 €.' },
    ],
    faqs: [
      { q: 'Kann ich mehrere Leistungen in einem Termin bündeln?', a: 'Ja, viele Leistungen lassen sich kombinieren. Für die Verkaufsaufbereitung ist das Komplettpaket bereits darauf ausgelegt – sie dauert je nach Zustand 1–2 Werktage.' },
      { q: 'Wo finde ich das Studio?', a: 'Falkenberger Landstraße 75, 28865 Lilienthal – gegenüber Opel Meyer.' },
    ],
    neighbors: ['zeven', 'tarmstedt', 'verden'],
    img: 'x6',
  },
  {
    slug: 'zeven',
    name: 'Zeven',
    area: 'Landkreis Rotenburg (Wümme)',
    where: 'nordöstlich von Bremen',
    metaTitle: 'Autoaufbereitung Zeven | Studio in Lilienthal',
    metaDescription:
      'Autoaufbereitung Zeven: ✓ Nano-Versiegelung ✓ Lackaufbereitung ✓ Innenreinigung – Studio Lilienthal. Jetzt anrufen: 0152 / 345 510 63',
    lead: 'Zeven liegt im Landkreis Rotenburg (Wümme) nordöstlich von Bremen – und ist eine der Städte, aus denen Kunden zu uns nach Lilienthal kommen.',
    intro: [
      'Zeven gehört zum Landkreis Rotenburg (Wümme) und liegt nordöstlich von Bremen. Die Stadt steht ausdrücklich in unserer Liste der bedienten Orte – wir betreuen Kundinnen und Kunden aus der ganzen Region.',
      'Wenn Sie sich für eine längere Anfahrt entscheiden, soll sich das lohnen: Deshalb besprechen wir Ihr Fahrzeug vorab, klären den Umfang und nehmen uns für die Arbeit die Zeit, die sie braucht – von der Politur über die Versiegelung bis zur Innenraumpflege. Anschließend nennen wir Ihnen einen klaren Preis und einen Termin, der zu Ihrem Zeitplan passt.',
    ],
    focus: [
      { service: 'nano-versiegelung', text: '1–3 Jahre Lackschutz bei normaler Pflege – mit UV-, Vogelkot-, Insekten- und Streusalzschutz.' },
      { service: 'lackaufbereitung', text: 'Für tieferen Glanz und mehr Farbtiefe – 4–8 Stunden je nach Zustand.' },
      { service: 'innenreinigung', text: 'Sauberer Innenraum, gepflegte Kunststoff- und Lederflächen.' },
    ],
    faqs: [
      { q: 'Wie lange muss ich für die Nano-Versiegelung einplanen?', a: 'Die Lackvorbereitung und der Auftrag erfolgen bei uns im Studio; anschließend braucht die Versiegelung 12–24 Stunden zum Aushärten.' },
      { q: 'Kann ich vorab telefonisch klären, was mein Fahrzeug braucht?', a: 'Gern: 0152 / 345 510 63, Montag bis Freitag von 8:00 bis 17:00 Uhr.' },
    ],
    neighbors: ['tarmstedt', 'rotenburg', 'worpswede'],
    img: 'porsche997Heck',
  },
];

export const PLACE_BY_SLUG = Object.fromEntries(PLACES.map((p) => [p.slug, p])) as Record<string, Place>;

/** Zuordnung Ortsname → Seite (für Verlinkung auf der Hub-Seite). Lilienthal = Startseite, Bremen = eigene Seite. */
export const PLACE_LINKS: Record<string, string> = {
  Lilienthal: '/',
  Bremen: '/fahrzeugaufbereitung-bremen',
  ...Object.fromEntries(PLACES.flatMap((p) => [[p.name, `/einzugsgebiet/${p.slug}`], [p.name.replace(' (Wümme)', ''), `/einzugsgebiet/${p.slug}`]])),
};
