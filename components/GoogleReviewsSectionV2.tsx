'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStaticGoogleReviewsData } from '@/lib/static-data';
import type { GoogleReview } from '@/types';

const GOOGLE_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJUZyy1dJNsg0RrGCjoYtC69A';

const MAX_PHOTOS = 3;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-primary" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-current' : 'fill-current opacity-25'}`}
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function PhotoLightbox({
  images,
  index,
  author,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number;
  author: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = images[index];
  const hasMany = images.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMany) onIndexChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft' && hasMany) {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // Intentionally depend on index so arrow keys use the current photo
  }, [hasMany, images.length, index, onClose, onIndexChange]);

  if (!mounted || !src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo from ${author}`}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{author}</p>
          {hasMany && (
            <p className="text-xs text-white/60">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close photo"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-10"
        onClick={onClose}
      >
        {hasMany && (
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <img
          src={src}
          alt={`Guest photo from ${author}`}
          decoding="async"
          className="max-h-[min(78vh,860px)] max-w-full rounded-sm object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        {hasMany && (
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {hasMany && (
        <div className="flex shrink-0 justify-center gap-2 overflow-x-auto px-4 pb-5">
          {images.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md transition ${
                i === index ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-55 hover:opacity-90'
              }`}
            >
              <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function ReviewPhotos({ review, active }: { review: GoogleReview; active: boolean }) {
  const images = review.images || [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = React.useCallback(() => setLightboxIndex(null), []);

  if (!images.length || !active) return null;

  const shown = images.slice(0, MAX_PHOTOS);
  const extra = images.length - MAX_PHOTOS;

  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
        {shown.map((src, index) => (
          <button
            key={`${review.id}-${index}`}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square overflow-hidden bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Photo ${index + 1} from ${review.author.name}'s review`}
          >
            <img
              src={src}
              alt=""
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {index === MAX_PHOTOS - 1 && extra > 0 && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/55 text-sm font-semibold text-white">
                +{extra}
              </span>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={images}
          index={lightboxIndex}
          author={review.author.name}
          onClose={closeLightbox}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous reviews' : 'Next reviews'}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        {direction === 'prev' ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 120px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="w-[min(100%,calc(50%-0.75rem))] shrink-0 snap-start border-t border-line pt-6 max-md:w-[min(100%,85%)] [content-visibility:auto] [contain-intrinsic-size:auto_320px]"
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Stars rating={review.rating} />
        <p className="text-sm font-semibold text-ink">{review.author.name}</p>
        <span className="text-xs text-muted">{review.date}</span>
      </div>
      <p className="line-clamp-5 text-sm leading-relaxed text-muted sm:text-[15px]">
        “{review.text}”
      </p>
      <ReviewPhotos review={review} active={active} />
    </article>
  );
}

const GoogleReviewsSectionV2: React.FC = () => {
  const { t } = useLanguage();
  const data = useMemo(() => getStaticGoogleReviewsData(), []);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const ordered = useMemo(() => {
    const withPhotos = data.reviews.filter((r) => (r.images?.length || 0) > 0);
    const without = data.reviews.filter((r) => !(r.images?.length || 0));
    return [...withPhotos, ...without];
  }, [data.reviews]);

  const googleUrl = data.googleUrl || GOOGLE_URL;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let ticking = false;
    const updateArrows = () => {
      const max = el.scrollWidth - el.clientWidth;
      const prev = el.scrollLeft > 8;
      const next = el.scrollLeft < max - 8;
      setCanPrev((p) => (p === prev ? p : prev));
      setCanNext((n) => (n === next ? n : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateArrows();
        ticking = false;
      });
    };

    updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateArrows);
    };
  }, [ordered.length]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.92, 280);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-surface pb-16 pt-20 sm:pt-24 lg:pt-28">
      <div className="relative mx-auto mb-10 max-w-7xl px-6 lg:px-12">
        <div className="text-center" data-fade>
          <p className="section-eyebrow">Guest stories</p>
          <h2 className="section-title mb-5">
            {t.reviews.titlePart1}
            {t.reviews.titlePart2}
          </h2>
          <p className="section-lead mx-auto max-w-2xl">{t.reviews.description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
            <Stars rating={Math.round(data.overallRating)} />
            <span className="font-semibold text-ink">{data.overallRating.toFixed(1)}</span>
            <span aria-hidden className="text-line">
              ·
            </span>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-clay underline-offset-4 hover:underline"
            >
              {data.totalReviews} Google reviews
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-5 flex items-center justify-end gap-2">
          <ArrowButton direction="prev" onClick={() => scrollByPage(-1)} disabled={!canPrev} />
          <ArrowButton direction="next" onClick={() => scrollByPage(1)} disabled={!canNext} />
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          aria-label="Guest reviews carousel"
        >
          {ordered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-clay underline-offset-4 hover:underline"
          >
            {t.googleReviews.seeOnGoogle}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
