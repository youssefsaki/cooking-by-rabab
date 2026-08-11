'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { FiMapPin, FiNavigation, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteCopy } from '@/hooks/useSiteCopy';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27225.888770919465!2d-9.724669!3d30.544167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6f2e7b8e8e8%3A0x8e8e8e8e8e8e8e8!2sTaghazout%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890';

const locationData = {
  name: "Rabab's Traditional Kitchen",
  address: 'Taghazout Village',
  city: 'Taghazout',
  region: 'Agadir-Ida-Ou-Tanane',
  country: 'Morocco',
  coordinates: { lat: 30.5236, lng: -9.7366 },
  phone: '+212 726 671 746',
  whatsapp: '212726671746',
  email: 'rababouhadda5@gmail.com',
  hours: 'Daily: 9:00 AM - 6:00 PM',
};

const LocationMapV3: React.FC = memo(() => {
  const { t } = useLanguage();
  const { copy } = useSiteCopy();
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);
  const journeySteps = [
    { step: '01', title: copy('location.step.1.title', t.location.step1.title), description: copy('location.step.1.description', t.location.step1.description), time: copy('location.step.1.time', t.location.step1.time) },
    { step: '02', title: copy('location.step.2.title', t.location.step2.title), description: copy('location.step.2.description', t.location.step2.description), time: copy('location.step.2.time', t.location.step2.time) },
    { step: '03', title: copy('location.step.3.title', t.location.step3.title), description: copy('location.step.3.description', t.location.step3.description), time: copy('location.step.3.time', t.location.step3.time) },
    { step: '04', title: copy('location.step.4.title', t.location.step4.title), description: copy('location.step.4.description', t.location.step4.description), time: copy('location.step.4.time', t.location.step4.time) },
  ];

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 text-center" data-fade>
          <p className="section-eyebrow">{copy('location.badge', t.location.badge)}</p>
          <h2 className="section-title mb-5">
            {copy('location.titlePart1', t.location.titlePart1)}
            {copy('location.titlePart2', t.location.titlePart2)}
          </h2>
          <p className="section-lead mx-auto max-w-2xl">
            {copy('location.description', t.location.description)}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <h3 className="mb-8 flex items-center gap-3 text-lg font-medium text-ink">
              <FiNavigation className="h-4 w-4 text-clay" strokeWidth={1.5} />
              {copy('location.journeyTitle', t.location.journeyTitle)}
            </h3>

            <div className="relative">
              <div className="absolute bottom-0 left-4 top-0 w-px bg-line" />
              <div className="space-y-8">
                {journeySteps.map((item) => (
                  <div key={item.step} className="relative flex gap-5">
                    <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center bg-paper">
                      <span className="font-display text-sm text-clay">{item.step}</span>
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="mb-1 flex items-baseline justify-between gap-3">
                        <h4 className="font-medium text-ink">{item.title}</h4>
                        <span className="text-xs text-muted">{item.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2 lg:col-span-3">
            <div className="overflow-hidden bg-surface">
              <div ref={mapRef} className="h-[320px] bg-line lg:h-[380px]">
                {showMap ? (
                  <iframe
                    src={MAP_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                ) : null}
              </div>

              <div className="flex flex-col items-start justify-between gap-4 bg-ink p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <FiMapPin className="h-5 w-5 text-sand" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium text-white">{locationData.name}</h4>
                    <p className="text-sm text-white/50">
                      {locationData.address}, {locationData.country}
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Taghazout+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-paper"
                >
                  {t.location.getDirections}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={`tel:${locationData.phone}`}
                className="border border-line bg-surface p-5 text-center transition hover:border-ink/20"
              >
                <FiPhone className="mx-auto mb-3 h-4 w-4 text-clay" strokeWidth={1.5} />
                <p className="mb-1 text-xs text-muted">{t.location.callUs}</p>
                <p className="text-sm font-medium text-ink">{locationData.phone}</p>
              </a>

              <a
                href={`https://wa.me/${locationData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line bg-surface p-5 text-center transition hover:border-ink/20"
              >
                <FiSend className="mx-auto mb-3 h-4 w-4 text-clay" strokeWidth={1.5} />
                <p className="mb-1 text-xs text-muted">WhatsApp</p>
                <p className="text-sm font-medium text-ink">{t.location.messageUs}</p>
              </a>

              <a
                href={`mailto:${locationData.email}`}
                className="border border-line bg-surface p-5 text-center transition hover:border-ink/20"
              >
                <FiMail className="mx-auto mb-3 h-4 w-4 text-clay" strokeWidth={1.5} />
                <p className="mb-1 text-xs text-muted">Email</p>
                <p className="text-sm font-medium text-ink">{t.location.writeUs}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LocationMapV3.displayName = 'LocationMapV3';

export default LocationMapV3;
