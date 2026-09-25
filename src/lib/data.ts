/**
 * Zentrale, geprüfte Inhalte von autokosmetik Lilienthal.
 * Quelle: bestehende Website autokosmetik-lilienthal.de (Stand Relaunch).
 * Hier stehen keine erfundenen Leistungen, Preise, Zertifikate oder Stimmen.
 * Keine Imports – die Datei wird auch direkt von den Node-Tests gelesen.
 */

export const SITE = {
  name: 'autokosmetik Lilienthal',
  legalName: 'autokosmetik (Einzelunternehmer)',
  owner: 'Izzeddin AK',
  taxId: '36 101 11064',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://autokosmetik-lilienthal.de',
  tagline: 'Premium Fahrzeugaufbereitung · Lilienthal / Bremen',
  street: 'Falkenberger Landstraße 75',
  zip: '28865',
  city: 'Lilienthal',
  landmark: 'gegenüber Opel Meyer',
  phoneDisplay: '0152 / 345 510 63',
  phoneHref: 'tel:+4915234551063',
  phoneIntl: '+49 152 34551063',
  legalEmail: 'mudi@mep-agentur.de',
  rating: '4,8',
  reviewsUrl: 'https://share.google/4qr3EB8RbXQSR0R7n',
  mapsEmbed:
    'https://www.google.com/maps?q=Falkenberger+Landstra%C3%9Fe+75%2C+28865+Lilienthal&output=embed',
  mapsRoute:
    'https://www.google.com/maps/dir/?api=1&destination=Falkenberger+Landstra%C3%9Fe+75%2C+28865+Lilienthal',
  hours: [
    { day: 'Montag – Freitag', time: '8:00 – 17:00 Uhr', open: true },
    { day: 'Samstag', time: 'nach Absprache', open: false },
    { day: 'Sonntag', time: 'geschlossen', open: false },
  ],
} as const;

export type GroupId = 'lack' | 'interieur' | 'spezial';

export const GROUPS: Record<GroupId, { label: string; title: string; text: string }> = {
  lack: {
    label: 'Lack',
    title: 'Tiefenglanz & Schutz',
    text: 'Vom Polieren über Hochglanz- und Nano-Versiegelung bis zum klassischen Carnauba-Wachs.',
  },
  interieur: {
    label: 'Interieur',
    title: 'Innenraum in Bestform',
    text: 'Gründliche Innenaufbereitung, Polster- und Lederpflege und professionelle Geruchsentfernung.',
  },
  spezial: {
    label: 'Spezial',
    title: 'Für besondere Aufgaben',
    text: 'Motorwäsche, Folienentfernung, Wohnwagen und Wohnmobil sowie die komplette Verkaufsaufbereitung.',
  },
};

export type Faq = { q: string; a: string };
export type Step = { title: string; text: string };

export type Service = {
  slug: string;
  group: GroupId;
  name: string;
  /** Kurzbeschreibung für Karten & Listen */
  short: string;
  /** Preis in Euro (ab) – null = kein Festpreis auf der Website genannt */
  priceFrom: number | null;
  /** Text, wenn kein „ab“-Preis existiert */
  priceNote: string;
  img: string;
  imgPosition?: string;
  heroAlt: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  intro: string[];
  benefits: string[];
  steps: Step[];
  faqs: Faq[];
  related: string[];
  /** Zusatzhinweis zum Preis */
  priceDetail?: string;
};

const REGION = 'Bremen & Umland';

