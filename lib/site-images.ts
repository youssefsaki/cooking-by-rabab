/** Stable CMS keys for every replaceable site photo (defaults = version-2.1.0 assets). */
export const SITE_IMAGE_DEFAULTS: Record<string, string> = {
  'hero.bg.desktop': '/hero/desktop/bg.webp',
  'hero.bg.mobile': '/hero/mobile/bg.webp',
  'heroSection.image.0': '/hero/desktop/learn-to-cook-amazigh/1.webp',
  'heroSection.image.1': '/hero/desktop/learn-to-cook-amazigh/2.webp',
  'heroSection.image.2': '/hero/desktop/learn-to-cook-amazigh/3.webp',
  'heroSection.image.3': '/hero/desktop/learn-to-cook-amazigh/4.webp',
  'heroSection.image.4': '/hero/desktop/learn-to-cook-amazigh/5.webp',
  'heroSection.image.5': '/hero/desktop/learn-to-cook-amazigh/6.webp',
  'heroSection.image.6': '/hero/desktop/learn-to-cook-amazigh/7.webp',
  'heroSection.mobile.0': '/hero/desktop/learn-to-cook-amazigh/mobile/1.webp',
  'heroSection.mobile.1': '/hero/desktop/learn-to-cook-amazigh/mobile/2.webp',
  'heroSection.mobile.2': '/hero/desktop/learn-to-cook-amazigh/mobile/3.webp',
  'heroSection.mobile.3': '/hero/desktop/learn-to-cook-amazigh/mobile/4.webp',
  'heroSection.mobile.4': '/hero/desktop/learn-to-cook-amazigh/mobile/5.webp',
  'heroSection.mobile.5': '/hero/desktop/learn-to-cook-amazigh/mobile/6.webp',
  'heroSection.mobile.6': '/hero/desktop/learn-to-cook-amazigh/mobile/7.webp',
  'experience.step.1.image': '/journey/journey-1.jpeg',
  'experience.step.2.image': '/journey/journey-2.jpg',
  'experience.step.3.image': '/journey/journey-3.webp',
  'experience.step.4.image': '/journey/journey-4.webp',
  'community.hero.image': '/community/pet-support.webp',
  'community.cats.image': '/community/cat.webp',
  'community.chickens.image': '/community/chicken.webp',
  'thingsToDo.activity.0.image': '/packages/basic.webp',
  'thingsToDo.activity.1.image': '/experiences/tajine.jpg',
  'thingsToDo.activity.2.image': '/experiences/oven-bread.jpg',
  'thingsToDo.activity.3.image': '/packages/weekly.webp',
  'thingsToDo.activity.4.image': '/journey/journey-1.jpeg',
  'thingsToDo.activity.5.image': '/our-story/meet-the-chef/rabab.webp',
  'experiences.cooking-masterclass.image': '/experiences/tajine.jpg',
  'experiences.amazigh-heritage.image': '/experiences/amazigh.jpg',
  'experiences.tea-ceremony.image': '/experiences/tea.jpg',
  'experiences.clay-oven-bread.image': '/experiences/oven-bread.jpg',
  'experiences.amlou-workshop.image': '/experiences/amlou-workshop.jpg',
  'events.hero.image': '/packages/weekly.webp',
  'kitchen.main': '/our-story/our-kitchen/main.jpg',
  'kitchen.gallery.0': '/our-story/our-kitchen/wood-fire-oven.jpg',
  'kitchen.gallery.1': '/our-story/our-kitchen/traditional-tagines.jpg',
  'kitchen.gallery.2': '/our-story/our-kitchen/kitchen-workspace.jpg',
  'kitchen.gallery.3': '/our-story/our-kitchen/spices.jpg',
  'kitchen.gallery.4': '/our-story/our-kitchen/bread-making-station.jpg',
  'kitchen.gallery.5': '/our-story/our-kitchen/kitchen-overview.jpg',
  'meetChef.image': '/our-story/meet-the-chef/rabab.webp',
  'brand.logo': '/rabab-logo.png',
};

export type SiteImageField = {
  id: string;
  label: string;
  group: string;
  type: 'image';
  hint?: string;
};

