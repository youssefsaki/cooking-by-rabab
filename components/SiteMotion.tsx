'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lightweight fade-ins only. No Lenis / GSAP — those made scroll feel sticky.
 */
export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-fade]'));
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Reveal anything already in view immediately (avoids blank sections)
    const revealIfVisible = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-visible');
        return true;
      }
      return false;
    };

    const pending = nodes.filter((el) => !revealIfVisible(el));
    if (!pending.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.01 }
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
