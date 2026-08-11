import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('experiences');
}

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
