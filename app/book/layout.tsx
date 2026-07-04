import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Taghazout Cooking Class — Basic, Private & Weekly Event',
  description:
    'Book cooking class near Taghazout online. Pickup from Taghazout Mosque included. Choose Basic (€60), Weekly Event (€80), or Private (€100). Half-day Berber village experience in the Atlas Mountains.',
  keywords: [
    'book cooking class near taghazout',
    'book moroccan cooking class',
    'reserve taghazout cooking experience',
    'taghazout cooking class booking',
    'moroccan cooking class taghazout',
    'private moroccan cooking class',
    'cooking class agadir booking',
    'half-day cooking experience morocco',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/book' },
  openGraph: {
    title: 'Book Taghazout Cooking Class | Taghazout Cooking Class',
    description:
      'Book your authentic Moroccan cooking class near Taghazout. Basic €60, Weekly Event €80, Private €100 — pickup included.',
    url: 'https://www.taghazout-cooking-class.com/book',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Taghazout Cooking Class',
    description: 'Reserve your Berber cooking experience online. Pickup from Taghazout included.',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
