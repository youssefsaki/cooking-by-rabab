import type { Metadata, Viewport } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import { getStaticSiteConfig, getStaticNavigationData } from '@/lib/static-data';
import Header from '@/components/Header';
import Footer from '@/components/FooterV1';
import ErrorSuppressor from '@/components/ErrorSuppressor';
import WhatsAppButton from '@/components/WhatsAppButton';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Eruda Mobile Console - Shows console on mobile devices for debugging */}
        <script src="//cdn.jsdelivr.net/npm/eruda" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Eruda mobile console for debugging
              document.addEventListener('DOMContentLoaded', function() {
                if (typeof eruda !== 'undefined') {
                  eruda.init();
                  console.log('Eruda mobile console initialized');
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${robotoCondensed.variable} font-sans antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <ErrorSuppressor />
          <Header navigationData={navigationData} />
          <main className="overflow-x-hidden">
            {children}
          </main>
          <Footer />
          {/* WhatsApp Floating Button - Bottom Right */}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
