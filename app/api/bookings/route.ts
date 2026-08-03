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
  getSlotById,
  minAdultsForPackage,
  unitPriceForPackage,
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
  dishId?: string;
  dish?: string;
  adults: number;
  children?: ChildGuest[];
  location?: string;
  allergies?: string;
  dietaryNotes?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isCalendarPackage(pkg: PackageType): boolean {
  return pkg === 'basic' || pkg === 'weekly-event';
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
      return NextResponse.json({ error: 'Preferred date and time are required' }, { status: 400 });
    }

    if (!isIsoDate(body.slotDate)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (body.slotPeriod !== 'morning' && body.slotPeriod !== 'afternoon') {
      return NextResponse.json({ error: 'Invalid time period' }, { status: 400 });
    }

    const adults = Number(body.adults);
    const children = Array.isArray(body.children) ? body.children : [];
    const minAdults = minAdultsForPackage(packageType);

    if (!Number.isFinite(adults) || adults < minAdults) {
      return NextResponse.json(
        { error: `This package requires at least ${minAdults} adults` },
        { status: 400 }
      );
    }

    for (const child of children) {
      if (!Number.isFinite(child.age) || child.age < 0 || child.age > 17) {
        return NextResponse.json({ error: 'Child ages must be between 0 and 17' }, { status: 400 });
      }
    }

    let dishName = '';
    let unitPrice = unitPriceForPackage(packageType);

    if (isCalendarPackage(packageType)) {
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

      if (packageType === 'basic') {
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
        if (!menuDish) {
          return NextResponse.json(
            { error: 'Please select one shared dish for your group' },
            { status: 400 }
          );
        }

        if (slot.menuCategory && menuDish.category !== slot.menuCategory) {
          return NextResponse.json(
            { error: 'Selected dish is not available for this workshop day' },
            { status: 400 }
          );
        }

        dishName = menuDish.name;
        unitPrice = unitPriceForPackage(packageType, menuDish.priceEur);
      } else {
        // Weekly Event — blocked if Private already holds that Saturday afternoon
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

        dishName = slot.dish;
        unitPrice = unitPriceForPackage(packageType);
      }
    } else {
      // Private form request — locks matching Basic date + period only
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

      dishName = body.dish?.trim() || 'Private cooking experience (to confirm)';
      unitPrice = unitPriceForPackage(packageType);
    }

    const pricing = calculateBookingTotal({
      adults,
      children,
      dishPriceEur: unitPrice,
    });

    const dietaryNotes = (body.dietaryNotes || body.allergies || '').trim();

    const defaultLocation =
      packageType === 'private-at-location'
        ? 'At your villa / riad (Rabab comes to you)'
        : packageType === 'weekly-event'
          ? 'Weekly Event — Taghazout village'
          : packageType === 'private'
            ? 'Private workshop — Taghazout village'
            : 'Pick-up Taghazout Mosque → Village workshop';

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
      location: body.location?.trim() || defaultLocation,
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
