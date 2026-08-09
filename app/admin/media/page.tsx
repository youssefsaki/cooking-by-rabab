'use client';

import { useState } from 'react';

export default function AdminMediaPage() {
  const [altText, setAltText] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function upload(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
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
      <div>
        <h1 className="text-3xl font-black text-amber-950">Media library</h1>
        <p className="text-gray-600 text-sm mt-1">
          Drag & drop photos here. Tip: for package photos, use <strong>Content</strong> and drop
          directly onto the package photo field — it updates the site automatically.
        </p>
      </div>

      <label className="block text-sm font-semibold">
        Alt text (optional)
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) void upload(file);
        }}
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
          dragOver ? 'border-amber-500 bg-amber-50' : 'border-amber-200 bg-white'
        }`}
      >
        <p className="font-bold text-amber-950">{uploading ? 'Uploading…' : 'Drag & drop a photo here'}</p>
        <label className="inline-block mt-4 cursor-pointer rounded-lg bg-amber-600 text-white font-bold px-4 py-2">
          Or choose file
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
            }}
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {url && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm break-all space-y-2">
          <p className="font-semibold text-green-800">Uploaded — copy this URL if needed</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="max-h-40 rounded-lg object-cover" />
          <p className="text-green-900">{url}</p>
        </div>
      )}
    </div>
  );
}
