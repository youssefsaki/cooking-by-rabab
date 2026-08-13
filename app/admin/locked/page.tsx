import { Lock } from 'lucide-react';

export default function AdminLockedPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center p-6">
      <div className="admin-card max-w-sm px-6 py-8 text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-[var(--admin-surface-soft)] text-[var(--admin-muted)]">
          <Lock className="size-5" strokeWidth={2} />
        </span>
        <h1 className="admin-display mt-4 text-2xl text-[var(--admin-ink)]">This section is locked</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--admin-muted)]">
          It stays closed until the studio owner asks to open it again.
        </p>
      </div>
    </div>
  );
}