export const SERVICES: Service[] = [
  {
    slug: 'lackaufbereitung',
    group: 'lack',
    name: 'Lackaufbereitung',
    short: 'Politur, Kratzer- und Hologramm-Entfernung für tiefen Glanz statt matter Oberflächen.',
    priceFrom: null,
    priceNote: 'Preis nach Begutachtung',
    img: 'polish',
    imgPosition: '50% 40%',
    heroAlt: 'Maschinelle Politur eines Fahrzeuglacks bei der Lackaufbereitung in Lilienthal',
    h1: `Lackaufbereitung in Lilienthal – für ${REGION}`,
    metaTitle: 'Lackaufbereitung Lilienthal & Bremen | autokosmetik',
    metaDescription:
      'Mehrstufige Lackaufbereitung in Lilienthal: Politur, Kratzer- und Hologramm-Entfernung für tiefen Glanz. Für Kunden aus Bremen und Umland. Jetzt Termin anfragen.',
    lead: 'Mehrstufige Politur gegen Hologramme, Swirls, Kratzer und matte Stellen – für Farbtiefe, die man sieht.',
    intro: [
      'Im Laufe der Jahre verliert jeder Lack an Brillanz: Waschanlagen hinterlassen feine Kratzer, Hologramme und Swirls, die Oberfläche wirkt matt. Bei der Lackaufbereitung arbeiten wir den Lack in mehreren Stufen von Hand und mit Maschine auf.',
      'Am Ende steht – je nach Wunsch – eine Versiegelung mit Hartwachs, Carnauba oder Nano-Versiegelung, damit das Ergebnis lange bleibt.',
    ],
    benefits: [
      'Tieferer Glanz und mehr Farbtiefe',
      'Kratzer werden reduziert oder entfernt',
      'Werterhalt für Privat- und Verkaufsfahrzeuge',
      'Vorgehen individuell auf den Lacktyp abgestimmt',
      'Persönliche Beratung vor Ort',
    ],
    steps: [
      { title: 'Begutachtung', text: 'Wir prüfen den Lackzustand und besprechen mit Ihnen, was möglich ist.' },
      { title: 'Vorwäsche & Dekontamination', text: 'Schonende Handwäsche und Entfernung von Flugrost.' },
      { title: 'Mehrstufige Politur', text: 'Schleif- und Hochglanzpolitur für ein gleichmäßiges Finish.' },
      { title: 'Versiegelung', text: 'Optional mit Hartwachs, Carnauba oder Nano-Versiegelung.' },
    ],
    faqs: [
      {
        q: 'Wie lange dauert eine Lackaufbereitung?',
        a: 'Je nach Zustand des Lacks rechnen wir mit 4–8 Stunden.',
      },
      {
        q: 'Lassen sich Kratzer komplett entfernen?',
        a: 'Oberflächliche Kratzer lassen sich meist vollständig entfernen. Tiefe Kratzer werden optisch deutlich reduziert.',
      },
      {
        q: 'Aus welchem Gebiet kommen Ihre Kunden?',
        a: 'Unser Studio liegt in Lilienthal. Zu uns kommen Kunden aus Bremen, Achim, Oyten und dem gesamten Landkreis Osterholz.',
      },
    ],
    related: ['hochglanzversiegelung', 'nano-versiegelung', 'carnauba-wachs'],
  },
  {
    slug: 'hochglanzversiegelung',
    group: 'lack',
    name: 'Hochglanzversiegelung',
    short: 'Intensiver Tiefenglanz und langanhaltender Schutz – Politur und Versiegelung in einem Arbeitsgang.',
    priceFrom: 250,
    priceNote: 'ab 250 €',
    img: 'amgGtFront',
    imgPosition: '50% 60%',
    heroAlt: 'Schwarzer Mercedes-AMG GT mit Hochglanz-Lack nach der Aufbereitung',
    h1: `Hochglanzversiegelung in Lilienthal – für ${REGION}`,
    metaTitle: 'Hochglanzversiegelung Auto Lilienthal | ab 250 €',
    metaDescription:
      'Hochglanzversiegelung in Lilienthal ab 250 €: Politur und Lackschutz in einem Arbeitsgang, 6–12 Monate Schutz bei normaler Pflege. Für Bremen und Umland.',
    lead: 'Politur und schützende Versiegelung in einem Arbeitsgang – für gleichmäßigen Hochglanz und sichtbaren Abperleffekt.',
    intro: [
      'Mit unserer Hochglanzversiegelung kombinieren wir Politur und schützende Versiegelung in einem Arbeitsgang. Das Ergebnis ist ein tiefer, gleichmäßiger Glanz, bei dem Wasser sichtbar abperlt.',
      'Die Versiegelung macht die Reinigung leichter, weil Schmutz weniger anhaftet – ideal für Fahrzeuge, die gepflegt bleiben sollen.',
    ],
    benefits: [
      'Tiefer, gleichmäßiger Hochglanz',
      '6–12 Monate Lackschutz bei normaler Pflege',
      'Wasser perlt sichtbar ab',
      'Leichter zu reinigen, weniger Schmutzanhaftung',
      'Werterhalt für Privat- und Verkaufsfahrzeuge',
    ],
    steps: [
      { title: 'Vorwäsche', text: 'Schonende Handwäsche des gesamten Fahrzeugs.' },
      { title: 'Dekontamination', text: 'Entfernung von Flugrost und festsitzenden Partikeln.' },
      { title: 'Politur', text: 'Politur für Tiefenglanz und eine glatte Oberfläche.' },
      { title: 'Versiegelung', text: 'Auftrag der Schutzschicht für Glanz und Abperleffekt.' },
    ],
    faqs: [
      { q: 'Wie lange hält die Hochglanzversiegelung?', a: 'Je nach Pflege 6–12 Monate.' },
      {
        q: 'Reicht eine Versiegelung allein aus?',
        a: 'Bei gepflegten Fahrzeugen ja. Bei stumpfem oder verkratztem Lack empfehlen wir zuerst eine Lackaufbereitung.',
      },
      {
        q: 'Darf ich direkt danach in die Waschanlage?',
        a: 'Wir empfehlen, 1–2 Wochen zu warten und danach bevorzugt per Handwäsche zu reinigen.',
      },
    ],
    related: ['lackaufbereitung', 'nano-versiegelung', 'carnauba-wachs'],
  },
  {
    slug: 'nano-versiegelung',
    group: 'lack',
    name: 'Nano-Versiegelung',
    short: 'Premium-Lackschutz mit starkem Abperleffekt für 1–3 Jahre – optional mit Felgen und Ozonbehandlung.',
    priceFrom: 350,
    priceNote: 'ab 350 €',
    img: 'sealAfter',
    imgPosition: '50% 50%',
    heroAlt: 'Wassertropfen perlen von einem nano-versiegelten dunkelblauen Lack ab',
    h1: `Nano-Versiegelung in Lilienthal – für ${REGION}`,
    metaTitle: 'Nano-Versiegelung Auto Lilienthal | ab 350 €',
    metaDescription:
      'Nano-Versiegelung in Lilienthal ab 350 €: 1–3 Jahre Lackschutz mit Abperleffekt. Optional mit Felgenversiegelung und Ozonbehandlung. Für Bremen und Umland.',
    lead: 'Der langlebigste Lackschutz in unserem Angebot: 1–3 Jahre bei normaler Pflege, mit starkem Abperleffekt.',
    intro: [
      'Die Nano-Versiegelung ist unser Premium-Schutz für den Lack: Sie bildet eine harte, wasserabweisende Schicht, die den Lack vor UV-Strahlung, Vogelkot, Insekten und Streusalz schützt.',
      'Optional ergänzen wir die Behandlung um eine Felgenversiegelung und eine Ozonbehandlung des Innenraums.',
    ],
    benefits: [
      '1–3 Jahre Schutz bei normaler Pflege',
      'Starker Abperleffekt',
      'Schutz vor UV-Strahlung, Vogelkot, Insekten und Streusalz',
      'Werterhalt für hochwertige Fahrzeuge',
      'Optional: Felgenversiegelung und Ozonbehandlung',
    ],
    steps: [
      { title: 'Lackvorbereitung', text: 'Handwäsche, Dekontamination und Politur.' },
      { title: 'Reinigung', text: 'IPA-Wäsche für optimale Haftung der Versiegelung.' },
      { title: 'Auftrag', text: 'Panel für Panel wird die Versiegelung aufgetragen und einmassiert.' },
      { title: 'Aushärtung', text: 'Die Versiegelung benötigt 12–24 Stunden zum Aushärten.' },
    ],
    faqs: [
      { q: 'Wie lange hält eine Nano-Versiegelung?', a: '1–3 Jahre, je nach Pflege und Nutzung.' },
      {
        q: 'Was ist der Unterschied zur Keramikversiegelung?',
        a: 'Beide Begriffe werden gleichbedeutend verwendet. Wir arbeiten mit keramikbasierten Versiegelungen.',
      },
      {
        q: 'Können auch die Felgen versiegelt werden?',
        a: 'Ja, optional. Die Felgen verschmutzen danach weniger stark.',
      },
    ],
    related: ['lackaufbereitung', 'hochglanzversiegelung', 'carnauba-wachs'],
  },
  {
    slug: 'carnauba-wachs',
    group: 'lack',
    name: 'Carnauba-Wachs',
    short: 'Klassische Hartwachsversiegelung mit warmem, sattem Glanz – von Hand aufgetragen.',
    priceFrom: null,
    priceNote: 'Preis auf Anfrage',
    img: 'porsche924',
    imgPosition: '50% 55%',
    heroAlt: 'Roter Porsche 924 als Liebhaberfahrzeug nach der Aufbereitung',
    h1: `Carnauba-Wachs Versiegelung in Lilienthal – für ${REGION}`,
    metaTitle: 'Carnauba-Wachs Versiegelung Lilienthal | autokosmetik',
    metaDescription:
      'Carnauba-Hartwachs von Hand aufgetragen: warmer, satter Tiefenglanz für Liebhaberfahrzeuge und Oldtimer in Lilienthal. Für Bremen und Umland.',
    lead: 'Echtes Carnauba-Wachs in mehreren dünnen Schichten von Hand aufgetragen – für warmen, satten Tiefenglanz.',
    intro: [
      'Carnauba ist ein Naturwachs und der Klassiker unter den Lackversiegelungen. Es erzeugt einen warmen, satten Tiefenglanz und schützt den Lack natürlich vor Wasser und UV-Strahlung.',
      'Besonders gefragt ist Carnauba bei Liebhaberfahrzeugen, Oldtimern und dunklen Lacken.',
    ],
    benefits: [
      'Warmer, satter Tiefenglanz',
      'Natürlicher Lackschutz vor Wasser und UV',
      'Ideal für Liebhaberfahrzeuge und Oldtimer',
      'Handwerkliche Verarbeitung',
    ],
    steps: [
      { title: 'Lackvorbereitung', text: 'Handwäsche, Dekontamination und – wenn nötig – Politur.' },
      { title: 'Auftrag', text: 'Das Wachs wird in mehreren dünnen Schichten aufgetragen.' },
      { title: 'Ablüften', text: 'Das Wachs verbindet sich mit dem Lack.' },
      { title: 'Auspolieren', text: 'Von Hand auspoliert für den finalen Glanz.' },
    ],
    faqs: [
      {
        q: 'Was ist der Unterschied zwischen Carnauba und Nano-Versiegelung?',
        a: 'Carnauba ist ein Naturwachs mit warmem Glanz und hält etwa 3–6 Monate. Die Nano-Versiegelung ist synthetisch, härter und hält 1–3 Jahre.',
      },
      { q: 'Für welche Fahrzeuge eignet sich Carnauba?', a: 'Vor allem für Liebhaberfahrzeuge, Oldtimer und dunkle Lacke.' },
      { q: 'Ist vorher eine Politur nötig?', a: 'Für das beste Ergebnis ja.' },
    ],
    related: ['lackaufbereitung', 'hochglanzversiegelung', 'nano-versiegelung'],
  },
  {
    slug: 'innenreinigung',
    group: 'interieur',
    name: 'Innenaufbereitung',
    short: 'Intensive Innenraumpflege – Aussaugen, Reinigen, Aufbereiten. Individuell nach Absprache.',
    priceFrom: 60,
    priceNote: 'ab 60 €',
    img: 'interiorAfter',
    imgPosition: '50% 50%',
    heroAlt: 'Sauber aufbereiteter Fahrzeuginnenraum mit Lederausstattung',
    h1: `Innenreinigung Auto in Lilienthal – für ${REGION}`,
    metaTitle: 'Innenreinigung Auto Lilienthal | Innenaufbereitung ab 60 €',
    metaDescription:
      'Innenreinigung und Innenaufbereitung in Lilienthal ab 60 €: Aussaugen, Sprühextraktion, Kunststoff- und Lederpflege. Für Kunden aus Bremen und Umland.',
    lead: 'Ein Innenraum, der sich wieder gepflegt anfühlt und riecht – gründlich gereinigt bis in die Details.',
    intro: [
      'Eine professionelle Innenreinigung entfernt nicht nur sichtbaren Schmutz, sondern auch Pollen und Staub. Sie umfasst Aussaugen, Kunststoffreinigung, Polster- und Lederbehandlung sowie die Reinigung des Dachhimmels.',
      'Der Umfang wird nach Absprache individuell auf Ihr Fahrzeug abgestimmt.',
    ],
    benefits: [
      'Gepflegte, saubere Polster und Teppiche',
      'Entfernung von Tierhaaren und Krümeln',
      'Auffrischung von Kunststoff- und Lederflächen',
      'Spürbar bessere Innenraumluft',
      'Vorbereitung für Verkauf, Leasingrückgabe oder die Urlaubsreise',
    ],
    steps: [
      { title: 'Ausräumen & Aussaugen', text: 'Der Innenraum wird ausgeräumt und gründlich abgesaugt.' },
      { title: 'Polster & Teppiche', text: 'Reinigung per Sprühextraktion.' },
      { title: 'Kunststoff & Leder', text: 'Reinigung und Pflege aller Kunststoff- und Lederflächen.' },
      { title: 'Finish', text: 'Innenscheiben und – auf Wunsch – ein Duftbaum.' },
    ],
    faqs: [
      { q: 'Werden auch Tierhaare entfernt?', a: 'Ja, mit Spezialwerkzeug und Tiefenreinigung.' },
      {
        q: 'Hilft die Innenreinigung gegen Gerüche?',
        a: 'Bei frischen Verschmutzungen ja. Bei Rauch- oder Tiergerüchen empfehlen wir zusätzlich die Orsun-Geruchsentfernung.',
      },
      {
        q: 'Wie lange dauert die Innenreinigung?',
        a: 'Eine Standardreinigung dauert 3–5 Stunden, eine intensive Aufbereitung einen ganzen Tag.',
      },
    ],
    related: ['polster-leder', 'orsun-geruchsentfernung', 'verkaufsaufbereitung'],
  },
  {
    slug: 'polster-leder',
    group: 'interieur',
    name: 'Polster & Leder',
    short: 'Polsterreinigung und Lederpflege inklusive Imprägnierung.',
    priceFrom: 70,
    priceNote: 'ab 70 €',
    img: 'interiorAfter',
    imgPosition: '85% 95%',
    heroAlt: 'Gepflegte Ledersitze im Innenraum eines Fahrzeugs',
    h1: `Polster- & Lederreinigung in Lilienthal – für ${REGION}`,
    metaTitle: 'Polster- & Lederreinigung Auto Lilienthal | ab 70 €',
    metaDescription:
      'Polsterreinigung, Lederpflege und Imprägnierung im Fachbetrieb in Lilienthal ab 70 €. Für Kunden aus Bremen, Achim, Verden und Umland.',
    lead: 'Sichtbar saubere Sitze, geschmeidiges Leder und eine Imprägnierung, die vor neuen Flecken schützt.',
    intro: [
      'Sitze, Lehnen und Türverkleidungen sind im Alltag am stärksten beansprucht. Wir reinigen Polster per Sprühextraktion mit Spezialreinigern und pflegen Leder schonend, ohne es auszutrocknen.',
      'Auf Wunsch imprägnieren wir die Flächen, damit neue Flecken weniger leicht haften.',
    ],
    benefits: [
      'Sichtbar saubere Sitzflächen, Lehnen und Türverkleidungen',
      'Schonende Lederreinigung ohne Austrocknung',
      'Imprägnierung schützt vor neuen Flecken',
      'Frischer Geruch und gute Vorbereitung für Verkauf oder Leasingrückgabe',
    ],
    steps: [
      { title: 'Vorreinigung', text: 'Aussaugen und Vorbehandlung der Flächen.' },
      { title: 'Tiefenreinigung', text: 'Sprühextraktion bzw. Spezialreiniger für Leder.' },
      { title: 'Pflege', text: 'Lederlotion bzw. Polsterpflege.' },
      { title: 'Imprägnierung', text: 'Optional als Schutz vor neuen Verschmutzungen.' },
    ],
    faqs: [
      {
        q: 'Lassen sich alte Flecken entfernen?',
        a: 'In den meisten Fällen ja, wir arbeiten mit Spezialreinigern. Eine Garantie können wir nicht geben.',
      },
      { q: 'Ist die Lederpflege inklusive?', a: 'Ja, nach der Reinigung tragen wir eine pflegende Lederlotion auf.' },
      { q: 'Wie lange trocknen die Polster?', a: 'Je nach Witterung 2–4 Stunden.' },
    ],
    related: ['innenreinigung', 'orsun-geruchsentfernung', 'verkaufsaufbereitung'],
  },
  {
    slug: 'orsun-geruchsentfernung',
    group: 'interieur',
    name: 'Orsun-Geruchsentfernung',
    short: 'Geruchsneutralisation bei Zigaretten-, Nikotin-, Tier- und Schimmelgeruch – auch in Lüftung und Klimaanlage.',
    priceFrom: 100,
    priceNote: 'ab 100 €',
    img: 'interiorBefore',
    imgPosition: '50% 50%',
    heroAlt: 'Stark beanspruchter Fahrzeuginnenraum vor der Geruchsbehandlung',
    h1: `Orsun-Geruchsentfernung in Lilienthal – für ${REGION}`,
    metaTitle: 'Geruchsentfernung Auto Lilienthal | Orsun ab 100 €',
    metaDescription:
      'Orsun-Geruchsentfernung in Lilienthal ab 100 €: Zigaretten-, Nikotin-, Tier- und Schimmelgeruch im Auto neutralisieren. Für Bremen und Umland.',
    lead: 'Gerüche werden neutralisiert statt überdeckt – gegen Rauch, Tier und Muff, auch in Lüftung und Klimaanlage.',
    intro: [
      'Orsun ist ein professionelles Verfahren zur Geruchsneutralisation mit Tiefenwirkung in Polstern, Himmel und Verkleidungen. Es richtet sich an alle, deren Fahrzeug hartnäckige Gerüche hat – etwa nach Zigarettenrauch, Nikotin, Tieren oder Feuchtigkeit.',
    ],
    benefits: [
      'Wirkt gegen Zigaretten- und Nikotingeruch',
      'Entfernt Tier- und Hundegeruch dauerhaft',
      'Hilft bei muffigem oder Schimmelgeruch',
      'Wirkt auch in Lüftung und Klimaanlage',
      'Gerüche werden neutralisiert statt überdeckt',
    ],
    steps: [
      { title: 'Innenreinigung', text: 'Gründliche Vorbereitung des Innenraums.' },
      { title: 'Vorbereitung', text: 'Lüftung und Klimaanlage werden für die Behandlung vorbereitet.' },
      { title: 'Orsun-Anwendung', text: 'Der Wirkstoff verteilt sich im gesamten Innenraum.' },
      { title: 'Auslüften', text: 'Das Fahrzeug bleibt zum Aushärten und Auslüften stehen.' },
    ],
    faqs: [
      {
        q: 'Was ist Orsun?',
        a: 'Ein professionelles Verfahren zur dauerhaften Geruchsneutralisation mit Tiefenwirkung in Polstern, Himmel und Verkleidungen.',
      },
      {
        q: 'Hilft es gegen Zigarettenrauch?',
        a: 'Ja, es ist speziell für hartnäckige Gerüche wie Rauch, Nikotin und Tiergeruch gedacht.',
      },
      { q: 'Wie lange dauert die Behandlung?', a: 'Wenige Stunden – idealerweise bleibt das Fahrzeug einen Tag bei uns.' },
    ],
    related: ['innenreinigung', 'polster-leder', 'verkaufsaufbereitung'],
  },
  {
    slug: 'motorwaesche',
    group: 'spezial',
    name: 'Motorwäsche',
    short: 'Gründliche Motorraumreinigung mit anschließender Kunststoffpflege.',
    priceFrom: 80,
    priceNote: 'ab 80 €',
    img: 'lambo',
    imgPosition: '50% 55%',
    heroAlt: 'Gelber Lamborghini Huracán vor dem Studio in Lilienthal',
    h1: `Motorwäsche & Motorraumreinigung in Lilienthal – für ${REGION}`,
    metaTitle: 'Motorwäsche Lilienthal | Motorraumreinigung ab 80 €',
    metaDescription:
      'Professionelle Motorwäsche in Lilienthal ab 80 €: schonende Motorraumreinigung mit Kunststoffpflege. Für Kunden aus Bremen, Achim, Oyten und Verden.',
    lead: 'Ein sauberer Motorraum – schonend gereinigt, sorgfältig abgedeckt und anschließend gepflegt.',
    intro: [
      'Bei der Motorwäsche werden empfindliche Komponenten zuerst abgeklebt. Spezialprodukte lösen Öl und Fett, gewaschen wird mit kontrolliertem Wasserdruck. Zum Schluss pflegen wir die Kunststoffoberflächen.',
    ],
    benefits: [
      'Sauberer, gepflegter Motorraum',
      'Lecks und Verschleißspuren werden früher sichtbar',
      'Kunststoffteile wirken wieder hochwertig',
      'Ein gepflegter Motorraum macht beim Verkauf einen guten Eindruck',
      'Fachgerechte, schonende Durchführung',
    ],
    steps: [
      { title: 'Abkleben', text: 'Empfindliche Komponenten werden geschützt.' },
      { title: 'Vorreiniger', text: 'Spezialprodukte gegen Öl und Fett.' },
      { title: 'Schonende Wäsche', text: 'Reinigung mit kontrolliertem Wasserdruck.' },
      { title: 'Pflege', text: 'Behandlung der Kunststoffoberflächen.' },
    ],
    faqs: [
      {
        q: 'Schadet eine Motorwäsche der Elektronik?',
        a: 'Nein – bei fachgerechter Ausführung mit Abdeckung und kontrolliertem Druck entstehen keine Schäden.',
      },
      {
        q: 'Warum sollte man den Motor waschen lassen?',
        a: 'Ein sauberer Motorraum erleichtert die Werkstattarbeit und verbessert den Eindruck beim Fahrzeugverkauf.',
      },
      {
        q: 'Was passiert nach der Wäsche?',
        a: 'Kunststoffteile werden optional versiegelt – für bessere Optik und geringere Verschmutzung.',
      },
    ],
    related: ['verkaufsaufbereitung', 'lackaufbereitung', 'innenreinigung'],
  },
  {
    slug: 'folienentfernung',
    group: 'spezial',
    name: 'Folienentfernung',
    short: 'Werbe-, Schutz- und Designfolien rückstandslos entfernen – auch bei älteren Folierungen.',
    priceFrom: null,
    priceNote: 'Individuell – Festpreis nach Begutachtung',
    img: 'taycan',
    imgPosition: '50% 55%',
    heroAlt: 'Dunkler Porsche Taycan vor dem Aufbereitungsstudio in Lilienthal',
    h1: `Folienentfernung in Lilienthal – für ${REGION}`,
    metaTitle: 'Folienentfernung Auto Lilienthal | Festpreis nach Begutachtung',
    metaDescription:
      'Folienentfernung in Lilienthal: Werbe-, Schutz- und Designfolien samt Kleberesten schonend entfernen. Festpreis nach Begutachtung. Für Bremen und Umland.',
    lead: 'Folie und Kleber rückstandslos entfernt – mit kontrollierter Wärme und ohne Schaden am Lack.',
    intro: [
      'Ob Werbefolie, Schutzfolie oder Designfolie: Wir entfernen sie samt Kleberesten, auch bei älteren, eingebrannten Folierungen. Der Preis hängt vom Umfang ab und wird nach der Begutachtung als Festpreis genannt.',
    ],
    benefits: [
      'Folien und Klebereste rückstandslos entfernt',
      'Schonende Erwärmung – kein Schaden am Lack',
      'Auch bei alter, eingebrannter Folierung',
      'Optional Lackpflege und Versiegelung im Anschluss',
      'Ideal vor Verkauf oder Leasingrückgabe',
    ],
    steps: [
      { title: 'Begutachtung', text: 'Folientyp, Alter und Untergrund werden geprüft.' },
      { title: 'Erwärmen', text: 'Kontrollierte Erwärmung und schonendes Abziehen.' },
      { title: 'Kleberreste entfernen', text: 'Spezialreiniger für eine rückstandslose Reinigung.' },
      { title: 'Finish', text: 'Optionale Politur und Versiegelung.' },
    ],
    faqs: [
      { q: 'Bleiben Klebereste zurück?', a: 'Nein, wir entfernen sowohl Folie als auch Kleberreste rückstandslos.' },
      {
        q: 'Was kostet die Folienentfernung?',
        a: 'Der Preis variiert je nach Umfang. Nach der Begutachtung nennen wir Ihnen einen Festpreis.',
      },
      { q: 'Wird der Lack anschließend behandelt?', a: 'Auf Wunsch frischen wir den Lack im Bereich der Folierung auf.' },
    ],
    related: ['lackaufbereitung', 'hochglanzversiegelung', 'verkaufsaufbereitung'],
  },
  {
    slug: 'wohnwagen-aufbereitung',
    group: 'spezial',
    name: 'Wohnwagen & Wohnmobil',
    short: 'Aufbereitung, Reinigung und Politur für Caravan, Wohnwagen und Reisemobil.',
    priceFrom: null,
    priceNote: 'Individuell – Festpreis nach Begutachtung',
    img: 'g63Heck',
    imgPosition: '50% 50%',
    heroAlt: 'Großes Fahrzeug nach der Komplettaufbereitung vor dem Studio in Lilienthal',
    h1: `Wohnwagen- & Wohnmobil-Aufbereitung in Lilienthal – für ${REGION}`,
    metaTitle: 'Wohnwagen & Wohnmobil Aufbereitung Lilienthal | autokosmetik',
    metaDescription:
      'Aufbereitung, Reinigung und Politur für Wohnwagen, Caravan und Wohnmobil in Lilienthal. Festpreis nach kurzer Begutachtung. Für Bremen und Umland.',
    lead: 'Die Außenhülle wieder strahlend sauber – schwarze Streifen und Algen inklusive.',
    intro: [
      'Caravan, Wohnwagen und Reisemobil sind groß und wetterexponiert. Wir reinigen die Außenhülle gründlich, entfernen schwarze Streifen und Algen und polieren matte Oberflächen auf. Auf Wunsch bereiten wir auch den Innenraum auf.',
      'Nach einer kurzen Begutachtung erhalten Sie von uns einen Festpreis.',
    ],
    benefits: [
      'Außenhülle wieder strahlend sauber',
      'Schwarze Streifen und Algen entfernt',
      'Innenraum frisch und gepflegt',
      'Werterhalt für den Wiederverkauf',
      'Festpreis nach kurzer Begutachtung',
    ],
    steps: [
      { title: 'Begutachtung', text: 'Zustand außen und innen wird geprüft.' },
      { title: 'Außenreinigung', text: 'Vorwäsche, Spezialreiniger und Handwäsche.' },
      { title: 'Politur', text: 'Leichte Politur für matte Oberflächen.' },
      { title: 'Innenraum', text: 'Optional komplette Innenreinigung.' },
    ],
    faqs: [
      {
        q: 'Werden die schwarzen Streifen entfernt?',
        a: 'Die schwarzen Streifen an Wohnwagen und Wohnmobilen lassen sich mit der richtigen Vorgehensweise sehr gut entfernen.',
      },
      {
        q: 'Wird auch der Innenraum aufbereitet?',
        a: 'Auf Wunsch ja: Polster, Kunststoffe, Küche, Bad und Boden. Den Umfang besprechen wir individuell.',
      },
      { q: 'Was kostet die Aufbereitung?', a: 'Nach einer kurzen Begutachtung nennen wir Ihnen einen Festpreis.' },
    ],
    related: ['lackaufbereitung', 'innenreinigung', 'verkaufsaufbereitung'],
  },
  {
    slug: 'verkaufsaufbereitung',
    group: 'spezial',
    name: 'Verkaufsaufbereitung',
    short: 'Rundum-Aufbereitung für Privatverkauf, Händlerabgabe oder Leasingrückgabe.',
    priceFrom: 260,
    priceNote: 'ab 260 €',
    img: 'm850iSeite',
    imgPosition: '50% 55%',
    heroAlt: 'Weißes BMW M850i Cabrio nach der Verkaufsaufbereitung',
    h1: `Verkaufsaufbereitung in Lilienthal – für ${REGION}`,
    metaTitle: 'Verkaufsaufbereitung Auto Lilienthal | ab 260 €',
    metaDescription:
      'Verkaufsaufbereitung in Lilienthal ab 260 €: Außenreinigung, Lackpflege, Innenreinigung und Finish für Privatverkauf, Händlerabgabe oder Leasingrückgabe.',
    lead: 'Ihr Fahrzeug zeigt sich von seiner besten Seite – innen wie außen, Detail für Detail.',
    intro: [
      'Die Verkaufsaufbereitung ist unser Komplettpaket für Privatverkauf, Händlerabgabe oder Leasingrückgabe. Sie umfasst Außenwäsche, Felgenreinigung, Lackpflege, intensive Innenreinigung sowie kleine Korrekturen. Optionale Zusatzleistungen besprechen wir mit Ihnen.',
      'Ein gepflegtes Fahrzeug macht bei Besichtigungen und Übergaben einen deutlich besseren ersten Eindruck.',
    ],
    benefits: [
      'Gepflegter erster Eindruck bei Interessenten',
      'Gute Vorbereitung auf die Leasingrückgabe',
      'Komplettpaket statt einzelner Leistungen',
      'Persönliche Beratung mit individueller Anpassung',
    ],
    steps: [
      { title: 'Begutachtung', text: 'Zustandsprüfung und Abstimmung des Umfangs.' },
      { title: 'Außenaufbereitung', text: 'Von der Handwäsche bis zur Politur.' },
      { title: 'Innenaufbereitung', text: 'Gründliche Reinigung und Pflege.' },
      { title: 'Finish', text: 'Optional Versiegelung und Detailarbeiten.' },
    ],
    faqs: [
      {
        q: 'Lohnt sich eine Verkaufsaufbereitung?',
        a: 'Ein professionell aufbereitetes Fahrzeug macht einen gepflegteren ersten Eindruck. Einen bestimmten Verkaufspreis können wir nicht zusagen – wir beraten Sie gern, welcher Umfang für Ihr Fahrzeug sinnvoll ist.',
      },
      {
        q: 'Ist die Aufbereitung auch für die Leasingrückgabe geeignet?',
        a: 'Ja. Sie ist darauf ausgerichtet, das Fahrzeug in einem gepflegten Zustand zurückzugeben.',
      },
      { q: 'Wie lange dauert die Verkaufsaufbereitung?', a: 'Je nach Zustand 1–2 Werktage.' },
    ],
    related: ['lackaufbereitung', 'innenreinigung', 'polster-leder'],
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s])) as Record<string, Service>;

