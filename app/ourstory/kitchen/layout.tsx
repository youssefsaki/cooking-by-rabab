import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traditional Berber Kitchen — Clay Oven Bread & Wood-Fired Cooking',
  description:
    'Tour our authentic Amazigh kitchen in the Atlas Mountains above Taghazout. Traditional wood-fired clay oven for bread baking, handcrafted tagines, stone millstones for amlou, and ancient Berber cooking tools used for millennia.',
  keywords: [
    'clay oven bread making morocco',
    'wood-fired oven bread baking morocco',
    'traditional moroccan kitchen',
    'authentic berber kitchen',
    'amazigh cooking kitchen',
    'clay oven bread making taghazout',
    'traditional berber cooking tools',
    'wood-fired clay oven morocco',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/ourstory/kitchen' },
  openGraph: {
    title: 'Our Traditional Kitchen | Taghazout Cooking Class',
    description:
      'Authentic Amazigh kitchen with wood-fired clay oven, tagines, and ancient stone grinding tools above Taghazout.',
    url: 'https://www.taghazout-cooking-class.com/ourstory/kitchen',
    type: 'website',
    images: [
      {
        url: '/our-story/our-kitchen/main.jpg',
        width: 1400,
        height: 900,
        alt: 'Traditional Berber kitchen — clay oven bread baking in Taghazout Atlas Mountains',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traditional Berber Kitchen — Taghazout Cooking Class',
    description: 'Wood-fired clay oven, tagines, and ancient Amazigh cooking tools.',
    images: ['/our-story/our-kitchen/main.jpg'],
  },
};

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
