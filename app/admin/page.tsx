'use client';

// 🎨 ADMIN DASHBOARD PAGE
// This is the page your client will see to change pictures and text

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Login form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Load all content when page opens
  useEffect(() => {
    if (session) {
      loadContent();
    }
  }, [session]);

  // 📖 Load content from database
  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      if (data.success) {
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  // 📤 Upload image
  const handleImageUpload = async (contentKey: string, file: File) => {
    setLoading(true);
    setMessage('Uploading... ⏳');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentKey', contentKey);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Image uploaded successfully!');
        loadContent(); // Refresh the content list
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      } else {
        setMessage('❌ Upload failed: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Upload failed');
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Update text
  const handleTextUpdate = async (contentKey: string, newValue: string) => {
    setLoading(true);
    setMessage('Saving... ⏳');

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentKey,
          contentValue: newValue,
          contentType: 'text',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Text updated successfully!');
        loadContent();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Update failed');
      }
    } catch (error) {
      setMessage('❌ Update failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage('❌ Wrong username or password');
    }
  };

  // If not logged in, show login form
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Loading... ⏳</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-bold mb-6 text-center">🔐 Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Login
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // If logged in, show admin dashboard
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🎨 Admin Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* Content Management */}
        <div className="space-y-6">
          {content.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                {item.content_key.replace(/_/g, ' ').toUpperCase()}
              </h3>

              {item.content_type === 'image' ? (
                // Image Upload Section
                <div>
                  <div className="mb-4">
                    <img
                      src={item.content_value}
                      alt={item.content_key}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(item.content_key, file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={loading}
                  />
                </div>
              ) : (
                // Text Edit Section
                <div>
                  <textarea
                    defaultValue={item.content_value}
                    className="w-full p-3 border rounded-lg mb-3"
                    rows={3}
                    id={`text-${item.id}`}
                  />
                  <button
                    onClick={() => {
                      const textarea = document.getElementById(`text-${item.id}`) as HTMLTextAreaElement;
                      handleTextUpdate(item.content_key, textarea.value);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    disabled={loading}
                  >
                    Save Text
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-3">📖 How to Use:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Change Image:</strong> Click "Choose File", pick your image, it uploads automatically!</li>
            <li>✅ <strong>Change Text:</strong> Edit the text in the box, then click "Save Text"</li>
            <li>✅ <strong>See Changes:</strong> Go to your website homepage - changes appear instantly!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
