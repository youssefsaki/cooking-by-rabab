# Locked facts — Cooking by Rabab Ads

Re-check the repo if this disagrees with live code (`lib/gtag.ts`, `lib/seo-keywords.ts`, `data/site-config.json`, `app/book/page.tsx`).

## Product

- **Sell:** Moroccan / Amazigh cooking class (half-day village workshop) + private class at guest villa.
- **Consume:** Must be physically in the Agadir–Taghazout area. Pickup **Taghazout Mosque** for the village class.
- **Site:** https://www.taghazout-cooking-class.com
- **Brand in ads/Maps:** Taghazout Cooking Class / Rabab
- **Owner:** Rabab Ouhadda (payments: Individual, Morocco)
- **Contact:** WhatsApp `212726671746`, email `rababouhadda5@gmail.com`
- **Currency on site:** EUR. **Ads billing:** MAD (Morocco prepay).
- **Prices:** village class **€65**/adult (min 2 guests, capacity ~13). Private at location **€100**. Children: 0–3 free, 4–9 half, 10+ full.
- **Languages:** EN default; FR at `/fr/...`; DE is UI switcher (weak for Google crawl). Ads: **EN + FR** Search ad groups. Not DE first.

## Buyer

- Hottest: tourists **already in** Taghazout, Tamraght, Aourir, Agadir (surf rest day, couples, small groups).
- Secondary: FR / UK / DE / NL searching **this place by name** (planning a trip).
- Not: generic “cooking class” in Europe or “cooking class Morocco” (Marrakech owns that).
- Demographics (observation, do not exclude on day 1): ages **25–54** likely strongest; **male + female + unknown**; do not exclude men; household income **not available in Morocco**.

## Tracking in code

| Piece | Status |
|---|---|
| GA4 `G-02LHBV08VE` | In `app/layout.tsx` + `lib/gtag.ts` |
| `booking_complete` | Client on `/book` success; server via `lib/ga4-measure.ts` if `GA4_API_SECRET` set |
| `whatsapp_click` | Floating button, footer, booking success |
| Google Ads `AW-` | **Not in repo** |
| Lead source | `utm_source` / `ref` → stored on booking (`google` aliases include `gads`) |

Primary Ads conversion: **Purchase** from `booking_complete` (EUR value, transaction id when available). Secondary: WhatsApp click.

## Geo split (when campaigns exist)

| Campaign | Budget share | Location | Location option | Keywords |
|---|---|---|---|---|
| A Presence | ~70% | Taghazout, Tamraght, Aourir, Agadir | People **in or regularly in** | Category + place, FR+EN, Broad OK |
| B Source countries | ~20% | FR, UK, DE, NL | Presence in those countries | Place **must** be in the query; Phrase/Exact |
| C Brand | ~10% | As needed | — | Brand / domain |

## Freelance vs Google

Ad spend = Rabab’s card → Google. Setup/management is a separate invoice from website build. This skill does not quote prices unless asked (then use local-growth-brief).
