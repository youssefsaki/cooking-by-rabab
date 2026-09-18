import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Packages — Taghazout Cooking Class',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/packages' },
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
