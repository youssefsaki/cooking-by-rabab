import type { Metadata } from 'next';
import faqData from '@/data/faqs.json';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('faq');
}

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
      <BreadcrumbJsonLd crumbs={[{ name: 'FAQ & Contact', path: '/faq-contact' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
