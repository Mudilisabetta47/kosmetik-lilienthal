import type { Metadata } from 'next';
import { REGION_GROUPS, SERVICES, SITE, type Faq, type Service } from './data';

export const abs = (path: string) => `${SITE.url}${path === '/' ? '' : path}`;
export const OG_IMAGE = '/og.jpg';

export function pageMeta({
  title,
  description,
  path,
  image = OG_IMAGE,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: abs(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: SITE.name,
      title,
      description,
      url: abs(path),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

const ALL_PLACES = REGION_GROUPS.flatMap((g) => g.places);

const address = {
  '@type': 'PostalAddress',
  streetAddress: SITE.street,
  postalCode: SITE.zip,
  addressLocality: SITE.city,
  addressRegion: 'Niedersachsen',
  addressCountry: 'DE',
};

export const ORG_ID = `${SITE.url}/#organization`;
export const BUSINESS_ID = `${SITE.url}/#business`;

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'de-DE',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        telephone: '+4915234551063',
        address,
        sameAs: [SITE.reviewsUrl],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+4915234551063',
          contactType: 'customer service',
          areaServed: 'DE',
          availableLanguage: 'de',
        },
      },
      {
        '@type': ['LocalBusiness', 'AutomotiveBusiness'],
        '@id': BUSINESS_ID,
        name: SITE.name,
        description:
          'Inhabergeführte Premium-Fahrzeugaufbereitung in Lilienthal bei Bremen: Lackaufbereitung, Versiegelung, Innenreinigung, Polster & Leder, Geruchsentfernung und Verkaufsaufbereitung.',
        url: SITE.url,
        image: [`${SITE.url}${OG_IMAGE}`],
        logo: `${SITE.url}/logo.png`,
        telephone: '+4915234551063',
        address,
        parentOrganization: { '@id': ORG_ID },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
        ],
        areaServed: ALL_PLACES.map((name) => ({ '@type': 'City', name })),
        hasMap: SITE.mapsRoute,
        sameAs: [SITE.reviewsUrl],
        knowsAbout: SERVICES.map((s) => s.name),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Leistungen',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, url: abs(`/leistungen/${s.slug}`) },
          })),
        },
      },
    ],
  };
}

export function serviceLd(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: abs(`/leistungen/${s.slug}`),
    provider: { '@id': BUSINESS_ID },
    areaServed: ALL_PLACES.map((name) => ({ '@type': 'City', name })),
    ...(s.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceFrom, priceCurrency: 'EUR' },
            url: abs(`/leistungen/${s.slug}`),
          },
        }
      : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.list ? `${f.a} ${f.listIntro ?? ''} ${f.list.join(', ')}`.replace(/\s+/g, ' ').trim() : f.a },
    })),
  };
}
