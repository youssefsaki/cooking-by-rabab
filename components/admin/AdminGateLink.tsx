'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';
import { isAdminPathLocked } from '@/lib/admin-locks';

export default function AdminGateLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isAdminPathLocked(href)) {
    return (
      <span
        className={`${className ?? ''} pointer-events-none cursor-not-allowed opacity-45`}
        title="This section is locked"
        aria-disabled="true"
      >
        {children}
        <Lock className="size-3 shrink-0" />
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
