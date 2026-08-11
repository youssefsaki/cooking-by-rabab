import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('location');
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
