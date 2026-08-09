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
  const [error, setError] = useState('');
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
    setError('');
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    });
    const payload = await res.json();
    setSaving(false);
    if (payload.ok) setStatus('Settings saved.');
    else setError(payload.error || 'Save failed');
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Settings</h1>
        <p className="text-sm text-[#6D7175]">Contact details shown on the public site.</p>
      </div>
      {status && (
        <div className="rounded-lg border border-[#AEE9D1] bg-[#F1F8F5] px-4 py-3 text-sm text-[#0D8050]">
          {status}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white border border-[#E1E3E5] p-5 space-y-3 shadow-sm">
        <label className="block text-sm font-semibold">
          Phone
          <input
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            value={settings.phone.number}
            onChange={(e) =>
              setSettings((s) => ({ ...s, phone: { ...s.phone, number: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            value={settings.email.address}
            onChange={(e) =>
              setSettings((s) => ({ ...s, email: { ...s.email, address: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          WhatsApp
          <input
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            value={settings.whatsapp.number}
            onChange={(e) =>
              setSettings((s) => ({ ...s, whatsapp: { ...s.whatsapp, number: e.target.value } }))
            }
          />
        </label>
        <label className="block text-sm font-semibold">
          Emergency note
          <input
            className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            value={settings.emergencyNote}
            onChange={(e) => setSettings((s) => ({ ...s, emergencyNote: e.target.value }))}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-lg bg-[#008060] hover:bg-[#006e52] text-white font-semibold px-5 py-2.5 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