export const servicesOf = (g: GroupId) => SERVICES.filter((s) => s.group === g);

export const PRICE_NOTE = {
  base: 'Alle Preise beziehen sich auf ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand.',
  surcharges: [
    { label: 'Großraumlimousinen & Geländewagen', value: '+ 20 %' },
    { label: 'Transporter', value: '+ 40 %' },
  ],
  more: 'Größere oder besonders verschmutzte Fahrzeuge werden mit Aufschlag berechnet. Alle Angaben sind „ab“-Preise; den konkreten Preis nennen wir Ihnen nach kurzer Begutachtung.',
} as const;

export const GALLERY: { img: string; title: string; sub: string }[] = [
  { img: 'taycan', title: 'Porsche Taycan', sub: 'Aufbereitet in Lilienthal' },
  { img: 'lambo', title: 'Lamborghini Huracán', sub: 'Detailing-Ergebnis' },
  { img: 'porsche911Turbo', title: 'Porsche 911 Turbo', sub: 'Lackaufbereitung' },
  { img: 'mustang', title: 'Ford Mustang GT', sub: 'Hochglanzversiegelung' },
  { img: 'g63Front', title: 'Mercedes-AMG G 63', sub: 'Nach der Komplettaufbereitung' },
  { img: 'amgGtFront', title: 'Mercedes-AMG GT', sub: 'Nach der Komplettaufbereitung' },
  { img: 'm850iFront', title: 'BMW M850i Cabrio', sub: 'Nach der Aufbereitung' },
  { img: 'porsche997Front', title: 'Porsche 911 (997) Turbo', sub: 'Nach der Politur' },
  { img: 'boxster', title: 'Porsche Boxster', sub: 'Hochglanz Lackaufbereitung' },
  { img: 'porsche924', title: 'Porsche 924', sub: 'Oldtimer-Aufbereitung' },
  { img: 'x6M40i', title: 'BMW X6 M40i', sub: 'Nach der Hochglanzaufbereitung' },
  { img: 'rangeRover', title: 'Range Rover Sport', sub: 'Nach der Lackaufbereitung' },
];

