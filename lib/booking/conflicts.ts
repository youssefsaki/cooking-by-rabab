import type { PackageType, SlotPeriod } from './schedule';
import { BASIC_MAX_GUESTS, BASIC_MIN_ADULTS } from './schedule';
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
  hasWeekly: boolean;
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

function isWeeklyPackage(pkg: PackageType): boolean {
  return pkg === 'weekly-event';
}

function emptyOccupancy(slotId: string, date: string, period: SlotPeriod): SlotOccupancy {
  return {
    slotId,
    date,
    period,
    hasPrivate: false,
    hasWeekly: false,
    basicGuestCount: 0,
    locked: false,
    remainingBasicCapacity: BASIC_MAX_GUESTS,
  };
}

/**
 * Occupancy is keyed by date + period (morning | afternoon).
 * Rules:
 * - Private fully locks that exact slot (no Basic, no other Private, no Weekly)
 * - Basic shares capacity up to 13 (ages 0–3 excluded); blocked if Private holds the slot
 *   or if remaining spots are below the Basic minimum of 3 adults
 * - Private is blocked by another Private, Weekly, or a full Basic slot (13) —
 *   partial Basic bookings do NOT lock Private
 * - Weekly Event can have multiple groups, but is blocked if Private holds the slot
 */
export function buildOccupancyMap(bookings: StoredBooking[]): Map<string, SlotOccupancy> {
  const map = new Map<string, SlotOccupancy>();

  for (const booking of bookings) {
    const slotId = `${booking.slotDate}|${booking.slotPeriod}`;
    const existing = map.get(slotId) ?? emptyOccupancy(slotId, booking.slotDate, booking.slotPeriod);

    if (isPrivatePackage(booking.packageType)) {
      existing.hasPrivate = true;
      existing.locked = true;
      existing.remainingBasicCapacity = 0;
    }

    if (isBasicPackage(booking.packageType)) {
      existing.basicGuestCount += countGuestsTowardCapacity(booking.adults, booking.children);
      if (!existing.hasPrivate) {
        existing.remainingBasicCapacity = Math.max(0, BASIC_MAX_GUESTS - existing.basicGuestCount);
        // Basic needs min 3 adults — fewer than 3 open seats = fully booked
        if (existing.remainingBasicCapacity < BASIC_MIN_ADULTS) {
          existing.locked = true;
          existing.remainingBasicCapacity = 0;
        }
      }
    }

    if (isWeeklyPackage(booking.packageType)) {
      existing.hasWeekly = true;
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
    const remaining = BASIC_MAX_GUESTS - used;
    // Below package minimum — slot is effectively closed for Basic
    if (remaining < BASIC_MIN_ADULTS) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    if (used + guestCount > BASIC_MAX_GUESTS) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  if (isPrivatePackage(packageType)) {
    // Exclusive hold — only when another Private, Weekly, or a full (13) Basic slot
    if (isPeriodLockedForPrivate(occupancy)) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  if (isWeeklyPackage(packageType)) {
    // Multiple Weekly groups OK; Private on that Saturday afternoon blocks it
    if (occupancy?.hasPrivate) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  return { ok: true };
}

/** True when Private cannot take this date + period (full Basic, Private, or Weekly) */
export function isPeriodLockedForPrivate(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  const basicFull =
    occupancy.locked ||
    occupancy.remainingBasicCapacity <= 0 ||
    occupancy.basicGuestCount >= BASIC_MAX_GUESTS;
  return occupancy.hasPrivate || occupancy.hasWeekly || basicFull;
}

/** True when Basic cannot take this slot (Private hold, or fewer than 3 spots left) */
export function isSlotLockedForBasic(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  if (occupancy.hasPrivate || occupancy.locked) return true;
  return occupancy.remainingBasicCapacity < BASIC_MIN_ADULTS;
}

/** True when Weekly Event cannot take this Saturday slot */
export function isSlotLockedForWeekly(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  return occupancy.hasPrivate;
}
