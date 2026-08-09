import { NextResponse } from 'next/server';
import { getFaqsContent, getPackagesContent, getSiteSettings } from '@/lib/content';
import type { Locale } from '@/lib/types/cms';

function localeFrom(request: Request): Locale {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale');
  if (locale === 'fr' || locale === 'de' || locale === 'en') return locale;
  return 'en';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section') || 'packages';
  const locale = localeFrom(request);

  if (section === 'packages') {
    const data = await getPackagesContent(locale);
    return NextResponse.json({ ok: true, data });
  }
  if (section === 'faqs') {
    const data = await getFaqsContent(locale);
    return NextResponse.json({ ok: true, data });
  }
  if (section === 'settings') {
    const data = await getSiteSettings();
    return NextResponse.json({ ok: true, data });
  }

  return NextResponse.json({ ok: false, error: 'Unknown section' }, { status: 400 });
}
