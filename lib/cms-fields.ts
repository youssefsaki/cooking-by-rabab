import type { Locale, PackageCmsItem, PackagesContent, FaqsContent } from '@/lib/types/cms';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import faqsFallback from '@/data/faqs.json';
import en from '@/lib/translations/en.json';
import fr from '@/lib/translations/fr.json';
import de from '@/lib/translations/de.json';

export type CmsFieldType = 'text' | 'textarea' | 'image';

export type CmsField = {
  id: string;
  label: string;
  group: string;
  type: CmsFieldType;
  hint?: string;
};

/** Flat bag of editable values keyed by field id. */
export type SiteCopyBag = Record<string, string>;

const translations = { en, fr, de } as const;

export function buildCmsFields(packages: PackagesContent, faqs: FaqsContent): CmsField[] {
  const fields: CmsField[] = [
    { id: 'hero.badge', label: 'Homepage — badge above title', group: 'Homepage hero', type: 'text' },
    { id: 'hero.title', label: 'Homepage — main title', group: 'Homepage hero', type: 'text' },
    { id: 'hero.titleHighlight', label: 'Homepage — highlighted title words', group: 'Homepage hero', type: 'text' },
    { id: 'hero.description', label: 'Homepage — description under title', group: 'Homepage hero', type: 'textarea' },
    { id: 'hero.bookButton', label: 'Homepage — book button text', group: 'Homepage hero', type: 'text' },
    { id: 'packages.badge', label: 'Packages section — badge', group: 'Packages section', type: 'text' },
    { id: 'packages.title', label: 'Packages section — title', group: 'Packages section', type: 'text' },
    { id: 'packages.description', label: 'Packages section — description', group: 'Packages section', type: 'textarea' },
  ];

  for (const item of packages.items) {
    const g = `Package: ${item.name || item.id}`;
    fields.push(
      { id: `pkg.${item.id}.name`, label: 'Package name', group: g, type: 'text' },
      { id: `pkg.${item.id}.subtitle`, label: 'Package subtitle', group: g, type: 'textarea' },
      { id: `pkg.${item.id}.price`, label: 'Price number (e.g. 60)', group: g, type: 'text' },
      { id: `pkg.${item.id}.currency`, label: 'Currency (e.g. EUR)', group: g, type: 'text' },
      { id: `pkg.${item.id}.duration`, label: 'Duration', group: g, type: 'text' },
      { id: `pkg.${item.id}.groupSize`, label: 'Group size', group: g, type: 'text' },
      {
        id: `pkg.${item.id}.image`,
        label: 'Package photo',
        group: g,
        type: 'image',
        hint: 'Drag & drop a new photo here, or click to choose a file.',
      },
      { id: `pkg.${item.id}.imageAlt`, label: 'Photo description (for SEO)', group: g, type: 'text' }
    );
    item.highlights.forEach((_, i) => {
      fields.push({
        id: `pkg.${item.id}.highlight.${i}`,
        label: `Bullet point ${i + 1}`,
        group: g,
        type: 'text',
      });
    });
  }

  for (const faq of faqs.faqs) {
    const g = `FAQ: ${faq.id}`;
    fields.push(
      { id: `faq.${faq.id}.question`, label: 'Question', group: g, type: 'textarea' },
      { id: `faq.${faq.id}.answer`, label: 'Answer', group: g, type: 'textarea' }
    );
  }

  return fields;
}

export function defaultSiteCopy(locale: Locale): SiteCopyBag {
  const t = translations[locale] || translations.en;
  const bag: SiteCopyBag = {
    'hero.badge': t.hero.badge,
    'hero.title': t.hero.title,
    'hero.titleHighlight': t.hero.titleHighlight,
    'hero.description': t.hero.description,
    'hero.bookButton': t.hero.bookButton,
    'packages.badge': t.packages.badge,
    'packages.title': t.packages.title,
    'packages.description': t.packages.description,
  };

  for (const item of DEFAULT_PACKAGES.items) {
    bag[`pkg.${item.id}.name`] = item.name;
    bag[`pkg.${item.id}.subtitle`] = item.subtitle;
    bag[`pkg.${item.id}.price`] = item.price;
    bag[`pkg.${item.id}.currency`] = item.currency;
    bag[`pkg.${item.id}.duration`] = item.duration;
    bag[`pkg.${item.id}.groupSize`] = item.groupSize;
    bag[`pkg.${item.id}.image`] = item.image;
    bag[`pkg.${item.id}.imageAlt`] = item.imageAlt;
    item.highlights.forEach((h, i) => {
      bag[`pkg.${item.id}.highlight.${i}`] = h;
    });
  }

  for (const faq of (faqsFallback as FaqsContent).faqs) {
    bag[`faq.${faq.id}.question`] = faq.question;
    bag[`faq.${faq.id}.answer`] = faq.answer;
  }

  return bag;
}

export function packagesFromCopy(bag: SiteCopyBag, fallback: PackagesContent = DEFAULT_PACKAGES): PackagesContent {
  const items: PackageCmsItem[] = fallback.items.map((item) => {
    const highlights = item.highlights.map((h, i) => bag[`pkg.${item.id}.highlight.${i}`] ?? h);
    return {
      ...item,
      name: bag[`pkg.${item.id}.name`] ?? item.name,
      subtitle: bag[`pkg.${item.id}.subtitle`] ?? item.subtitle,
      price: bag[`pkg.${item.id}.price`] ?? item.price,
      currency: bag[`pkg.${item.id}.currency`] ?? item.currency,
      duration: bag[`pkg.${item.id}.duration`] ?? item.duration,
      groupSize: bag[`pkg.${item.id}.groupSize`] ?? item.groupSize,
      image: bag[`pkg.${item.id}.image`] ?? item.image,
      imageAlt: bag[`pkg.${item.id}.imageAlt`] ?? item.imageAlt,
      highlights,
    };
  });
  return {
    badge: bag['packages.badge'],
    title: bag['packages.title'],
    description: bag['packages.description'],
    items,
  };
}

export function faqsFromCopy(bag: SiteCopyBag, fallback: FaqsContent = faqsFallback as FaqsContent): FaqsContent {
  return {
    categories: fallback.categories,
    faqs: fallback.faqs.map((faq) => ({
      ...faq,
      question: bag[`faq.${faq.id}.question`] ?? faq.question,
      answer: bag[`faq.${faq.id}.answer`] ?? faq.answer,
    })),
  };
}

export function mergeCopy(base: SiteCopyBag, overlay: Partial<SiteCopyBag> | null | undefined): SiteCopyBag {
  if (!overlay) return { ...base };
  const next: SiteCopyBag = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (typeof value === 'string') next[key] = value;
  }
  return next;
}
