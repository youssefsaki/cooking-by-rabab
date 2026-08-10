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

Update your Apps Script `doPost` to route by `type`:

- `type: "booking"` → Bookings sheet
- `type: "contact"` → Contact sheet

See `supabase/sheets-apps-script.js`.

Mirror is **non-blocking**: guest success depends only on Supabase.

## Validate on Preview

1. Open Vercel Preview for `feature/supabase-bookings`
2. Submit `/book` → row in Supabase + Sheets + WhatsApp
3. Submit contact form → Supabase + Sheets
4. Sign in at `/admin` → edit package price → confirm site updates
5. Merge to `main` only after you approve
