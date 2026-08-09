import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { validateBooking } from '@/lib/validations';
import { mirrorBookingToSheets } from '@/lib/sheets-mirror';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = validateBooking(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('bookings').insert({
      full_name: data.fullName,
      phone: data.phone,
      country: data.country,
      email: data.email,
      package_type: data.packageType,
      dietary_preference: data.dietaryPreference,
      allergies: data.allergies || '',
      status: 'new',
    });

    if (error) {
      console.error('[api/bookings] insert error:', error);
      return NextResponse.json({ ok: false, error: 'Failed to save booking' }, { status: 500 });
    }

    // Non-blocking Sheets mirror — do not delay the guest response
    void mirrorBookingToSheets({
      fullName: data.fullName,
      phone: data.phone,
      country: data.country,
      email: data.email,
      packageType: data.packageType,
      dietaryPreference: data.dietaryPreference,
      allergies: data.allergies,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/bookings] unexpected:', error);
    return NextResponse.json(
      { ok: false, error: 'Server misconfigured. Check Supabase env vars.' },
      { status: 500 }
    );
  }
}
