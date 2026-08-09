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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black text-amber-950">Contact messages</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <article key={m.id} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-lg">{m.subject}</h2>
                  <p className="text-sm text-gray-600">
                    {m.name} · {m.email} · {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <select
                  value={m.status}
                  onChange={(e) => updateStatus(m.id, e.target.value)}
                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="replied">replied</option>
                  <option value="archived">archived</option>
                </select>
              </div>
              <p className="mt-3 text-gray-800 whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500 text-center py-8">No messages yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
