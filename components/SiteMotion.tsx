'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lightweight fade-ins only. No Lenis / GSAP — those made scroll feel sticky.
 * Re-scans after dynamic sections mount / layout shifts so titles never stay invisible.
 */
export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer: IntersectionObserver | null = null;
    let scanRaf = 0;

    const reveal = (el: HTMLElement) => {
      el.classList.add('is-visible');
      observer?.unobserve(el);
    };

    const inView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 40 && rect.top < window.innerHeight * 0.95;
    };

    const scan = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-fade]:not(.is-visible)')
      );
      if (!nodes.length) return;

      if (reduced) {
        nodes.forEach(reveal);
        return;
      }

      nodes.forEach((el) => {
        if (inView(el)) reveal(el);
        else observer?.observe(el);
      });
    };

    const scheduleScan = () => {
      cancelAnimationFrame(scanRaf);
      scanRaf = requestAnimationFrame(scan);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
        });
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0 }
    );

    scan();

    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleScan, { passive: true });
    window.addEventListener('resize', scheduleScan, { passive: true });

    return () => {
      cancelAnimationFrame(scanRaf);
      observer?.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', scheduleScan);
      window.removeEventListener('resize', scheduleScan);
    };
  }, [pathname]);

  return <>{children}</>;
}
