import { NextRequest, NextResponse } from 'next/server';
import { listBookings } from '@/lib/booking/sheets';
import { buildOccupancyMap } from '@/lib/booking/conflicts';
import { getUpcomingCalendarDays, buildSlotId, BASIC_MAX_GUESTS } from '@/lib/booking/schedule';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = getUpcomingCalendarDays(21);
    const from = searchParams.get('from') || days[0]?.date;
    const to = searchParams.get('to') || days[days.length - 1]?.date;

    const bookings = await listBookings(from || undefined, to || undefined);
    const occupancyMap = buildOccupancyMap(bookings);

    // Ensure every scheduled slot in range appears in the response
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
              basicGuestCount: 0,
              locked: false,
              remainingBasicCapacity: BASIC_MAX_GUESTS,
            }
          );
        })
      );

    return NextResponse.json({ occupancy, from, to });
  } catch (error) {
    console.error('availability error', error);
    return NextResponse.json({ error: 'Failed to load availability' }, { status: 500 });
  }
}
