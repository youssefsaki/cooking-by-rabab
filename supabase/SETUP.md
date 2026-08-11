# Supabase + CMS setup (feature/supabase-bookings)

Production (`main`) stays live. This branch uses Supabase as source of truth, mirrors to Google Sheets, keeps WhatsApp on booking success, and adds `/admin` CMS.

## Live project (created)

| Field | Value |
|-------|--------|
| Org | `rabab` |
| Project | `cooking-by-rabab` |
| Ref | `sgjsxrznjhmaluhsgvks` |
| Region | `eu-west-1` |
| Dashboard | https://supabase.com/dashboard/project/sgjsxrznjhmaluhsgvks |
| URL | `https://sgjsxrznjhmaluhsgvks.supabase.co` |

Schema applied: tables, RLS, `site-media` bucket, packages seed (en/fr/de), site settings.

Also run **`supabase/migrations/003_booking_slots.sql`** in the SQL editor (adds slot date/period, dish, guests, private-at-location). Booking calendar from `version-2.1.0` writes to Supabase; Sheets is mirror-only.

Also run **`supabase/migrations/005_source_attribution.sql`** (adds nullable `source` on bookings + contact_messages).

Local secrets are in **`.env.local`** (gitignored). Admin login email: `rababouhadda5@gmail.com` — temp password in **`.admin-credentials.local`** (gitignored). Change that password after first login.

## Vercel Preview env

Add these in Vercel → Project → Settings → Environment Variables (**Preview**):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://sgjsxrznjhmaluhsgvks.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from .env.local>
SUPABASE_SERVICE_ROLE_KEY=<from .env.local>
SHEETS_WEBAPP_URL=<optional Apps Script URL>
NEXT_PUBLIC_SITE_URL=<preview URL later>
```

Copy key values from your local `.env.local` — do not commit them.

## Google Sheets mirror (client view)

Every successful booking is saved in **Supabase first**, then mirrored to Google Sheets so Rabab can see clients in her spreadsheet.

1. Open the Google Sheet Rabab uses for bookings
2. **Extensions → Apps Script**
3. Paste the code from `supabase/sheets-apps-script.js`
4. **Deploy → New deployment → Web app**
   - Execute as: Me
   - Who has access: Anyone
5. Copy the `/exec` URL into `.env.local` and Vercel Preview/Production:

```bash
SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
```

6. Restart `yarn dev` after changing `.env.local`

Bookings sheet columns: Timestamp, Full Name, Phone, Country, Email, Package, Slot Date, Slot Period, Dish, Adults, Children, Location, Total EUR, Dietary / Allergies, Status.

Mirror is **append-only** (no locking in Sheets). Capacity locks live in Supabase.

WhatsApp still opens automatically after a successful booking (guest confirms with Rabab).

See `supabase/sheets-apps-script.js`.

## Validate on Preview

1. Open Vercel Preview for `feature/supabase-bookings`
2. Submit `/book` → row in Supabase + Sheets + WhatsApp
3. Submit contact form → Supabase + Sheets
4. Sign in at `/admin` → edit package price → confirm site updates
5. Merge to `main` only after you approve
