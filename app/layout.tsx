import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Newsreader, Outfit } from 'next/font/google';
import './globals.css';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import { getStaticSiteConfig, getStaticNavigationData } from '@/lib/static-data';
import Header from '@/components/Header';
import Footer from '@/components/FooterV1';
import ErrorSuppressor from '@/components/ErrorSuppressor';
import WhatsAppButton from '@/components/WhatsAppButton';
import ErrorBoundary from '@/components/ErrorBoundary';
import SiteChrome from '@/components/SiteChrome';
import SiteMotion from '@/components/SiteMotion';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { buildSeoMetadata } from '@/lib/seo-metadata';
import { getRequestLocale } from '@/lib/request-locale';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  preload: true,
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600'],
  adjustFontFallback: false,
});

// Get site config for metadata
const siteConfig = getStaticSiteConfig();

export async function generateMetadata(): Promise<Metadata> {
  const seo = await buildSeoMetadata('home');
  const locale = getRequestLocale();
  const title =
    typeof seo.title === 'string'
      ? seo.title
      : 'Cooking Class Taghazout, Tamraght & Agadir';
  const description =
    typeof seo.description === 'string'
      ? seo.description
      : 'Book a Moroccan cooking class near Taghazout, Tamraght, and Agadir. Berber experience with cooking class — tajine, couscous, or rfissa. Pickup included.';

  return {
    metadataBase: new URL(siteConfig.site.url),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: seo.keywords,
    authors: [{ name: 'Rabab - Taghazout Cooking Class' }],
    creator: 'Taghazout Cooking Class',
    publisher: 'Taghazout Cooking Class',
    formatDetection: { telephone: true, email: true },
    alternates: seo.alternates,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: typeof seo.openGraph === 'object' && seo.openGraph && 'url' in seo.openGraph
        ? seo.openGraph.url
        : siteConfig.site.url,
      siteName: 'Taghazout Cooking Class',
      images: seo.openGraph?.images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seo.twitter?.images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationData = getStaticNavigationData();
  const locale = getRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Taghazout Cooking Class',
              description:
                'Moroccan cooking class near Taghazout, Tamraght, and Agadir. Half-day Berber village experience in the Atlas Mountains — tajine, couscous, rfissa, clay-oven bread, and mint tea. Pickup included.',
              url: 'https://www.taghazout-cooking-class.com',
              telephone: '+212726671746',
              email: 'rababouhadda5@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Taghazout',
                addressRegion: 'Souss-Massa',
                addressCountry: 'MA',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 30.5236, longitude: -9.7366 },
              areaServed: [
                { '@type': 'City', name: 'Taghazout' },
                { '@type': 'City', name: 'Agadir' },
                { '@type': 'City', name: 'Tamraght' },
                { '@type': 'AdministrativeArea', name: 'Souss-Massa' },
                { '@type': 'Place', name: 'Atlas Mountains' },
              ],
              image: 'https://www.taghazout-cooking-class.com/hero/desktop/bg.webp',
              priceRange: '€65-€100',
              openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '20:00' },
              sameAs: ['https://www.instagram.com/taghazout_cooking_class/', 'https://www.tiktok.com/@rabab_cooking_class'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Cooking Class Packages',
                itemListElement: [
                  { '@type': 'Offer', name: 'The authentic mountains culinary escape', price: '65', priceCurrency: 'EUR', description: 'Half-day authentic Berber cooking experience in Atlas Mountains above Taghazout' },
                  { '@type': 'Offer', name: 'Weekly Amazigh Music Event', price: '80', priceCurrency: 'EUR', description: 'Weekly Berber music and cultural event — things to do in Taghazout besides surfing' },
                  { '@type': 'Offer', name: 'Private Workshop Experience', price: '80', priceCurrency: 'EUR', description: 'Private cooking class for your group at our traditional village workshop above Taghazout' },
                  { '@type': 'Offer', name: 'Rabab Comes to You', price: '100', priceCurrency: 'EUR', description: 'Private Moroccan cooking experience at your villa or riad in the Taghazout area' },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${outfit.variable} ${newsreader.variable} font-sans antialiased text-ink bg-paper`} suppressHydrationWarning>
        <LanguageProvider initialLanguage={locale === 'fr' ? 'FR' : 'EN'}>
          <SiteMotion>
            <ErrorSuppressor />
            <SiteChrome>
              <ErrorBoundary name="Header">
                <Header navigationData={navigationData} />
              </ErrorBoundary>
            </SiteChrome>
            <main>{children}</main>
            <SiteChrome>
              <ErrorBoundary name="Footer">
                <Footer />
              </ErrorBoundary>
              <ErrorBoundary name="WhatsApp">
                <WhatsAppButton />
              </ErrorBoundary>
            </SiteChrome>
          </SiteMotion>
        </LanguageProvider>
      </body>
    </html>
  );
}
