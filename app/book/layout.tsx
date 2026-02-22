import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Cooking Class',
  description: 'Book your authentic Moroccan cooking class in Taghazout. Choose Basic (€60) or Private (€100) package. Includes pickup from Taghazout, traditional cooking, and family-style feast in the Atlas Mountains.',
  keywords: ['book moroccan cooking class', 'reserve taghazout cooking experience', 'cooking class booking morocco'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/book' },
  openGraph: {
    title: 'Book Your Cooking Class | Taghazout Cooking Class',
    description: 'Reserve your authentic Moroccan cooking experience. Basic or Private packages available with pickup included.',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
