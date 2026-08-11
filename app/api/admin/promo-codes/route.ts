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

function parseDiscountType(value: unknown): PromoDiscountType | null {
  return value === 'percent' || value === 'fixed' ? value : null;
}

/** GET /api/admin/promo-codes — list all codes */
export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, promoCodes: (data || []) as PromoCodeRow[] });
}

/** POST /api/admin/promo-codes — create */
export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const code = normalizePromoCode(String(body.code ?? ''));
  const discountType = parseDiscountType(body.discount_type ?? body.discountType);
  const discountValue = Number(body.discount_value ?? body.discountValue);
  const maxUsesRaw = body.max_uses ?? body.maxUses;
  const maxUses =
    maxUsesRaw === null || maxUsesRaw === '' || maxUsesRaw === undefined
      ? null
      : Number(maxUsesRaw);
  const expiresAtRaw = body.expires_at ?? body.expiresAt;
  const expiresAt =
    expiresAtRaw === null || expiresAtRaw === '' || expiresAtRaw === undefined
      ? null
      : String(expiresAtRaw);
  const active = body.active === undefined ? true : Boolean(body.active);

  if (!code) {
    return NextResponse.json({ ok: false, error: 'Code is required' }, { status: 400 });
  }
  if (!discountType) {
    return NextResponse.json({ ok: false, error: 'discount_type must be percent or fixed' }, { status: 400 });
  }
  if (!Number.isFinite(discountValue) || discountValue <= 0) {
    return NextResponse.json({ ok: false, error: 'discount_value must be greater than 0' }, { status: 400 });
  }
  if (discountType === 'percent' && discountValue > 100) {
    return NextResponse.json({ ok: false, error: 'Percent discount cannot exceed 100' }, { status: 400 });
  }
  if (maxUses != null && (!Number.isFinite(maxUses) || maxUses <= 0)) {
    return NextResponse.json({ ok: false, error: 'max_uses must be a positive integer or empty' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('promo_codes')
    .insert({
      code,
      discount_type: discountType,
      discount_value: discountValue,
      max_uses: maxUses,
      expires_at: expiresAt,
      active,
    })
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
