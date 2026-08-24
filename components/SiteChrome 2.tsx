import { headers } from 'next/headers';

/** Server-side hide of public chrome on /admin (no flash, no overlay). */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  if (pathname.startsWith('/admin')) return null;
  return <>{children}</>;
}
