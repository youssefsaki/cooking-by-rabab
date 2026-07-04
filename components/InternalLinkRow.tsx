'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';

type LinkVariant = 'hero' | 'packages' | 'experience';

interface InternalLinkRowProps {
  variant: LinkVariant;
  className?: string;
}

const InternalLinkRow: React.FC<InternalLinkRowProps> = memo(({ variant, className = '' }) => {
  const { t } = useLanguage();
  const links = (t.internalLinks ?? en.internalLinks)[variant];

  if (!links?.length) return null;

  return (
    <p className={`text-sm leading-relaxed ${className}`}>
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          {index > 0 && <span className="mx-2 opacity-50" aria-hidden="true">·</span>}
          <Link
            href={link.href}
            className="font-semibold underline underline-offset-2 decoration-amber-500/60 hover:decoration-amber-500 transition-colors"
          >
            {link.label}
          </Link>
        </React.Fragment>
      ))}
    </p>
  );
});

InternalLinkRow.displayName = 'InternalLinkRow';

export default InternalLinkRow;
