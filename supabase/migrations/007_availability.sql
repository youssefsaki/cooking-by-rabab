-- 007: Availability — blocked dates + enforced package capacity
-- Feature: admin availability / capacity (schema step only)
--
-- Findings from codebase review:
--   - CMS `groupSize` (e.g. "3-13 guests") is descriptive copy only — not enforced.
--   - Real capacity is hardcoded today as BASIC_MAX_GUESTS = 13 in lib/booking/schedule.ts
--     and checked in lib/booking/conflicts.ts + /api/bookings + /api/availability.
--   - There is no packages table in Postgres; packages live in code/CMS.
--
-- This migration:
--   1. Creates blocked_dates (calendar blocks for any package/slot).
--   2. Creates package_capacity with enforceable max_guests per package_type,
--      seeded from current code defaults (basic/weekly/private = 13,
--      private-at-location = 20 as a higher villa default — adjustable in admin later).
--
-- Numbered 007 because 004–006 were already applied for earlier admin features.
--
-- DO NOT apply until reviewed.

CREATE TABLE IF NOT EXISTS public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  date DATE NOT NULL,
  reason TEXT NULL,
  CONSTRAINT blocked_dates_date_unique UNIQUE (date)
);

CREATE INDEX IF NOT EXISTS blocked_dates_date_idx
  ON public.blocked_dates (date);

COMMENT ON TABLE public.blocked_dates IS
  'Dates that reject new bookings (admin calendar). Checked by availability + booking APIs.';

CREATE TABLE IF NOT EXISTS public.package_capacity (
  package_type TEXT PRIMARY KEY
    CHECK (package_type IN ('basic', 'weekly-event', 'private', 'private-at-location')),
  max_guests INT NOT NULL CHECK (max_guests > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.package_capacity IS
  'Enforced max guests per package/slot (replaces hardcoded BASIC_MAX_GUESTS when wired in app).';

INSERT INTO public.package_capacity (package_type, max_guests)
VALUES
  ('basic', 13),
  ('weekly-event', 13),
  ('private', 13),
  ('private-at-location', 20)
ON CONFLICT (package_type) DO NOTHING;

ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_capacity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Auth manage blocked_dates" ON public.blocked_dates;
CREATE POLICY "Auth manage blocked_dates"
  ON public.blocked_dates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth manage package_capacity" ON public.package_capacity;
CREATE POLICY "Auth manage package_capacity"
  ON public.package_capacity FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public availability checks use the service-role API (no anon SELECT needed).
-- Authenticated admin UI uses the policies above.
