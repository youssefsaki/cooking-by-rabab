'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin, FiCheck, FiX } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';
import { useSiteCopy } from '@/hooks/useSiteCopy';
import { resolveSiteImage } from '@/lib/site-images';

type PackagePageKey = 'basic' | 'weeklyEvent' | 'private' | 'privateAtLocation';

const packagePageKeyById: Record<string, PackagePageKey> = {
  basic: 'basic',
  'weekly-event': 'weeklyEvent',
  private: 'private',
  'private-at-location': 'privateAtLocation',
};

const packagesData = [
  {
    id: "basic",
    name: "The authentic mountains culinary escape",
    tagline: "Your Journey into the Mountains",
    subtitle: "Escape the coast for a half-day in the Atlas Mountains. Tour a historic 300-year-old village home, grind fresh Amlou, and cook the traditional dish of your choice.",
    price: "65",
    pricePrefix: "From",
    currency: "EUR",
    priceLocal: "700 MAD",
    duration: "4 hours",
    groupSize: "3-13 guests",
    locationLabel: "Amazigh Village",
    startTime: "14:30",
    image: "/packages/basic.webp",
    imageAlt: "Taghazout cooking class — half-day Berber village experience with traditional Moroccan dishes and clay oven bread in Atlas Mountains",
    popular: true,
    highlights: [
      "Pick up from Taghazout Mosque",
      "Minimum 3 guests required",
      "300-year-old Amazigh house tour",
      "Your Choice of Dish (see full menu when booking)",
      "Vegetarian & Vegan options available",
      "Make Moroccan spread (Amlou)"
    ]
  },
  {
    id: "weekly-event",
    name: "Weekly Event",
    tagline: "The Amazigh Village Music Gala",
    subtitle: "Join us for our Weekly Berber Music Event At Sunset in a traditional village",
    price: "80",
    pricePrefix: "",
    currency: "EUR",
    priceLocal: "850 MAD",
    duration: "5 hours",
    groupSize: "6-13 guests",
    locationLabel: "Amazigh Village",
    startTime: "15:00",
    image: "/packages/weekly.webp",
    imageAlt: "Weekly Amazigh music event Taghazout — Berber village sunset celebration and cooking experience Morocco",
    highlights: [
      "Every Saturday at 15:00",
      "Minimum 6 guests required",
      "Pickup from Taghazout Mosque",
      "Mint tea ceremony",
      "Make your barbecue",
      "Traditional Amazigh music & celebration"
    ]
  },
  {
    id: "private",
    name: "Private Workshop Experience",
    tagline: "Private at Our Village Workshop",
    subtitle: "A private cooking experience just for your group at our traditional village workshop — perfect for couples and small celebrations.",
    price: "80",
    pricePrefix: "",
    currency: "EUR",
    priceLocal: "850 MAD",
    duration: "Flexible",
    groupSize: "2+ guests",
    locationLabel: "Village Workshop",
    startTime: "Flexible",
    image: "/packages/privatee.webp",
    imageAlt: "Private Workshop Experience Taghazout — private Moroccan cooking class at Amazigh village workshop in Atlas Mountains",
    popular: false,
    highlights: [
      "Round-trip transport from Taghazout Mosque",
      "Minimum 2 guests required",
      "Moroccan Tea Masterclass",
      "Amlou Making workshop",
      "Shared meal with a local family",
      "Customizable menu (Tagine, Msemen, Couscous, or Rfissa)",
      "Recipe of your dish to take home"
    ]
  },
  {
    id: "private-at-location",
    name: "Rabab Comes to You",
    tagline: "Private At Your Location",
    subtitle: "We bring the full cooking experience to your villa or riad — ideal for family gatherings and larger celebrations.",
    price: "100",
    pricePrefix: "",
    currency: "EUR",
    priceLocal: "1050 MAD",
    duration: "Flexible",
    groupSize: "6+ guests",
    locationLabel: "Your Location",
    startTime: "Flexible",
    image: "/packages/pv-at-ur-location.webp",
    imageAlt: "Rabab Comes to You — private cooking class at your villa or riad in Taghazout area",
    popular: false,
    highlights: [
      "Minimum 6 guests required",
      "Rabab and the team come to your location",
      "Cook together — kitchen cleaned afterwards",
      "Choose your meal (Tagine, Msemen, Couscous, or Rfissa)",
      "All ingredients shopped and brought for you",
      "Gift of local Moroccan terroir products"
    ]
  }
];

