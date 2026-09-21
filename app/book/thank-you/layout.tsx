import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking received — Taghazout Cooking Class',
  robots: { index: false, follow: false },
};

export default function BookingThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
