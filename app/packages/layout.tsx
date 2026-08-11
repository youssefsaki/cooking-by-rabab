import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('packages');
}

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
