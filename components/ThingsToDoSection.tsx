'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';
import { useSiteCopy } from '@/hooks/useSiteCopy';



const activityLinks = [
  '/book',
  '/experiences#cooking-masterclass',
  '/experiences#clay-oven-bread',
  '/events',
  '/ourstory/location',
  '/ourstory/meet-the-chef',
] as const;

const ThingsToDoSection: React.FC = memo(() => {
  const { t } = useLanguage();
  const { copy, img } = useSiteCopy();
  const thingsToDo = t.thingsToDo ?? en.thingsToDo;
  const activityImages = [0,1,2,3,4,5].map((i) => img(`thingsToDo.activity.${i}.image`));
  const activities = thingsToDo.activities.map((activity, index) => ({
    ...activity,
    title: copy(`thingsToDo.activity.${index}.title`, activity.title),
    description: copy(`thingsToDo.activity.${index}.description`, activity.description),
  }));

  return (
    <section
      id="things-to-do-taghazout"
      className="relative overflow-hidden bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center" data-fade>
          <p className="section-eyebrow">{copy('thingsToDo.badge', thingsToDo.badge)}</p>
          <h2 className="section-title mb-5">{copy('thingsToDo.title', thingsToDo.title)}</h2>
          <p className="section-lead">{copy('thingsToDo.description', thingsToDo.description)}</p>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {activities.map((activity, index) => (
            <Link
              key={activity.id}
              href={activityLinks[index]}
              className="group relative overflow-hidden bg-paper transition"
            >
              <div className="relative w-full overflow-hidden bg-line">
                <Image
                  src={activityImages[index]}
                  alt={activity.imageAlt}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  quality={70}
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 font-display text-xl text-ink group-hover:text-clay">
                  {activity.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{activity.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  {thingsToDo.learnMore}
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="mx-auto mb-7 max-w-xl text-muted">{thingsToDo.ctaDescription}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary">
              {copy('thingsToDo.bookCookingClass', thingsToDo.bookCookingClass)}
            </Link>
            <Link href="/experiences" className="btn-outline">
              {copy('thingsToDo.viewAllExperiences', thingsToDo.viewAllExperiences)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ThingsToDoSection.displayName = 'ThingsToDoSection';

export default ThingsToDoSection;