function PriceRow({
  pricePrefix,
  price,
  priceLocal,
}: {
  pricePrefix?: string;
  price: string;
  priceLocal?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      {pricePrefix ? (
        <span className="text-xs sm:text-sm text-white/85 font-medium">{pricePrefix}</span>
      ) : null}
                      <span className="text-2xl font-medium text-white sm:text-3xl md:text-4xl">{price}</span>
      <span className="text-sm sm:text-lg text-white/90 font-semibold">€</span>
      <span className="text-[11px] sm:text-sm text-white/80">/ person</span>
      {priceLocal ? (
        <span className="text-[11px] sm:text-sm text-white/75">· {priceLocal}</span>
      ) : null}
    </div>
  );
}

const PackagesV3: React.FC = memo(() => {
  const { t, language } = useLanguage();
  const { copy } = useSiteCopy();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [cmsItems, setCmsItems] = useState<typeof packagesData | null>(null);

  const closeActive = useCallback(() => setActiveId(null), []);
  const closeDetails = useCallback(() => setDetailsId(null), []);

  useEffect(() => {
    if (!activeId && !detailsId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (detailsId) closeDetails();
      else closeActive();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, detailsId, closeActive, closeDetails]);

  useEffect(() => {
    if (!detailsId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [detailsId]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content?section=packages&locale=${language.toLowerCase()}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled || !payload.ok || !payload.data?.items?.length) return;
        const byId = new Map(
          (payload.data.items as Array<{ id: string; image?: string; price?: string; name?: string; subtitle?: string }>).map(
            (item) => [item.id, item]
          )
        );
        setCmsItems(
          packagesData.map((pkg) => {
            const overlay = byId.get(pkg.id);
            if (!overlay) return pkg;
            const rawImage = overlay.image || pkg.image;
            // Keep local package photos even if CMS still has an old upload
            const image =
              pkg.id === 'basic'
                ? '/packages/basic.webp'
                : pkg.id === 'private'
                  ? '/packages/privatee.webp'
                  : resolveSiteImage(rawImage, pkg.image);
            // Keep package EUR/MAD from code — CMS sometimes still has stale €60
            return {
              ...pkg,
              image,
              name: pkg.id === 'basic' ? pkg.name : overlay.name || pkg.name,
              subtitle: overlay.subtitle || pkg.subtitle,
            };
          })
        );
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [language]);

  const items = cmsItems || packagesData;
  const detailsPackage = detailsId ? items.find((pkg) => pkg.id === detailsId) : null;
  const detailsPageKey = detailsId ? packagePageKeyById[detailsId] : null;
  const detailsContent = detailsPageKey ? t.packagesPage[detailsPageKey] : null;

  return (
    <section className="relative bg-paper py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-12 text-center lg:mb-14" data-fade>
          <p className="section-eyebrow">{copy('packages.badge', t.packages.badge)}</p>

          <h2 className="section-title mb-5">{copy('packages.title', t.packages.title)}</h2>

          <p className="section-lead mx-auto max-w-2xl">
            {copy('packages.description', t.packages.description)}
          </p>
          <InternalLinkRow
            variant="packages"
            className="mx-auto mt-4 max-w-2xl text-muted [&_a]:text-clay [&_a:hover]:text-clay-deep"
          />
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-5 lg:gap-6">
          {items.map((pkg) => {
            const isActive = activeId === pkg.id;

            return (
              <div
                key={pkg.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    return;
                  }
                  setActiveId((current) => (current === pkg.id ? null : pkg.id));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveId((current) => (current === pkg.id ? null : pkg.id));
                  }
                }}
                className={`group relative h-[520px] w-full cursor-pointer overflow-hidden outline-none transition focus-visible:ring-2 focus-visible:ring-ink sm:h-[560px] sm:w-[calc(50%-0.625rem)] lg:h-[580px] lg:w-[calc(50%-0.75rem)] ${
                  isActive ? 'is-active ring-1 ring-ink/30' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="pointer-events-none absolute right-4 top-4 z-30">
                    <span className="bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      {t.packages.mostPopular}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0">
                  <Image
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                      isActive ? 'scale-[1.03]' : ''
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    quality={70}
                  />
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 transition duration-300 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/55 ${
                    isActive ? 'from-black/95 via-black/75 to-black/55' : ''
                  }`}
                />

                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition duration-300 group-hover:translate-y-2 group-hover:opacity-0 sm:p-8 ${
                    isActive ? 'pointer-events-none translate-y-2 opacity-0' : ''
                  }`}
                >
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/65">
                    {pkg.duration} · {pkg.groupSize}
                  </p>
                  <h3 className="mb-2 font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
                    {pkg.name}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/75 sm:line-clamp-3 sm:text-base">
                    {pkg.subtitle}
                  </p>
                  <div className="mt-4">
                    <PriceRow
                      pricePrefix={pkg.pricePrefix}
                      price={pkg.price}
                      priceLocal={pkg.priceLocal}
                    />
                  </div>
                  <p className="mt-3 text-[11px] text-white/50 lg:hidden">Tap for details</p>
                </div>

                <div
                  className={`absolute inset-0 flex flex-col justify-between p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-7 lg:p-8 ${
                    isActive ? 'opacity-100' : 'pointer-events-none group-hover:pointer-events-auto'
                  }`}
                >
                  <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
                    <div>
                      <h3 className="mb-2 font-display text-xl font-normal leading-snug text-white sm:text-2xl lg:text-3xl">
                        {pkg.name}
                      </h3>
                      <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-white/75 sm:text-base">
                        {pkg.subtitle}
                      </p>
                      <PriceRow
                        pricePrefix={pkg.pricePrefix}
                        price={pkg.price}
                        priceLocal={pkg.priceLocal}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] text-white/70 sm:text-xs">
                      <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1">
                        <FiClock className="h-3 w-3" /> {pkg.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1">
                        <FiUsers className="h-3 w-3" /> {pkg.groupSize}
                      </span>
                      <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1">
                        <FiMapPin className="h-3 w-3" /> {pkg.locationLabel}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {pkg.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-[11px] leading-snug text-white/85 sm:text-sm">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center border border-white/40 px-4 py-3 text-xs font-medium tracking-[0.02em] text-white transition hover:bg-white/10 sm:text-sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        setDetailsId(pkg.id);
                      }}
                    >
                      {t.packages.viewDetails}
                    </button>
                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="inline-flex flex-1 items-center justify-center bg-primary px-4 py-3 text-xs font-medium tracking-[0.02em] text-white transition hover:bg-primary-dark sm:text-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {t.packages.bookNow}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {detailsPackage && detailsContent && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-details-title"
          onClick={closeDetails}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden bg-surface shadow-2xl sm:max-h-[88vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-44 shrink-0 sm:h-56">
              <Image
                src={detailsPackage.image}
                alt={detailsPackage.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
              <button
                type="button"
                onClick={closeDetails}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center bg-white/95 text-ink transition hover:bg-white"
                aria-label={t.packagesPage.closeDetails}
              >
                <FiX className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary-light">
                  {detailsPackage.tagline}
                </p>
                <h3 id="package-details-title" className="font-display text-2xl text-white sm:text-3xl">
                  {detailsPackage.name}
                </h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
              <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">{detailsPackage.subtitle}</p>

              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="border border-line bg-paper p-3 text-center">
                  <p className="font-display text-xl text-ink">{detailsPackage.price}€</p>
                  <p className="mt-1 text-[11px] text-muted">{t.packagesPage.perPerson}</p>
                </div>
                <div className="border border-line bg-paper p-3 text-center">
                  <p className="text-sm font-medium text-ink">{detailsPackage.duration}</p>
                  <p className="mt-1 text-[11px] text-muted">{t.packagesPage.duration}</p>
                </div>
                <div className="border border-line bg-paper p-3 text-center">
                  <p className="text-sm font-medium text-ink">{detailsPackage.startTime}</p>
                  <p className="mt-1 text-[11px] text-muted">{t.packagesPage.startTime}</p>
                </div>
                <div className="border border-line bg-paper p-3 text-center">
                  <p className="text-sm font-medium text-ink">{detailsPackage.locationLabel}</p>
                  <p className="mt-1 text-[11px] text-muted">{t.packagesPage.pickup}</p>
                </div>
              </div>

              {detailsContent.itinerary?.length ? (
                <div className="mb-8">
                  <h4 className="mb-4 font-display text-xl text-ink">
                    {t.packagesPage.completeItinerary} {t.packagesPage.itineraryHighlight}
                  </h4>
                  <ol className="space-y-4">
                    {detailsContent.itinerary.map((item) => (
                      <li key={`${item.time}-${item.title}`} className="border-l-2 border-primary/30 pl-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">{item.time}</p>
                        <p className="mt-1 font-medium text-ink">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              <div>
                <h4 className="mb-4 font-display text-xl text-ink">
                  {t.packagesPage.whatsIncluded} {t.packagesPage.includedHighlight}
                </h4>
                <ul className="space-y-2.5">
                  {(detailsContent.includes?.length ? detailsContent.includes : detailsPackage.highlights).map(
                    (item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-ink/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <FiCheck className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 border-t border-line bg-paper px-5 py-4 sm:flex-row sm:px-7">
              <button type="button" onClick={closeDetails} className="btn-outline flex-1">
                {t.packagesPage.closeDetails}
              </button>
              <Link href={`/book?package=${detailsPackage.id}`} className="btn-primary flex-1 text-center" onClick={closeDetails}>
                {t.packagesPage.bookNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

PackagesV3.displayName = 'PackagesV3';

export default PackagesV3;
