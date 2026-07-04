import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Berber Village Cooking Experience — Atlas Mountains Above Taghazout',
  description:
    'Our Taghazout cooking class is located 15 minutes above Taghazout in the Atlas Mountains — 30 minutes from Agadir Airport. Pickup included from Taghazout Mosque. Scenic argan forest drive to a traditional Amazigh village home.',
  keywords: [
    'taghazout cooking class location',
    'berber village cooking experience',
    'atlas mountains cooking class',
    'cooking class agadir pickup',
    'cooking class tamraght',
    'day trip from taghazout atlas mountains',
    'how to get to taghazout cooking class',
    'moroccan village experience taghazout',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/location' },
  openGraph: {
    title: 'Our Location | Taghazout Cooking Class',
    description:
      '15 minutes above Taghazout, 30 min from Agadir Airport. Pickup included — scenic drive through argan forests to our Berber village.',
    url: 'https://www.taghazout-cooking-class.com/ourstory/location',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Location — Taghazout Cooking Class',
    description: 'Berber village in the Atlas Mountains, 15 min above Taghazout. Pickup included.',
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
