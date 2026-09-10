import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('meetChef');
}

export default function MeetTheChefLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Meet the Chef', path: '/ourstory/meet-the-chef' }]} />
      {children}
    </>
  );
}
