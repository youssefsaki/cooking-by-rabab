'use client';

import { useSiteCopy } from '@/hooks/useSiteCopy';

/** Published CMS testimonials (separate from Google reviews carousel). */
export default function CmsTestimonials() {
  const { testimonials } = useSiteCopy();
  if (!testimonials.length) return null;

  return (
    <section className="bg-paper py-16 sm:py-20" aria-label="Guest testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow">Guest voices</p>
          <h2 className="section-title">What travelers share</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="border-t border-line pt-6">
              <p className="text-amber-600 text-sm tracking-widest" aria-label={`${item.rating} out of 5`}>
                {'★'.repeat(item.rating)}
                {'☆'.repeat(Math.max(0, 5 - item.rating))}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">“{item.text}”</p>
              <p className="mt-4 text-sm font-semibold text-ink">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
