import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('experiences');
}

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Experiences', path: '/experiences' }]} />
      {children}
    </>
  );
}
