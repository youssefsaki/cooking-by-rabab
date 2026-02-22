import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Location - Atlas Mountains Above Taghazout',
  description: 'Located just 15 minutes above Taghazout in the Atlas Mountains. Pickup included from Taghazout. Scenic mountain drive through argan forests to our traditional Amazigh village home.',
  keywords: ['taghazout cooking class location', 'atlas mountains cooking', 'moroccan village experience', 'how to get to taghazout cooking class'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/location' },
  openGraph: {
    title: 'Our Location | Taghazout Cooking Class',
    description: '15 minutes above Taghazout in the Atlas Mountains. Pickup included in all packages.',
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
