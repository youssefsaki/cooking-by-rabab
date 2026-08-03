'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getUpcomingCalendarWeeks,
  isBasicSelectable,
  isWeeklyEventSlot,
  type CalendarSlot,
} from '@/lib/booking/schedule';
import type { SlotOccupancy } from '@/lib/booking/conflicts';
import {
  isPeriodLockedForPrivate,
  isSlotLockedForBasic,
  isSlotLockedForWeekly,
} from '@/lib/booking/conflicts';

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

const WorkshopCalendar: React.FC<WorkshopCalendarProps> = ({
  onSelectSlot,
  selectedSlotId = null,
  mode = 'basic',
}) => {
  const weeks = useMemo(() => getUpcomingCalendarWeeks(4), []);
  const [weekIndex, setWeekIndex] = useState(0);
  const [occupancy, setOccupancy] = useState<Record<string, SlotOccupancy>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const activeWeek = weeks[weekIndex] ?? weeks[0];
  const allDates = useMemo(() => weeks.flatMap((w) => w.days.map((d) => d.date)), [weeks]);
  const rangeFrom = allDates[0];
  const rangeTo = allDates[allDates.length - 1];

  useEffect(() => {
    if (!rangeFrom || !rangeTo) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/availability?from=${rangeFrom}&to=${rangeTo}`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to load availability');
        const data = (await res.json()) as { occupancy: SlotOccupancy[] };
        if (cancelled) return;
        const map: Record<string, SlotOccupancy> = {};
        data.occupancy.forEach((item) => {
          map[item.slotId] = item;
        });
        setOccupancy(map);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('Could not load slot availability. You can still browse the schedule.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [rangeFrom, rangeTo]);

  const isSlotBookableForMode = (slot: CalendarSlot): boolean => {
    if (mode === 'weekly') return isWeeklyEventSlot(slot);
    if (mode === 'private') {
      return slot.packageAllowed.includes('private') || slot.packageAllowed.includes('private-at-location');
    }
    return isBasicSelectable(slot);
  };

  const isSlotAvailable = (slot: CalendarSlot): boolean => {
    if (!isSlotBookableForMode(slot)) return false;
    const info = occupancy[slot.id];
    if (mode === 'weekly') return !isSlotLockedForWeekly(info);
    if (mode === 'private') {
      return !isPeriodLockedForPrivate(info);
    }
    // Basic: lock when Private holds it, or fewer than 3 spots remain
    if (isSlotLockedForBasic(info)) return false;
    const spots = info?.remainingBasicCapacity ?? 13;
    return spots >= 3;
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
            ? 'Only Saturdays are bookable for the Weekly Event. Other days are shown for context but cannot be selected.'
            : mode === 'private'
              ? 'Pick an open morning or afternoon. Fully booked Basic workshops and other Private holds are locked — choose another day.'
              : 'Browse upcoming weeks and book a morning or afternoon workshop. Pick-up from Taghazout Mosque is included.'}
        </p>
      </div>

      {/* Week navigator — dynamic weeks always include Saturday Weekly Event */}
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

      {loading && (
        <p className="text-center text-sm text-gray-500 mb-6">Checking availability…</p>
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

                  if (weeklyOnly) {
                    if (mode === 'weekly') {
                      const weeklyOpen = isSlotAvailable(slot);
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
                                weeklyOpen ? 'text-violet-700' : 'text-gray-500'
                              }`}
                            >
                              {weeklyOpen ? 'Fixed time · 80 € / person' : 'Unavailable — private booking holds this slot'}
                            </p>
                            <button
                              type="button"
                              disabled={!weeklyOpen}
                              onClick={() => onSelectSlot(slot)}
                              className={`mt-3.5 w-full rounded-xl text-sm font-bold py-2.5 transition-colors ${
                                weeklyOpen
                                  ? 'bg-violet-600 hover:bg-violet-700 text-white'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {weeklyOpen ? 'Book' : 'Unavailable'}
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={slot.id}
                        className={`rounded-2xl border border-violet-100 overflow-hidden ${styles.soft} opacity-90`}
                      >
                        <div className={`h-1 w-full ${styles.bar}`} />
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
                          <Link
                            href="/book?package=weekly-event"
                            className="mt-3.5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-2.5 transition-colors"
                          >
                            Book Weekly Event
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  // Non-weekly slots: hide Book CTA when this calendar is weekly-only mode
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

                  return (
                    <div
                      key={slot.id}
                      className={`rounded-2xl border overflow-hidden transition-all ${
                        selected
                          ? 'border-amber-400 ring-2 ring-amber-200'
                          : 'border-gray-100'
                      } ${available ? styles.soft : 'bg-gray-50 opacity-60'}`}
                    >
                      <div className={`h-1 w-full ${available ? styles.bar : 'bg-gray-300'}`} />
                      <div className="p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full capitalize ${
                              available ? styles.badge : 'bg-gray-200 text-gray-600'
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
                        <p
                          className={`text-[11px] mt-2 font-semibold ${
                            available ? 'text-amber-700' : 'text-gray-500'
                          }`}
                        >
                          {available
                            ? mode === 'private'
                              ? 'Available for private · Exclusive'
                              : `${spots} spots left · From 65 €`
                            : 'Fully booked'}
                        </p>
                        <button
                          type="button"
                          disabled={!available}
                          onClick={() => onSelectSlot(slot)}
                          className={`mt-3.5 w-full rounded-xl text-sm font-bold py-2.5 transition-all ${
                            available
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {available ? 'Book' : 'Fully booked'}
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

      {/* Week dots */}
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
            <span className="font-semibold">Afternoon workshops (14:00–18:00 / 19:30):</span> pick-up
            at 13:30 in front of Taghazout Mosque
          </li>
          <li>
            <span className="font-semibold">Saturday Weekly Event:</span> always listed each week —
            music + BBQ feast (not a Basic class)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorkshopCalendar;
