/** SEO meta fields stored in site_copy (merge-safe flat keys). */

export type SeoPageId =
  | 'home'
  | 'packages'
  | 'experiences'
  | 'events'
  | 'book'
  | 'faq'
  | 'meetChef'
  | 'kitchen'
  | 'location';

export type SeoPageDef = {
  id: SeoPageId;
  label: string;
  path: string;
  titleKey: string;
  descriptionKey: string;
  fallbackTitle: string;
  fallbackDescription: string;
  /** Public path for Open Graph / Twitter share cards. */
  ogImage: string;
};

export const SEO_PAGES: SeoPageDef[] = [
  {
    id: 'home',
    label: 'Homepage',
    path: '/',
    titleKey: 'seo.home.metaTitle',
    descriptionKey: 'seo.home.metaDescription',
    fallbackTitle: 'Cooking Class Taghazout, Tamraght & Agadir',
    fallbackDescription:
      'Book a Moroccan cooking class near Taghazout, Tamraght, and Agadir. Pickup included. Cook tajine, couscous, or rfissa in a Berber village. Cours de cuisine à Taghazout.',
    ogImage: '/hero/desktop/bg.webp',
  },
  {
    id: 'packages',
    label: 'Packages',
    path: '/packages',
    titleKey: 'seo.packages.metaTitle',
    descriptionKey: 'seo.packages.metaDescription',
    fallbackTitle: 'Cooking Class Packages — Taghazout from €65',
    fallbackDescription:
      'Half-day cooking class from Taghazout, Tamraght, and Agadir. From 65 €. Weekly event, private workshop, or Rabab at your villa.',
    ogImage: '/packages/basic.webp',
  },
  {
    id: 'experiences',
    label: 'Experiences',
    path: '/experiences',
    titleKey: 'seo.experiences.metaTitle',
    descriptionKey: 'seo.experiences.metaDescription',
    fallbackTitle: 'Tajine, Rfissa & Bread Class in Taghazout',
    fallbackDescription:
      'Hands-on Moroccan cooking in Taghazout: tajine, rfissa, couscous, clay-oven bread, amlou, and mint tea. Pickup from the coast including Tamraght.',
    ogImage: '/experiences/tajine.jpg',
  },
  {
    id: 'events',
    label: 'Events',
    path: '/events',
    titleKey: 'seo.events.metaTitle',
    descriptionKey: 'seo.events.metaDescription',
    fallbackTitle: 'Weekly Amazigh Music Event Taghazout — Every Saturday in the Atlas Mountains',
    fallbackDescription:
      'Weekly Berber Music Event every Saturday at sunset. Traditional Amazigh music, clay-oven barbecue, mint tea, and village celebration. 80 € / person.',
    ogImage: '/packages/weekly.webp',
  },
  {
    id: 'book',
    label: 'Book',
    path: '/book',
    titleKey: 'seo.book.metaTitle',
    descriptionKey: 'seo.book.metaDescription',
    fallbackTitle: 'Book a Cooking Class near Taghazout',
    fallbackDescription:
      'Book online. Pickup from Taghazout Mosque — also serving Tamraght and Agadir. From 65 € (700 MAD).',
    ogImage: '/packages/basic.webp',
  },
  {
    id: 'faq',
    label: 'FAQ & Contact',
    path: '/faq-contact',
    titleKey: 'seo.faq.metaTitle',
    descriptionKey: 'seo.faq.metaDescription',
    fallbackTitle: 'FAQ & Contact — Taghazout Cooking Class',
    fallbackDescription:
      'FAQ about our Taghazout cooking class — booking, prices, pickup, vegetarian options. Contact Rabab via WhatsApp, email, or phone.',
    ogImage: '/hero/desktop/bg.webp',
  },
  {
    id: 'meetChef',
    label: 'Meet the Chef',
    path: '/ourstory/meet-the-chef',
    titleKey: 'seo.meetChef.metaTitle',
    descriptionKey: 'seo.meetChef.metaDescription',
    fallbackTitle: 'Meet Rabab — Taghazout Cooking Class Host & Amazigh Cultural Guide',
    fallbackDescription:
      'Meet Rabab, your Taghazout cooking class host. Born in the Atlas Mountains, Rabab shares Amazigh culinary traditions in a 300-year-old Berber house.',
    ogImage: '/our-story/meet-the-chef/rabab.webp',
  },
  {
    id: 'kitchen',
    label: 'Our Kitchen',
    path: '/ourstory/kitchen',
    titleKey: 'seo.kitchen.metaTitle',
    descriptionKey: 'seo.kitchen.metaDescription',
    fallbackTitle: 'Our Kitchen — Traditional Amazigh Cooking Space in Taghazout',
    fallbackDescription:
      'Discover Rabab’s traditional kitchen and clay oven in a Berber village above Taghazout — where guests cook authentic Moroccan dishes together.',
    ogImage: '/our-story/our-kitchen/main.jpg',
  },
  {
    id: 'location',
    label: 'Location',
    path: '/ourstory/location',
    titleKey: 'seo.location.metaTitle',
    descriptionKey: 'seo.location.metaDescription',
    fallbackTitle: 'Location — Cooking Class near Taghazout, Tamraght & Agadir',
    fallbackDescription:
      'Village kitchen in the Atlas Mountains, ~15 minutes from Taghazout. Pickup from Taghazout Mosque for guests staying in Taghazout, Tamraght, or Agadir.',
    ogImage: '/journey/journey-1.jpeg',
  },
];

export function seoPageById(id: SeoPageId): SeoPageDef {
  return SEO_PAGES.find((page) => page.id === id)!;
}
