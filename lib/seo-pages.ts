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
};

export const SEO_PAGES: SeoPageDef[] = [
  {
    id: 'home',
    label: 'Homepage',
    path: '/',
    titleKey: 'seo.home.metaTitle',
    descriptionKey: 'seo.home.metaDescription',
    fallbackTitle: 'Taghazout Cooking Class - Authentic Moroccan & Amazigh Cooking Experience',
    fallbackDescription:
      'Book your Taghazout cooking class — half-day Berber village experience with pickup from Taghazout & Agadir. Learn traditional Moroccan dishes of your choice, clay oven bread & tea ceremony in a 300-year-old Berber village home.',
  },
  {
    id: 'packages',
    label: 'Packages',
    path: '/packages',
    titleKey: 'seo.packages.metaTitle',
    descriptionKey: 'seo.packages.metaDescription',
    fallbackTitle: 'Taghazout Cooking Class Packages — Half-Day Berber Experience from €65',
    fallbackDescription:
      'Traditional cooking experience Taghazout — From 65 € (700 MAD), Weekly Event 80 € (850 MAD), Private Workshop 80 € (850 MAD), or At Your Location 100 € (1050 MAD).',
  },
  {
    id: 'experiences',
    label: 'Experiences',
    path: '/experiences',
    titleKey: 'seo.experiences.metaTitle',
    descriptionKey: 'seo.experiences.metaDescription',
    fallbackTitle: 'Moroccan Cooking Masterclass, Clay Oven Bread & Amlou Workshop — Taghazout',
    fallbackDescription:
      'Moroccan cooking experiences in Taghazout: Cooking Masterclass, Clay Oven Bread Making, Amlou Workshop, Amazigh Heritage, and Moroccan Mint Tea Ceremony.',
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
  },
  {
    id: 'book',
    label: 'Book',
    path: '/book',
    titleKey: 'seo.book.metaTitle',
    descriptionKey: 'seo.book.metaDescription',
    fallbackTitle: 'Book Taghazout Cooking Class — Basic, Private & Weekly Event',
    fallbackDescription:
      'Book cooking class near Taghazout online. Pickup from Taghazout Mosque included. From 65 € (700 MAD).',
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
  },
  {
    id: 'location',
    label: 'Location',
    path: '/ourstory/location',
    titleKey: 'seo.location.metaTitle',
    descriptionKey: 'seo.location.metaDescription',
    fallbackTitle: 'Location — Taghazout Cooking Class in the Atlas Mountains',
    fallbackDescription:
      'Find our Taghazout cooking class in a traditional Amazigh village in the Atlas Mountains, about 15 minutes from the coast with pickup from Taghazout Mosque.',
  },
];

export function seoPageById(id: SeoPageId): SeoPageDef {
  return SEO_PAGES.find((page) => page.id === id)!;
}
