/**
 * Ratgeber-Artikel. Alle Aussagen zu Preisen, Dauer und Haltbarkeit stammen aus den Leistungsangaben
 * von autokosmetik Lilienthal (siehe data.ts); darüber hinaus nur allgemein anerkanntes Fachwissen.
 * Keine Verkaufsversprechen, keine erfundenen Statistiken. Keine Imports – wird auch von den Tests gelesen.
 */

export type ArticleSection = { h: string; p: string[]; list?: string[] };
export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO-Datum der Veröffentlichung */
  date: string;
  minutes: number;
  kicker: string;
  lead: string;
  img: string;
  imgPosition?: string;
  services: string[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const PHONE = '0152 / 345 510 63';

export const ARTICLES: Article[] = [
  {
    slug: 'was-kostet-eine-autoaufbereitung',
    title: 'Was kostet eine Autoaufbereitung? Preise in Lilienthal, Bremen & Umland',
    metaTitle: 'Was kostet eine Autoaufbereitung? Preise Lilienthal & Bremen',
    metaDescription: `Autoaufbereitung Kosten im Überblick: ✓ Innenraum ab 60 € ✓ Hochglanz ab 250 € ✓ Nano ab 350 € ✓ Aufschläge erklärt. Fragen? ${PHONE}`,
    date: '2026-09-25',
    minutes: 5,
    kicker: 'Preise & Kosten',
    lead: 'Von der Innenreinigung bis zur Nano-Versiegelung: Welche Preise Sie bei einer professionellen Fahrzeugaufbereitung erwarten können – und wovon der Endpreis abhängt.',
    img: 'lambo',
    imgPosition: '50% 55%',
    services: ['innenreinigung', 'hochglanzversiegelung', 'nano-versiegelung', 'verkaufsaufbereitung'],
    sections: [
      {
        h: 'Warum es „den einen Preis“ nicht gibt',
        p: [
          'Eine Autoaufbereitung ist Handarbeit – und jedes Fahrzeug ist anders. Lackzustand, Verschmutzungsgrad, Fahrzeuggröße und der gewünschte Umfang bestimmen, wie viel Zeit und Material nötig sind. Deshalb arbeiten seriöse Betriebe mit „ab“-Preisen und nennen den konkreten Preis nach einer kurzen Begutachtung.',
        ],
      },
      {
        h: 'Unsere „ab“-Preise im Überblick',
        p: ['Diese Preise gelten für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand:'],
        list: [
          'Innenaufbereitung: ab 60 €',
          'Polster & Leder: ab 70 €',
          'Motorwäsche: ab 80 €',
          'Ozon-Geruchsentfernung: ab 100 €',
          'Hochglanzversiegelung: ab 250 €',
          'Verkaufsaufbereitung: ab 260 €',
          'Nano-Versiegelung: ab 350 €',
        ],
      },
      {
        h: 'Wann der Preis höher ausfällt',
        p: [
          'Größere Fahrzeuge brauchen mehr Zeit und Material. Bei uns gilt: Großraumlimousinen und Geländewagen +20 %, Transporter +40 %. Auch besonders starke Verschmutzung kann zu einem Aufschlag führen.',
          'Für Leistungen, bei denen der Aufwand stark schwankt – etwa Lackaufbereitung, Folienentfernung oder Wohnwagen-Aufbereitung – nennen wir keinen pauschalen Preis, sondern einen Festpreis nach Begutachtung.',
        ],
      },
      {
        h: 'So halten Sie die Kosten im Griff',
        p: [],
        list: [
          'Leistungen kombinieren: Wer Innenraum und Lack in einem Termin aufbereiten lässt, spart Zeit – und wir stimmen den Ablauf aufeinander ab.',
          'Ehrlich beschreiben, was Sie stört: Je genauer Sie den Zustand schildern, desto verlässlicher ist der Festpreis.',
          'Nur beauftragen, was sich lohnt: Nicht jedes Fahrzeug braucht die volle Behandlung. Wir beraten Sie dazu offen.',
        ],
      },
      {
        h: `Was im Preis steckt`,
        p: [`Der Preis einer Aufbereitung setzt sich vor allem aus Arbeitszeit, Fachwissen und Material zusammen. Dazu gehören die Begutachtung, die Vorbereitung des Fahrzeugs, die eigentliche Bearbeitung und – je nach Leistung – Pflegeprodukte, Versiegelungen und Spezialreiniger. Wer nur auf den niedrigsten Preis schaut, vergleicht oft Äpfel mit Birnen.`],
      },
      {
        h: `Angebote richtig vergleichen`,
        p: [`Fragen Sie bei jedem Angebot nach, was genau enthalten ist. Diese Punkte helfen beim Vergleich:`],
        list: [`Welche Arbeitsschritte gehören dazu – nur Reinigung oder auch Politur und Versiegelung?`, `Wird die Fahrzeuggröße berücksichtigt, und gibt es Aufschläge?`, `Wird ein Festpreis genannt – und wann (vorab oder erst nach der Arbeit)?`, `Welche Haltbarkeit wird für Versiegelungen angegeben, und unter welchen Bedingungen?`, `Kann der Betrieb den Ablauf und die Dauer nachvollziehbar erklären?`],
      },
      {
        h: `Welche Leistung passt zu welcher Situation?`,
        p: [],
        list: [`Auto wirkt innen ungepflegt oder riecht: Innenaufbereitung, bei Bedarf Polster & Leder oder Ozon-Geruchsentfernung.`, `Lack ist stumpf, matt oder zeigt Hologramme: Lackaufbereitung, danach Versiegelung.`, `Lack ist gepflegt und soll geschützt werden: Hochglanz- oder Nano-Versiegelung.`, `Fahrzeug soll verkauft oder zurückgegeben werden: Verkaufsaufbereitung als Komplettpaket.`, `Motorraum ist verölt oder verschmutzt: Motorwäsche.`],
      },
      {
        h: 'Preis anfragen',
        p: [`Am schnellsten geht es telefonisch unter ${PHONE}. Sie können auch online eine Terminanfrage senden und uns danach kurz anrufen – dann klären wir Umfang, Preis und Termin direkt.`],
      },
    ],
    faqs: [
      { q: 'Gibt es einen Festpreis vorab?', a: 'Ja. Nach einer kurzen Begutachtung Ihres Fahrzeugs nennen wir einen Festpreis für den vereinbarten Umfang.' },
      { q: 'Warum kostet ein Großraumfahrzeug mehr?', a: 'Weil mehr Fläche bearbeitet werden muss. Laut unserer Preisliste gilt +20 % für Großraumlimousinen und Geländewagen und +40 % für Transporter.' },
    ],
    related: ['nano-versiegelung-oder-carnauba-wachs', 'autoaufbereitung-vor-der-leasingrueckgabe', 'lackaufbereitung-ablauf-und-dauer'],
  },
  {
    slug: 'lackaufbereitung-ablauf-und-dauer',
    title: 'Lackaufbereitung: Ablauf, Dauer und was sie leisten kann',
    metaTitle: 'Lackaufbereitung: Ablauf, Dauer & Ergebnis | Lilienthal',
    metaDescription: `Lackaufbereitung erklärt: ✓ Ablauf in 4 Schritten ✓ 4–8 Stunden ✓ Kratzer & Hologramme ✓ Grenzen. Studio Lilienthal, Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 5,
    kicker: 'Lack',
    lead: 'Hologramme, Swirls, matte Stellen: Was bei einer Lackaufbereitung passiert, wie lange sie dauert und was sie realistisch erreichen kann.',
    img: 'polish',
    imgPosition: '50% 45%',
    services: ['lackaufbereitung', 'hochglanzversiegelung', 'carnauba-wachs'],
    sections: [
      {
        h: 'Warum Lack mit der Zeit stumpf wird',
        p: [
          'Waschanlagen mit Bürsten, Staub auf dem Lack und unsachgemäße Handwäsche hinterlassen feine Kratzer. Im Sonnenlicht erscheinen sie als Hologramme oder kreisförmige Swirls, der Lack wirkt matt und weniger tief. Auch Flugrost und festsitzende Partikel machen die Oberfläche rau.',
        ],
      },
      {
        h: 'Der Ablauf in vier Schritten',
        p: [],
        list: [
          'Begutachtung: Wir prüfen den Lackzustand und besprechen mit Ihnen, was möglich ist.',
          'Vorwäsche und Dekontamination: schonende Handwäsche, dazu Entfernung von Flugrost.',
          'Mehrstufige Politur: Schleif- und Hochglanzpolitur, abgestimmt auf den Lacktyp.',
          'Versiegelung: optional mit Hartwachs, Carnauba oder Nano-Versiegelung, damit das Ergebnis lange bleibt.',
        ],
      },
      {
        h: 'Wie lange dauert das?',
        p: ['Je nach Zustand des Lacks rechnen wir mit 4–8 Stunden. Bei einer Kombination mit Innenaufbereitung oder Versiegelung kann das Fahrzeug einen ganzen Tag bei uns bleiben.'],
      },
      {
        h: 'Was geht – und was nicht',
        p: [
          'Oberflächliche Kratzer lassen sich meist vollständig entfernen. Tiefe Kratzer werden optisch deutlich reduziert, verschwinden aber nicht immer vollständig. Bei jeder Politur wird der Lack minimal abgetragen – deshalb gilt: so viel wie nötig, so wenig wie möglich.',
        ],
      },
      {
        h: 'Danach richtig pflegen',
        p: ['Nach einer Versiegelung empfehlen wir, 1–2 Wochen zu warten, bevor das Fahrzeug in die Waschanlage fährt, und danach bevorzugt per Handwäsche zu reinigen.'],
      },
      {
        h: `Woran Sie erkennen, dass Ihr Lack Aufbereitung braucht`,
        p: [],
        list: [`Im direkten Sonnenlicht sind kreisförmige Spuren oder „Spinnennetze“ (Swirls) zu sehen.`, `Der Lack wirkt matt, flach oder hat an Farbtiefe verloren.`, `Die Oberfläche fühlt sich trotz Wäsche rau an – ein Hinweis auf festsitzende Partikel oder Flugrost.`, `Wasser perlt nicht mehr ab, sondern verläuft flächig.`, `Kleine Kratzer sind an Türgriffen, Ladekanten oder Türeinstiegen sichtbar.`],
      },
      {
        h: `Politur, Versiegelung, Wachs – wo liegt der Unterschied?`,
        p: [`Die Politur korrigiert: Sie glättet die Lackoberfläche und entfernt feine Kratzer und Hologramme. Versiegelung und Wachs schützen: Sie legen eine Schicht auf den Lack, die Wasser abperlen lässt und vor Umwelteinflüssen schützt. Deshalb steht bei uns erst die Politur und danach – auf Wunsch – die Versiegelung. Wer ungeschützten, frisch polierten Lack im Alltag fährt, verliert den Effekt schneller.`],
      },
      {
        h: `So bereiten Sie den Termin vor`,
        p: [],
        list: [`Fahrzeug nicht unmittelbar vorher durch die Bürstenwaschanlage fahren.`, `Auffällige Stellen (Kratzer, Steinschläge, Lackschäden) beim Termin zeigen.`, `Persönliche Gegenstände aus dem Fahrzeug nehmen, wenn auch der Innenraum bearbeitet wird.`, `Zeit einplanen: Je nach Zustand dauert die Lackaufbereitung 4–8 Stunden.`],
      },
      {
        h: `Pflege nach der Aufbereitung`,
        p: [`Damit das Ergebnis lange hält: Waschen Sie möglichst per Hand mit einem milden Autoshampoo und sauberen Tüchern, entfernen Sie Vogelkot und Insekten zeitnah und spülen Sie im Winter Streusalz regelmäßig ab. Bürstenwaschanlagen erzeugen genau die feinen Kratzer, die wir zuvor herauspoliert haben.`],
      },
    ],
    faqs: [
      { q: 'Wie lange dauert eine Lackaufbereitung?', a: 'Je nach Zustand des Lacks 4–8 Stunden.' },
      { q: 'Werden alle Kratzer entfernt?', a: 'Oberflächliche Kratzer meist vollständig, tiefe Kratzer werden optisch deutlich reduziert.' },
    ],
    related: ['nano-versiegelung-oder-carnauba-wachs', 'was-kostet-eine-autoaufbereitung', 'auto-verkaufen-mit-aufbereitung'],
  },
  {
    slug: 'nano-versiegelung-oder-carnauba-wachs',
    title: 'Nano-Versiegelung, Hochglanzversiegelung oder Carnauba-Wachs – was passt zu Ihrem Auto?',
    metaTitle: 'Nano-Versiegelung oder Carnauba-Wachs? Vergleich | Lilienthal',
    metaDescription: `Versiegelung im Vergleich: ✓ Carnauba 3–6 Monate ✓ Hochglanz 6–12 Monate ✓ Nano 1–3 Jahre. Beratung im Studio Lilienthal: ${PHONE}`,
    date: '2026-09-25',
    minutes: 5,
    kicker: 'Versiegelung',
    lead: 'Drei Wege, den Lack zu schützen: Naturwachs, Hochglanzversiegelung und Nano-Versiegelung. Der Vergleich zeigt, welche Variante zu Fahrzeug und Nutzung passt.',
    img: 'sealAfter',
    services: ['carnauba-wachs', 'hochglanzversiegelung', 'nano-versiegelung'],
    sections: [
      {
        h: 'Wozu überhaupt versiegeln?',
        p: [
          'Eine Versiegelung legt eine Schutzschicht auf den Lack. Wasser perlt sichtbar ab, Schmutz haftet weniger an, die Reinigung fällt leichter, und der Lack ist besser vor Umwelteinflüssen wie UV-Strahlung, Vogelkot, Insekten und Streusalz geschützt.',
        ],
      },
      {
        h: 'Carnauba-Wachs: der warme Klassiker',
        p: ['Carnauba ist ein Naturwachs. Es erzeugt einen warmen, satten Tiefenglanz und wird in mehreren dünnen Schichten von Hand aufgetragen. Die Haltbarkeit liegt bei etwa 3–6 Monaten. Besonders beliebt ist es bei Liebhaberfahrzeugen, Oldtimern und dunklen Lacken.'],
      },
      {
        h: 'Hochglanzversiegelung: Politur und Schutz in einem Arbeitsgang',
        p: ['Bei der Hochglanzversiegelung kombinieren wir Politur und Schutzschicht. Das Ergebnis ist ein tiefer, gleichmäßiger Glanz mit 6–12 Monaten Lackschutz bei normaler Pflege – eine gute Wahl für gepflegte Fahrzeuge, die sichtbar glänzen sollen.'],
      },
      {
        h: 'Nano-Versiegelung: der langlebigste Schutz',
        p: ['Die Nano-Versiegelung ist synthetisch und härter. Sie hält 1–3 Jahre bei normaler Pflege und bietet einen starken Abperleffekt. „Nano“ und „Keramik“ werden oft gleichbedeutend verwendet; wir arbeiten mit keramikbasierten Versiegelungen. Optional versiegeln wir auch die Felgen. Nach dem Auftrag braucht die Versiegelung 12–24 Stunden zum Aushärten.'],
      },
      {
        h: 'Welche Variante ist die richtige?',
        p: [],
        list: [
          'Sie lieben den warmen Glanz und pflegen Ihr Fahrzeug gern selbst: Carnauba-Wachs.',
          'Sie wollen sichtbaren Glanz und Schutz für ein bis zwei Saisons: Hochglanzversiegelung.',
          'Das Fahrzeug steht viel draußen und soll lange geschützt sein: Nano-Versiegelung.',
          'Der Lack ist stumpf oder verkratzt: erst Lackaufbereitung, dann versiegeln.',
        ],
      },
      {
        h: `Häufige Irrtümer über Versiegelungen`,
        p: [],
        list: [`„Versiegelung macht kratzfest“ – nein. Sie schützt vor Umwelteinflüssen und erleichtert die Reinigung, ersetzt aber keinen Steinschlagschutz.`, `„Ich muss mein Auto danach nie wieder waschen“ – doch. Die Versiegelung macht die Wäsche leichter, ersetzt sie aber nicht.`, `„Versiegeln kann Kratzer verdecken“ – kaum. Deshalb polieren wir vorher, damit nichts unter der Schicht „eingeschlossen“ wird.`],
      },
      {
        h: `Pflege nach der Versiegelung`,
        p: [`Nach dem Auftrag braucht eine Nano-Versiegelung 12–24 Stunden zum Aushärten. Nach einer Hochglanzversiegelung empfehlen wir, 1–2 Wochen zu warten, bevor das Fahrzeug in die Waschanlage fährt, und danach möglichst per Handwäsche zu reinigen. Mit einem milden Autoshampoo und weichen Tüchern halten Sie den Effekt am längsten.`],
      },
      {
        h: `Warum erst polieren, dann versiegeln?`,
        p: [`Eine Versiegelung konserviert den Zustand des Lacks. Ist der Lack stumpf oder zeigt Hologramme, würde man genau diesen Zustand schützen. Deshalb kombinieren wir Versiegelungen bei Bedarf mit einer Politur – bei der Hochglanzversiegelung sogar in einem Arbeitsgang.`],
      },
    ],
    faqs: [
      { q: 'Was ist der Unterschied zwischen Carnauba und Nano?', a: 'Carnauba ist ein Naturwachs mit warmem Glanz und hält etwa 3–6 Monate. Die Nano-Versiegelung ist synthetisch, härter und hält 1–3 Jahre.' },
      { q: 'Brauche ich vorher eine Politur?', a: 'Für das beste Ergebnis ja – bei stumpfem oder verkratztem Lack empfehlen wir zuerst eine Lackaufbereitung.' },
    ],
    related: ['lackaufbereitung-ablauf-und-dauer', 'was-kostet-eine-autoaufbereitung', 'auto-verkaufen-mit-aufbereitung'],
  },
  {
    slug: 'autoaufbereitung-vor-der-leasingrueckgabe',
    title: 'Aufbereitung vor der Leasingrückgabe: Checkliste für Ihr Fahrzeug',
    metaTitle: 'Leasingrückgabe: Auto aufbereiten lassen | Checkliste',
    metaDescription: `Leasingrückgabe vorbereiten: ✓ Checkliste ✓ Lack ✓ Innenraum ✓ Polster ✓ Geruch. Verkaufsaufbereitung ab 260 € in Lilienthal. Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 4,
    kicker: 'Leasing & Rückgabe',
    lead: 'Ein gepflegtes Fahrzeug macht bei der Rückgabe einen besseren Eindruck. Diese Checkliste hilft Ihnen, Innenraum und Lack rechtzeitig in Form zu bringen.',
    img: 'm850iSeite',
    imgPosition: '50% 55%',
    services: ['verkaufsaufbereitung', 'innenreinigung', 'lackaufbereitung'],
    sections: [
      {
        h: 'Warum sich die Vorbereitung lohnt',
        p: [
          'Bei der Rückgabe wird das Fahrzeug mit dem Zustand bei Übernahme verglichen. Verschmutzungen, Gerüche und sichtbare Lackmängel fallen dabei auf. Eine Aufbereitung vor dem Termin sorgt dafür, dass das Fahrzeug so gepflegt wie möglich übergeben wird. Ob und in welcher Höhe Abzüge entstehen, entscheidet der Leasinggeber – eine Zusage können wir dazu nicht geben.',
        ],
      },
      {
        h: 'Die Checkliste',
        p: [],
        list: [
          'Außen: Handwäsche, Felgenreinigung und Prüfung des Lacks auf Kratzer und Hologramme.',
          'Lack: Oberflächliche Kratzer lassen sich häufig herauspolieren; tiefe Kratzer werden optisch reduziert.',
          'Innenraum: Aussaugen, Teppiche, Kunststoffflächen, Dachhimmel und Scheiben von innen.',
          'Polster und Leder: Flecken behandeln, Leder reinigen und pflegen.',
          'Geruch: Rauch oder Tiergeruch? Hier hilft eine Ozonbehandlung.',
          'Kleinigkeiten: Motorraum und Kunststoffteile pflegen, damit der Gesamteindruck stimmt.',
        ],
      },
      {
        h: 'Komplettpaket statt Einzelleistungen',
        p: [
          'Unsere Verkaufsaufbereitung (ab 260 €) umfasst Außenwäsche, Felgenreinigung, Lackpflege, intensive Innenreinigung und kleine Korrekturen und ist auch für die Leasingrückgabe ausgerichtet. Sie dauert je nach Zustand 1–2 Werktage – planen Sie also einige Tage Vorlauf ein.',
        ],
      },
      {
        h: `Der Zeitplan`,
        p: [],
        list: [`2–4 Wochen vorher: Fahrzeug bei Tageslicht gründlich ansehen, Mängel notieren und Fotos machen.`, `1–2 Wochen vorher: Aufbereitungstermin vereinbaren – die Verkaufsaufbereitung dauert je nach Zustand 1–2 Werktage.`, `Wenige Tage vorher: Zubehör, Fußmatten, Schlüssel, Serviceheft und Unterlagen zusammenlegen.`, `Am Rückgabetag: Fahrzeug nicht mehr stark benutzen und Innenraum sauber halten.`],
      },
      {
        h: `Was Sie selbst vorbereiten können`,
        p: [],
        list: [`Kofferraum und Ablagen komplett ausräumen.`, `Vollständiges Zubehör bereitlegen (Schlüssel, Ladekabel, Warndreieck, Verbandkasten).`, `Unterlagen und Serviceheft vollständig halten.`, `Auffällige Schäden vorab mit Ihrem Leasinggeber klären.`],
      },
      {
        h: `Was eine Aufbereitung nicht ersetzt`,
        p: [`Eine Aufbereitung verbessert Sauberkeit und Lackbild. Dellen, tiefe Kratzer, Steinschläge oder Unfallschäden sind Sache einer Fachwerkstatt bzw. eines Lackierers. Wir sagen Ihnen ehrlich, was durch Politur und Pflege verbessert werden kann und was nicht.`],
      },
    ],
    faqs: [
      { q: 'Wie früh sollte ich einen Termin machen?', a: 'Die Aufbereitung dauert je nach Zustand 1–2 Werktage. Am besten fragen Sie ein bis zwei Wochen vor dem Rückgabetermin an.' },
      { q: 'Vermeide ich damit Abzüge?', a: 'Wir bereiten Ihr Fahrzeug bestmöglich vor. Eine Zusage zu Abzügen oder Kosten kann nur der Leasinggeber geben.' },
    ],
    related: ['auto-verkaufen-mit-aufbereitung', 'was-kostet-eine-autoaufbereitung', 'geruch-im-auto-entfernen'],
  },
  {
    slug: 'geruch-im-auto-entfernen',
    title: 'Geruch im Auto entfernen: Was bei Rauch, Tiergeruch und Muff wirklich hilft',
    metaTitle: 'Geruch im Auto entfernen: Ozonbehandlung | Lilienthal',
    metaDescription: `Rauch-, Tier- oder Muffgeruch im Auto? ✓ Ursachen ✓ Ozonbehandlung ✓ Ablauf. Ozon-Geruchsentfernung ab 100 € in Lilienthal. Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 5,
    kicker: 'Innenraum',
    lead: 'Gerüche sitzen tief in Polstern, Himmel und Lüftung. Warum Lüften und Duftbaum nicht reichen und wie eine Ozonbehandlung ansetzt.',
    img: 'interiorBefore',
    services: ['ozon-geruchsentfernung', 'innenreinigung', 'polster-leder'],
    sections: [
      {
        h: 'Woher der Geruch kommt',
        p: [
          'Zigarettenrauch, Tierhaare, Feuchtigkeit oder verschüttete Getränke: Geruchsstoffe setzen sich in Polstern, Teppichen, im Himmel, in Verkleidungen und sogar in Lüftung und Klimaanlage fest. Sie einfach zu überdecken funktioniert nur kurz.',
        ],
      },
      {
        h: 'Erst reinigen, dann neutralisieren',
        p: [
          'Bevor ein Geruch neutralisiert werden kann, muss die Quelle weg: Der Innenraum wird gründlich gereinigt, Polster und Teppiche per Sprühextraktion behandelt, Leder gepflegt. Erst danach setzt die Geruchsneutralisation an.',
        ],
      },
      {
        h: 'Ozonbehandlung: neutralisieren statt überdecken',
        p: [
          'Die Ozonbehandlung ist ein professionelles Verfahren zur Geruchsneutralisation mit Tiefenwirkung in Polstern, Himmel und Verkleidungen. Sie wirkt gegen Zigaretten- und Nikotingeruch, Tier- und Hundegeruch sowie muffigen oder Schimmelgeruch – und auch in Lüftung und Klimaanlage. Dafür bleibt das Fahrzeug einige Stunden bei uns – idealerweise einen Tag – und wird anschließend ausgelüftet.',
        ],
      },
      {
        h: 'Was Sie vorab tun können',
        p: [],
        list: [
          'Persönliche Gegenstände, Kindersitze und Fußmatten ausräumen.',
          'Nasse oder muffige Stellen (z. B. im Fußraum) nicht mit Duftsprays überdecken.',
          'Uns beim Termin erzählen, woher der Geruch kommt – das erleichtert die Einschätzung.',
        ],
      },
      {
        h: `Typische Geruchsquellen`,
        p: [],
        list: [`Zigarettenrauch und Nikotin, der sich in Himmel, Polstern und Lüftung festsetzt.`, `Tiere: Haare und Ausdünstungen in Sitzen, Teppichen und Kofferraum.`, `Feuchtigkeit: nasse Fußmatten, undichte Stellen oder nasse Kleidung – Ursache für muffigen oder Schimmelgeruch.`, `Lebensmittel, Getränke und Erbrochenes, die in Polster oder Teppich eingezogen sind.`],
      },
      {
        h: `Warum Duftbäume nicht genügen`,
        p: [`Duftstoffe überdecken einen Geruch nur. Sobald der Duft verfliegt, ist der Geruch wieder da, weil die Ursache im Material sitzt. Wer einen Geruch dauerhaft loswerden will, muss die Quelle reinigen und die Geruchsmoleküle neutralisieren.`],
      },
      {
        h: `Danach Gerüche vermeiden`,
        p: [],
        list: [`Nicht im Fahrzeug rauchen und Tiere auf Decken transportieren, die sich waschen lassen.`, `Nasse Gegenstände nicht im Fahrzeug lassen; Fußmatten regelmäßig trocknen.`, `Regelmäßig lüften, besonders nach Regen oder Schnee.`, `Bei anhaltendem muffigen Geruch aus der Lüftung die Klimaanlage bzw. den Innenraumfilter in einer Werkstatt prüfen lassen.`],
      },
    ],
    faqs: [
      { q: 'Hilft die Ozonbehandlung gegen Zigarettenrauch?', a: 'Ja, sie ist für hartnäckige Gerüche wie Rauch, Nikotin und Tiergeruch gedacht.' },
      { q: 'Wie lange dauert die Behandlung?', a: 'Wenige Stunden – idealerweise bleibt das Fahrzeug einen Tag bei uns, damit sich das Ozon vollständig verteilen kann.' },
    ],
    related: ['polster-und-leder-im-auto-reinigen', 'autoaufbereitung-vor-der-leasingrueckgabe', 'was-kostet-eine-autoaufbereitung'],
  },
  {
    slug: 'wohnmobil-und-wohnwagen-aufbereiten',
    title: 'Wohnwagen und Wohnmobil aufbereiten: schwarze Streifen, Algen und matte Flächen',
    metaTitle: 'Wohnwagen & Wohnmobil aufbereiten | Streifen entfernen',
    metaDescription: `Caravan & Wohnmobil aufbereiten: ✓ schwarze Streifen ✓ Algen ✓ Politur ✓ Innenraum. Festpreis nach Begutachtung in Lilienthal. Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 4,
    kicker: 'Wohnwagen & Wohnmobil',
    lead: 'Große Flächen, viel Wetter: Warum Caravan und Reisemobil regelmäßig Pflege brauchen und wie eine professionelle Aufbereitung abläuft.',
    img: 'g63Heck',
    services: ['wohnwagen-aufbereitung', 'innenreinigung'],
    sections: [
      {
        h: 'Was Wohnwagen und Wohnmobile belastet',
        p: [
          'Caravans und Reisemobile stehen häufig im Freien. Regen, Sonne und Staub hinterlassen schwarze Streifen, Algen setzen sich an, und Oberflächen werden matt. Die großen Flächen machen die Reinigung von Hand mühsam.',
        ],
      },
      {
        h: 'So gehen wir vor',
        p: [],
        list: [
          'Begutachtung: Zustand außen und innen wird geprüft.',
          'Außenreinigung: Vorwäsche, Spezialreiniger und Handwäsche.',
          'Politur: leichte Politur für matte Oberflächen.',
          'Innenraum: auf Wunsch komplette Innenreinigung – Polster, Kunststoffe, Küche, Bad und Boden.',
        ],
      },
      {
        h: 'Schwarze Streifen',
        p: ['Die schwarzen Streifen an Wohnwagen und Wohnmobilen lassen sich mit der richtigen Vorgehensweise sehr gut entfernen.'],
      },
      {
        h: 'Preis',
        p: ['Wir geben Ihnen nach einer kurzen Begutachtung einen Festpreis – abhängig von Größe und Zustand. Am schnellsten klären wir das telefonisch: ' + PHONE + '.'],
      },
      {
        h: `Warum schwarze Streifen entstehen`,
        p: [`Regenwasser läuft an Dachkanten, Dichtungen und Fugen entlang und nimmt Schmutz und Staub mit. An den Ablaufstellen bleiben dunkle Streifen zurück. Weil Wohnwagen und Wohnmobile lange im Freien stehen, bilden sich Streifen und Algen leichter als bei einem Pkw, der täglich bewegt wird.`],
      },
      {
        h: `Checkliste zum Saisonstart`,
        p: [],
        list: [`Außenhülle gründlich reinigen und schwarze Streifen entfernen.`, `Matte Flächen aufpolieren lassen.`, `Innenraum lüften und reinigen – Polster, Küche, Bad und Boden.`, `Fenster, Dichtungen und Kunststoffteile auf Verschmutzung prüfen.`],
      },
      {
        h: `Pflege zwischen den Terminen`,
        p: [`Regelmäßiges Abspülen verhindert, dass sich Schmutz und Algen festsetzen. Wer sein Fahrzeug vor der Winterpause reinigt, startet im Frühjahr mit einem deutlich besseren Ausgangszustand. Aggressive Reiniger und harte Bürsten vermeiden – sie können Oberflächen angreifen.`],
      },
    ],
    faqs: [
      { q: 'Werden schwarze Streifen entfernt?', a: 'Ja, sie lassen sich mit der richtigen Vorgehensweise sehr gut entfernen.' },
      { q: 'Wird auch der Innenraum aufbereitet?', a: 'Auf Wunsch ja. Den Umfang besprechen wir individuell.' },
    ],
    related: ['nano-versiegelung-oder-carnauba-wachs', 'was-kostet-eine-autoaufbereitung', 'lackaufbereitung-ablauf-und-dauer'],
  },
  {
    slug: 'auto-verkaufen-mit-aufbereitung',
    title: 'Auto verkaufen: Wie eine Aufbereitung den ersten Eindruck verbessert',
    metaTitle: 'Auto verkaufen: Verkaufsaufbereitung Lilienthal & Bremen',
    metaDescription: `Fahrzeug verkaufen? ✓ Außen ✓ Innen ✓ Lackpflege ✓ Finish. Verkaufsaufbereitung ab 260 €, 1–2 Werktage. Studio Lilienthal, Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 4,
    kicker: 'Verkauf',
    lead: 'Interessenten entscheiden in Sekunden, ob ein Fahrzeug gepflegt wirkt. Was eine Verkaufsaufbereitung umfasst – und was sie ehrlicherweise nicht verspricht.',
    img: 'm850iFront',
    services: ['verkaufsaufbereitung', 'lackaufbereitung', 'innenreinigung'],
    sections: [
      {
        h: 'Der erste Eindruck zählt',
        p: [
          'Bei Besichtigung und Probefahrt sehen Interessenten zuerst Lack, Felgen und Innenraum. Ein sauberes, gepflegtes Fahrzeug wirkt vertrauenswürdiger als eines mit Schmutz, Gerüchen oder stumpfem Lack. Eine Aufbereitung verbessert diesen ersten Eindruck.',
        ],
      },
      {
        h: 'Was zur Verkaufsaufbereitung gehört',
        p: [],
        list: [
          'Außenreinigung inklusive Felgen',
          'Lackpflege und kleine Korrekturen',
          'Intensive Innenreinigung',
          'Polsterauffrischung',
          'Finish und Detailarbeiten',
          'Optional: Versiegelung für lang anhaltenden Glanz',
        ],
      },
      {
        h: 'Was wir nicht versprechen',
        p: [
          'Wir können nicht zusagen, dass Ihr Fahrzeug zu einem bestimmten Preis oder schneller verkauft wird – der Markt entscheidet. Was wir tun: Ihr Fahrzeug so gepflegt wie möglich vorbereiten und Sie ehrlich beraten, welcher Umfang sich lohnt.',
        ],
      },
      {
        h: 'Dauer und Preis',
        p: ['Die Verkaufsaufbereitung startet ab 260 € für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand und dauert je nach Zustand 1–2 Werktage. Nach einer kurzen Begutachtung nennen wir Ihnen einen Festpreis.'],
      },
      {
        h: `Vor dem Fotografieren aufbereiten`,
        p: [`Die Fotos in der Anzeige sind der erste Kontakt mit Interessenten. Ein aufbereitetes Fahrzeug wirkt auf Bildern gepflegter: Der Lack glänzt gleichmäßiger, der Innenraum ist aufgeräumt, Felgen und Scheiben sind sauber. Planen Sie die Aufbereitung deshalb vor dem Foto-Termin ein.`],
      },
      {
        h: `Checkliste vor dem Verkauf`,
        p: [],
        list: [`Außen und Felgen gründlich reinigen, Lack pflegen.`, `Innenraum aussaugen, Kunststoffe und Scheiben reinigen, Gerüche beseitigen.`, `Polster und Leder auffrischen.`, `Motorraum reinigen – ein gepflegter Motorraum macht einen guten Eindruck.`, `Serviceheft, Rechnungen und Unterlagen zusammenstellen.`],
      },
      {
        h: `Ehrlich bleiben`,
        p: [`Eine Aufbereitung kann Zustand und Eindruck verbessern, aber keine Mängel verstecken. Nennen Sie bekannte Schäden offen. Das schafft Vertrauen und vermeidet Diskussionen bei der Übergabe.`],
      },
    ],
    faqs: [
      { q: 'Lohnt sich eine Verkaufsaufbereitung?', a: 'Sie sorgt für einen gepflegteren ersten Eindruck. Einen bestimmten Verkaufspreis können wir nicht zusagen – wir beraten Sie gern zum sinnvollen Umfang.' },
      { q: 'Wie lange dauert sie?', a: 'Je nach Zustand 1–2 Werktage.' },
    ],
    related: ['autoaufbereitung-vor-der-leasingrueckgabe', 'was-kostet-eine-autoaufbereitung', 'lackaufbereitung-ablauf-und-dauer'],
  },
  {
    slug: 'polster-und-leder-im-auto-reinigen',
    title: 'Polster und Leder im Auto reinigen: Was Profis anders machen',
    metaTitle: 'Polster & Leder im Auto reinigen | Sprühextraktion Lilienthal',
    metaDescription: `Autositze reinigen: ✓ Sprühextraktion ✓ Lederpflege ✓ Imprägnierung ✓ Trocknung 2–4 Std. Polster & Leder ab 70 € in Lilienthal. Tel. ${PHONE}`,
    date: '2026-09-25',
    minutes: 4,
    kicker: 'Innenraum',
    lead: 'Flecken, Abrieb, trockenes Leder: So reinigen und pflegen Profis Sitze und Türverkleidungen – und worauf Sie bei Hausmitteln achten sollten.',
    img: 'interiorAfter',
    imgPosition: '85% 90%',
    services: ['polster-leder', 'innenreinigung', 'ozon-geruchsentfernung'],
    sections: [
      {
        h: 'Warum Sitze besonders leiden',
        p: ['Sitzflächen, Lehnen und Türverkleidungen sind im Alltag am stärksten beansprucht: Hautkontakt, Kleidung, Getränke und Sonne hinterlassen Spuren. Leder kann austrocknen, Polster verfärben sich und nehmen Gerüche auf.'],
      },
      {
        h: 'Der professionelle Ablauf',
        p: [],
        list: [
          'Vorreinigung: Aussaugen und Vorbehandlung der Flächen.',
          'Tiefenreinigung: Sprühextraktion bei Stoff, Spezialreiniger bei Leder.',
          'Pflege: Lederlotion bzw. Polsterpflege – das Leder wird nicht ausgetrocknet.',
          'Imprägnierung: optional, damit neue Flecken weniger leicht haften.',
        ],
      },
      {
        h: 'Trocknungszeit und Ergebnis',
        p: [
          'Je nach Witterung trocknen die Polster in 2–4 Stunden. Alte Flecken lassen sich in den meisten Fällen entfernen – eine Garantie können wir dafür nicht geben.',
        ],
      },
      {
        h: 'Hausmittel mit Vorsicht',
        p: ['Zu viel Wasser, aggressive Reiniger oder Scheuermittel können Polster und Leder beschädigen. Bei Leder gilt: lieber nicht experimentieren, sondern gezielt reinigen und pflegen lassen.'],
      },
      {
        h: `Flecken richtig behandeln`,
        p: [`Frische Flecken sofort mit einem saugfähigen Tuch abtupfen – nicht reiben, sonst wird die Flüssigkeit tiefer in das Material gedrückt. Verwenden Sie wenig Wasser und keine scharfen Haushaltsreiniger. Alte oder unklare Flecken überlassen Sie besser einer Fachreinigung.`],
      },
      {
        h: `Leder regelmäßig pflegen`,
        p: [`Leder verliert mit der Zeit Fett und Feuchtigkeit und wird dadurch spröde. Regelmäßige Reinigung und Pflege mit einer geeigneten Lederlotion hält es geschmeidig. Direkte Sonneneinstrahlung und starke Hitze im geparkten Fahrzeug beschleunigen das Austrocknen – ein Sonnenschutz hilft.`],
      },
      {
        h: `Wann ein Profi sinnvoll ist`,
        p: [],
        list: [`Alte, eingetrocknete Flecken, die Hausmittel nicht lösen.`, `Verfärbte oder stark verschmutzte Sitzflächen.`, `Gerüche, die im Polster sitzen.`, `Vor dem Verkauf oder der Leasingrückgabe.`],
      },
    ],
    faqs: [
      { q: 'Ist die Lederpflege inklusive?', a: 'Ja, nach der Reinigung tragen wir eine pflegende Lederlotion auf.' },
      { q: 'Was kostet die Polster- und Lederreinigung?', a: 'Ab 70 € für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand.' },
    ],
    related: ['geruch-im-auto-entfernen', 'was-kostet-eine-autoaufbereitung', 'autoaufbereitung-vor-der-leasingrueckgabe'],
  },
];

export const ARTICLE_BY_SLUG = Object.fromEntries(ARTICLES.map((a) => [a.slug, a])) as Record<string, Article>;

/** Ratgeber-Artikel, die zu einer Leistung passen (für Links von den Leistungsseiten) */
export const ARTICLES_BY_SERVICE = (slug: string) => ARTICLES.filter((a) => a.services.includes(slug));
