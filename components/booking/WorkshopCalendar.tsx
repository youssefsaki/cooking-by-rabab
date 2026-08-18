'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BOOKING_HORIZON_WEEKS,
  getUpcomingCalendarWeeks,
  isBasicSelectable,
  isWeeklyEventSlot,
  BASIC_MIN_ADULTS,
  type CalendarSlot,
} from '@/lib/booking/schedule';
import type { SlotOccupancy } from '@/lib/booking/conflicts';
import {
  isPeriodLockedForPrivate,
  isSharedSlotForPrivate,
  isSlotLockedForBasic,
  isSlotLockedForWeekly,
  leftoverSpotsForPrivateJoin,
} from '@/lib/booking/conflicts';
import {
  AVAILABILITY_CACHE_PREFIX,
  clearAvailabilityClientCache,
  fetchAvailability,
} from '@/lib/booking/availability-client';

interface WorkshopCalendarProps {
  onSelectSlot: (slot: CalendarSlot) => void;
  selectedSlotId?: string | null;
  /** Which package is booking — controls selectable slots + lock rules */
  mode?: 'basic' | 'private' | 'weekly';
}

const PERIOD_STYLES: Record<
  CalendarSlot['accent'],
  { bar: string; badge: string; soft: string }
> = {
  amber: {
    bar: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-800',
    soft: 'bg-amber-50/80',
  },
  green: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
    soft: 'bg-emerald-50/80',
  },
  blue: {
    bar: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-800',
    soft: 'bg-sky-50/80',
  },
  purple: {
    bar: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-800',
    soft: 'bg-violet-50/80',
  },
};

const AVAILABILITY_CACHE_TTL_MS = 15_000;

function occupancyCacheKey(from: string, to: string): string {
  return `${AVAILABILITY_CACHE_PREFIX}${from}:${to}`;
}

function readOccupancyCache(from: string, to: string): Record<string, SlotOccupancy> | null {
  try {
    const raw = sessionStorage.getItem(occupancyCacheKey(from, to));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; map: Record<string, SlotOccupancy> };
    if (!parsed?.map || Date.now() - parsed.at > AVAILABILITY_CACHE_TTL_MS) return null;
    return parsed.map;
  } catch {
    return null;
  }
}

function writeOccupancyCache(from: string, to: string, map: Record<string, SlotOccupancy>): void {
  try {
    sessionStorage.setItem(
      occupancyCacheKey(from, to),
      JSON.stringify({ at: Date.now(), map })
    );
  } catch {
    // Ignore quota / private mode
  }
}

function toOccupancyMap(items: SlotOccupancy[]): Record<string, SlotOccupancy> {
  const map: Record<string, SlotOccupancy> = {};
  items.forEach((item) => {
    map[item.slotId] = item;
  });
  return map;
}

