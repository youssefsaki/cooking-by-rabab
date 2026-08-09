# Supabase + CMS setup (feature/supabase-bookings)

Production (`main`) stays live. This branch uses Supabase as source of truth, mirrors to Google Sheets, keeps WhatsApp on booking success, and adds `/admin` CMS.

## Why you may need a manual project step

Your Supabase org hit the **free project limit (2)**. Composio could not create `cooking-by-rabab`, and project listing returned empty for this OAuth token.

### Do this once in the Supabase dashboard

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Either **pause/delete** an unused free project, then create **cooking-by-rabab**, **or** reuse an existing project
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`
4. SQL Editor → run in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_content.sql`
5. Authentication → Users → Add user (email/password) for the client CMS login
6. Optional: set `SHEETS_WEBAPP_URL` to your Apps Script web app (see below)

## Local / Vercel env

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Add the same keys to Vercel → Project → Settings → Environment Variables for **Preview** (and later Production).

## Google Sheets mirror (client view)

Update your Apps Script `doPost` to route by `type`:

- `type: "booking"` → Bookings sheet (same columns as before)
- `type: "contact"` → Contact sheet

See `supabase/sheets-apps-script.js`.

Mirror is **non-blocking**: guest success depends only on Supabase.

## Validate on Preview

1. Push `feature/supabase-bookings`
2. Open Vercel Preview URL
3. Submit `/book` → row in Supabase + Sheets + WhatsApp
4. Submit contact form → Supabase + Sheets
5. Sign in at `/admin` → edit package price → confirm site updates
6. Merge to `main` only after you approve
