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
      groupSize: '2-13 guests',
      startTime: '14:30',
      image: '/packages/basic.webp',
      imageAlt:
        'Taghazout cooking class — half-day Berber village experience with traditional Moroccan dishes and clay oven bread in Atlas Mountains',
      popular: true,
      highlights: [
        'Pick up from Taghazout Mosque',
        'Minimum 2 guests required',
        '300-year-old Amazigh house tour',
        'Your Choice of Dish (see full menu when booking)',
        'Vegetarian & Vegan options available',
        'Make Moroccan spread (Amlou)',
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
