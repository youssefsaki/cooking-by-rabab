'use client';

import { useState } from 'react';

export default function AdminMediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');
    setUrl('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', altText);

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const payload = await res.json();
    setUploading(false);

    if (!payload.ok) {
      setError(payload.error || 'Upload failed');
      return;
    }
    setUrl(payload.media.public_url);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-black text-amber-950">Media</h1>
      <p className="text-gray-600 text-sm">
        Upload images to Supabase Storage, then paste the public URL into Content (package images).
      </p>

      <form onSubmit={onUpload} className="rounded-2xl bg-white border border-amber-100 p-5 space-y-4 shadow-sm">
        <label className="block text-sm font-semibold">
          Image file
          <input
            type="file"
            accept="image/*"
            required
            className="mt-1 block w-full text-sm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <label className="block text-sm font-semibold">
          Alt text
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {url && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm break-all">
          <p className="font-semibold text-green-800 mb-1">Uploaded URL</p>
          <p className="text-green-900">{url}</p>
        </div>
      )}
    </div>
  );
}
