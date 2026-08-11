-- Seed site_settings + packages content (EN/FR/DE) + FAQs EN
-- Run after 001_initial_schema.sql

INSERT INTO public.site_settings (id, data)
VALUES (
  'default',
  '{
    "phone": {"number": "+212 726 671 746", "availability": "Available 24/7"},
    "email": {"address": "rababouhadda5@gmail.com", "responseTime": "Response within 24 hours"},
    "whatsapp": {"number": "+212 726 671 746", "note": "Instant messaging", "digits": "212726671746"},
    "officeHours": {"weekdays": "9:00 AM - 8:00 PM", "saturday": "9:00 AM - 8:00 PM", "sunday": "9:00 AM - 8:00 PM"},
    "emergencyNote": "WhatsApp support available 24/7"
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

INSERT INTO public.content_entries (section, locale, data)
VALUES (
  'packages',
  'en',
  '{
    "items": [
      {
        "id": "basic",
        "name": "Basic Package",
        "tagline": "Your Journey into the Mountains",
        "subtitle": "Half-Day Authentic Berber Cultural Experience Above Taghazout",
        "price": "60",
        "currency": "EUR",
        "duration": "4 hours",
        "groupSize": "2-13 guests",
        "startTime": "13:30",
        "image": "/packages/basic.jpg",
        "imageAlt": "Taghazout cooking class basic package",
        "popular": true,
        "highlights": [
          "Pick up from Taghazout Mosque at 13:30",
          "Minimum 2 guests required",
          "300-year-old Amazigh house tour",
          "Moroccan mint tea ceremony",
          "Traditional village bread baking",
          "Make Moroccan spread (Amlou)"
        ]
      },
      {
        "id": "weekly-event",
        "name": "Weekly Event",
        "tagline": "The Amazigh Village Music Gala",
        "subtitle": "Weekly Berber Music Event At Sunset",
        "price": "80",
        "currency": "EUR",
        "duration": "4 hours",
        "groupSize": "6-13 guests",
        "startTime": "15:00",
        "image": "/packages/weekly.webp",
        "imageAlt": "Weekly Amazigh music event",
        "highlights": [
          "Every Thursday at 15:00",
          "Minimum 6 guests required",
          "Pickup from Taghazout Mosque",
          "Mint tea ceremony",
          "Make your barbecue",
          "Traditional Amazigh music & celebration"
        ]
      },
      {
        "id": "private",
        "name": "Private Package",
        "tagline": "Exclusive Mountain Experience",
        "subtitle": "Personalized culinary journey for your group",
        "price": "100",
        "currency": "EUR",
        "duration": "5 hours",
        "groupSize": "Private group",
        "startTime": "Flexible",
        "image": "/packages/private-chef.jpg",
        "imageAlt": "Private Moroccan cooking class",
        "highlights": [
          "Completely private experience",
          "Flexible scheduling & timing",
          "Customizable menu options",
          "Your choice of location",
          "Personalized cooking instruction",
          "Private family-style feast"
        ]
      }
    ]
  }'::jsonb
)
ON CONFLICT (section, locale) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

INSERT INTO public.content_entries (section, locale, data)
SELECT 'packages', 'fr', data FROM public.content_entries WHERE section = 'packages' AND locale = 'en'
ON CONFLICT (section, locale) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

INSERT INTO public.content_entries (section, locale, data)
SELECT 'packages', 'de', data FROM public.content_entries WHERE section = 'packages' AND locale = 'en'
ON CONFLICT (section, locale) DO UPDATE SET data = EXCLUDED.data, updated_at = now();
