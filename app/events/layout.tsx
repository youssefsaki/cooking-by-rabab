import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/breadcrumb-schema';
import { buildSeoMetadata } from '@/lib/seo-metadata';
import { WEEKLY_EVENT_PRICE_EUR } from '@/lib/booking/schedule';

const SITE_ORIGIN = 'https://www.taghazout-cooking-class.com';

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata('events');
}

/** Next Saturday (UTC date). Used so Google has a concrete upcoming Event instance. */
function nextSaturdayYmd(): string {
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const add = (6 - d.getUTCDay() + 7) % 7;
  d.setUTCDate(d.getUTCDate() + add);
  return d.toISOString().slice(0, 10);
}

function weeklyEventSchema() {
  const date = nextSaturdayYmd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Weekly Amazigh Music Event — Taghazout',
    description:
      'Weekly Berber music event every Saturday at sunset in a traditional Amazigh village — live music, clay-oven barbecue, mint tea, and village celebration. Pickup from Taghazout Mosque included.',
    url: `${SITE_ORIGIN}/events`,
    image: `${SITE_ORIGIN}/packages/weekly.webp`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: `${date}T15:00:00+01:00`,
    endDate: `${date}T19:30:00+01:00`,
    eventSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: 'https://schema.org/Saturday',
      startTime: '15:00',
      endTime: '19:30',
      scheduleTimezone: 'Africa/Casablanca',
    },
    location: {
      '@type': 'Place',
      name: 'Amazigh Village, Atlas Mountains above Taghazout',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Taghazout',
        addressRegion: 'Souss-Massa',
        addressCountry: 'MA',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Taghazout Cooking Class',
      url: SITE_ORIGIN,
    },
    offers: {
      '@type': 'Offer',
      price: String(WEEKLY_EVENT_PRICE_EUR),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_ORIGIN}/book?package=weekly-event`,
      validFrom: date,
    },
    performer: {
      '@type': 'PerformingGroup',
      name: 'Traditional Amazigh musicians',
    },
  };
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Events', path: '/events' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(weeklyEventSchema()) }}
      />
      {children}
    </>
  );
}
