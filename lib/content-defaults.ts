import type { PackagesContent } from '@/lib/types/cms';

/** Fallback package catalog when Supabase is unavailable — matches version-2.1.0. */
export const DEFAULT_PACKAGES: PackagesContent = {
  items: [
    {
      id: 'basic',
      name: 'The authentic mountains culinary escape',
      tagline: 'Your Journey into the Mountains',
      subtitle:
        'Escape the coast for a half-day in the Atlas Mountains. Tour a historic 300-year-old village home, grind fresh Amlou, and cook the traditional dish of your choice.',
      price: '65',
      currency: 'EUR',
      duration: '4 hours',
      groupSize: '3-13 guests',
      startTime: '13:30',
      image: '/packages/basic.webp',
      imageAlt:
        'Taghazout cooking class — half-day Berber village experience with traditional Moroccan dishes and clay oven bread in Atlas Mountains',
      popular: true,
      highlights: [
        'Pick up from Taghazout Mosque',
        'Minimum 3 guests required',
        '300-year-old Amazigh house tour',
        'Your Choice of Dish (see full menu when booking)',
        'Vegetarian & Vegan options available',
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
      duration: '5 hours',
      groupSize: '6-13 guests',
      startTime: '15:00',
      image: '/packages/weekly.webp',
      imageAlt:
        'Weekly Amazigh music event Taghazout — Berber village sunset celebration and cooking experience Morocco',
      highlights: [
        'Every Saturday at 15:00',
        'Minimum 6 guests required',
        'Pickup from Taghazout Mosque',
        'Mint tea ceremony',
        'Make your barbecue',
        'Traditional Amazigh music & celebration',
      ],
    },
    {
      id: 'private',
      name: 'Private Workshop Experience',
      tagline: 'Private at Our Village Workshop',
      subtitle:
        'A private cooking experience just for your group at our traditional village workshop — perfect for couples and small celebrations.',
      price: '80',
      currency: 'EUR',
      duration: 'Flexible',
      groupSize: '2+ guests',
      startTime: 'Flexible',
      image: '/packages/private.webp',
      imageAlt:
        'Private Workshop Experience Taghazout — private Moroccan cooking class at Amazigh village workshop in Atlas Mountains',
      highlights: [
        'Round-trip transport from Taghazout Mosque',
        'Minimum 2 guests required',
        'Moroccan Tea Masterclass',
        'Amlou Making workshop',
        'Cook your chosen traditional dish together',
        'Private family-style feast',
      ],
    },
    {
      id: 'private-at-location',
      name: 'Private at Your Location',
      tagline: 'Rabab Comes to You',
      subtitle:
        'Rabab brings a private Moroccan cooking experience to your villa or riad — ideal for larger groups and celebrations.',
      price: '100',
      currency: 'EUR',
      duration: 'Flexible',
      groupSize: 'Private group',
      startTime: 'Flexible',
      image: '/packages/pv-at-ur-location.webp',
      imageAlt:
        'Private cooking class at your villa — Taghazout / Agadir area Moroccan chef experience',
      highlights: [
        'Rabab comes to your villa / riad',
        'Customizable menu for your group',
        'Ideal for celebrations & larger groups',
        'Flexible scheduling',
        'Ingredients & equipment arranged',
        'Private feast at your place',
      ],
    },
  ],
};
