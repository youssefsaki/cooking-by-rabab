import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { validateContact } from '@/lib/validations';
import { mirrorContactToSheets } from '@/lib/sheets-mirror';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = validateContact(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
    });

    if (error) {
      console.error('[api/contact] insert error:', error);
      return NextResponse.json({ ok: false, error: 'Failed to save message' }, { status: 500 });
    }

    void mirrorContactToSheets({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/contact] unexpected:', error);
    return NextResponse.json(
      { ok: false, error: 'Server misconfigured. Check Supabase env vars.' },
      { status: 500 }
    );
  }
}
