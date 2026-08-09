import { NextResponse } from 'next/server';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabaseSession = await createSessionClient();
  if (!supabaseSession) {
    return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabaseSession.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const altText = String(formData.get('altText') || '');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'File is required' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ ok: false, error: 'Only images are allowed' }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: 'Max file size is 5MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createServiceClient();
  const { error: uploadError } = await supabase.storage.from('site-media').upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ ok: false, error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('site-media').getPublicUrl(path);

  const { data: mediaRow, error: mediaError } = await supabase
    .from('media')
    .insert({
      path,
      public_url: publicUrl,
      alt_text: altText,
      filename: file.name,
    })
    .select()
    .single();

  if (mediaError) {
    return NextResponse.json({ ok: false, error: mediaError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, media: mediaRow });
}
