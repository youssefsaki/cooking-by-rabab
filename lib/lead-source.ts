/** Lead / campaign attribution helpers for bookings + contact forms. */

export const LEAD_SOURCE_OPTIONS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google' },
  { value: 'referral', label: 'Friend / referral' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'direct', label: 'Direct / other' },
] as const;

export type LeadSourceValue = (typeof LEAD_SOURCE_OPTIONS)[number]['value'];

const ALIASES: Record<string, LeadSourceValue> = {
  ig: 'instagram',
  insta: 'instagram',
  instagram: 'instagram',
  google: 'google',
  gads: 'google',
  'google-ads': 'google',
  referral: 'referral',
  friend: 'referral',
  wordofmouth: 'referral',
  'word-of-mouth': 'referral',
  whatsapp: 'whatsapp',
  wa: 'whatsapp',
  direct: 'direct',
  organic: 'direct',
  website: 'direct',
};

/** Normalize a raw utm/ref/select value into a short channel string (max 64 chars). */
export function normalizeLeadSource(raw: string | null | undefined): string {
  const trimmed = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 64);
  if (!trimmed) return 'direct';
  return ALIASES[trimmed] || trimmed;
}

/**
 * Prefer utm_source, then ref. Empty → null (caller may fall back to manual select / direct).
 */
export function sourceFromQueryParams(params: {
  get(name: string): string | null;
}): string | null {
  const utm = params.get('utm_source');
  const ref = params.get('ref');
  const raw = (utm && utm.trim()) || (ref && ref.trim()) || '';
  if (!raw) return null;
  return normalizeLeadSource(raw);
}

/** Final value stored on the row: manual select → query → direct. */
export function resolveLeadSource(options: {
  querySource?: string | null;
  selectedSource?: string | null;
}): string {
  if (options.selectedSource && options.selectedSource.trim()) {
    return normalizeLeadSource(options.selectedSource);
  }
  if (options.querySource) return normalizeLeadSource(options.querySource);
  return 'direct';
}

export function formatLeadSourceLabel(source: string | null | undefined): string {
  if (!source) return '—';
  const known = LEAD_SOURCE_OPTIONS.find((o) => o.value === source);
  if (known) return known.label;
  return source;
}
