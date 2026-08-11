-- 004: Revenue reporting readiness
-- Feature: admin revenue reports (schema step only)
--
-- Findings from codebase review:
--   - Revenue column already exists: bookings.total_price_eur NUMERIC(10, 2)
--     (added in 003_booking_slots.sql; typed in lib/types/cms.ts as total_price_eur)
--   - Currency is implicit EUR (no separate currency column). Totals are always stored in EUR
--     by the booking API (lib/booking/sheets.ts insert uses total_price_eur).
--   - Older rows (or failed pricing paths) may have NULL / 0 totals.
--
-- This migration:
--   1. Backfills missing totals from package unit price × adults (+ children age multipliers
--      when children JSON is present). Basic dish-specific prices (65 vs 70) are not
--      recoverable without dish_id history → uses 65 EUR as the basic unit default.
--   2. Adds a small reporting index on (created_at, total_price_eur) for day-range sums.
--   3. Does NOT add a currency column (would be redundant with *_eur naming).
--
-- DO NOT apply until reviewed.

-- Unit prices (EUR) matching lib/booking/schedule.ts defaults at time of writing:
--   basic / fallback: 65
--   weekly-event: 80
--   private: 80
--   private-at-location: 100
-- Child multipliers (lib/booking/pricing.ts): age <= 3 → 0; 4–9 → 0.5; 10+ → 1

CREATE OR REPLACE FUNCTION public._booking_unit_price_eur(p_package_type TEXT)
RETURNS NUMERIC
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE p_package_type
    WHEN 'weekly-event' THEN 80::NUMERIC
    WHEN 'private' THEN 80::NUMERIC
    WHEN 'private-at-location' THEN 100::NUMERIC
    ELSE 65::NUMERIC -- basic + unknown
  END;
$$;

CREATE OR REPLACE FUNCTION public._booking_children_subtotal_eur(
  p_children JSONB,
  p_unit NUMERIC
)
RETURNS NUMERIC
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    (
      SELECT SUM(
        CASE
          WHEN COALESCE((child->>'age')::INT, 99) <= 3 THEN 0
          WHEN (child->>'age')::INT <= 9 THEN p_unit * 0.5
          ELSE p_unit
        END
      )
      FROM jsonb_array_elements(COALESCE(p_children, '[]'::jsonb)) AS child
    ),
    0
  );
$$;

UPDATE public.bookings
SET total_price_eur = ROUND(
  (public._booking_unit_price_eur(package_type) * GREATEST(COALESCE(adults, 1), 0))
  + public._booking_children_subtotal_eur(children, public._booking_unit_price_eur(package_type)),
  2
)
WHERE total_price_eur IS NULL
   OR total_price_eur = 0;

-- Helpers were only for this backfill
DROP FUNCTION IF EXISTS public._booking_children_subtotal_eur(JSONB, NUMERIC);
DROP FUNCTION IF EXISTS public._booking_unit_price_eur(TEXT);

CREATE INDEX IF NOT EXISTS bookings_revenue_created_at_idx
  ON public.bookings (created_at DESC)
  WHERE total_price_eur IS NOT NULL AND total_price_eur > 0;
