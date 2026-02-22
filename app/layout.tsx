import type { Metadata, Viewport } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import { getStaticSiteConfig, getStaticNavigationData } from '@/lib/static-data';
import Header from '@/components/Header';
import Footer from '@/components/FooterV1';
import ErrorSuppressor from '@/components/ErrorSuppressor';
import WhatsAppButton from '@/components/WhatsAppButton';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LanguageProvider } from '@/contexts/LanguageContext';

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Get site config for metadata
const siteConfig = getStaticSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    default: 'Taghazout Cooking Class - Authentic Moroccan & Amazigh Cooking Experience',
    template: '%s | Taghazout Cooking Class',
  },
  description: 'Experience authentic Moroccan cooking in the Atlas Mountains above Taghazout. Learn traditional Amazigh tagine, bread baking & tea ceremony in a 300-year-old Berber village home. Half-day immersive cultural experience with pickup included.',
  keywords: ['moroccan cooking class', 'taghazout cooking class', 'amazigh cuisine', 'berber cooking experience', 'atlas mountains cooking', 'tagine cooking class morocco', 'traditional moroccan food', 'cooking workshop taghazout', 'moroccan culinary experience', 'agadir cooking class', 'morocco food tour', 'berber village experience'],
  authors: [{ name: 'Rabab - Taghazout Cooking Class' }],
  creator: 'Taghazout Cooking Class',
  publisher: 'Taghazout Cooking Class',
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: siteConfig.site.url,
  },
  openGraph: {
    title: 'Taghazout Cooking Class - Authentic Moroccan & Amazigh Cooking Experience',
    description: 'Experience authentic Moroccan cooking in the Atlas Mountains above Taghazout. Half-day immersive cultural experience in a 300-year-old Berber village home.',
    type: 'website',
    locale: 'en_US',
    url: siteConfig.site.url,
    siteName: 'Taghazout Cooking Class',
    images: [
      {
        url: '/hero/desktop/bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Authentic Moroccan cooking class in Taghazout Atlas Mountains',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taghazout Cooking Class - Authentic Moroccan Cooking Experience',
    description: 'Learn traditional Amazigh tagine, bread baking & tea ceremony in a 300-year-old Berber village home above Taghazout.',
    images: ['/hero/desktop/bg.jpg'],
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Taghazout Cooking Class',
              description: 'Authentic Moroccan & Amazigh cooking experience in the Atlas Mountains above Taghazout. Half-day immersive cultural experience in a 300-year-old Berber village home.',
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
              image: 'https://www.taghazout-cooking-class.com/hero/desktop/bg.jpg',
              priceRange: '€60-€100',
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '500' },
              openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '20:00' },
              sameAs: ['https://www.instagram.com/taghazout_cooking_class/', 'https://www.tiktok.com/@rabab_cooking_class'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Cooking Class Packages',
                itemListElement: [
                  { '@type': 'Offer', name: 'Basic Package', price: '60', priceCurrency: 'EUR', description: 'Half-day authentic Berber cooking experience' },
                  { '@type': 'Offer', name: 'Private Package', price: '100', priceCurrency: 'EUR', description: 'Exclusive personalized cooking journey' },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${robotoCondensed.variable} font-sans antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <ErrorSuppressor />
          <ErrorBoundary name="Header">
            <Header navigationData={navigationData} />
          </ErrorBoundary>
          <main className="overflow-x-hidden">
            {children}
          </main>
          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>
          <ErrorBoundary name="WhatsApp">
            <WhatsAppButton />
          </ErrorBoundary>
        </LanguageProvider>
      </body>
    </html>
  );
}
