import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moroccan Cooking Masterclass, Clay Oven Bread & Amlou Workshop — Taghazout',
  description:
    'Moroccan cooking experiences in Taghazout: Cooking Masterclass (Tagine, Msemen, Couscous, or Rfissa), Clay Oven Bread Making, Amlou Workshop Morocco, Amazigh Heritage, and Moroccan Mint Tea Ceremony. Hands-on Berber village classes in the Atlas Mountains.',
  keywords: [
    'moroccan cooking masterclass taghazout',
    'tajine masterclass taghazout',
    'clay oven bread making taghazout',
    'amlou workshop morocco',
    'moroccan mint tea ceremony class',
    'berber village cooking experience',
    'wood-fired oven bread baking morocco',
    'amazigh cooking experience',
    'couscous cooking class morocco',
    'msemen cooking class taghazout',
    'argan oil amlou making workshop',
    'cultural experience taghazout',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/experiences' },
  openGraph: {
    title: 'Moroccan Cooking Experiences in Taghazout | Taghazout Cooking Class',
    description:
      '5 hands-on cooking experiences: Cooking Masterclass (Tagine, Msemen, Couscous, or Rfissa), Clay Oven Bread, Amlou Workshop, Tea Ceremony & Amazigh Heritage in a Berber village above Taghazout.',
    url: 'https://www.taghazout-cooking-class.com/experiences',
    type: 'website',
    images: [
      {
        url: '/experiences/tajine.jpg',
        width: 800,
        height: 600,
        alt: 'Moroccan cooking masterclass Taghazout — traditional dishes in Berber village kitchen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moroccan Cooking Experiences — Taghazout',
    description: 'Cooking masterclass (Tagine, Msemen, Couscous, or Rfissa), clay oven bread, amlou, tea ceremony & Amazigh heritage classes.',
    images: ['/experiences/tajine.jpg'],
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