/** Vollständige Galerie (Unterseite /galerie) mit Original-Beschriftungen */
export const GALLERY_ALL: { img: string; title: string; sub: string }[] = [
  ...GALLERY,
  { img: 'carreraS', title: 'Porsche 911 Carrera S', sub: 'Aufbereitung vor dem Studio' },
  { img: 'porsche991', title: 'Porsche 991', sub: 'Hochglanz nach Lackaufbereitung' },
  { img: 'g63Heck', title: 'Mercedes-AMG G 63', sub: 'Heckansicht nach Aufbereitung' },
  { img: 'g63HeckShop', title: 'Mercedes-AMG G 63', sub: 'Heckansicht vor dem Studio' },
  { img: 'm850iSeite', title: 'BMW M850i Cabrio', sub: 'Seitenansicht vor dem Studio' },
  { img: 'm850iHeck', title: 'BMW M850i Cabrio', sub: 'Heckansicht' },
  { img: 'porsche997Heck', title: 'Porsche 911 (997) Turbo', sub: 'Heckansicht nach Aufbereitung' },
  { img: 'porsche924Seite', title: 'Porsche 924', sub: 'Seitenansicht Oldtimer-Aufbereitung' },
  { img: 'cCabrio', title: 'Mercedes-Benz C-Klasse Cabrio', sub: 'Aufbereitung vor dem Studio' },
  { img: 'x6', title: 'BMW X6', sub: 'Nach Politur und Versiegelung' },
  { img: 'amgGtShop', title: 'Mercedes-AMG GT', sub: 'Hochglanz vor dem Studio' },
];

