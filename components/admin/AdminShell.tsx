'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Files,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  Store,
} from 'lucide-react';
import AdminMotion from '@/components/admin/AdminMotion';

const NAV = [
  { href: '/admin', label: 'Home', icon: Home },
  { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/messages', label: 'Inbox', icon: MessageSquare },
  { href: '/admin/content', label: 'Visual editor', icon: Store, accent: true },
  { href: '/admin/media', label: 'Media library', icon: Files },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();
  const fullBleed = pathname.startsWith('/admin/content');

  return (
    <div className="admin-theme min-h-screen flex">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col bg-[var(--admin-ink)] text-white md:flex">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[var(--admin-accent)] text-[var(--admin-ink)]">
              <Sparkles className="size-5" strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Cooking by Rabab
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">Experience studio</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 pt-5 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Manage
          </p>
          {NAV.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-focus group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition duration-200 ${
                  active
                    ? 'bg-white text-[var(--admin-ink)] font-semibold shadow-lg'
                    : item.accent
                      ? 'text-[var(--admin-accent)] hover:bg-white/10'
                      : 'text-white/70 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Icon className="size-4 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {item.accent && !active ? (
                  <span className="rounded-full bg-[var(--admin-accent)]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                    Edit
                  </span>
                ) : (
                  <ChevronRight
                    className={`size-3.5 transition ${active ? 'opacity-60' : 'opacity-0 group-hover:opacity-50'}`}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3.5">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/55">
            <BarChart3 className="size-3.5 text-[var(--admin-accent)]" />
            <span>Store is live</span>
            <span className="ml-auto size-1.5 rounded-full bg-[var(--admin-accent)] shadow-[0_0_12px_var(--admin-accent)]" />
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-focus mb-3 flex items-center justify-between rounded-lg bg-white/[0.08] px-2.5 py-2 text-xs text-white/75 hover:bg-white/[0.12] hover:text-white"
          >
            View website
            <ExternalLink className="size-3.5" />
          </a>
          <p className="truncate text-[11px] text-white/38">{email}</p>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="admin-focus mt-2 flex items-center gap-2 text-xs text-white/55 hover:text-white"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div
        className={`flex-1 min-w-0 flex flex-col ${
          fullBleed ? 'h-[100dvh] md:h-screen overflow-hidden' : 'min-h-screen'
        }`}
      >
        <header
          className={`md:hidden z-50 flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-[var(--admin-ink)] px-3 py-2.5 text-white ${
            fullBleed ? 'shrink-0' : 'sticky top-0'
          }`}
        >
          <div className="mr-1 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--admin-accent)] text-[var(--admin-ink)]">
            <Sparkles className="size-4" />
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`admin-focus grid size-8 shrink-0 place-items-center rounded-lg ${
                  active ? 'bg-white text-[var(--admin-ink)]' : 'bg-white/[0.08] text-white/65'
                }`}
              >
                <Icon className="size-4" />
              </Link>
            );
          })}
        </header>
        <AdminMotion>
          <div className={fullBleed ? 'flex-1 min-h-0 overflow-hidden' : 'flex-1'}>{children}</div>
        </AdminMotion>
      </div>
    </div>
  );
}
