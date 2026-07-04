import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Amazigh Music Event Taghazout — Every Thursday in the Atlas Mountains',
  description:
    'Things to do in Taghazout besides surfing — join our weekly Amazigh music and cultural event every Thursday. Traditional Ahwach performances, live Berber musicians, storytelling, and Moroccan mint tea in the Atlas Mountains.',
  keywords: [
    'things to do in taghazout besides surfing',
    'amazigh music event taghazout',
    'berber cultural event taghazout',
    'cultural activities near taghazout',
    'ahwach performance morocco',
    'moroccan music night taghazout',
    'non-surf activities taghazout',
    'traditional moroccan event',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/events' },
  openGraph: {
    title: 'Weekly Amazigh Cultural Event | Taghazout Cooking Class',
    description:
      'Experience traditional Amazigh music, Ahwach dance, and cultural storytelling every Thursday above Taghazout.',
    url: 'https://www.taghazout-cooking-class.com/events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Amazigh Music Event — Taghazout',
    description: 'Traditional Berber music and culture every Thursday in the Atlas Mountains.',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