export const BEFORE_AFTER = [
  {
    id: 'lack',
    label: 'Lack',
    title: 'Lackaufbereitung',
    text: 'Politur, Reinigung und Pflege für tiefen Glanz statt matter, verschmutzter Oberflächen.',
    before: 'paintBefore',
    after: 'paintAfter',
    alt: 'Mercedes vor und nach der Lackaufbereitung',
    href: '/leistungen/lackaufbereitung',
  },
  {
    id: 'innenraum',
    label: 'Innenraum',
    title: 'Innenraum',
    text: 'Aussaugen, Polsterreinigung und Aufbereitung – aus verschmutzt wird gepflegt und hygienisch.',
    before: 'interiorBefore',
    after: 'interiorAfter',
    alt: 'Fahrzeuginnenraum vor und nach der Aufbereitung',
    href: '/leistungen/innenreinigung',
  },
  {
    id: 'versiegelung',
    label: 'Versiegelung',
    title: 'Versiegelung',
    text: 'Wasser perlt vom Lack ab statt zu verlaufen – sichtbarer Schutz und intensiver Glanz.',
    before: 'sealBefore',
    after: 'sealAfter',
    alt: 'Lack vor und nach der Versiegelung',
    href: '/leistungen/nano-versiegelung',
  },
] as const;

