import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createSessionClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const [bookingsRes, contactRes] = await Promise.all([
    supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(100),
  ]);

  return NextResponse.json({
    ok: true,
    bookings: bookingsRes.data || [],
    contactMessages: contactRes.data || [],
    counts: {
      newBookings: (bookingsRes.data || []).filter((b) => b.status === 'new').length,
      newMessages: (contactRes.data || []).filter((m) => m.status === 'new').length,
    },
  });
}

export async function PATCH(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, id, status } = body as { type?: string; id?: string; status?: string };

  if (!type || !id || !status) {
    return NextResponse.json({ ok: false, error: 'Missing type, id, or status' }, { status: 400 });
  }

  const table = type === 'booking' ? 'bookings' : type === 'contact' ? 'contact_messages' : null;
  if (!table) {
    return NextResponse.json({ ok: false, error: 'Invalid type' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from(table).update({ status }).eq('id', id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { section, locale, data, settings } = body as {
    section?: string;
    locale?: string;
    data?: Record<string, unknown>;
    settings?: Record<string, unknown>;
  };

  const supabase = createServiceClient();

  if (settings) {
    const { error } = await supabase.from('site_settings').upsert({
      id: 'default',
      data: settings,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    revalidateTag('content');
    revalidateTag('settings');
    return NextResponse.json({ ok: true });
  }

  if (!section || !locale || !data) {
    return NextResponse.json({ ok: false, error: 'Missing section, locale, or data' }, { status: 400 });
  }

  let payload: Record<string, unknown> = data;
  if (section === 'site_copy') {
    // Never replace the whole bag with a partial object — merge onto defaults + existing.
    const { defaultSiteCopy, mergeCopy } = await import('@/lib/cms-fields');
    const localeKey = locale === 'fr' || locale === 'de' ? locale : 'en';
    const { data: existing } = await supabase
      .from('content_entries')
      .select('data')
      .eq('section', 'site_copy')
      .eq('locale', localeKey)
      .maybeSingle();
    const base = mergeCopy(
      defaultSiteCopy(localeKey),
      (existing?.data as Record<string, string>) || {}
    );
    payload = mergeCopy(base, data as Record<string, string>);
  }

  const { error } = await supabase.from('content_entries').upsert(
    {
      section,
      locale,
      data: payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'section,locale' }
  );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

    revalidateTag('content');
  revalidateTag(section);
  if (section === 'site_copy') {
    revalidateTag('site_copy');
    revalidateTag('packages');
    revalidateTag('faqs');
    revalidateTag('hero');
    revalidateTag('testimonials');
  }
  return NextResponse.json({ ok: true });
}
