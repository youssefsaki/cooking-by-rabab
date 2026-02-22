import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Amazigh Music & Cultural Event - Every Thursday',
  description: 'Join our weekly Amazigh music and cultural event every Thursday in the Atlas Mountains above Taghazout. Experience traditional Ahwach performances, live Berber musicians, storytelling, and Moroccan tea.',
  keywords: ['amazigh music event', 'berber cultural event taghazout', 'moroccan music night', 'ahwach performance', 'traditional moroccan event'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/events' },
  openGraph: {
    title: 'Weekly Amazigh Cultural Event | Taghazout Cooking Class',
    description: 'Experience traditional Amazigh music, Ahwach dance, and cultural storytelling every Thursday evening.',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