/** Welcher Vorher/Nachher-Vergleich passt zu welcher Leistungsseite? */
export const COMPARE_BY_SLUG: Record<string, 'lack' | 'innenraum' | 'versiegelung'> = {
  lackaufbereitung: 'lack',
  hochglanzversiegelung: 'versiegelung',
  'nano-versiegelung': 'versiegelung',
  'carnauba-wachs': 'versiegelung',
  innenreinigung: 'innenraum',
  'polster-leder': 'innenraum',
  'orsun-geruchsentfernung': 'innenraum',
};

/** Zusatzbilder (echte Fahrzeuge) je Leistung für die Detailseiten. */
export const EXTRA_IMAGES: Record<string, string[]> = {
  lackaufbereitung: ['porsche991', 'boxster'],
  hochglanzversiegelung: ['porsche997Front', 'x6M40i'],
  'nano-versiegelung': ['amgGtShop', 'taycan'],
  'carnauba-wachs': ['porsche924Seite', 'mustang'],
  innenreinigung: ['cCabrio', 'rangeRover'],
  'polster-leder': ['m850iSeite', 'g63Front'],
  'orsun-geruchsentfernung': ['x6', 'g63HeckShop'],
  motorwaesche: ['porsche911Turbo', 'lambo'],
  folienentfernung: ['mustang', 'porsche997Heck'],
  'wohnwagen-aufbereitung': ['g63HeckShop', 'rangeRover'],
  verkaufsaufbereitung: ['m850iFront', 'g63Front'],
};

