import { Suspense } from 'react';
import AdminLoginPage from './LoginForm';

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
