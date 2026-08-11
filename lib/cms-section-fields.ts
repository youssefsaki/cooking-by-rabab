import type { CmsField, SiteCopyBag } from '@/lib/cms-fields';

type AnyT = Record<string, any>;

/** Extra editable text fields beyond hero/packages/faq (seeded from translations). */
export function buildSectionTextFields(): CmsField[] {
  const fields: CmsField[] = [
    // Welcome / hero intro
    { id: 'heroIntro.badge', label: 'Badge', group: 'Homepage welcome', type: 'text' },
    { id: 'heroIntro.title', label: 'Title', group: 'Homepage welcome', type: 'text' },
    { id: 'heroIntro.description', label: 'Description', group: 'Homepage welcome', type: 'textarea' },
    { id: 'heroIntro.cta', label: 'Button text', group: 'Homepage welcome', type: 'text' },
    { id: 'heroIntro.includedTitle', label: 'Whats included title', group: 'Homepage welcome', type: 'text' },
    ...[0, 1, 2, 3].flatMap((i) => [
      { id: `heroIntro.included.${i}.title`, label: `Included ${i + 1} — title`, group: 'Homepage welcome', type: 'text' as const },
      { id: `heroIntro.included.${i}.description`, label: `Included ${i + 1} — description`, group: 'Homepage welcome', type: 'textarea' as const },
    ]),

    // Cook like a local
    { id: 'heroSection.ratedBy', label: 'Rating line', group: 'Homepage cook like a local', type: 'text' },
    { id: 'heroSection.learnToCookPart1', label: 'Title part 1', group: 'Homepage cook like a local', type: 'text' },
    { id: 'heroSection.learnToCookPart2', label: 'Title part 2', group: 'Homepage cook like a local', type: 'text' },
    { id: 'heroSection.description', label: 'Description', group: 'Homepage cook like a local', type: 'textarea' },
    { id: 'heroSection.bookClass', label: 'Primary button', group: 'Homepage cook like a local', type: 'text' },
    { id: 'heroSection.bookNow', label: 'Book now button', group: 'Homepage cook like a local', type: 'text' },
    { id: 'heroSection.experienceIncludes', label: 'Experience includes label', group: 'Homepage cook like a local', type: 'text' },
    ...[0, 1, 2, 3].map((i) => ({
      id: `heroSection.include.${i}`,
      label: `Includes chip ${i + 1}`,
      group: 'Homepage cook like a local',
      type: 'text' as const,
    })),

    // The experience journey
    { id: 'experience.title', label: 'Section badge', group: 'Homepage experience', type: 'text' },
    { id: 'experience.subtitle', label: 'Section title', group: 'Homepage experience', type: 'text' },
    { id: 'experience.description', label: 'Section description', group: 'Homepage experience', type: 'textarea' },
    ...[1, 2, 3, 4].flatMap((n) => [
      { id: `experience.step.${n}.title`, label: `Step ${n} title`, group: 'Homepage experience', type: 'text' as const },
      { id: `experience.step.${n}.subtitle`, label: `Step ${n} subtitle`, group: 'Homepage experience', type: 'text' as const },
      { id: `experience.step.${n}.description`, label: `Step ${n} description`, group: 'Homepage experience', type: 'textarea' as const },
      ...[0, 1, 2, 3].map((i) => ({
        id: `experience.step.${n}.highlight.${i}`,
        label: `Step ${n} bullet ${i + 1}`,
        group: 'Homepage experience',
        type: 'text' as const,
      })),
    ]),
    { id: 'experience.finalTitle', label: 'Bottom CTA title', group: 'Homepage experience', type: 'text' },
    { id: 'experience.finalDescription', label: 'Bottom CTA description', group: 'Homepage experience', type: 'textarea' },
    { id: 'experience.bookExperience', label: 'Book button', group: 'Homepage experience', type: 'text' },
    { id: 'experience.learnMore', label: 'Learn more button', group: 'Homepage experience', type: 'text' },

    // Community / animals
    { id: 'community.badge', label: 'Badge', group: 'Homepage community', type: 'text' },
    { id: 'community.title', label: 'Title', group: 'Homepage community', type: 'text' },
    { id: 'community.description', label: 'Description', group: 'Homepage community', type: 'textarea' },
    { id: 'community.quote', label: 'Quote', group: 'Homepage community', type: 'textarea' },
    { id: 'community.bookGiveBack', label: 'CTA button', group: 'Homepage community', type: 'text' },
    { id: 'community.meetCats', label: 'Meet cats button', group: 'Homepage community', type: 'text' },
    { id: 'community.meetChickens', label: 'Meet chickens button', group: 'Homepage community', type: 'text' },
    { id: 'community.cats.badge', label: 'Cats badge', group: 'Homepage community', type: 'text' },
    { id: 'community.cats.title', label: 'Cats title', group: 'Homepage community', type: 'text' },
    { id: 'community.cats.description', label: 'Cats description', group: 'Homepage community', type: 'textarea' },
    { id: 'community.chickens.badge', label: 'Chickens badge', group: 'Homepage community', type: 'text' },
    { id: 'community.chickens.title', label: 'Chickens title', group: 'Homepage community', type: 'text' },
    { id: 'community.chickens.description', label: 'Chickens description', group: 'Homepage community', type: 'textarea' },
    ...[0, 1, 2].map((i) => ({
      id: `community.impact.${i}`,
      label: `Impact item ${i + 1}`,
      group: 'Homepage community',
      type: 'text' as const,
    })),

    // Things to do
    { id: 'thingsToDo.badge', label: 'Badge', group: 'Homepage things to do', type: 'text' },
    { id: 'thingsToDo.title', label: 'Title', group: 'Homepage things to do', type: 'text' },
    { id: 'thingsToDo.description', label: 'Description', group: 'Homepage things to do', type: 'textarea' },
    ...[0, 1, 2, 3, 4, 5].flatMap((i) => [
      { id: `thingsToDo.activity.${i}.title`, label: `Activity ${i + 1} title`, group: 'Homepage things to do', type: 'text' as const },
      { id: `thingsToDo.activity.${i}.description`, label: `Activity ${i + 1} description`, group: 'Homepage things to do', type: 'textarea' as const },
    ]),
    { id: 'thingsToDo.bookCookingClass', label: 'Primary CTA', group: 'Homepage things to do', type: 'text' },
    { id: 'thingsToDo.viewAllExperiences', label: 'Secondary CTA', group: 'Homepage things to do', type: 'text' },

    // Location (homepage)
    { id: 'location.badge', label: 'Badge', group: 'Homepage location', type: 'text' },
    { id: 'location.titlePart1', label: 'Title part 1', group: 'Homepage location', type: 'text' },
    { id: 'location.titlePart2', label: 'Title part 2', group: 'Homepage location', type: 'text' },
    { id: 'location.description', label: 'Description', group: 'Homepage location', type: 'textarea' },
    { id: 'location.journeyTitle', label: 'Journey title', group: 'Homepage location', type: 'text' },
    ...[1, 2, 3, 4].flatMap((n) => [
      { id: `location.step.${n}.title`, label: `Step ${n} title`, group: 'Homepage location', type: 'text' as const },
      { id: `location.step.${n}.description`, label: `Step ${n} description`, group: 'Homepage location', type: 'textarea' as const },
      { id: `location.step.${n}.time`, label: `Step ${n} time`, group: 'Homepage location', type: 'text' as const },
    ]),

    // Experiences page
    { id: 'experiencesPage.title', label: 'Page title', group: 'Experiences page', type: 'text' },
    { id: 'experiencesPage.titleHighlight', label: 'Title highlight', group: 'Experiences page', type: 'text' },
    { id: 'experiencesPage.description', label: 'Intro description', group: 'Experiences page', type: 'textarea' },
    { id: 'experiencesPage.ctaTitle', label: 'Bottom CTA title', group: 'Experiences page', type: 'text' },
    { id: 'experiencesPage.ctaTitleHighlight', label: 'Bottom CTA highlight', group: 'Experiences page', type: 'text' },
    { id: 'experiencesPage.ctaDescription', label: 'Bottom CTA description', group: 'Experiences page', type: 'textarea' },
    { id: 'experiencesPage.bookNow', label: 'Book now button', group: 'Experiences page', type: 'text' },
    { id: 'experiencesPage.viewPackages', label: 'View packages button', group: 'Experiences page', type: 'text' },
    ...[
      'cooking-masterclass',
      'amazigh-heritage',
      'tea-ceremony',
      'clay-oven-bread',
      'amlou-workshop',
    ].flatMap((id) => [
      { id: `expCard.${id}.title`, label: `${id} title`, group: 'Experiences page', type: 'text' as const },
      { id: `expCard.${id}.subtitle`, label: `${id} subtitle`, group: 'Experiences page', type: 'text' as const },
      { id: `expCard.${id}.description`, label: `${id} short description`, group: 'Experiences page', type: 'textarea' as const },
      { id: `expCard.${id}.longDescription`, label: `${id} long description`, group: 'Experiences page', type: 'textarea' as const },
      ...[0, 1, 2, 3, 4].map((i) => ({
        id: `expCard.${id}.highlight.${i}`,
        label: `${id} highlight ${i + 1}`,
        group: 'Experiences page',
        type: 'text' as const,
      })),
    ]),

    // Events page
    { id: 'events.badge', label: 'Badge', group: 'Events page', type: 'text' },
    { id: 'events.title1', label: 'Title line 1', group: 'Events page', type: 'text' },
    { id: 'events.title2', label: 'Title line 2', group: 'Events page', type: 'text' },
    { id: 'events.title3', label: 'Title line 3', group: 'Events page', type: 'text' },
    { id: 'events.description', label: 'Description', group: 'Events page', type: 'textarea' },
    { id: 'events.price', label: 'Price label', group: 'Events page', type: 'text' },
    { id: 'events.bookNow', label: 'Book button', group: 'Events page', type: 'text' },
    ...[0, 1, 2, 3, 4, 5].map((i) => ({
      id: `events.highlight.${i}`,
      label: `Highlight ${i + 1}`,
      group: 'Events page',
      type: 'text' as const,
    })),

    // Packages page chrome
    { id: 'packagesPage.badge', label: 'Badge', group: 'Packages page', type: 'text' },
    { id: 'packagesPage.title', label: 'Title', group: 'Packages page', type: 'text' },
    { id: 'packagesPage.titleHighlight', label: 'Title highlight', group: 'Packages page', type: 'text' },
    { id: 'packagesPage.description', label: 'Description', group: 'Packages page', type: 'textarea' },

    // Meet the chef
    { id: 'meetChef.badge', label: 'Badge', group: 'Meet the Chef page', type: 'text' },
    { id: 'meetChef.title', label: 'Title', group: 'Meet the Chef page', type: 'text' },
    { id: 'meetChef.titleHighlight', label: 'Title highlight', group: 'Meet the Chef page', type: 'text' },
    { id: 'meetChef.hello', label: 'Hello heading', group: 'Meet the Chef page', type: 'text' },
    ...[1, 2, 3, 4, 5].map((n) => ({
      id: `meetChef.paragraph.${n}`,
      label: `Paragraph ${n}`,
      group: 'Meet the Chef page',
      type: 'textarea' as const,
    })),

    // Kitchen
    { id: 'kitchen.heroTitle', label: 'Hero title', group: 'Our Kitchen page', type: 'text' },
    { id: 'kitchen.heroSubtitle', label: 'Hero subtitle', group: 'Our Kitchen page', type: 'textarea' },
    { id: 'kitchen.badge', label: 'Intro badge', group: 'Our Kitchen page', type: 'text' },
    { id: 'kitchen.introTitle', label: 'Intro title', group: 'Our Kitchen page', type: 'text' },
    { id: 'kitchen.introTitleHighlight', label: 'Intro title highlight', group: 'Our Kitchen page', type: 'text' },
    { id: 'kitchen.introP1', label: 'Intro paragraph 1', group: 'Our Kitchen page', type: 'textarea' },
    { id: 'kitchen.introP2', label: 'Intro paragraph 2', group: 'Our Kitchen page', type: 'textarea' },
    { id: 'kitchen.featuresTitle', label: 'Features title', group: 'Our Kitchen page', type: 'text' },
    { id: 'kitchen.featuresSubtitle', label: 'Features subtitle', group: 'Our Kitchen page', type: 'textarea' },
    { id: 'kitchen.galleryTitle', label: 'Gallery title', group: 'Our Kitchen page', type: 'text' },

    // Location page
    { id: 'locationPage.heroTitle', label: 'Hero title', group: 'Location page', type: 'text' },
    { id: 'locationPage.heroSubtitle', label: 'Hero subtitle', group: 'Location page', type: 'textarea' },

    // SEO meta (also editable on /admin/seo)
    { id: 'seo.home.metaTitle', label: 'Meta title', group: 'SEO: Homepage', type: 'text' },
    { id: 'seo.home.metaDescription', label: 'Meta description', group: 'SEO: Homepage', type: 'textarea' },
    { id: 'seo.packages.metaTitle', label: 'Meta title', group: 'SEO: Packages', type: 'text' },
    { id: 'seo.packages.metaDescription', label: 'Meta description', group: 'SEO: Packages', type: 'textarea' },
    { id: 'seo.experiences.metaTitle', label: 'Meta title', group: 'SEO: Experiences', type: 'text' },
    { id: 'seo.experiences.metaDescription', label: 'Meta description', group: 'SEO: Experiences', type: 'textarea' },
    { id: 'seo.events.metaTitle', label: 'Meta title', group: 'SEO: Events', type: 'text' },
    { id: 'seo.events.metaDescription', label: 'Meta description', group: 'SEO: Events', type: 'textarea' },
    { id: 'seo.book.metaTitle', label: 'Meta title', group: 'SEO: Book', type: 'text' },
    { id: 'seo.book.metaDescription', label: 'Meta description', group: 'SEO: Book', type: 'textarea' },
    { id: 'seo.faq.metaTitle', label: 'Meta title', group: 'SEO: FAQ & Contact', type: 'text' },
    { id: 'seo.faq.metaDescription', label: 'Meta description', group: 'SEO: FAQ & Contact', type: 'textarea' },
    { id: 'seo.meetChef.metaTitle', label: 'Meta title', group: 'SEO: Meet the Chef', type: 'text' },
    { id: 'seo.meetChef.metaDescription', label: 'Meta description', group: 'SEO: Meet the Chef', type: 'textarea' },
    { id: 'seo.kitchen.metaTitle', label: 'Meta title', group: 'SEO: Our Kitchen', type: 'text' },
    { id: 'seo.kitchen.metaDescription', label: 'Meta description', group: 'SEO: Our Kitchen', type: 'textarea' },
    { id: 'seo.location.metaTitle', label: 'Meta title', group: 'SEO: Location', type: 'text' },
    { id: 'seo.location.metaDescription', label: 'Meta description', group: 'SEO: Location', type: 'textarea' },
  ];

  return fields;
}

