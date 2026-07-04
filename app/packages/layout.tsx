import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taghazout Cooking Class Packages — Half-Day Berber Experience from €60',
  description:
    'Traditional cooking experience Taghazout — choose Basic (€60), Weekly Event (€80), or Private (€100). Includes pickup, 300-year-old Berber house tour, tagine workshop, clay oven bread, amlou, and family feast in the Atlas Mountains.',
  keywords: [
    'taghazout cooking class packages',
    'traditional cooking experience taghazout',
    'moroccan cooking class taghazout price',
    'private cooking class morocco',
    'half-day cooking experience morocco',
    'berber cooking workshop cost',
    'cooking class tamraght',
    'cooking class agadir',
    'authentic berber cooking class morocco',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/packages' },
  openGraph: {
    title: 'Taghazout Cooking Class Packages | Taghazout Cooking Class',
    description:
      '3 authentic Moroccan cooking packages from €60. Half-day immersive Berber village experience with pickup from Taghazout.',
    url: 'https://www.taghazout-cooking-class.com/packages',
    type: 'website',
    images: [
      {
        url: '/packages/basic.jpg',
        width: 1200,
        height: 630,
        alt: 'Traditional cooking experience Taghazout — half-day Berber cooking class package',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taghazout Cooking Class Packages',
    description: 'Basic €60, Weekly Event €80, Private €100 — pickup included from Taghazout.',
    images: ['/packages/basic.jpg'],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
