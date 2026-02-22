import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moroccan Cooking Experiences - Tajine, Bread, Tea & Amlou',
  description: 'Discover 5 unique Moroccan cooking experiences: Tajine Masterclass, Amazigh Heritage, Tea Ceremony, Clay Oven Bread, and Amlou Workshop. Hands-on classes in a traditional Atlas Mountain village.',
  keywords: ['moroccan tajine class', 'bread baking morocco', 'moroccan tea ceremony', 'amlou workshop', 'amazigh cooking experience'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/experiences' },
  openGraph: {
    title: 'Moroccan Cooking Experiences | Taghazout Cooking Class',
    description: '5 unique hands-on Moroccan cooking experiences in a traditional Berber village above Taghazout.',
    images: [{ url: '/experiences/tajine.jpg', width: 800, height: 600, alt: 'Moroccan tajine cooking experience' }],
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
