'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatDateISO, parseDateISO, type CalendarSlot } from '@/lib/booking/schedule';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface BookingDayCalendarProps {
  slots: CalendarSlot[];
  selectedSlotId?: string | null;
  isClosed?: (slot: CalendarSlot) => boolean;
  onSelect: (slot: CalendarSlot) => void;
  /** Shown instead of the grid until dish and time are chosen. */
  lockedMessage?: string | null;
}

function monthKey(year: number, month: number): string {
  return `${year}-${month}`;
}

function monthFromDate(iso: string): { year: number; month: number } {
  const date = parseDateISO(iso);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export default function BookingDayCalendar({
  slots,
  selectedSlotId = null,
  isClosed,
  onSelect,
  lockedMessage = null,
}: BookingDayCalendarProps) {
  const slotsByDate = useMemo(() => {
    const map = new Map<string, CalendarSlot>();
    slots.forEach((slot) => map.set(slot.date, slot));
    return map;
  }, [slots]);

  const bounds = useMemo(() => {
    if (!slots.length) return null;
    return {
      start: monthFromDate(slots[0].date),
      end: monthFromDate(slots[slots.length - 1].date),
    };
  }, [slots]);

  const [cursor, setCursor] = useState(() =>
    slots[0] ? monthFromDate(slots[0].date) : { year: new Date().getFullYear(), month: new Date().getMonth() }
  );

  const slotsKey = slots.map((slot) => slot.date).join('|');
  useEffect(() => {
    const selected = slots.find((slot) => slot.id === selectedSlotId);
    const anchor = selected?.date || slots[0]?.date;
    if (!anchor) return;
    setCursor(monthFromDate(anchor));
    // Only jump months when the available days change, not while browsing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotsKey]);

  const weeks = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const lead = first.getDay();
    const cells: Date[] = [];
    for (let i = 0; i < lead; i += 1) {
      cells.push(new Date(cursor.year, cursor.month, 1 - (lead - i)));
    }
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(cursor.year, cursor.month, day));
    }
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1];
      cells.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
    }
    const rows: Date[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [cursor]);

  const title = new Date(cursor.year, cursor.month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const atStart = bounds ? monthKey(cursor.year, cursor.month) === monthKey(bounds.start.year, bounds.start.month) : true;
  const atEnd = bounds ? monthKey(cursor.year, cursor.month) === monthKey(bounds.end.year, bounds.end.month) : true;

  function shiftMonth(delta: number) {
    setCursor((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  if (lockedMessage) {
    return (
      <div
        id="booking-day"
        className="rounded-3xl border-2 border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500"
      >
        {lockedMessage}
      </div>
    );
  }

  return (
    <div id="booking-day" className="mx-auto w-full max-w-sm rounded-3xl border-2 border-amber-100 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={atStart}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-base font-black text-gray-900">{title}</p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={atEnd}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-label="Choose a day">
        {WEEKDAYS.map((label) => (
          <div key={label} className="pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
            {label}
          </div>
        ))}
        {weeks.flat().map((date) => {
          const iso = formatDateISO(date);
          const inMonth = date.getMonth() === cursor.month;
          const slot = inMonth ? slotsByDate.get(iso) : undefined;
          const closed = slot ? Boolean(isClosed?.(slot)) : false;
          const selected = slot?.id === selectedSlotId;
          const label = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          if (!slot) {
            return (
              <div
                key={iso + (inMonth ? '' : '-out')}
                className={`flex h-10 items-center justify-center text-sm ${
                  inMonth ? 'text-gray-300' : 'text-gray-200'
                }`}
              >
                {date.getDate()}
              </div>
            );
          }

          return (
            <button
              key={slot.id}
              type="button"
              role="gridcell"
              aria-pressed={selected}
              aria-label={closed ? `${label}, full` : label}
              disabled={closed}
              onClick={() => onSelect(slot)}
              className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                selected
                  ? 'bg-amber-500 text-white shadow-sm'
                  : closed
                    ? 'cursor-not-allowed text-gray-300 line-through'
                    : 'text-gray-900 hover:bg-amber-50'
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
