const SITE_ORIGIN = 'https://www.taghazout-cooking-class.com';

export type BreadcrumbCrumb = {
  name: string;
  path: string;
};

export function breadcrumbSchema(crumbs: BreadcrumbCrumb[]) {
  const items = [
    { name: 'Home', path: '/' },
    ...crumbs,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${crumb.path}`,
    })),
  };
}

export function BreadcrumbJsonLd({ crumbs }: { crumbs: BreadcrumbCrumb[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
    />
  );
}