export const WHY = [
  {
    title: 'Werterhalt',
    text: 'Ein regelmäßig gepflegtes Fahrzeug behält seinen Zustand – und damit seinen Wert.',
  },
  {
    title: 'Tiefenglanz',
    text: 'Politur und Versiegelung bringen Farbtiefe zurück, die eine Waschstraße nicht erreicht.',
  },
  {
    title: 'Gepflegter Innenraum',
    text: 'Hygienisch sauber, frisch im Geruch und angenehm im Alltag – von Polster bis Dachhimmel.',
  },
  {
    title: 'Schutz vor Umwelteinflüssen',
    text: 'Wachs und Versiegelung schützen den Lack vor UV, Vogelkot, Insekten und Streusalz.',
  },
  {
    title: 'Besserer erster Eindruck',
    text: 'Ein gepflegtes Auto wirkt – bei Besichtigungen, Übergaben und im Alltag.',
  },
  {
    title: 'Für Verkauf & Leasingrückgabe',
    text: 'Die Aufbereitung bereitet Ihr Fahrzeug gezielt auf Verkauf, Händlerabgabe oder Rückgabe vor.',
  },
] as const;

export const SALE_SCOPE = [
  { title: 'Außenreinigung', text: 'Handwäsche und Felgenreinigung.' },
  { title: 'Lackpflege', text: 'Pflege und – wo nötig – kleine Korrekturen.' },
  { title: 'Innenreinigung', text: 'Intensiv, von Teppich bis Kunststoff.' },
  { title: 'Polsterauffrischung', text: 'Sitze und Verkleidungen wieder gepflegt.' },
  { title: 'Finish', text: 'Detailarbeiten für den letzten Schliff.' },
  { title: 'Versiegelung', text: 'Optional für lang anhaltenden Glanz.' },
] as const;

