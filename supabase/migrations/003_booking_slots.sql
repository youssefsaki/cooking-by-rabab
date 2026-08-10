-- Expand bookings for calendar slots, dishes, guests (version-2.1.0 booking flow)
-- Supabase is source of truth; Sheets remains optional mirror only.

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_package_type_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_package_type_check
  CHECK (package_type IN ('basic', 'weekly-event', 'private', 'private-at-location'));

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS slot_date DATE,
  ADD COLUMN IF NOT EXISTS slot_period TEXT CHECK (slot_period IS NULL OR slot_period IN ('morning', 'afternoon')),
  ADD COLUMN IF NOT EXISTS dish_id TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS dish_name TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS adults INT NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS children JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS location TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS total_price_eur NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS dietary_notes TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS bookings_slot_idx ON public.bookings (slot_date, slot_period);
CREATE INDEX IF NOT EXISTS bookings_package_slot_idx ON public.bookings (package_type, slot_date);

-- Advisory-lock helper for concurrent slot writes (called from app if needed)
CREATE OR REPLACE FUNCTION public.lock_booking_slot(p_slot_date DATE, p_slot_period TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_slot_date::text || '|' || coalesce(p_slot_period, '')));
END;
$$;
