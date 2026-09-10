import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('kitchen');
}

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Our Kitchen', path: '/ourstory/kitchen' }]} />
      {children}
    </>
  );
}
