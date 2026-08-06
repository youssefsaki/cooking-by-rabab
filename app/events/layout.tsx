import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Amazigh Music Event Taghazout — Every Saturday in the Atlas Mountains',
  description:
    'Things to do in Taghazout besides surfing — join our Weekly Berber Music Event every Saturday at sunset. Traditional Amazigh music, clay-oven barbecue, mint tea, and village celebration. 80 € / person · 4 hours · 6–13 guests. Pickup from Taghazout Mosque.',
  openGraph: {
    title: 'Weekly Amazigh Music Event Taghazout — Every Saturday',
    description:
      'Weekly Berber Music Event at sunset — music, barbecue, and celebration in a traditional Amazigh village. 80 € / person.',
    images: ['/packages/weekly.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Amazigh Music Event — Every Saturday',
    description:
      'Traditional Berber music, BBQ, and village celebration every Saturday above Taghazout. 80 € / person.',
    images: ['/packages/weekly.webp'],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
