import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('book');
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
