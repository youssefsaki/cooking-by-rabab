import type { Metadata, Viewport } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import { getStaticSiteConfig, getStaticNavigationData } from '@/lib/static-data';
import Header from '@/components/Header';
// Footer - Design 1: Classic Multi-Column
import Footer from '@/components/FooterV1';
// Footer - Design 2: Centered Minimal
// import Footer from '@/components/FooterV2';
// Footer - Design 3: Warm Split Design
// import Footer from '@/components/FooterV3';
// Footer - Design 4: Magazine Editorial
// import Footer from '@/components/FooterV4';
// Footer - Design 5: Compact Simple
// import Footer from '@/components/FooterV5';
// Footer - Design 6: Full Experience (Premium)
// import Footer from '@/components/FooterV6';
import ErrorSuppressor from '@/components/ErrorSuppressor';

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
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  authors: [{ name: siteConfig.metadata.author }],
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    type: 'website',
    locale: siteConfig.metadata.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
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
    <html lang="en">
      <head>
        {/* Preload hero video for faster loading */}
        <link rel="preload" href="/hero.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${robotoCondensed.variable} font-sans`}>
        <ErrorSuppressor />
        <Header navigationData={navigationData} />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
