export type PromoDiscountType = 'percent' | 'fixed';

export type PromoCodeRow = {
  id: string;
  created_at: string;
  code: string;
  discount_type: PromoDiscountType;
  discount_value: number;
  max_uses: number | null;
  uses_count: number;
  expires_at: string | null;
  active: boolean;
};

export function normalizePromoCode(raw: string): string {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
}

export function applyPromoDiscount(
  subtotalEur: number,
  discountType: PromoDiscountType,
  discountValue: number
): { total: number; discountEur: number } {
  const subtotal = Math.max(0, Number(subtotalEur) || 0);
  const value = Math.max(0, Number(discountValue) || 0);
  let discountEur = 0;

  if (discountType === 'percent') {
    discountEur = (subtotal * Math.min(value, 100)) / 100;
  } else {
    discountEur = Math.min(subtotal, value);
  }

  discountEur = Math.round(discountEur * 100) / 100;
  const total = Math.round((subtotal - discountEur) * 100) / 100;
  return { total, discountEur };
}

export type PromoValidationFailure =
  | 'missing'
  | 'not_found'
  | 'inactive'
  | 'expired'
  | 'max_uses';

export function validatePromoRow(
  row: PromoCodeRow | null | undefined,
  now = new Date()
): { ok: true; promo: PromoCodeRow } | { ok: false; reason: PromoValidationFailure } {
  if (!row) return { ok: false, reason: 'not_found' };
  if (!row.active) return { ok: false, reason: 'inactive' };
  if (row.expires_at && new Date(row.expires_at).getTime() < now.getTime()) {
    return { ok: false, reason: 'expired' };
  }
  if (row.max_uses != null && row.uses_count >= row.max_uses) {
    return { ok: false, reason: 'max_uses' };
  }
  return { ok: true, promo: row };
}

export function promoFailureMessage(reason: PromoValidationFailure): string {
  switch (reason) {
    case 'missing':
      return 'Enter a promo code';
    case 'not_found':
      return 'This promo code is not valid';
    case 'inactive':
      return 'This promo code is no longer active';
    case 'expired':
      return 'This promo code has expired';
    case 'max_uses':
      return 'This promo code has reached its usage limit';
    default:
      return 'This promo code is not valid';
  }
}
