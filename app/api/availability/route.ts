import { NextRequest, NextResponse } from 'next/server';
import { listBookings } from '@/lib/booking/sheets';
import { buildOccupancyMap, type SlotOccupancy } from '@/lib/booking/conflicts';
import { getUpcomingCalendarDays, buildSlotId, BASIC_MAX_GUESTS } from '@/lib/booking/schedule';
import {
  clearOccupancyInflight,
  getCachedOccupancyPayload,
  getOccupancyInflight,
  occupancyCacheKey,
  setCachedOccupancyPayload,
  setOccupancyInflight,
} from '@/lib/booking/occupancy-response-cache';

export const runtime = 'nodejs';

type OccupancyPayload = {
  occupancy: SlotOccupancy[];
  from: string | undefined;
  to: string | undefined;
};

function buildOccupancyList(
  occupancyMap: ReturnType<typeof buildOccupancyMap>,
  from?: string,
  to?: string
): SlotOccupancy[] {
  const days = getUpcomingCalendarDays(28);
  const occupancy = days
    .filter((day) => (!from || day.date >= from) && (!to || day.date <= to))
    .flatMap((day) =>
      day.slots.map((slot) => {
        const existing = occupancyMap.get(slot.id);
        return (
          existing ?? {
            slotId: buildSlotId(slot.date, slot.period),
            date: slot.date,
            period: slot.period,
            hasPrivate: false,
            hasWeekly: false,
            basicGuestCount: 0,
            locked: false,
            remainingBasicCapacity: BASIC_MAX_GUESTS,
          }
        );
      })
    );

  occupancyMap.forEach((value, slotId) => {
    if (!occupancy.some((o) => o.slotId === slotId)) {
      occupancy.push(value);
    }
  });

  return occupancy;
}

async function getOccupancyPayload(from?: string, to?: string): Promise<OccupancyPayload> {
  const key = occupancyCacheKey(from, to);
  const hit = getCachedOccupancyPayload(key);
  if (hit) return hit as OccupancyPayload;

  const existing = getOccupancyInflight(key);
  if (existing) return existing as Promise<OccupancyPayload>;

  const promise = (async () => {
    const bookings = await listBookings(from, to);
    const occupancyMap = buildOccupancyMap(bookings);
    const body: OccupancyPayload = {
      occupancy: buildOccupancyList(occupancyMap, from, to),
      from,
      to,
    };
    setCachedOccupancyPayload(key, body);
    return body;
  })().finally(() => {
    clearOccupancyInflight(key);
  });

  setOccupancyInflight(key, promise);
  return promise;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = getUpcomingCalendarDays(28);
    const from = searchParams.get('from') || days[0]?.date || undefined;
    const to = searchParams.get('to') || days[days.length - 1]?.date || undefined;

    const body = await getOccupancyPayload(from, to);

    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, max-age=20, s-maxage=45, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('availability error', error);
    return NextResponse.json({ error: 'Failed to load availability' }, { status: 500 });
  }
}
