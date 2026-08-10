export type SlotPeriod = 'morning' | 'afternoon';

export type PackageType = 'basic' | 'weekly-event' | 'private' | 'private-at-location';

export type MenuCategory = 'tagine' | 'msemen' | 'couscous' | 'rfissa';

export interface WorkshopSlotTemplate {
  period: SlotPeriod;
  startTime: string;
  endTime: string;
  dish: string;
  feastNote: string;
  /** Which booking menu to show after selecting this slot */
  menuCategory: MenuCategory | null;
  packageAllowed: PackageType[];
  accent: 'amber' | 'green' | 'blue' | 'purple';
}

export interface PickupInfo {
  time: string;
  meetingPoint: string;
}

export interface CalendarSlot extends WorkshopSlotTemplate {
  id: string;
  date: string; // YYYY-MM-DD
  weekday: string;
  dayNumber: number;
  month: string;
  pickup: PickupInfo;
}

const PICKUP: Record<SlotPeriod, PickupInfo> = {
  morning: {
    time: '09:30',
    meetingPoint: 'In front of Taghazout Mosque',
  },
  afternoon: {
    time: '13:30',
    meetingPoint: 'In front of Taghazout Mosque',
  },
};

/** Day of week: 0 = Sunday … 6 = Saturday */
const WEEKLY_SCHEDULE: Record<number, WorkshopSlotTemplate[]> = {
  1: [
    {
      period: 'morning',
      startTime: '10:00',
      endTime: '14:00',
      dish: 'Choose Your Tagine',
      feastNote: 'Includes Full Lunch Feast',
      menuCategory: 'tagine',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'amber',
    },
  ],
  2: [
    {
      period: 'morning',
      startTime: '10:00',
      endTime: '14:00',
      dish: 'Choose Your Tagine',
      feastNote: 'Includes Full Lunch Feast',
      menuCategory: 'tagine',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'amber',
    },
  ],
  3: [
    {
      period: 'afternoon',
      startTime: '14:00',
      endTime: '18:00',
      dish: 'Choose Your Tagine',
      feastNote: 'Includes Full Dinner Feast',
      menuCategory: 'tagine',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'green',
    },
  ],
  4: [
    {
      period: 'morning',
      startTime: '10:00',
      endTime: '14:00',
      dish: 'Msemen Wrap Experience',
      feastNote: 'Includes Full Lunch Feast',
      menuCategory: 'msemen',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'blue',
    },
  ],
  5: [
    {
      period: 'morning',
      startTime: '10:00',
      endTime: '14:00',
      dish: 'Holy Day Couscous Feast',
      feastNote: 'Includes Traditional Friday Lunch',
      menuCategory: 'couscous',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'amber',
    },
    {
      period: 'afternoon',
      startTime: '14:00',
      endTime: '18:00',
      dish: 'Holy Day Couscous Feast',
      feastNote: 'Includes Full Dinner Feast',
      menuCategory: 'couscous',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'green',
    },
  ],
  6: [
    {
      period: 'afternoon',
      startTime: '14:00',
      endTime: '19:30',
      dish: 'Traditional BBQ Grilled in the Clay Oven & Freshly Baked Traditional Bread',
      feastNote: 'Includes Live Performance & Feast',
      menuCategory: null,
      packageAllowed: ['weekly-event'],
      accent: 'purple',
    },
  ],
  0: [
    {
      period: 'morning',
      startTime: '10:00',
      endTime: '14:00',
      dish: 'Rfissa Celebration',
      feastNote: 'Includes Special Morning Feast',
      menuCategory: 'rfissa',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'amber',
    },
    {
      period: 'afternoon',
      startTime: '14:00',
      endTime: '18:00',
      dish: 'Choose Your Tagine',
      feastNote: 'Includes Full Dinner Feast',
      menuCategory: 'tagine',
      packageAllowed: ['basic', 'private', 'private-at-location'],
      accent: 'green',
    },
  ],
};

export const BASIC_ADULT_PRICE_EUR = 65;
export const BASIC_MAX_GUESTS = 13;
export const BASIC_MIN_ADULTS = 3;
export const PRIVATE_WORKSHOP_PRICE_EUR = 80;
export const PRIVATE_WORKSHOP_MIN_ADULTS = 2;
export const PRIVATE_AT_LOCATION_PRICE_EUR = 100;
export const PRIVATE_AT_LOCATION_MIN_ADULTS = 6;
export const WEEKLY_EVENT_PRICE_EUR = 80;
export const WEEKLY_EVENT_MIN_ADULTS = 6;

export function minAdultsForPackage(packageType: PackageType): number {
  if (packageType === 'basic') return BASIC_MIN_ADULTS;
  if (packageType === 'private') return PRIVATE_WORKSHOP_MIN_ADULTS;
  if (packageType === 'private-at-location') return PRIVATE_AT_LOCATION_MIN_ADULTS;
  if (packageType === 'weekly-event') return WEEKLY_EVENT_MIN_ADULTS;
  return 1;
}

/**
 * When Private joins a shared workshop with only 1–2 spots left, allow a party
 * up to those remaining spots (even below the package’s usual minimum).
 */
export function effectiveMinAdultsForPrivate(
  packageType: PackageType,
  remainingSpots: number,
  isJoining: boolean
): number {
  const base = minAdultsForPackage(packageType);
  if (!isJoining) return base;
  return Math.min(base, Math.max(1, remainingSpots));
}

/**
 * Basic package minimum:
 * - Empty / not yet open (< 3 guests booked): need enough adults to reach 3
 * - Once 3+ guests are already booked: individuals (1 adult) can join
 */
