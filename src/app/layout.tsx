import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { SITE } from '@/lib/data';
import { OG_IMAGE, siteGraph } from '@/lib/seo';

const sans = Inter_Tight({ subsets: ['latin'], display: 'swap', variable: '--font-sans', weight: ['400', '500', '600', '700'] });
const serif = Instrument_Serif({ subsets: ['latin'], display: 'swap', variable: '--font-serif', weight: '400', style: 'italic' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Autoaufbereitung Lilienthal & Bremen | autokosmetik Lilienthal',
    template: '%s',
  },
  description:
    'Autoaufbereitung Lilienthal & Bremen: ✓ Lackaufbereitung ✓ Versiegelung ✓ Innenreinigung ✓ Verkaufsaufbereitung ✓ 4,8/5 Google. Jetzt anrufen: 0152 / 345 510 63',
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  icons: { icon: '/icon.png', apple: '/icon.png' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0d1730',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal],.split-inner{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only z-[100] rounded-full bg-bone px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <JsonLd data={siteGraph()} />
        <ScrollProgress />
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <MobileBar />
        <CookieBanner />
      </body>
    </html>
  );
}
