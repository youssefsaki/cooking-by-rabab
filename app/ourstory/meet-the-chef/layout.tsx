import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Rabab — Taghazout Cooking Class Host & Amazigh Cultural Guide',
  description:
    'Meet Rabab, your Taghazout cooking class host. Born in the Atlas Mountains, Rabab shares 10,000-year-old Amazigh culinary traditions in a 300-year-old Berber house — supporting local village women through authentic cooking classes.',
  keywords: [
    'rabab cooking class',
    'rabab cooking class taghazout',
    'moroccan chef taghazout',
    'amazigh cooking host',
    'berber cooking guide morocco',
    '300-year-old berber house cooking',
    'authentic berber cooking class morocco',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/meet-the-chef' },
  openGraph: {
    title: 'Meet Rabab | Taghazout Cooking Class',
    description:
      'Your Amazigh host Rabab shares centuries-old culinary traditions through authentic cooking classes above Taghazout.',
    url: 'https://www.taghazout-cooking-class.com/ourstory/meet-the-chef',
    type: 'profile',
    images: [
      {
        url: '/our-story/meet-the-chef/meet-the-chef.jpg',
        width: 1400,
        height: 900,
        alt: 'Rabab — Taghazout cooking class host and Amazigh cultural guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Rabab — Taghazout Cooking Class',
    description: 'Amazigh host sharing authentic Berber cooking traditions in the Atlas Mountains.',
    images: ['/our-story/meet-the-chef/meet-the-chef.jpg'],
  },
};

export default function MeetTheChefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
