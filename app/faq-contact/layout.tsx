import { Metadata } from 'next';
import faqData from '@/data/faqs.json';

export const metadata: Metadata = {
  title: 'FAQ & Contact — Taghazout Cooking Class',
  description:
    'FAQ about our Taghazout cooking class — booking, prices, pickup from Agadir & Taghazout, vegetarian options, and what to do besides surfing. Contact Rabab via WhatsApp, email, or phone.',
  keywords: [
    'taghazout cooking class FAQ',
    'how to book cooking class near taghazout',
    'moroccan cooking class taghazout cost',
    'cooking class agadir pickup',
    'things to do in taghazout besides surfing',
    'vegetarian moroccan cooking class',
    'moroccan cooking class contact',
    'rabab cooking class contact',
  ],
  alternates: { canonical: 'https://www.taghazout-cooking-class.com/faq-contact' },
  openGraph: {
    title: 'FAQ & Contact | Taghazout Cooking Class',
    description: 'Answers about booking, packages, pickup, and contact info for our Taghazout cooking class.',
    url: 'https://www.taghazout-cooking-class.com/faq-contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ & Contact — Taghazout Cooking Class',
    description: 'Booking FAQ and contact info for Rabab\'s Moroccan cooking class in Taghazout.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
