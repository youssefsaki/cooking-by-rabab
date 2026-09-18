import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';
import {
  BASIC_ADULT_PRICE_EUR,
  PRIVATE_AT_LOCATION_PRICE_EUR,
} from '@/lib/booking/schedule';

const SITE_ORIGIN = 'https://www.taghazout-cooking-class.com';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('packages');
}

const PACKAGES = [
  {
    id: 'basic',
    name: 'The authentic mountains culinary escape',
    description:
      'Half-day authentic Berber cooking experience in the Atlas Mountains above Taghazout. Pickup from Taghazout Mosque included.',
    price: BASIC_ADULT_PRICE_EUR,
    image: '/packages/basic.webp',
  },
  {
    id: 'private-at-location',
    name: 'Rabab Comes to You',
    description:
      'Private Moroccan cooking experience at your villa or riad in the Taghazout area.',
    price: PRIVATE_AT_LOCATION_PRICE_EUR,
    image: '/packages/pv-at-ur-location.webp',
  },
] as const;

const packagesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Taghazout Cooking Class Packages',
  description:
    'Traditional cooking experiences in Taghazout — half-day Berber village journey or Rabab at your location.',
  url: `${SITE_ORIGIN}/packages`,
  numberOfItems: PACKAGES.length,
  itemListElement: PACKAGES.map((pkg, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_ORIGIN}/packages#${pkg.id}`,
    item: {
      '@type': 'Product',
      name: pkg.name,
      description: pkg.description,
      image: `${SITE_ORIGIN}${pkg.image}`,
      url: `${SITE_ORIGIN}/book?package=${pkg.id}`,
      brand: {
        '@type': 'Brand',
        name: 'Taghazout Cooking Class',
      },
      offers: {
        '@type': 'Offer',
        price: String(pkg.price),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_ORIGIN}/book?package=${pkg.id}`,
      },
    },
  })),
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Packages', path: '/packages' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesSchema) }}
      />
      {children}
    </>
  );
}
