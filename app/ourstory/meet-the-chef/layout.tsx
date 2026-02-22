import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Rabab - Your Host & Cultural Guide',
  description: 'Meet Rabab, your Amazigh host and cultural guide. Born in the Atlas Mountains, Rabab shares her 10,000-year-old culinary heritage through authentic cooking classes in Taghazout.',
  keywords: ['rabab cooking class', 'moroccan chef taghazout', 'amazigh cooking host', 'berber cooking guide'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/meet-the-chef' },
  openGraph: {
    title: 'Meet Rabab | Taghazout Cooking Class',
    description: 'Meet your Amazigh host who shares 10,000-year-old culinary traditions through authentic cooking classes.',
    images: [{ url: '/our-story/meet-the-chef/meet-the-chef.jpg', width: 1400, height: 900, alt: 'Rabab - Traditional Moroccan Chef' }],
  },
};

export default function MeetTheChefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
