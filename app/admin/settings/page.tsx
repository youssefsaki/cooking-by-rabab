'use client';

import { useEffect, useState } from 'react';
import type { SiteSettingsData } from '@/lib/types/cms';

const emptySettings: SiteSettingsData = {
  phone: { number: '', availability: '' },
  email: { address: '', responseTime: '' },
  whatsapp: { number: '', note: '' },
  officeHours: { weekdays: '', saturday: '', sunday: '' },
  emergencyNote: '',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsData>(emptySettings);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content?section=settings')
      .then((r) => r.json())
      .then((payload) => {
        if (payload.ok && payload.data) setSettings(payload.data);
      })
      .catch(() => undefined);
  }, []);

  async function save() {
    setSaving(true);
    setStatus('');
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    });
    const payload = await res.json();
    setSaving(false);
    setStatus(payload.ok ? 'Settings saved.' : payload.error || 'Save failed');
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-black text-amber-950">Contact settings</h1>
      {status && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">{status}</div>
      )}

      <div className="rounded-2xl bg-white border border-amber-100 p-5 space-y-3 shadow-sm">
        <label className="block text-sm font-semibold">
          Phone
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={settings.phone.number}
            onChange={(e) =>
              setSettings((s) => ({ ...s, phone: { ...s.phone, number: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={settings.email.address}
            onChange={(e) =>
              setSettings((s) => ({ ...s, email: { ...s.email, address: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          WhatsApp
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={settings.whatsapp.number}
            onChange={(e) =>
              setSettings((s) => ({ ...s, whatsapp: { ...s.whatsapp, number: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          Emergency note
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={settings.emergencyNote}
            onChange={(e) => setSettings((s) => ({ ...s, emergencyNote: e.target.value }))}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save settings'}
      </button>
    </div>
  );
}
