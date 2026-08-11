import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('events', {
    openGraphUrl: 'https://www.taghazout-cooking-class.com/events',
  });
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
