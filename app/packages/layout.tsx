import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cooking Class Packages - Basic, Weekly Event & Private',
  description: 'Choose from 3 authentic Moroccan cooking class packages in Taghazout: Basic Package (€60), Weekly Event (€80), or Private Package (€100). Includes pickup, traditional cooking, and Atlas Mountain experience.',
  keywords: ['moroccan cooking class packages', 'taghazout cooking experience price', 'private cooking class morocco', 'berber cooking workshop cost'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/packages' },
  openGraph: {
    title: 'Cooking Class Packages | Taghazout Cooking Class',
    description: 'Choose from 3 authentic Moroccan cooking packages starting from €60. Half-day immersive experience in the Atlas Mountains.',
    images: [{ url: '/packages/basic.jpg', width: 1200, height: 630, alt: 'Moroccan cooking class packages in Taghazout' }],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
