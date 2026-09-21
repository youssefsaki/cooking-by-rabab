import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/book/thank-you', '/fr/book/thank-you'],
      },
    ],
    sitemap: 'https://www.taghazout-cooking-class.com/sitemap.xml',
  };
}
