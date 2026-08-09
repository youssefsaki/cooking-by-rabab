'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Files</h1>
        <p className="text-sm text-[#6D7175] mt-1">
          Upload photos here, or drag them onto a package field in{' '}
          <Link href="/admin/content" className="text-[#008060] font-semibold underline">
            Online store
          </Link>
          .
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}

      <label className="block text-sm font-semibold text-[#202223]">
        Alt text (optional)
        <input
          className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 text-sm font-normal"
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
        className={`rounded-xl border-2 border-dashed p-10 text-center bg-white transition ${
          dragOver ? 'border-[#008060] bg-[#F1F8F5]' : 'border-[#C9CCCF]'
        }`}
      >
        <p className="font-semibold text-[#202223]">
          {uploading ? 'Uploading…' : 'Drag and drop a photo here'}
        </p>
        <label className="inline-block mt-4 cursor-pointer rounded-lg bg-[#008060] text-white font-semibold px-4 py-2 text-sm">
          Choose file
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

      {url && (
        <div className="rounded-xl border border-[#AEE9D1] bg-[#F1F8F5] p-4 space-y-2">
          <p className="text-sm font-semibold text-[#0D8050]">Uploaded</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={altText || 'Uploaded'} className="max-h-48 rounded-lg object-cover" />
          <p className="text-xs break-all text-[#6D7175]">{url}</p>
        </div>
      )}
    </div>
  );
}
