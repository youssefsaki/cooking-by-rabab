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
  /** Exclusive private hold — booked when the slot was empty */
  hasPrivate: boolean;
  hasWeekly: boolean;
  /** Guests sharing the workshop (Basic + joining Private) toward the 13-person cap */
  basicGuestCount: number;
  /** Exclusive private hold, or no spots left */
  locked: boolean;
  /** True spots remaining (kept even when Basic min of 3 cannot be met) */
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
 *
 * Rules:
 * - Private on an empty slot → exclusive lock (blocks Basic, other Private, Weekly)
 * - Private on a slot that already has Basic (or joining Private) guests → joins the group,
 *   shares the 13-person capacity, does NOT exclusive-lock
 * - Basic shares capacity up to 13 (ages 0–3 excluded); blocked by exclusive Private,
 *   or when remaining spots are below the Basic minimum of 3 (leftover 1–2 spots stay
 *   visible so Private can still join them)
 * - Weekly Event can have multiple groups, but is blocked if Private holds the slot
 */
export function buildOccupancyMap(bookings: StoredBooking[]): Map<string, SlotOccupancy> {
  const map = new Map<string, SlotOccupancy>();
  const privateBySlot = new Map<string, StoredBooking[]>();

  for (const booking of bookings) {
    const slotId = `${booking.slotDate}|${booking.slotPeriod}`;
    const existing = map.get(slotId) ?? emptyOccupancy(slotId, booking.slotDate, booking.slotPeriod);

    if (isWeeklyPackage(booking.packageType)) {
      existing.hasWeekly = true;
    }

    if (isBasicPackage(booking.packageType)) {
      existing.basicGuestCount += countGuestsTowardCapacity(booking.adults, booking.children);
    }

    if (isPrivatePackage(booking.packageType)) {
      const list = privateBySlot.get(slotId) ?? [];
      list.push(booking);
      privateBySlot.set(slotId, list);
    }

    map.set(slotId, existing);
  }

  // Ensure slots that only have Private bookings exist in the map
  Array.from(privateBySlot.entries()).forEach(([slotId, privates]) => {
    if (!map.has(slotId)) {
      const first = privates[0];
      map.set(slotId, emptyOccupancy(slotId, first.slotDate, first.slotPeriod));
    }
  });

  Array.from(map.entries()).forEach(([slotId, occupancy]) => {
    const privates = privateBySlot.get(slotId) ?? [];
    const sharedBeforePrivate = occupancy.basicGuestCount;

    if (privates.length === 0) {
      occupancy.remainingBasicCapacity = Math.max(0, BASIC_MAX_GUESTS - occupancy.basicGuestCount);
      occupancy.locked = occupancy.remainingBasicCapacity <= 0;
      return;
    }

    // Empty of shared guests → exclusive Private hold
    if (sharedBeforePrivate === 0) {
      occupancy.hasPrivate = true;
      occupancy.locked = true;
      occupancy.remainingBasicCapacity = 0;
      return;
    }

    // Join existing group — count Private guests toward shared capacity
    let shared = sharedBeforePrivate;
    for (const booking of privates) {
      shared += countGuestsTowardCapacity(booking.adults, booking.children);
    }
    occupancy.basicGuestCount = shared;
    occupancy.hasPrivate = false;
    occupancy.remainingBasicCapacity = Math.max(0, BASIC_MAX_GUESTS - shared);
    occupancy.locked = occupancy.remainingBasicCapacity <= 0;
  });

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
    if (remaining < BASIC_MIN_ADULTS) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    if (used + guestCount > BASIC_MAX_GUESTS) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  if (isPrivatePackage(packageType)) {
    if (isPeriodLockedForPrivate(occupancy)) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    const used = occupancy?.basicGuestCount ?? 0;
    // Joining an existing group — must fit in remaining capacity
    if (used > 0) {
      const remaining = BASIC_MAX_GUESTS - used;
      if (guestCount > remaining) {
        return { ok: false, message: SLOT_CONFLICT_MESSAGE };
      }
    }
    return { ok: true };
  }

  if (isWeeklyPackage(packageType)) {
    if (occupancy?.hasPrivate) {
      return { ok: false, message: SLOT_CONFLICT_MESSAGE };
    }
    return { ok: true };
  }

  return { ok: true };
}

/** True when Private cannot take this date + period */
export function isPeriodLockedForPrivate(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  if (occupancy.hasPrivate || occupancy.hasWeekly) return true;
  return occupancy.remainingBasicCapacity <= 0 || occupancy.basicGuestCount >= BASIC_MAX_GUESTS;
}

/** True when this Private booking would join an existing shared workshop */
export function isSharedSlotForPrivate(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy || occupancy.hasPrivate) return false;
  return occupancy.basicGuestCount > 0 && occupancy.remainingBasicCapacity > 0;
}

/**
 * Spots left that Basic cannot take (below min of 3) but Private can still join.
 * Returns 0 when not in that leftover state.
 */
export function leftoverSpotsForPrivateJoin(occupancy?: SlotOccupancy | null): number {
  if (!occupancy || occupancy.hasPrivate) return 0;
  const remaining = occupancy.remainingBasicCapacity;
  if (remaining > 0 && remaining < BASIC_MIN_ADULTS) return remaining;
  return 0;
}

/** True when Basic cannot take this slot (exclusive Private, full, or fewer than 3 spots left) */
export function isSlotLockedForBasic(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  if (occupancy.hasPrivate) return true;
  if (occupancy.remainingBasicCapacity <= 0) return true;
  return occupancy.remainingBasicCapacity < BASIC_MIN_ADULTS;
}

/** True when Weekly Event cannot take this Saturday slot */
export function isSlotLockedForWeekly(occupancy?: SlotOccupancy | null): boolean {
  if (!occupancy) return false;
  return occupancy.hasPrivate;
}
