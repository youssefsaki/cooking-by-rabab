-- 006: Promo codes
-- Feature: admin promo codes (schema step only)
--
-- Creates promo_codes for percent/fixed discounts with optional expiry and max uses.
-- Also adds booking columns so Step 3 can store which code was used and the discount
-- applied (without a second migration). uses_count is incremented later when a booking
-- moves to status = 'confirmed' (app logic — not a DB trigger in this step).
--
-- Numbered 006 because 004 (revenue) and 005 (source) are already applied in Supabase.
--
-- DO NOT apply until reviewed.

CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  code TEXT NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
  max_uses INT NULL CHECK (max_uses IS NULL OR max_uses > 0),
  uses_count INT NOT NULL DEFAULT 0 CHECK (uses_count >= 0),
  expires_at TIMESTAMPTZ NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT promo_codes_code_unique UNIQUE (code),
  CONSTRAINT promo_codes_percent_range CHECK (
    discount_type <> 'percent' OR (discount_value > 0 AND discount_value <= 100)
  )
);

-- Normalize codes to uppercase on write (app should also uppercase before insert)
CREATE OR REPLACE FUNCTION public.promo_codes_normalize_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.code = upper(trim(NEW.code));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS promo_codes_normalize_code ON public.promo_codes;
CREATE TRIGGER promo_codes_normalize_code
  BEFORE INSERT OR UPDATE OF code ON public.promo_codes
  FOR EACH ROW EXECUTE FUNCTION public.promo_codes_normalize_code();

CREATE INDEX IF NOT EXISTS promo_codes_active_idx
  ON public.promo_codes (active, expires_at);

CREATE INDEX IF NOT EXISTS promo_codes_code_idx
  ON public.promo_codes (code);

-- Booking linkage for applied promos (filled by booking API / confirmation flow)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS promo_code TEXT,
  ADD COLUMN IF NOT EXISTS discount_eur NUMERIC(10, 2);

CREATE INDEX IF NOT EXISTS bookings_promo_code_idx
  ON public.bookings (promo_code)
  WHERE promo_code IS NOT NULL;

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Auth manage promo_codes" ON public.promo_codes;
CREATE POLICY "Auth manage promo_codes"
  ON public.promo_codes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public validation goes through a trusted API route (service role), not anon RLS SELECT.
-- No anon policies on purpose.

COMMENT ON TABLE public.promo_codes IS
  'Discount codes for bookings; validate via API; increment uses_count on confirmed bookings';
COMMENT ON COLUMN public.bookings.promo_code IS
  'Promo code string applied at booking time (uppercase)';
COMMENT ON COLUMN public.bookings.discount_eur IS
  'EUR amount discounted from total_price_eur when a promo was applied';
