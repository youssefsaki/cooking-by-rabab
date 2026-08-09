'use client';

import { usePathname } from 'next/navigation';

/** Hides public site header/footer/WhatsApp on /admin routes. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
