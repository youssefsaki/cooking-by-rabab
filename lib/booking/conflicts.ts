import type { PackageType, SlotPeriod } from './schedule';
import { BASIC_MAX_GUESTS } from './schedule';
import { countGuestsTowardCapacity, type ChildGuest } from './pricing';

export const SLOT_CONFLICT_MESSAGE =
  'This time slot is already booked. Please choose another available slot.';

export interface StoredBooking {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  country: string;
  email: string;
  packageType: PackageType;
  slotDate: string;
  slotPeriod: SlotPeriod;
  dish: string;
  adults: number;
  children: ChildGuest[];
  location: string;
  allergies: string;
  totalPrice: number;
  status: 'confirmed';
}

export interface SlotOccupancy {
  slotId: string;
  date: string;
  period: SlotPeriod;
  hasPrivate: boolean;
  basicGuestCount: number;
  locked: boolean;
  remainingBasicCapacity: number;
}

function isPrivatePackage(pkg: PackageType): boolean {
  return pkg === 'private' || pkg === 'private-at-location';
}

function isBasicPackage(pkg: PackageType): boolean {
  return pkg === 'basic';
}

export function buildOccupancyMap(bookings: StoredBooking[]): Map<string, SlotOccupancy> {
  const map = new Map<string, SlotOccupancy>();

  for (const booking of bookings) {
    const slotId = `${booking.slotDate}|${booking.slotPeriod}`;
    const existing = map.get(slotId) ?? {
      slotId,
      date: booking.slotDate,
      period: booking.slotPeriod,
      hasPrivate: false,
      basicGuestCount: 0,
      locked: false,
      remainingBasicCapacity: BASIC_MAX_GUESTS,
    };

    if (isPrivatePackage(booking.packageType)) {
      existing.hasPrivate = true;
      existing.locked = true;
      existing.remainingBasicCapacity = 0;
    }

    if (isBasicPackage(booking.packageType)) {
      existing.basicGuestCount += countGuestsTowardCapacity(booking.adults, booking.children);
      if (!existing.hasPrivate) {
        existing.remainingBasicCapacity = Math.max(0, BASIC_MAX_GUESTS - existing.basicGuestCount);
      }
    }

    map.set(slotId, existing);
  }

  return map;
}

export function evaluateSlotBooking(params: {
  packageType: PackageType;
  slotDate: string;
  slotPeriod: SlotPeriod;
  adults: number;
  children: ChildGuest[];
  existingBookings: StoredBooking[];
}): { ok: true } | { ok: false; message: string } {
  const { packageType, slotDate, slotPeriod, adults, children, existingBookings } = params;
  const slotId = `${slotDate}|${slotPeriod}`;
  const occupancy = buildOccupancyMap(existingBookings).get(slotId);
  const guestCount = countGuestsTowardCapacity(adults, children);

  if (isBasicPackage(packageType)) {
    if (occupancy?.hasPrivate) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    const used = occupancy?.basicGuestCount ?? 0;
    if (used + guestCount > BASIC_MAX_GUESTS) {
      return {
        ok: false,
        message: SLOT_CONFLICT_MESSAGE,
      };
    }
    return { ok: true };
  }

  if (isPrivatePackage(packageType)) {
    if ((occupancy?.basicGuestCount ?? 0) > 0 || occupancy?.hasPrivate) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  // Weekly event: no Basic/Private mutual exclusion on this phase beyond schedule allow-list
  return { ok: true };
}
