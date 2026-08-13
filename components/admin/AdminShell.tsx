'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  CalendarOff,
  ExternalLink,
  Files,
  Home,
  Lock,
  LogOut,
  Search,
  Settings,
  Sparkles,
  Store,
  Tag,
  Users,
} from 'lucide-react';
import AdminMotion from '@/components/admin/AdminMotion';
import { isAdminPathLocked } from '@/lib/admin-locks';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/admin/availability', label: 'Availability', icon: CalendarOff },
  { href: '/admin/promotions', label: 'Promotions', icon: Tag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/content', label: 'Content editor', icon: Store, accent: true },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/media', label: 'Media', icon: Files },
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
  const fullBleed = pathname.startsWith('/admin/content') && !isAdminPathLocked(pathname);

  return (
    <div className="admin-theme min-h-screen flex">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col bg-[var(--admin-ink)] text-white md:flex">
        <div className="px-5 py-6">
          <p className="admin-display text-[22px] leading-none text-white">Cooking by Rabab</p>
          <p className="mt-1.5 text-[11px] font-medium tracking-[0.04em] text-white/45">
            Experience studio
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4 admin-scrollbar">
          {NAV.map((item) => {
            const locked = isAdminPathLocked(item.href);
            const active =
              !locked &&
              (item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            const className = `admin-focus group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition duration-200 ${
              locked
                ? 'cursor-not-allowed text-white/35'
                : active
                  ? 'bg-[var(--admin-accent)] font-semibold text-[var(--admin-on-accent)] shadow-[0_10px_28px_rgb(237_132_62_/_35%)]'
                  : item.accent
                    ? 'text-[var(--admin-accent)] hover:bg-white/8'
                    : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
            }`;

            if (locked) {
              return (
                <span
                  key={item.href}
                  className={className}
                  title={`${item.label} is locked`}
                  aria-disabled="true"
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.8} />
                  <span className="flex-1">{item.label}</span>
                  <Lock className="size-3.5 shrink-0 text-[var(--admin-accent)]" strokeWidth={2.4} />
                </span>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                <Icon className="size-4 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {item.accent && !active ? (
                  <span className="size-1.5 rounded-full bg-[var(--admin-accent)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-5 py-4">
          <p className="truncate text-[11px] text-white/40">{email}</p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-focus mt-3 flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
          >
            View site
            <ExternalLink className="size-3" />
          </a>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="admin-focus mt-2 flex items-center gap-2 text-xs text-white/45 hover:text-white"
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
          <div className="mr-1 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--admin-accent)] text-[var(--admin-on-accent)]">
            <Sparkles className="size-4" />
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const locked = isAdminPathLocked(item.href);
            const active =
              !locked &&
              (item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`));
            const className = `admin-focus relative grid size-8 shrink-0 place-items-center rounded-lg ${
              locked
                ? 'cursor-not-allowed bg-white/[0.05] text-white/30'
                : active
                  ? 'bg-[var(--admin-accent)] text-[var(--admin-on-accent)]'
                  : 'bg-white/[0.08] text-white/65'
            }`;

            if (locked) {
              return (
                <span
                  key={item.href}
                  className={className}
                  title={`${item.label} is locked`}
                  aria-label={`${item.label}, locked`}
                  aria-disabled="true"
                >
                  <Icon className="size-4" />
                  <Lock className="absolute right-0.5 bottom-0.5 size-2.5 text-[var(--admin-accent)]" strokeWidth={2.6} />
                </span>
              );
            }

            return (
              <Link key={item.href} href={item.href} aria-label={item.label} className={className}>
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
