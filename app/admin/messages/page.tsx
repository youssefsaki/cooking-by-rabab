'use client';

import { useEffect, useState } from 'react';
import type { ContactMessageRow } from '@/lib/types/cms';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin');
    const data = await res.json();
    if (!data.ok) {
      setError(data.error || 'Failed to load');
    } else {
      setMessages(data.contactMessages || []);
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', id, status }),
    });
    await load();
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Inbox</h1>
        <p className="text-sm text-[#6D7175]">Messages from the contact form.</p>
      </div>
      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}
      {loading ? (
        <p className="text-sm text-[#6D7175]">Loading…</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <article key={m.id} className="rounded-xl border border-[#E1E3E5] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-[#202223]">{m.subject}</h2>
                  <p className="text-sm text-[#6D7175]">
                    {m.name} · {m.email} · {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <select
                  value={m.status}
                  onChange={(e) => updateStatus(m.id, e.target.value)}
                  className="rounded-lg border border-[#C9CCCF] px-2 py-1.5 text-sm bg-white"
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="replied">replied</option>
                  <option value="archived">archived</option>
                </select>
              </div>
              <p className="mt-3 text-[#202223] whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
            </article>
          ))}
          {messages.length === 0 && (
            <p className="text-[#6D7175] text-center py-10">No messages yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
