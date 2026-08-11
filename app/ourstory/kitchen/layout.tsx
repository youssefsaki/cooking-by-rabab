import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('kitchen');
}

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
