-- Cooking by Rabab: bookings, contact, CMS schema
-- Apply in Supabase SQL editor or via migration tooling

-- Bookings
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  package_type TEXT NOT NULL CHECK (package_type IN ('basic', 'weekly-event', 'private')),
  dietary_preference TEXT NOT NULL DEFAULT 'none' CHECK (dietary_preference IN ('none', 'vegetarian', 'vegan')),
  allergies TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings (status);

-- Contact messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON public.contact_messages (status);

-- Site settings (single-row style key/value JSON)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CMS content by section + locale
CREATE TABLE IF NOT EXISTS public.content_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'fr', 'de')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (section, locale)
);

CREATE INDEX IF NOT EXISTS content_entries_section_idx ON public.content_entries (section);

-- Media library
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  filename TEXT DEFAULT ''
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS content_entries_updated_at ON public.content_entries;
CREATE TRIGGER content_entries_updated_at
  BEFORE UPDATE ON public.content_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Public can read published CMS content and settings (anon)
DROP POLICY IF EXISTS "Public read content_entries" ON public.content_entries;
CREATE POLICY "Public read content_entries"
  ON public.content_entries FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read media" ON public.media;
CREATE POLICY "Public read media"
  ON public.media FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated admins can manage everything
DROP POLICY IF EXISTS "Auth manage content_entries" ON public.content_entries;
CREATE POLICY "Auth manage content_entries"
  ON public.content_entries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth manage site_settings" ON public.site_settings;
CREATE POLICY "Auth manage site_settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth manage media" ON public.media;
CREATE POLICY "Auth manage media"
  ON public.media FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth manage bookings" ON public.bookings;
CREATE POLICY "Auth manage bookings"
  ON public.bookings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth manage contact_messages" ON public.contact_messages;
CREATE POLICY "Auth manage contact_messages"
  ON public.contact_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- No public INSERT on bookings/contact — service role bypasses RLS via API routes

-- Storage bucket for CMS media (run via SQL if storage schema available)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read site-media" ON storage.objects;
CREATE POLICY "Public read site-media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Auth upload site-media" ON storage.objects;
CREATE POLICY "Auth upload site-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Auth update site-media" ON storage.objects;
CREATE POLICY "Auth update site-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Auth delete site-media" ON storage.objects;
CREATE POLICY "Auth delete site-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-media');