export function effectiveMinAdultsForBasic(
  bookedGuestCount: number,
  remainingSpots: number
): number {
  if (remainingSpots <= 0) return BASIC_MIN_ADULTS;
  if (bookedGuestCount >= BASIC_MIN_ADULTS) {
    return 1;
  }
  const neededToOpen = BASIC_MIN_ADULTS - Math.max(0, bookedGuestCount);
  return Math.min(neededToOpen, Math.max(1, remainingSpots));
}

/** Human-readable package name for Google Sheets / admin views */
export function packageTypeSheetLabel(packageType: PackageType): string {
  if (packageType === 'basic') return 'Basic';
  if (packageType === 'weekly-event') return 'Weekly Event';
  if (packageType === 'private') return 'Private at workshop';
  if (packageType === 'private-at-location') return 'Private at your location';
  return packageType;
}

/** Normalize sheet labels or raw codes back to PackageType */
export function parsePackageType(value: string): PackageType {
  const raw = value.trim().toLowerCase();
  if (raw === 'basic') return 'basic';
  if (raw === 'weekly-event' || raw === 'weekly event') return 'weekly-event';
  if (
    raw === 'private-at-location' ||
    raw === 'private at your location' ||
    raw.includes('at your location') ||
    raw.includes('comes to you')
  ) {
    return 'private-at-location';
  }
  if (
    raw === 'private' ||
    raw === 'private at workshop' ||
    raw.includes('at workshop') ||
    raw.includes('at our workshop')
  ) {
    return 'private';
  }
  // Fallback: treat unknown private-like values as workshop private
  if (raw.includes('private')) return 'private';
  return 'basic';
}

export function unitPriceForPackage(packageType: PackageType, dishPriceEur?: number): number {
  if (packageType === 'basic') return dishPriceEur ?? BASIC_ADULT_PRICE_EUR;
  if (packageType === 'private') return PRIVATE_WORKSHOP_PRICE_EUR;
  if (packageType === 'private-at-location') return PRIVATE_AT_LOCATION_PRICE_EUR;
  if (packageType === 'weekly-event') return WEEKLY_EVENT_PRICE_EUR;
  return BASIC_ADULT_PRICE_EUR;
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDateISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function buildSlotId(date: string, period: SlotPeriod): string {
  return `${date}|${period}`;
}

export function parseSlotId(id: string): { date: string; period: SlotPeriod } | null {
  const [date, period] = id.split('|');
  if (!date || (period !== 'morning' && period !== 'afternoon')) return null;
  return { date, period };
}

export function getPickupForPeriod(period: SlotPeriod): PickupInfo {
  return PICKUP[period];
}

export function getSlotsForDate(date: Date): CalendarSlot[] {
  const templates = WEEKLY_SCHEDULE[date.getDay()] ?? [];
  const iso = formatDateISO(date);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = date.getDate();

  return templates.map((template) => ({
    ...template,
    id: buildSlotId(iso, template.period),
    date: iso,
    weekday,
    dayNumber,
    month,
    pickup: PICKUP[template.period],
  }));
}

export function getSlotById(slotId: string): CalendarSlot | null {
  const parsed = parseSlotId(slotId);
  if (!parsed) return null;
  const date = parseDateISO(parsed.date);
  return getSlotsForDate(date).find((s) => s.period === parsed.period) ?? null;
}

export interface CalendarDay {
  date: string;
  weekday: string;
  dayNumber: number;
  month: string;
  slots: CalendarSlot[];
}

/** Upcoming calendar days (default 21 days from today). */
export function getUpcomingCalendarDays(dayCount = 21, fromDate = new Date()): CalendarDay[] {
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const days: CalendarDay[] = [];

  for (let i = 0; i < dayCount; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const slots = getSlotsForDate(date);
    if (!slots.length) continue;
    days.push({
      date: formatDateISO(date),
      weekday: slots[0].weekday,
      dayNumber: slots[0].dayNumber,
      month: slots[0].month,
      slots,
    });
  }

  return days;
}

export interface CalendarWeek {
  weekStart: string;
  weekEnd: string;
  label: string;
  days: CalendarDay[];
}

/** Monday–Sunday weeks starting from the week that contains `fromDate`. Always includes Saturday Weekly Event. */
export function getUpcomingCalendarWeeks(weekCount = 3, fromDate = new Date()): CalendarWeek[] {
  const today = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const day = today.getDay(); // 0 Sun … 6 Sat
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const firstMonday = new Date(today);
  firstMonday.setDate(today.getDate() + mondayOffset);

  const weeks: CalendarWeek[] = [];

  for (let w = 0; w < weekCount; w += 1) {
    const weekDays: CalendarDay[] = [];
    for (let d = 0; d < 7; d += 1) {
      const date = new Date(firstMonday);
      date.setDate(firstMonday.getDate() + w * 7 + d);
      // Skip past days before today (keep rest of current week, including Saturday)
      if (date < today) continue;
      const slots = getSlotsForDate(date);
      if (!slots.length) continue;
      weekDays.push({
        date: formatDateISO(date),
        weekday: slots[0].weekday,
        dayNumber: slots[0].dayNumber,
        month: slots[0].month,
        slots,
      });
    }

    if (!weekDays.length) continue;

    const weekStartDate = new Date(firstMonday);
    weekStartDate.setDate(firstMonday.getDate() + w * 7);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    const startLabel = weekStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endLabel = weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    weeks.push({
      weekStart: formatDateISO(weekStartDate),
      weekEnd: formatDateISO(weekEndDate),
      label: `${startLabel} – ${endLabel}`,
      days: weekDays,
    });
  }

  return weeks;
}

export function isBasicSelectable(slot: CalendarSlot): boolean {
  return slot.packageAllowed.includes('basic');
}

export function isWeeklyEventSlot(slot: CalendarSlot): boolean {
  return slot.packageAllowed.includes('weekly-event') && !slot.packageAllowed.includes('basic');
}
