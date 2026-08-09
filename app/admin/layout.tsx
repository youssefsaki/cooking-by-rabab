import type { Metadata } from 'next';
import Link from 'next/link';
import { createSessionClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin | Cooking by Rabab',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient();
  const user = supabase
    ? (await supabase.auth.getUser()).data.user
    : null;

  return (
    <div className="min-h-screen bg-[#F5EFE7] text-gray-900">
      {user && (
        <header className="border-b border-amber-200 bg-white/90 backdrop-blur sticky top-0 z-50 h-[57px]">
          <div className="max-w-[1600px] mx-auto px-4 h-full flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="font-black text-lg text-amber-900">
                Rabab CMS
              </Link>
              <nav className="flex flex-wrap gap-3 text-sm font-semibold text-amber-800">
                <Link href="/admin" className="hover:text-amber-600">
                  Overview
                </Link>
                <Link href="/admin/bookings" className="hover:text-amber-600">
                  Bookings
                </Link>
                <Link href="/admin/messages" className="hover:text-amber-600">
                  Messages
                </Link>
                <Link href="/admin/content" className="hover:text-amber-600">
                  Website editor
                </Link>
                <Link href="/admin/media" className="hover:text-amber-600">
                  Media
                </Link>
                <Link href="/admin/settings" className="hover:text-amber-600">
                  Settings
                </Link>
              </nav>
            </div>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="text-sm font-semibold text-gray-600 hover:text-red-600"
              >
                Sign out ({user.email})
              </button>
            </form>
          </div>
        </header>
      )}
      <main className="w-full">{children}</main>
    </div>
  );
}