export const STORY_SCENES = [
  {
    kicker: '01 — Lack',
    title: 'Handarbeit statt Waschstraße.',
    text: 'Wir arbeiten in Handarbeit – schonend für Lack, Polster und Materialien. Politur, Dekontamination und Versiegelung folgen klaren Schritten.',
    img: 'polish',
    pos: '50% 45%',
    href: '/leistungen/lackaufbereitung',
  },
  {
    kicker: '02 — Innenraum',
    title: 'Hygienisch. Gepflegt. Frisch.',
    text: 'Vom Aussaugen über die Sprühextraktion bis zur Lederpflege: ein Innenraum, in dem man gern einsteigt.',
    img: 'interiorAfter',
    pos: '50% 50%',
    href: '/leistungen/innenreinigung',
  },
  {
    kicker: '03 — Schutz',
    title: 'Wasser perlt einfach ab.',
    text: 'Hochglanz- und Nano-Versiegelung schützen den Lack und machen die Pflege spürbar leichter.',
    img: 'sealAfter',
    pos: '50% 50%',
    href: '/leistungen/nano-versiegelung',
  },
  {
    kicker: '04 — Werterhalt',
    title: 'Sichtbar gepflegt. Nachhaltig wertvoll.',
    text: 'Ein gepflegtes Fahrzeug fährt nicht nur schöner – es behält auch seinen Zustand.',
    img: 'porsche997Front',
    pos: '50% 55%',
    href: '/preise',
  },
] as const;

export type Region = { name: string; area: string };

export const REGION_GROUPS: { area: string; places: string[] }[] = [
  { area: 'Landkreis Osterholz', places: ['Lilienthal', 'Osterholz-Scharmbeck', 'Worpswede', 'Ritterhude', 'Grasberg', 'Schwanewede'] },
  { area: 'Bremen', places: ['Bremen'] },
  { area: 'Landkreis Verden', places: ['Achim', 'Oyten', 'Ottersberg', 'Verden'] },
  { area: 'Landkreis Diepholz', places: ['Stuhr', 'Weyhe', 'Syke'] },
  { area: 'Weitere Orte im Umland', places: ['Lemwerder', 'Delmenhorst', 'Tarmstedt', 'Rotenburg', 'Zeven'] },
];

export const BREMEN_DISTRICTS = [
  'Bremen-Nord',
  'Bremen-Ost',
  'Vahr',
  'Horn',
  'Schwachhausen',
  'Findorff',
  'Walle',
  'Vegesack',
  'Borgfeld',
  'Oberneuland',
  'Hemelingen',
  'Osterholz',
];

export const HOME_FAQS: Faq[] = [
  {
    q: 'Was ist Autokosmetik – und worin liegt der Unterschied zur Autowäsche?',
    a: 'Autokosmetik bedeutet die professionelle Pflege Ihres Fahrzeugs in höchster Qualität – innen wie außen. Anders als in der Waschanlage arbeiten wir in Handarbeit, schonend für Lack, Polster und Materialien. Typische Leistungen sind Hand-Politur und Lackaufbereitung, Carnauba- und Nano-Versiegelung, Innenraum-, Polster- und Lederpflege sowie die Ozonbehandlung gegen Gerüche.',
  },
  {
    q: 'Was umfasst eine professionelle KFZ-Aufbereitung – und wann lohnt sie sich?',
    a: 'Eine professionelle Aufbereitung folgt klaren Schritten: Vorwäsche, gründliche Reinigung, Politur, Versiegelung und intensive Innenraumaufbereitung. Sie lohnt sich vor dem Fahrzeugverkauf, vor der Leasingrückgabe, nach dem Winter sowie bei Jahreswagen, Gebraucht- und Neuwagen.',
  },
  {
    q: 'In welchen Orten rund um Lilienthal sind Sie tätig?',
    a: 'Unser Studio liegt in der Falkenberger Landstraße in Lilienthal, verkehrsgünstig zwischen Bremen und Osterholz-Scharmbeck. Wir betreuen Privatkunden, Geschäftskunden und Autohändler aus der gesamten Region, unter anderem aus Lilienthal, Osterholz-Scharmbeck, Bremen, Worpswede, Ritterhude, Grasberg, Schwanewede, Lemwerder, Achim, Oyten, Ottersberg, Tarmstedt, Delmenhorst, Stuhr, Weyhe, Syke, Verden, Rotenburg und Zeven.',
  },
  {
    q: 'Wo finde ich die Autokosmetik in Lilienthal?',
    a: 'Sie finden uns in der Falkenberger Landstraße 75, 28865 Lilienthal – gegenüber Opel Meyer.',
  },
  {
    q: 'Was kostet eine professionelle Autoaufbereitung?',
    a: 'Unsere Leistungen starten ab 60 € (Innenaufbereitung). Weitere Beispiele: Polster & Leder ab 70 €, Motorwäsche ab 80 €, Orsun-Geruchsentfernung ab 100 €, Hochglanzversiegelung ab 250 €, Verkaufsaufbereitung ab 260 € und Nano-Versiegelung ab 350 €. Alle Preise gelten für ein Fahrzeug der Mittelklasse in normal verschmutztem Zustand; für Großraumlimousinen und Geländewagen berechnen wir +20 %, für Transporter +40 %. Ihr konkretes Angebot erhalten Sie nach kurzer Begutachtung.',
  },
  {
    q: 'Wie lange dauert eine Aufbereitung?',
    a: 'Das hängt von Leistung und Zustand ab: Eine Innenreinigung dauert in der Regel 3–5 Stunden, eine Lackaufbereitung 4–8 Stunden, eine Verkaufsaufbereitung 1–2 Werktage. Termine sprechen wir individuell mit Ihnen ab.',
  },
];

export const VEHICLE_TYPES = [
  { id: 'standard', label: 'Klein-, Kompakt- & Mittelklasse', hint: 'Basispreis' },
  { id: 'suv', label: 'Geländewagen / Großraumlimousine', hint: '+ 20 %' },
  { id: 'van', label: 'Transporter', hint: '+ 40 %' },
  { id: 'caravan', label: 'Wohnwagen / Wohnmobil', hint: 'Festpreis nach Begutachtung' },
  { id: 'other', label: 'Sonstiges Fahrzeug', hint: 'Wir beraten Sie' },
] as const;

export const NAV = {
  main: [
    { label: 'Leistungen', href: '/leistungen' },
    { label: 'Preise', href: '/preise' },
    { label: 'Vorher / Nachher', href: '/#vorher-nachher' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Standort', href: '/#standort' },
  ],
} as const;

export const STATIC_ROUTES = [
  '/',
  '/leistungen',
  '/preise',
  '/galerie',
  '/termin',
  '/einzugsgebiet',
  '/fahrzeugaufbereitung-bremen',
  '/impressum',
  '/datenschutz',
] as const;

export const formatEuro = (n: number) => `${n.toLocaleString('de-DE')} €`;
