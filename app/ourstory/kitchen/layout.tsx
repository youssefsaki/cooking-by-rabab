import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Traditional Kitchen - 10,000 Years of Amazigh Heritage',
  description: 'Discover our authentic Amazigh kitchen in the Atlas Mountains. Equipped with traditional wood-fired ovens, handcrafted tagines, and ancient stone grinding tools used for millennia.',
  keywords: ['traditional moroccan kitchen', 'amazigh cooking kitchen', 'wood-fired oven morocco', 'authentic berber kitchen'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/kitchen' },
  openGraph: {
    title: 'Our Traditional Kitchen | Taghazout Cooking Class',
    description: 'An authentic Amazigh kitchen with traditional tools that have been used for thousands of years.',
    images: [{ url: '/our-story/our-kitchen/main.jpg', width: 1400, height: 900, alt: 'Traditional Moroccan Amazigh kitchen' }],
  },
};

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
