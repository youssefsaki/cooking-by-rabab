'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Home', icon: '◉' },
  { href: '/admin/bookings', label: 'Orders', icon: '▣' },
  { href: '/admin/messages', label: 'Inbox', icon: '✉' },
  { href: '/admin/content', label: 'Online store', icon: '✎' },
  { href: '/admin/media', label: 'Files', icon: '▦' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
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
    <div className="min-h-screen bg-[#F1F1F1] text-[#202223] flex">
      <aside className="hidden md:flex w-[220px] shrink-0 flex-col bg-[#1A1A1A] text-white">
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Cooking by Rabab</p>
          <p className="font-semibold text-sm mt-1">Admin</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                  active ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="w-4 text-center text-xs opacity-80">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-2">
          <p className="text-xs text-white/50 truncate">{email}</p>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-xs text-white/70 hover:text-white underline">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className={`flex-1 min-w-0 flex flex-col ${fullBleed ? 'h-[100dvh] md:h-screen overflow-hidden' : 'min-h-screen'}`}>
        <header className={`md:hidden z-40 bg-[#1A1A1A] text-white px-3 py-2 flex gap-2 overflow-x-auto ${fullBleed ? 'shrink-0' : 'sticky top-0'}`}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-xs px-2 py-1 rounded bg-white/10">
              {item.label}
            </Link>
          ))}
        </header>
        <div className={fullBleed ? 'flex-1 min-h-0 overflow-hidden' : 'flex-1'}>{children}</div>
      </div>
    </div>
  );
}
