import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import {
  applyPromoDiscount,
  normalizePromoCode,
  promoFailureMessage,
  validatePromoRow,
  type PromoCodeRow,
} from '@/lib/promo-codes';

export const runtime = 'nodejs';

/**
 * Public promo validation for the booking form.
 * POST { code, subtotalEur }
 */
export async function POST(request: Request) {
  let body: { code?: string; subtotalEur?: number };
  try {
    body = (await request.json()) as { code?: string; subtotalEur?: number };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const code = normalizePromoCode(body.code || '');
  if (!code) {
    return NextResponse.json(
      { ok: false, error: promoFailureMessage('missing'), reason: 'missing' },
      { status: 400 }
    );
  }

  const subtotalEur = Number(body.subtotalEur);
  if (!Number.isFinite(subtotalEur) || subtotalEur < 0) {
    return NextResponse.json({ ok: false, error: 'Invalid subtotal' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const checked = validatePromoRow(data as PromoCodeRow | null);
  if (!checked.ok) {
    return NextResponse.json(
      { ok: false, error: promoFailureMessage(checked.reason), reason: checked.reason },
      { status: 400 }
    );
  }

  const { total, discountEur } = applyPromoDiscount(
    subtotalEur,
    checked.promo.discount_type,
    Number(checked.promo.discount_value)
  );

  return NextResponse.json({
    ok: true,
    code: checked.promo.code,
    discountType: checked.promo.discount_type,
    discountValue: Number(checked.promo.discount_value),
    discountEur,
    totalEur: total,
  });
}
