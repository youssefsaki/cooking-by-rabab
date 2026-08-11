'use client';

import { useEffect, useMemo, useState } from 'react';
import { Ban, CalendarOff, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PACKAGE_CAPACITY_LABELS,
  type BlockedDateRow,
  type PackageCapacityRow,
} from '@/lib/availability';
import type { PackageType } from '@/lib/booking/schedule';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function AccentWave() {
  return (
    <svg className="mt-1.5 h-2 w-7 text-[var(--admin-accent)]" viewBox="0 0 40 10" fill="none" aria-hidden>
      <path
        d="M1 6.5C4.5 2.5 7.5 2.5 11 6.5C14.5 10.5 17.5 10.5 21 6.5C24.5 2.5 27.5 2.5 31 6.5C34.5 10.5 37 9 39 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function toIsoDate(year: number, monthIndex: number, day: number) {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function buildMonthCells(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const mondayIndex = (first.getDay() + 6) % 7;
  const cells: ({ day: number; iso: string } | null)[] = [];

  for (let i = 0; i < mondayIndex; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, iso: toIsoDate(year, monthIndex, day) });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function AdminAvailabilityPage() {
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [blockedDates, setBlockedDates] = useState<BlockedDateRow[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [capacities, setCapacities] = useState<PackageCapacityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [capacityDraft, setCapacityDraft] = useState<Record<string, string>>({});

  const blockedByDate = useMemo(() => {
    const map = new Map<string, BlockedDateRow>();
    for (const row of blockedDates) map.set(row.date, row);
    return map;
  }, [blockedDates]);

  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const selectedToBlock = useMemo(
    () => selected.filter((iso) => !blockedByDate.has(iso)),
    [selected, blockedByDate]
  );
  const selectedToUnblock = useMemo(
    () =>
      selected
        .map((iso) => blockedByDate.get(iso))
        .filter((row): row is BlockedDateRow => Boolean(row)),
    [selected, blockedByDate]
  );

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/availability');
    const data = await res.json();
    if (!data.ok) {
      setError(data.error || 'Failed to load');
    } else {
      setBlockedDates(data.blockedDates || []);
      setBookedDates(data.bookedDates || []);
      const caps = (data.capacities || []) as PackageCapacityRow[];
      setCapacities(caps);
      const draft: Record<string, string> = {};
      for (const row of caps) {
        draft[row.package_type] = String(row.max_guests);
      }
      setCapacityDraft(draft);
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const cells = useMemo(
    () => buildMonthCells(cursor.year, cursor.month),
    [cursor.year, cursor.month]
  );

  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  function shiftMonth(delta: number) {
    setCursor((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  function toggleDay(iso: string) {
    setSelected((prev) =>
      prev.includes(iso) ? prev.filter((value) => value !== iso) : [...prev, iso].sort()
    );
    setStatus('');
    setError('');
  }

  function clearSelection() {
    setSelected([]);
    setReason('');
  }

  async function blockSelected() {
    if (selectedToBlock.length === 0) return;
    setSaving(true);
    setStatus('');
    setError('');
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dates: selectedToBlock, reason }),
    });
    const data = await res.json();
    setSaving(false);
    if (!data.ok) {
      setError(data.error || 'Could not block dates');
      return;
    }
    setStatus(
      `Blocked ${data.count ?? selectedToBlock.length} day${
        (data.count ?? selectedToBlock.length) === 1 ? '' : 's'
      }.`
    );
    clearSelection();
    await load();
  }

  async function unblockSelected() {
    if (selectedToUnblock.length === 0) return;
    setSaving(true);
    setStatus('');
    setError('');

    const results = await Promise.all(
      selectedToUnblock.map((row) =>
        fetch(`/api/admin/availability/${row.id}`, { method: 'DELETE' }).then((r) => r.json())
      )
    );
    setSaving(false);

    const failed = results.find((row) => !row.ok);
    if (failed) {
      setError(failed.error || 'Could not unblock some dates');
      await load();
      return;
    }

    setStatus(
      `Unblocked ${selectedToUnblock.length} day${selectedToUnblock.length === 1 ? '' : 's'}.`
    );
    clearSelection();
    await load();
  }

  async function saveCapacity(packageType: PackageType) {
    setStatus('');
    setError('');
    const maxGuests = Number(capacityDraft[packageType]);
    const res = await fetch('/api/admin/availability', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package_type: packageType, max_guests: maxGuests }),
    });
    const data = await res.json();
    if (!data.ok) {
      setError(data.error || 'Could not update capacity');
      return;
    }
    setStatus(`Updated capacity for ${PACKAGE_CAPACITY_LABELS[packageType]}.`);
    await load();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}
      {status && (
        <div className="rounded-xl border border-[var(--admin-accent)]/30 bg-[var(--admin-accent-soft)] px-3 py-2.5 text-sm text-[var(--admin-accent-strong)]">
          {status}
        </div>
      )}

      <section className="admin-card overflow-hidden p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="admin-focus grid size-7 place-items-center rounded-md text-[var(--admin-muted)] hover:bg-[var(--admin-surface-soft)] hover:text-[var(--admin-ink)]"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--admin-accent)]">
                {monthLabel}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="admin-focus grid size-7 place-items-center rounded-md text-[var(--admin-muted)] hover:bg-[var(--admin-surface-soft)] hover:text-[var(--admin-ink)]"
                aria-label="Next month"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
            <h1 className="admin-display mt-0.5 text-2xl text-[var(--admin-ink)]">Calendar</h1>
            <AccentWave />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="admin-focus rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"
              >
                Clear
              </button>
            )}
            {selectedToUnblock.length > 0 && (
              <button
                type="button"
                disabled={saving}
                onClick={unblockSelected}
                className="admin-focus inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--admin-copy)] hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
              >
                Unblock {selectedToUnblock.length}
              </button>
            )}
            <button
              type="button"
              disabled={saving || selectedToBlock.length === 0}
              onClick={blockSelected}
              className="admin-focus inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--admin-copy)] enabled:border-[var(--admin-accent)] enabled:bg-[var(--admin-accent)] enabled:text-[var(--admin-on-accent)] disabled:opacity-50"
            >
              <Ban className="size-3.5" />
              {selectedToBlock.length > 0
                ? `Block ${selectedToBlock.length} day${selectedToBlock.length === 1 ? '' : 's'}`
                : 'Block dates'}
            </button>
          </div>
        </div>

        <p className="mt-2 text-xs text-[var(--admin-muted)]">
          Click days to multi-select, then block or unblock them together.
        </p>

        <div className="mx-auto mt-4 max-w-[420px]">
          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="pb-0.5 text-center text-[10px] font-medium text-[var(--admin-muted)]"
              >
                {day}
              </div>
            ))}

            {cells.map((cell, index) => {
              if (!cell) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const blocked = blockedByDate.has(cell.iso);
              const hasBookings = bookedSet.has(cell.iso);
              const isSelected = selectedSet.has(cell.iso);

              return (
                <button
                  key={cell.iso}
                  type="button"
                  disabled={saving || loading}
                  onClick={() => toggleDay(cell.iso)}
                  className={`admin-focus relative flex aspect-square flex-col items-center justify-center rounded-xl border text-[11px] transition sm:text-xs ${
                    blocked
                      ? 'border-transparent bg-[#ececeb] text-[#9a9a98]'
                      : 'border-[var(--admin-line)] bg-white text-[#5c5c5a] hover:border-[var(--admin-accent)]/45'
                  } ${
                    isSelected
                      ? 'border-[var(--admin-accent)] bg-[var(--admin-accent-soft)] ring-2 ring-[var(--admin-accent)]/35'
                      : ''
                  } ${saving ? 'opacity-70' : ''}`}
                  aria-pressed={isSelected}
                  aria-label={`${cell.iso}${blocked ? ', blocked' : ''}${hasBookings ? ', has bookings' : ''}`}
                >
                  <span className="font-medium tabular-nums leading-none">{cell.day}</span>
                  <span className="mt-1 flex h-2.5 items-center justify-center">
                    {blocked ? (
                      <CalendarOff className="size-2.5 opacity-70" strokeWidth={2.2} />
                    ) : hasBookings ? (
                      <span className="size-1 rounded-full bg-[var(--admin-accent)]" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[var(--admin-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[var(--admin-accent)]" />
              Has bookings
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarOff className="size-3" />
              Blocked
            </span>
            {selected.length > 0 && (
              <span className="font-medium text-[var(--admin-accent-strong)]">
                {selected.length} selected
              </span>
            )}
            {loading && <span>Loading…</span>}
          </div>
        </div>

        {selectedToBlock.length > 0 && (
          <div className="mt-4 rounded-xl border border-[var(--admin-line)] bg-[var(--admin-surface-soft)] p-3">
            <p className="text-xs font-semibold text-[var(--admin-ink)]">
              Block {selectedToBlock.length} selected day
              {selectedToBlock.length === 1 ? '' : 's'}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional reason for all selected days"
                maxLength={240}
                className="admin-focus flex-1 rounded-lg border border-[var(--admin-line-strong)] bg-white px-2.5 py-1.5 text-xs"
              />
              <button
                type="button"
                disabled={saving}
                onClick={blockSelected}
                className="admin-focus rounded-lg bg-[var(--admin-accent)] px-3 py-1.5 text-xs font-bold text-[var(--admin-on-accent)] disabled:opacity-60"
              >
                Confirm block
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-[var(--admin-line)] px-4 py-3 sm:px-5">
          <h2 className="admin-display text-xl text-[var(--admin-ink)]">Package capacity</h2>
          <p className="mt-0.5 text-[11px] text-[var(--admin-muted)]">
            Amazigh cooking capacity also sets the shared workshop guest limit.
          </p>
        </div>
        <div className="divide-y divide-[var(--admin-line)]">
          {capacities.map((row) => (
            <div
              key={row.package_type}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-5"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--admin-ink)]">
                  {PACKAGE_CAPACITY_LABELS[row.package_type]}
                </p>
                <p className="text-[11px] text-[var(--admin-muted)]">{row.package_type}</p>
              </div>
              <div className="flex items-end gap-2">
                <label className="text-sm">
                  <span className="mb-1 block text-[10px] font-medium text-[var(--admin-muted)]">
                    Max guests
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={capacityDraft[row.package_type] ?? ''}
                    onChange={(e) =>
                      setCapacityDraft((prev) => ({
                        ...prev,
                        [row.package_type]: e.target.value,
                      }))
                    }
                    className="admin-focus w-20 rounded-lg border border-[var(--admin-line-strong)] bg-white px-2.5 py-1.5 text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => saveCapacity(row.package_type)}
                  className="admin-focus rounded-lg bg-[var(--admin-ink)] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
          {!loading && capacities.length === 0 && (
            <p className="p-4 text-sm text-[var(--admin-muted)]">
              No capacity rows found. Run migration 007 in Supabase if needed.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
