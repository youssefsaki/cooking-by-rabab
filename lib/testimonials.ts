import type { SiteCopyBag } from '@/lib/cms-fields';

export type TestimonialStatus = 'pending' | 'published';

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  text: string;
  status: TestimonialStatus;
  order: number;
};

const STORAGE_KEY = 'testimonials.items';

export function emptyTestimonial(order = 0): Testimonial {
  return {
    id: `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: '',
    rating: 5,
    text: '',
    status: 'pending',
    order,
  };
}

export function testimonialsFromBag(bag: SiteCopyBag | null | undefined): Testimonial[] {
  const raw = bag?.[STORAGE_KEY];
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, index) => normalizeTestimonial(item, index))
      .filter((item): item is Testimonial => !!item)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

function normalizeTestimonial(value: unknown, index: number): Testimonial | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const id = String(row.id || '').trim();
  if (!id) return null;
  const rating = Math.min(5, Math.max(1, Number(row.rating) || 5));
  const status: TestimonialStatus = row.status === 'published' ? 'published' : 'pending';
  return {
    id,
    name: String(row.name || '').trim(),
    rating,
    text: String(row.text || '').trim(),
    status,
    order: Number.isFinite(Number(row.order)) ? Number(row.order) : index,
  };
}

/** Patch for merge-safe site_copy save — only touches the testimonials key. */
export function testimonialsToBagPatch(items: Testimonial[]): SiteCopyBag {
  const normalized = items.map((item, index) => ({
    ...item,
    rating: Math.min(5, Math.max(1, Number(item.rating) || 5)),
    status: item.status === 'published' ? 'published' : 'pending',
    order: index,
    name: item.name.trim(),
    text: item.text.trim(),
  }));
  return { [STORAGE_KEY]: JSON.stringify(normalized) };
}

export function publishedTestimonials(bag: SiteCopyBag | null | undefined): Testimonial[] {
  return testimonialsFromBag(bag).filter((item) => item.status === 'published' && item.text && item.name);
}

export const TESTIMONIALS_STORAGE_KEY = STORAGE_KEY;
