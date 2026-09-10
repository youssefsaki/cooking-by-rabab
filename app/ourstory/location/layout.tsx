import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('location');
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Location', path: '/ourstory/location' }]} />
      {children}
    </>
  );
}
