-- 005: Source / campaign attribution
-- Feature: admin source attribution (schema step only)
--
-- Adds nullable `source` on bookings and contact_messages so we can track whether
-- a lead came from Instagram, Google, referral, WhatsApp, direct, or a utm/ref param.
--
-- No CHECK constraint on values — the app will normalize (instagram, google, referral,
-- whatsapp, direct, or raw utm_source/ref strings). Keeping it free-text avoids a
-- migration every time a new channel is added.
--
-- DO NOT apply until reviewed.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS source TEXT;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS source TEXT;

CREATE INDEX IF NOT EXISTS bookings_source_idx
  ON public.bookings (source)
  WHERE source IS NOT NULL;

CREATE INDEX IF NOT EXISTS contact_messages_source_idx
  ON public.contact_messages (source)
  WHERE source IS NOT NULL;

COMMENT ON COLUMN public.bookings.source IS
  'Acquisition channel: instagram | google | referral | whatsapp | direct | or utm/ref value';

COMMENT ON COLUMN public.contact_messages.source IS
  'Acquisition channel: instagram | google | referral | whatsapp | direct | or utm/ref value';
