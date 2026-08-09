import type { PackagesContent } from '@/lib/types/cms';

/** Fallback package catalog when Supabase is unavailable. */
export const DEFAULT_PACKAGES: PackagesContent = {
  items: [
    {
      id: 'basic',
      name: 'Basic Package',
      tagline: 'Your Journey into the Mountains',
      subtitle: 'Half-Day Authentic Berber Cultural Experience Above Taghazout',
      price: '60',
      currency: 'EUR',
      duration: '4 hours',
      groupSize: '2-13 guests',
      startTime: '13:30',
      image: '/packages/basic.jpg',
      imageAlt:
        'Taghazout cooking class — half-day Berber village experience with tagine and clay oven bread in Atlas Mountains',
      popular: true,
      highlights: [
        'Pick up from Taghazout Mosque at 13:30',
        'Minimum 2 guests required',
        '300-year-old Amazigh house tour',
        'Moroccan mint tea ceremony',
        'Traditional village bread baking',
        'Make Moroccan spread (Amlou)',
      ],
    },
    {
      id: 'weekly-event',
      name: 'Weekly Event',
      tagline: 'The Amazigh Village Music Gala',
      subtitle: 'Join us for our Weekly Berber Music Event At Sunset in a traditional village',
      price: '80',
      currency: 'EUR',
      duration: '4 hours',
      groupSize: '6-13 guests',
      startTime: '15:00',
      image: '/packages/weekly.jpeg',
      imageAlt:
        'Weekly Amazigh music event Taghazout — Berber village sunset celebration and cooking experience Morocco',
      highlights: [
        'Every Thursday at 15:00',
        'Minimum 6 guests required',
        'Pickup from Taghazout Mosque',
        'Mint tea ceremony',
        'Make your barbecue',
        'Traditional Amazigh music & celebration',
      ],
    },
    {
      id: 'private',
      name: 'Private Package',
      tagline: 'Exclusive Mountain Experience',
      subtitle: 'Personalized culinary journey designed exclusively for your group',
      price: '100',
      currency: 'EUR',
      duration: '5 hours',
      groupSize: 'Private group',
      startTime: 'Flexible',
      image: '/packages/private-chef.jpg',
      imageAlt:
        'Private Moroccan cooking class Taghazout — exclusive Berber village culinary experience in Atlas Mountains',
      highlights: [
        'Completely private experience',
        'Flexible scheduling & timing',
        'Customizable menu options',
        'Your choice of location',
        'Personalized cooking instruction',
        'Private family-style feast',
      ],
    },
  ],
};
