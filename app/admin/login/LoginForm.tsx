'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError('Could not sign in. Check your Supabase env vars.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#F1F1F1]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-xl border border-[#E1E3E5] shadow-sm p-8 space-y-4"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#6D7175]">Cooking by Rabab</p>
          <h1 className="text-2xl font-semibold text-[#202223] mt-1">Log in</h1>
          <p className="text-sm text-[#6D7175] mt-1">Manage orders, inbox, and your online store.</p>
        </div>

        {error && (
          <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-3 py-2 text-sm text-[#D72C0D]">
            {error}
          </div>
        )}

        <label className="block text-sm font-semibold text-[#202223]">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
          />
        </label>

        <label className="block text-sm font-semibold text-[#202223]">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#008060] hover:bg-[#006e52] text-white font-semibold py-3 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
