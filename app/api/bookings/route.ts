import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import {
  evaluateSlotBooking,
  SLOT_CONFLICT_MESSAGE,
  type StoredBooking,
} from '@/lib/booking/conflicts';
import { calculateBookingTotal, type ChildGuest } from '@/lib/booking/pricing';
import { getDishById } from '@/lib/booking/menu';
import {
  BASIC_MIN_ADULTS,
  getSlotById,
  type PackageType,
  type SlotPeriod,
} from '@/lib/booking/schedule';
import { appendBooking, listBookings } from '@/lib/booking/sheets';

export const dynamic = 'force-dynamic';

interface BookingPayload {
  fullName: string;
  phone: string;
  country: string;
  email: string;
  packageType: PackageType;
  slotDate: string;
  slotPeriod: SlotPeriod;
  /** Shared dish for the whole group (order-level) */
  dishId?: string;
  dish?: string;
  adults: number;
  children?: ChildGuest[];
  location?: string;
  allergies?: string;
  dietaryNotes?: string;
  dietaryPreference?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingPayload;

    if (!body.fullName?.trim() || !body.phone?.trim() || !body.country?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: 'Missing required personal fields' }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const packageType = body.packageType;
    if (!['basic', 'weekly-event', 'private', 'private-at-location'].includes(packageType)) {
      return NextResponse.json({ error: 'Invalid package type' }, { status: 400 });
    }

    if (!body.slotDate || !body.slotPeriod) {
      return NextResponse.json({ error: 'Slot date and period are required' }, { status: 400 });
    }

    const slot = getSlotById(`${body.slotDate}|${body.slotPeriod}`);
    if (!slot) {
      return NextResponse.json({ error: 'Invalid workshop slot' }, { status: 400 });
    }

    if (!slot.packageAllowed.includes(packageType)) {
      return NextResponse.json(
        { error: 'This package cannot be booked for the selected slot' },
        { status: 400 }
      );
    }

    const adults = Number(body.adults);
    const children = Array.isArray(body.children) ? body.children : [];

    if (!Number.isFinite(adults) || adults < 1) {
      return NextResponse.json({ error: 'At least one adult guest is required' }, { status: 400 });
    }

    if (packageType === 'basic' && adults < BASIC_MIN_ADULTS) {
      return NextResponse.json(
        { error: `Basic package requires at least ${BASIC_MIN_ADULTS} adults` },
        { status: 400 }
      );
    }

    if (packageType === 'private' && adults < 2) {
      return NextResponse.json({ error: 'Private workshop requires at least 2 guests' }, { status: 400 });
    }

    if (packageType === 'private-at-location' && adults < 6) {
      return NextResponse.json(
        { error: 'Private at your location requires at least 6 guests' },
        { status: 400 }
      );
    }

    for (const child of children) {
      if (!Number.isFinite(child.age) || child.age < 0 || child.age > 17) {
        return NextResponse.json({ error: 'Child ages must be between 0 and 17' }, { status: 400 });
      }
    }

    const existing = await listBookings(body.slotDate, body.slotDate);
    const conflict = evaluateSlotBooking({
      packageType,
      slotDate: body.slotDate,
      slotPeriod: body.slotPeriod,
      adults,
      children,
      existingBookings: existing,
    });

    if (!conflict.ok) {
      return NextResponse.json({ error: conflict.message }, { status: 409 });
    }

    const menuDish = getDishById(body.dishId);
    if (packageType === 'basic' && !menuDish) {
      return NextResponse.json(
        { error: 'Please select one shared dish for your group' },
        { status: 400 }
      );
    }

    if (
      packageType === 'basic' &&
      menuDish &&
      slot.menuCategory &&
      menuDish.category !== slot.menuCategory
    ) {
      return NextResponse.json(
        { error: 'Selected dish is not available for this workshop day' },
        { status: 400 }
      );
    }

    const dishName = menuDish?.name || body.dish?.trim() || slot.dish;
    const dishPrice = menuDish?.priceEur;
    const pricing = calculateBookingTotal({
      adults,
      children,
      dishPriceEur: dishPrice,
    });

    const dietaryNotes = (body.dietaryNotes || body.allergies || '').trim();

    const booking: StoredBooking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      country: body.country.trim(),
      email: body.email.trim().toLowerCase(),
      packageType,
      slotDate: body.slotDate,
      slotPeriod: body.slotPeriod,
      dish: dishName,
      adults,
      children,
      location: body.location?.trim() || 'Taghazout Mosque pickup → Village workshop',
      allergies: dietaryNotes,
      totalPrice: pricing.total,
      status: 'confirmed',
    };

    try {
      await appendBooking(booking);
    } catch (error) {
      const message = (error as Error).message || SLOT_CONFLICT_MESSAGE;
      const status = (error as Error & { status?: number }).status === 409 ? 409 : 500;
      return NextResponse.json(
        { error: status === 409 ? SLOT_CONFLICT_MESSAGE : message },
        { status }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('booking error', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
