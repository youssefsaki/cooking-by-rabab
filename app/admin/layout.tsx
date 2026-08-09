import type { Metadata } from 'next';
import { createSessionClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin | Cooking by Rabab',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  // Login page: no shell
  if (!user) {
    return <div className="min-h-screen bg-[#F1F1F1]">{children}</div>;
  }

  return (
    <AdminShell email={user.email}>{children}</AdminShell>
  );
}
