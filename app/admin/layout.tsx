// 🔐 ADMIN LAYOUT - Wraps the admin page with authentication
// This makes sure the login system works properly

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
