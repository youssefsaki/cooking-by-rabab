import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ & Contact',
  description: 'Frequently asked questions about our Moroccan cooking classes in Taghazout. Contact us via WhatsApp, email, or phone for bookings and inquiries.',
  keywords: ['taghazout cooking class FAQ', 'moroccan cooking class contact', 'cooking class questions'],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/faq-contact' },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