export const SITE_IMAGE_FIELDS: SiteImageField[] = [
  {
    id: 'hero.bg.desktop',
    label: 'Hero background (desktop)',
    group: 'Homepage hero',
    type: 'image',
  },
  {
    id: 'hero.bg.mobile',
    label: 'Hero background (mobile)',
    group: 'Homepage hero',
    type: 'image',
  },
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({
    id: `heroSection.image.${i}`,
    label: `Cook like a local — desktop ${i + 1}`,
    group: 'Homepage gallery',
    type: 'image' as const,
  })),
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({
    id: `heroSection.mobile.${i}`,
    label: `Cook like a local — mobile ${i + 1}`,
    group: 'Homepage gallery',
    type: 'image' as const,
  })),
  ...[1, 2, 3, 4].map((i) => ({
    id: `experience.step.${i}.image`,
    label: `The Experience — step ${i}`,
    group: 'Homepage experience',
    type: 'image' as const,
  })),
  {
    id: 'community.hero.image',
    label: 'Village animals — hero photo',
    group: 'Homepage community',
    type: 'image',
  },
  {
    id: 'community.cats.image',
    label: 'Village cats photo',
    group: 'Homepage community',
    type: 'image',
  },
  {
    id: 'community.chickens.image',
    label: 'Village chickens photo',
    group: 'Homepage community',
    type: 'image',
  },
  ...[0, 1, 2, 3, 4, 5].map((i) => ({
    id: `thingsToDo.activity.${i}.image`,
    label: `Things to do — card ${i + 1}`,
    group: 'Homepage things to do',
    type: 'image' as const,
  })),
  {
    id: 'experiences.cooking-masterclass.image',
    label: 'Cooking Masterclass',
    group: 'Experiences page',
    type: 'image',
  },
  {
    id: 'experiences.amazigh-heritage.image',
    label: 'Amazigh Heritage',
    group: 'Experiences page',
    type: 'image',
  },
  {
    id: 'experiences.tea-ceremony.image',
    label: 'Tea Ceremony',
    group: 'Experiences page',
    type: 'image',
  },
  {
    id: 'experiences.clay-oven-bread.image',
    label: 'Clay Oven Bread',
    group: 'Experiences page',
    type: 'image',
  },
  {
    id: 'experiences.amlou-workshop.image',
    label: 'Amlou Workshop',
    group: 'Experiences page',
    type: 'image',
  },
  {
    id: 'events.hero.image',
    label: 'Events page hero',
    group: 'Events page',
    type: 'image',
  },
  {
    id: 'kitchen.main',
    label: 'Our Kitchen — main',
    group: 'Our Kitchen page',
    type: 'image',
  },
  ...[0, 1, 2, 3, 4, 5].map((i) => ({
    id: `kitchen.gallery.${i}`,
    label: `Our Kitchen — gallery ${i + 1}`,
    group: 'Our Kitchen page',
    type: 'image' as const,
  })),
  {
    id: 'meetChef.image',
    label: 'Meet the Chef photo',
    group: 'Meet the Chef page',
    type: 'image',
  },
  {
    id: 'brand.logo',
    label: 'Site logo',
    group: 'Brand',
    type: 'image',
  },
];

/** Pages that appear in the public navbar (+ FAQ). */
export type PreviewPage =
  | 'home'
  | 'packages'
  | 'experiences'
  | 'events'
  | 'kitchen'
  | 'meet-chef'
  | 'location'
  | 'faq'
  | 'book';

export const PREVIEW_PAGES: { id: PreviewPage; label: string }[] = [
  { id: 'home', label: 'Homepage' },
  { id: 'packages', label: 'Packages' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'events', label: 'Events' },
  { id: 'meet-chef', label: 'Meet chef' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'location', label: 'Location' },
  { id: 'faq', label: 'FAQ' },
  { id: 'book', label: 'Book' },
];

export function previewPageForField(fieldId: string, group?: string): PreviewPage {
  if (
    fieldId.startsWith('pkg.') ||
    fieldId.startsWith('packagesPage.') ||
    fieldId.startsWith('packages.') ||
    group === 'Packages section' ||
    group === 'Packages page' ||
    group?.startsWith('Package:')
  ) {
    return 'packages';
  }
  if (
    fieldId.startsWith('experiences.') ||
    fieldId.startsWith('experiencesPage.') ||
    group === 'Experiences page'
  ) {
    return 'experiences';
  }
  if (fieldId.startsWith('events.') || group === 'Events page') return 'events';
  if (fieldId.startsWith('kitchen.') || group === 'Our Kitchen page') return 'kitchen';
  if (fieldId.startsWith('meetChef.') || group === 'Meet the Chef page') return 'meet-chef';
  if (
    fieldId.startsWith('locationPage.') ||
    fieldId.startsWith('location.') ||
    group === 'Location page'
  ) {
    return 'location';
  }
  if (fieldId.startsWith('faq.') || group?.startsWith('FAQ:')) return 'faq';
  return 'home';
}

/** Legacy CMS paths that no longer exist on disk. */
const LEGACY_IMAGE_ALIASES: Record<string, string> = {
  '/packages/weekly.jpeg': '/packages/weekly.webp',
  '/packages/weekly.jpg': '/packages/weekly.webp',
  // Wrong CMS upload (woman+child) was saved as the village cats photo
  'https://sgjsxrznjhmaluhsgvks.supabase.co/storage/v1/object/public/site-media/uploads/1786363410520-o1cbwf2yddk.jpg':
    '/community/cat.webp',
};

/** Normalize CMS / stored image URLs (fix aliases, trim). */
export function resolveSiteImage(src: string | null | undefined, fallback = '/packages/basic.webp'): string {
  const raw = (src || '').trim();
  if (!raw) return fallback;
  if (LEGACY_IMAGE_ALIASES[raw]) return LEGACY_IMAGE_ALIASES[raw];
  if (raw.endsWith('/weekly.jpeg') || raw.endsWith('/weekly.jpg')) return '/packages/weekly.webp';
  return raw;
}

export function imageFromBag(
  bag: Record<string, string> | null | undefined,
  key: string,
  fallback?: string
): string {
  const value = bag?.[key]?.trim();
  return resolveSiteImage(value || fallback || SITE_IMAGE_DEFAULTS[key], '/packages/basic.webp');
}
