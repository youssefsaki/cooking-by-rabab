'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';

type LinkVariant = 'hero' | 'packages' | 'experience';

interface InternalLinkRowProps {
  variant: LinkVariant;
  className?: string;
  /** inline = dotted sentence (default). stack = vertical list for denser side panels */
  layout?: 'inline' | 'stack';
}

const InternalLinkRow: React.FC<InternalLinkRowProps> = memo(
  ({ variant, className = '', layout = 'inline' }) => {
    const { t } = useLanguage();
    const links = (t.internalLinks ?? en.internalLinks)[variant];

    if (!links?.length) return null;

    if (layout === 'stack') {
      return (
        <nav className={className} aria-label="Related pages">
          <ul className="space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <span
                    className="h-px w-4 bg-[#C75D3A]/70 group-hover:w-6 transition-all duration-300"
                    aria-hidden="true"
                  />
                  <span className="underline-offset-4 decoration-[#C75D3A]/40 group-hover:underline group-hover:decoration-[#C75D3A]">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      );
    }

    return (
      <p className={`text-sm leading-relaxed ${className}`}>
        {links.map((link, index) => (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span className="mx-2 opacity-50" aria-hidden="true">
                ·
              </span>
            )}
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
  }
);

InternalLinkRow.displayName = 'InternalLinkRow';

export default InternalLinkRow;
