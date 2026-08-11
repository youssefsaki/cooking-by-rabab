import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('meetChef');
}

export default function MeetTheChefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