export function seedSectionCopy(t: AnyT): SiteCopyBag {
  const bag: SiteCopyBag = {};

  const intro = t.heroIntro;
  if (intro) {
    bag['heroIntro.badge'] = intro.badge;
    bag['heroIntro.title'] = intro.title;
    bag['heroIntro.cta'] = intro.cta;
    bag['heroIntro.includedTitle'] = intro.includedTitle;
    bag['heroIntro.description'] =
      Array.isArray(intro.descriptionSegments)
        ? intro.descriptionSegments.map((s: { value: string }) => s.value).join('')
        : intro.description || '';
    (intro.included || []).forEach((item: { title: string; description: string }, i: number) => {
      bag[`heroIntro.included.${i}.title`] = item.title;
      bag[`heroIntro.included.${i}.description`] = item.description;
    });
  }

  const hs = t.heroSection;
  if (hs) {
    bag['heroSection.ratedBy'] = hs.ratedBy;
    bag['heroSection.learnToCookPart1'] = hs.learnToCookPart1;
    bag['heroSection.learnToCookPart2'] = hs.learnToCookPart2;
    bag['heroSection.description'] = hs.description;
    bag['heroSection.bookClass'] = hs.bookClass;
    bag['heroSection.bookNow'] = hs.bookNow;
    bag['heroSection.experienceIncludes'] = hs.experienceIncludes;
    const includeDefaults = [
      t.experiences?.bread?.title,
      t.experiences?.tajine?.title,
      t.experiences?.amlou?.title,
      t.experiences?.tea?.title,
    ];
    includeDefaults.forEach((label: string | undefined, i: number) => {
      if (label) bag[`heroSection.include.${i}`] = label;
    });
  }

  const exp = t.experience;
  if (exp) {
    bag['experience.title'] = exp.title;
    bag['experience.subtitle'] = exp.subtitle;
    bag['experience.description'] = exp.description;
    bag['experience.finalTitle'] = exp.finalTitle;
    bag['experience.finalDescription'] = exp.finalDescription;
    bag['experience.bookExperience'] = exp.bookExperience;
    bag['experience.learnMore'] = exp.learnMore;
    ([1, 2, 3, 4] as const).forEach((n) => {
      const step = exp[`step${n}`];
      if (!step) return;
      bag[`experience.step.${n}.title`] = step.title;
      bag[`experience.step.${n}.subtitle`] = step.subtitle;
      bag[`experience.step.${n}.description`] = step.description;
      (step.highlights || []).forEach((h: string, i: number) => {
        bag[`experience.step.${n}.highlight.${i}`] = h;
      });
    });
  }

  const community = t.community;
  if (community) {
    bag['community.badge'] = community.badge;
    bag['community.title'] = community.title;
    bag['community.description'] = community.description;
    bag['community.quote'] = community.quote;
    bag['community.bookGiveBack'] = community.bookGiveBack;
    bag['community.meetCats'] = community.meetCats;
    bag['community.meetChickens'] = community.meetChickens;
    bag['community.cats.badge'] = community.cats?.badge;
    bag['community.cats.title'] = community.cats?.title;
    bag['community.cats.description'] = community.cats?.description;
    bag['community.chickens.badge'] = community.chickens?.badge;
    bag['community.chickens.title'] = community.chickens?.title;
    bag['community.chickens.description'] = community.chickens?.description;
    (community.impactItems || []).forEach((item: string, i: number) => {
      bag[`community.impact.${i}`] = item;
    });
  }

  const ttd = t.thingsToDo;
  if (ttd) {
    bag['thingsToDo.badge'] = ttd.badge;
    bag['thingsToDo.title'] = ttd.title;
    bag['thingsToDo.description'] = ttd.description;
    bag['thingsToDo.bookCookingClass'] = ttd.bookCookingClass || ttd.ctaPrimary || 'Book a cooking class';
    bag['thingsToDo.viewAllExperiences'] = ttd.viewAllExperiences || ttd.ctaSecondary || 'View all experiences';
    (ttd.activities || []).forEach(
      (activity: { title: string; description: string }, i: number) => {
        bag[`thingsToDo.activity.${i}.title`] = activity.title;
        bag[`thingsToDo.activity.${i}.description`] = activity.description;
      }
    );
  }

  const loc = t.location;
  if (loc) {
    bag['location.badge'] = loc.badge;
    bag['location.titlePart1'] = loc.titlePart1;
    bag['location.titlePart2'] = loc.titlePart2;
    bag['location.description'] = loc.description;
    bag['location.journeyTitle'] = loc.journeyTitle;
    ([1, 2, 3, 4] as const).forEach((n) => {
      const step = loc[`step${n}`];
      if (!step) return;
      bag[`location.step.${n}.title`] = step.title;
      bag[`location.step.${n}.description`] = step.description;
      bag[`location.step.${n}.time`] = step.time;
    });
  }

  const experiences = t.experiences;
  if (experiences) {
    bag['experiencesPage.title'] = experiences.title;
    bag['experiencesPage.titleHighlight'] = experiences.titleHighlight;
    bag['experiencesPage.description'] = experiences.description;
    bag['experiencesPage.ctaTitle'] = experiences.ctaTitle;
    bag['experiencesPage.ctaTitleHighlight'] = experiences.ctaTitleHighlight;
    bag['experiencesPage.ctaDescription'] = experiences.ctaDescription;
    bag['experiencesPage.bookNow'] = experiences.bookExperience || 'Book Now';
    bag['experiencesPage.viewPackages'] = experiences.viewPackages;

    const expCardMap: Record<string, string> = {
      'cooking-masterclass': 'tajine',
      'amazigh-heritage': 'amazigh',
      'tea-ceremony': 'tea',
      'clay-oven-bread': 'bread',
      'amlou-workshop': 'amlou',
    };
    for (const [cardId, key] of Object.entries(expCardMap)) {
      const src = experiences[key];
      if (!src) continue;
      bag[`expCard.${cardId}.title`] = src.title;
      bag[`expCard.${cardId}.subtitle`] = src.subtitle;
      bag[`expCard.${cardId}.description`] = src.description;
      bag[`expCard.${cardId}.longDescription`] = src.longDescription;
      (src.highlights || []).forEach((h: string, i: number) => {
        bag[`expCard.${cardId}.highlight.${i}`] = h;
      });
    }
  }

  const events = t.events;
  if (events) {
    bag['events.badge'] = events.badge;
    bag['events.title1'] = events.title1;
    bag['events.title2'] = events.title2;
    bag['events.title3'] = events.title3;
    bag['events.description'] = events.description;
    bag['events.price'] = events.price;
    bag['events.bookNow'] = events.bookNow;
    (events.highlights || []).forEach((h: string, i: number) => {
      bag[`events.highlight.${i}`] = h;
    });
  }

  const packagesPage = t.packagesPage;
  if (packagesPage) {
    bag['packagesPage.badge'] = packagesPage.badge;
    bag['packagesPage.title'] = packagesPage.title;
    bag['packagesPage.titleHighlight'] = packagesPage.titleHighlight;
    bag['packagesPage.description'] = packagesPage.description;
  }

  const meet = t.ourStory?.meetTheChef;
  if (meet) {
    bag['meetChef.badge'] = meet.badge;
    bag['meetChef.title'] = meet.title;
    bag['meetChef.titleHighlight'] = meet.titleHighlight;
    bag['meetChef.hello'] = meet.hello || "Hello, I'm Rabab";
    bag['meetChef.paragraph.1'] = meet.paragraph1;
    bag['meetChef.paragraph.2'] = meet.paragraph2;
    bag['meetChef.paragraph.3'] = meet.paragraph3;
    bag['meetChef.paragraph.4'] = meet.paragraph4;
    bag['meetChef.paragraph.5'] = meet.paragraph5;
  }

  const kitchen = t.ourStory?.kitchen;
  if (kitchen) {
    bag['kitchen.heroTitle'] = kitchen.heroTitle;
    bag['kitchen.heroSubtitle'] = kitchen.heroSubtitle;
    bag['kitchen.badge'] = kitchen.badge;
    bag['kitchen.introTitle'] = kitchen.introTitle;
    bag['kitchen.introTitleHighlight'] = kitchen.introTitleHighlight;
    bag['kitchen.introP1'] = kitchen.introP1;
    bag['kitchen.introP2'] = kitchen.introP2;
    bag['kitchen.featuresTitle'] = kitchen.featuresTitle;
    bag['kitchen.featuresSubtitle'] = kitchen.featuresSubtitle;
    bag['kitchen.galleryTitle'] = kitchen.galleryTitle;
  }

  const locationPage = t.ourStory?.location;
  if (locationPage) {
    bag['locationPage.heroTitle'] = locationPage.heroTitle || locationPage.title;
    bag['locationPage.heroSubtitle'] = locationPage.heroSubtitle || locationPage.subtitle;
  }

  // Drop undefined values
  for (const key of Object.keys(bag)) {
    if (bag[key] == null) delete bag[key];
  }

  return bag;
}
