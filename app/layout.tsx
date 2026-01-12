import type { Metadata, Viewport } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import { getStaticSiteConfig, getStaticNavigationData, getStaticFooterData } from '@/lib/static-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  const footerData = getStaticFooterData();

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
        <Footer data={footerData} />
      </body>
    </html>
  );
}
