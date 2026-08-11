import { NextResponse } from 'next/server';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';
import {
  normalizePromoCode,
  type PromoDiscountType,
  type PromoCodeRow,
} from '@/lib/promo-codes';

async function requireAdmin() {
  const supabase = await createSessionClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

type RouteContext = { params: { id: string } };

/** PATCH /api/admin/promo-codes/:id — update / toggle */
export async function PATCH(request: Request, context: RouteContext) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const id = context.params.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};

  if (body.code !== undefined) {
    const code = normalizePromoCode(String(body.code));
    if (!code) {
      return NextResponse.json({ ok: false, error: 'Code cannot be empty' }, { status: 400 });
    }
    patch.code = code;
  }

  if (body.discount_type !== undefined || body.discountType !== undefined) {
    const discountType = (body.discount_type ?? body.discountType) as PromoDiscountType;
    if (discountType !== 'percent' && discountType !== 'fixed') {
      return NextResponse.json({ ok: false, error: 'discount_type must be percent or fixed' }, { status: 400 });
    }
    patch.discount_type = discountType;
  }

  if (body.discount_value !== undefined || body.discountValue !== undefined) {
    const discountValue = Number(body.discount_value ?? body.discountValue);
    if (!Number.isFinite(discountValue) || discountValue <= 0) {
      return NextResponse.json({ ok: false, error: 'discount_value must be greater than 0' }, { status: 400 });
    }
    patch.discount_value = discountValue;
  }

  if (body.max_uses !== undefined || body.maxUses !== undefined) {
    const maxUsesRaw = body.max_uses ?? body.maxUses;
    patch.max_uses =
      maxUsesRaw === null || maxUsesRaw === '' ? null : Number(maxUsesRaw);
    if (patch.max_uses != null && (!Number.isFinite(patch.max_uses as number) || (patch.max_uses as number) <= 0)) {
      return NextResponse.json({ ok: false, error: 'max_uses must be a positive integer or empty' }, { status: 400 });
    }
  }

  if (body.expires_at !== undefined || body.expiresAt !== undefined) {
    const expiresAtRaw = body.expires_at ?? body.expiresAt;
    patch.expires_at =
      expiresAtRaw === null || expiresAtRaw === '' ? null : String(expiresAtRaw);
  }

  if (body.active !== undefined) {
    patch.active = Boolean(body.active);
  }

  if (!Object.keys(patch).length) {
    return NextResponse.json({ ok: false, error: 'No fields to update' }, { status: 400 });
  }

  if (patch.discount_type === 'percent' || patch.discount_value != null) {
    // Soft check when both known on this patch; DB constraint still enforces
    const percent = patch.discount_type === 'percent';
    const value = Number(patch.discount_value);
    if (percent && Number.isFinite(value) && value > 100) {
      return NextResponse.json({ ok: false, error: 'Percent discount cannot exceed 100' }, { status: 400 });
    }
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('promo_codes')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    const message = error.message.includes('duplicate') || error.code === '23505'
      ? 'A promo code with that name already exists'
      : error.message;
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, promoCode: data as PromoCodeRow });
}