const WorkshopCalendar: React.FC<WorkshopCalendarProps> = ({
  onSelectSlot,
  selectedSlotId = null,
  mode = 'basic',
}) => {
  const weeks = useMemo(() => getUpcomingCalendarWeeks(BOOKING_HORIZON_WEEKS), []);
  const [weekIndex, setWeekIndex] = useState(0);
  const allDates = useMemo(() => weeks.flatMap((w) => w.days.map((d) => d.date)), [weeks]);
  const rangeFrom = allDates[0];
  const rangeTo = allDates[allDates.length - 1];

  const [occupancy, setOccupancy] = useState<Record<string, SlotOccupancy>>({});
  const [hasOccupancyData, setHasOccupancyData] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [error, setError] = useState('');

  const activeWeek = weeks[weekIndex] ?? weeks[0];

  useEffect(() => {
    if (!rangeFrom || !rangeTo) {
      setRefreshing(false);
      return;
    }

    let cancelled = false;
    setRefreshing(true);
    setError('');

    const cached = readOccupancyCache(rangeFrom, rangeTo);
    if (cached) {
      setOccupancy(cached);
      setHasOccupancyData(true);
    } else {
      setHasOccupancyData(false);
    }

    (async () => {
      try {
        const res = await fetchAvailability(rangeFrom, rangeTo);
        if (!res.ok) throw new Error('Failed to load availability');
        const data = (await res.json()) as { occupancy: SlotOccupancy[] };
        if (cancelled) return;
        const map = toOccupancyMap(data.occupancy);
        setOccupancy(map);
        setHasOccupancyData(true);
        writeOccupancyCache(rangeFrom, rangeTo, map);
        setError('');
      } catch (err) {
        console.error(err);
        if (cancelled) return;
        // Fallback to session cache if the network request fails
        const fallback = cached || readOccupancyCache(rangeFrom, rangeTo);
        if (fallback) {
          setOccupancy(fallback);
          setHasOccupancyData(true);
          setError('');
        } else {
          setError('Could not load slot availability. You can still browse the schedule.');
        }
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    })();

    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      clearAvailabilityClientCache();
      void fetchAvailability(rangeFrom, rangeTo)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { occupancy?: SlotOccupancy[] } | null) => {
          if (cancelled || !data?.occupancy) return;
          const map = toOccupancyMap(data.occupancy);
          setOccupancy(map);
          setHasOccupancyData(true);
          writeOccupancyCache(rangeFrom, rangeTo, map);
        })
        .catch(() => {
          // keep current occupancy
        });
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [rangeFrom, rangeTo]);

  const ready = hasOccupancyData || !!error;
  const showCalendar = ready;

  const isSlotBookableForMode = (slot: CalendarSlot): boolean => {
    if (mode === 'weekly') return isWeeklyEventSlot(slot);
    if (mode === 'private') {
      return slot.packageAllowed.includes('private') || slot.packageAllowed.includes('private-at-location');
    }
    return isBasicSelectable(slot);
  };

  const isSlotAvailable = (slot: CalendarSlot): boolean => {
    if (!ready) return false;
    if (!isSlotBookableForMode(slot)) return false;
    const info = occupancy[slot.id];
    if (mode === 'weekly') return !isSlotLockedForWeekly(info);
    if (mode === 'private') {
      return !isPeriodLockedForPrivate(info);
    }
    if (isSlotLockedForBasic(info)) return false;
    const spots = info?.remainingBasicCapacity ?? 13;
    const booked = info?.basicGuestCount ?? 0;
    // Once a group is open (3+ booked), allow joining with any remaining spots
    if (booked >= BASIC_MIN_ADULTS) return spots >= 1;
    // Empty / not yet open: need room for a starter group of 3
    return spots >= BASIC_MIN_ADULTS;
  };

  /** Weekly Event openness — independent of the package currently being booked. */
  const isWeeklySlotOpen = (slot: CalendarSlot): boolean => {
    if (!ready) return false;
    return !isSlotLockedForWeekly(occupancy[slot.id]);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 mb-3">
          {mode === 'weekly'
            ? 'Saturday Weekly Event'
            : mode === 'private'
              ? 'Private Workshop Availability'
              : 'Weekly Workshop Schedule'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          {mode === 'weekly'
            ? 'Choose Your Saturday'
            : mode === 'private'
              ? 'Choose Your Private Slot'
              : 'Choose Your Day'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {mode === 'weekly'
            ? 'Only Saturdays are bookable for the Weekly Event. Browse up to about three months ahead.'
            : mode === 'private'
              ? 'Empty days are exclusive to your group. Days with guests already booked show spots left — you join them. Book up to about three months ahead.'
              : 'Browse upcoming weeks and book a morning or afternoon workshop up to about three months ahead. Pick-up from Taghazout Mosque is included.'}
        </p>
      </div>

      {!showCalendar ? (
        <div
          className="flex flex-col items-center justify-center gap-4 py-20 sm:py-28"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-amber-100 border-t-amber-600" />
          <p className="text-sm font-semibold text-gray-600">Loading availability…</p>
        </div>
      ) : (
        <>
      {weeks.length > 0 && (
        <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto mb-8 rounded-2xl bg-white border border-gray-100 px-3 py-2.5 shadow-sm">
          <button
            type="button"
            onClick={() => setWeekIndex((i) => Math.max(0, i - 1))}
            disabled={weekIndex === 0}
            className="px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-amber-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous week"
          >
            ← Prev
          </button>
          <div className="text-center min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Week {weekIndex + 1} of {weeks.length}
            </p>
            <p className="text-sm sm:text-base font-black text-gray-900 truncate">
              {activeWeek?.label}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWeekIndex((i) => Math.min(weeks.length - 1, i + 1))}
            disabled={weekIndex >= weeks.length - 1}
            className="px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-amber-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Next week"
          >
            Next →
          </button>
        </div>
      )}

      {error && <p className="text-center text-sm text-amber-700 mb-6">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">

        {(activeWeek?.days ?? []).map((day) => {
          const daySelected = day.slots.some((s) => s.id === selectedSlotId);
          const hasWeekly = day.slots.some(isWeeklyEventSlot);
          const saturdayOnlyLocked = mode === 'weekly' && !hasWeekly;

          return (
            <article
              key={day.date}
              className={`flex flex-col rounded-3xl bg-white p-4 sm:p-5 shadow-sm border transition-all ${
                saturdayOnlyLocked
                  ? 'border-gray-100 opacity-45 pointer-events-none'
                  : daySelected
                    ? 'border-amber-500 ring-2 ring-amber-200'
                    : hasWeekly
                      ? 'border-violet-200'
                      : 'border-gray-100'
              }`}
            >
              <header className="mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      {day.weekday}
                    </p>
                    <p className="text-4xl font-black text-gray-900 leading-none mt-1">
                      {day.dayNumber}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{day.month}</p>
                  </div>
                  {hasWeekly && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-violet-100 text-violet-800">
                      Weekly Event
                    </span>
                  )}
                  {saturdayOnlyLocked && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                      Not available
                    </span>
                  )}
                </div>
              </header>

              <div className="space-y-3 flex-1">
                {day.slots.map((slot) => {
                  const styles = PERIOD_STYLES[slot.accent];
                  const weeklyOnly = isWeeklyEventSlot(slot);
                  const available = isSlotAvailable(slot);
                  const selected = selectedSlotId === slot.id;
                  const info = occupancy[slot.id];
                  const spots = info?.remainingBasicCapacity ?? 13;
                  const bookedCount = info?.basicGuestCount ?? 0;
                  const leftover = ready ? leftoverSpotsForPrivateJoin(info) : 0;
                  const joining = ready && mode === 'private' && isSharedSlotForPrivate(info);

                  if (weeklyOnly) {
                    const weeklyOpen = isWeeklySlotOpen(slot);
                    const weeklyUnavailableReason = info?.locked
                      ? 'Unavailable — this date is blocked'
                      : info?.hasPrivate
                        ? 'Unavailable — private booking holds this slot'
                        : 'Unavailable';

                    if (mode === 'weekly') {
                      return (
                        <div
                          key={slot.id}
                          className={`rounded-2xl border overflow-hidden transition-all ${
                            selected
                              ? 'border-violet-400 ring-2 ring-violet-200'
                              : 'border-violet-100'
                          } ${weeklyOpen ? styles.soft : 'bg-gray-50 opacity-60'}`}
                        >
                          <div className={`h-1 w-full ${weeklyOpen ? styles.bar : 'bg-gray-300'}`} />
                          <div className="p-3.5">
                            <span
                              className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${styles.badge}`}
                            >
                              Weekly Event
                            </span>
                            <p className="text-xs text-gray-600 mt-2 font-medium">
                              {slot.startTime} – {slot.endTime}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{slot.feastNote}</p>
                            <p className="text-sm font-semibold text-gray-900 mt-2 leading-snug">
                              {slot.dish}
                            </p>
                            <p
                              className={`text-[11px] mt-2 font-semibold ${
                                !ready
                                  ? 'text-gray-400'
                                  : weeklyOpen
                                    ? 'text-violet-700'
                                    : 'text-gray-500'
                              }`}
                            >
                              {!ready
                                ? 'Checking…'
                                : weeklyOpen
                                  ? 'Fixed time · 80 € / person'
                                  : weeklyUnavailableReason}
                            </p>
                            <button
                              type="button"
                              disabled={!ready || !weeklyOpen}
                              onClick={() => onSelectSlot(slot)}
                              className={`mt-3.5 w-full rounded-xl text-sm font-bold py-2.5 transition-colors ${
                                ready && weeklyOpen
                                  ? 'bg-violet-600 hover:bg-violet-700 text-white'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {!ready ? 'Checking…' : weeklyOpen ? 'Book' : 'Unavailable'}
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={slot.id}
                        className={`rounded-2xl border overflow-hidden ${
                          weeklyOpen
                            ? `border-violet-100 ${styles.soft} opacity-90`
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className={`h-1 w-full ${weeklyOpen ? styles.bar : 'bg-gray-300'}`} />
                        <div className="p-3.5">
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${styles.badge}`}
                          >
                            Weekly Event
                          </span>
                          <p className="text-xs text-gray-600 mt-2 font-medium">
                            {slot.startTime} – {slot.endTime}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{slot.feastNote}</p>
                          <p className="text-sm font-semibold text-gray-900 mt-2 leading-snug">
                            {slot.dish}
                          </p>
                          {!ready ? (
                            <p className="mt-3.5 text-center text-sm font-bold text-gray-400 py-2.5">
                              Checking…
                            </p>
                          ) : weeklyOpen ? (
                            <Link
                              href="/book?package=weekly-event"
                              className="mt-3.5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-2.5 transition-colors"
                            >
                              Book Weekly Event
                            </Link>
                          ) : (
                            <>
                              <p className="text-[11px] mt-2 font-semibold text-gray-500">
                                {weeklyUnavailableReason}
                              </p>
                              <button
                                type="button"
                                disabled
                                className="mt-3.5 w-full rounded-xl text-sm font-bold py-2.5 bg-gray-200 text-gray-500 cursor-not-allowed"
                              >
                                Unavailable
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (mode === 'weekly') {
                    return (
                      <div
                        key={slot.id}
                        className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 opacity-50 p-3.5"
                      >
                        <p className="text-xs font-semibold text-gray-500 capitalize">{slot.period}</p>
                        <p className="text-sm text-gray-600 mt-1">{slot.dish}</p>
                        <p className="text-[11px] text-gray-400 mt-2">Not a Weekly Event slot</p>
                      </div>
                    );
                  }

                  if (mode === 'basic' && leftover > 0) {
                    return (
                      <div
                        key={slot.id}
                        className="rounded-2xl border border-amber-200 overflow-hidden bg-gradient-to-b from-amber-50 to-white"
                      >
                        <div className="h-1 w-full bg-amber-400" />
                        <div className="p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full capitalize bg-amber-100 text-amber-800">
                              {slot.period}
                            </span>
                            <span className="text-[11px] font-semibold text-gray-500">
                              {slot.startTime}–{slot.endTime}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{slot.feastNote}</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1.5 leading-snug">
                            {slot.dish}
                          </p>
                          <div className="mt-3 rounded-xl bg-white border border-amber-200 px-3 py-2.5">
                            <p className="text-sm font-bold text-amber-900 leading-snug">
                              {leftover} spot{leftover === 1 ? '' : 's'} left
                            </p>
                            <p className="text-[11px] text-amber-800/80 mt-1 leading-relaxed">
                              Not enough room to start a new Basic group (needs 3 guests). Join
                              with the Private package instead.
                            </p>
                          </div>
                          <Link
                            href="/book?package=private"
                            className="mt-3.5 inline-flex w-full items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-2.5 transition-colors shadow-sm"
                          >
                            Join via Private
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={slot.id}
                      className={`rounded-2xl border overflow-hidden transition-all ${
                        selected
                          ? 'border-amber-400 ring-2 ring-amber-200'
                          : joining
                            ? 'border-emerald-200'
                            : 'border-gray-100'
                      } ${
                        !ready
                          ? styles.soft
                          : available
                            ? joining
                              ? 'bg-emerald-50/70'
                              : styles.soft
                            : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div
                        className={`h-1 w-full ${
                          !ready
                            ? 'bg-amber-300 animate-pulse'
                            : available
                              ? joining
                                ? 'bg-emerald-500'
                                : styles.bar
                              : 'bg-gray-300'
                        }`}
                      />
                      <div className="p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full capitalize ${
                              !ready
                                ? styles.badge
                                : available
                                  ? joining
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : styles.badge
                                  : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {slot.period}
                          </span>
                          <span className="text-[11px] font-semibold text-gray-500">
                            {slot.startTime}–{slot.endTime}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{slot.feastNote}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1.5 leading-snug">
                          {slot.dish}
                        </p>

                        {!ready ? (
                          <p className="text-[11px] mt-2 font-semibold text-gray-400">Checking spots…</p>
                        ) : mode === 'private' && available && joining ? (
                          <div className="mt-3 rounded-xl bg-white/90 border border-emerald-200 px-3 py-2.5 space-y-1">
                            <p className="text-sm font-bold text-emerald-900 leading-snug">
                              {bookedCount} already booked
                            </p>
                            <p className="text-[11px] font-semibold text-emerald-800">
                              {spots} spot{spots === 1 ? '' : 's'} left · you’ll join them
                            </p>
                          </div>
                        ) : (
                          <p
                            className={`text-[11px] mt-2 font-semibold ${
                              available ? 'text-amber-700' : 'text-gray-500'
                            }`}
                          >
                            {available
                              ? mode === 'private'
                                ? 'Available · Exclusive private'
                                : `${spots} spots left · From 65 €`
                              : info?.locked
                                ? 'Unavailable — this date is blocked'
                                : info?.hasPrivate
                                  ? 'Reserved — exclusive private'
                                  : 'Fully booked'}
                          </p>
                        )}

                        <button
                          type="button"
                          disabled={!ready || !available}
                          onClick={() => onSelectSlot(slot)}
                          className={`mt-3.5 w-full rounded-xl text-sm font-bold py-2.5 transition-all ${
                            ready && available
                              ? joining
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {!ready
                            ? 'Checking…'
                            : available
                              ? joining
                                ? 'Join this workshop'
                                : 'Book'
                              : info?.locked
                                ? 'Unavailable'
                                : 'Fully booked'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      {weeks.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {weeks.map((week, i) => (
            <button
              key={week.weekStart}
              type="button"
              onClick={() => setWeekIndex(i)}
              aria-label={`Show week ${week.label}`}
              className={`h-2 rounded-full transition-all ${
                i === weekIndex ? 'w-6 bg-amber-500' : 'w-2 bg-gray-300 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-10 rounded-3xl bg-[#F7F2EA] border border-amber-100 p-5 sm:p-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800 mb-3">
          Pick-up Information
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-semibold">Morning workshops (10:00–14:00):</span> pick-up at 09:30
            in front of Taghazout Mosque
          </li>
          <li>
            <span className="font-semibold">Afternoon workshops (15:00–19:00 / 19:30):</span> pick-up
            at 14:30 in front of Taghazout Mosque
          </li>
          <li>
            <span className="font-semibold">Saturday Weekly Event:</span> pick-up at 14:30 in front
            of Taghazout Mosque — music + BBQ feast (not a Basic class), listed every week
          </li>
        </ul>
      </div>
        </>
      )}
    </div>
  );
};

export default WorkshopCalendar;
