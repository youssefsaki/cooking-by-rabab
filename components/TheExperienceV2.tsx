'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { FiMapPin, FiHome, FiActivity, FiHeart } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';
import { useSiteCopy } from '@/hooks/useSiteCopy';

/**
 * THE COOKING CLASS EXPERIENCE SECTION - Design 2 of 3
 * 
 * Design 2: Split-Screen Editorial Magazine Style
 * 
 * Aesthetic: High-fashion editorial with alternating image/content layout
 * - Large immersive images (50% screen)
 * - Content panels alternate left/right
 * - Minimal, elegant typography
 * - Step numbers as large decorative elements
 * - Smooth transitions
 * - Vertical storytelling flow
 */

interface ExperienceStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
  duration: string;
  icon: any;
}

const stepMeta = [
  { alt: "Taghazout Morocco pickup location - Scenic coastal village starting point for authentic Moroccan cooking class journey to Atlas Mountains", duration: "20 min", icon: FiMapPin },
  { alt: "Traditional Moroccan kitchen tour - Authentic Amazigh cooking space with wood-fired oven and traditional tagines in Atlas Mountains home", duration: "20 min", icon: FiHome },
  { alt: "Hands-on Moroccan cooking class - Learning traditional dishes and bread baking techniques in authentic village kitchen", duration: "90 min", icon: FiActivity },
  { alt: "Moroccan feast and hospitality - Traditional home-cooked meal experience with mint tea ceremony in Atlas Mountains Amazigh home", duration: "60 min", icon: FiHeart },
] as const;

const TheExperienceV2: React.FC = memo(() => {
  const { t } = useLanguage();
  const { copy, img } = useSiteCopy();
  const experienceSteps: ExperienceStep[] = [1, 2, 3, 4].map((n) => {
    const fallback = t.experience[`step${n}` as 'step1'];
    return {
      step: n,
      title: copy(`experience.step.${n}.title`, fallback.title),
      subtitle: copy(`experience.step.${n}.subtitle`, fallback.subtitle),
      description: copy(`experience.step.${n}.description`, fallback.description),
      highlights: (fallback.highlights || []).map((h, i) =>
        copy(`experience.step.${n}.highlight.${i}`, h)
      ),
      ...stepMeta[n - 1],
      image: img(`experience.step.${n}.image`),
    };
  });
  return (
    <section className="relative bg-surface">
      <div className="relative bg-paper px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center" data-fade>
          <p className="section-eyebrow">{copy('experience.title', t.experience.title)}</p>

          <h2 className="section-title mb-6 px-2">
            {copy('experience.subtitle', t.experience.subtitle)}
          </h2>

          <p className="section-lead mx-auto max-w-2xl px-2">
            {copy('experience.description', t.experience.description)}
          </p>
          <InternalLinkRow
            variant="experience"
            className="mx-auto mt-5 max-w-2xl px-2 text-muted [&_a]:text-clay [&_a:hover]:text-clay-deep"
          />
        </div>
      </div>

      {/* Steps - Alternating Split Layout */}
      {experienceSteps.map((step, index) => {
        const isEven = index % 2 === 0;
        const Icon = step.icon;

        return (
          <div 
            key={step.step}
            className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-auto lg:min-h-[700px]`}
          >
            {/* Image Side - Mobile Optimized */}
            <div className="relative w-full lg:w-1/2 h-[50vh] min-h-[400px] sm:h-[55vh] lg:h-auto">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              
              {/* Image Overlay - Enhanced for Mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/40"></div>
              
              <div className="absolute bottom-12 right-12 hidden text-white/15 lg:block">
                <span className="font-display text-[160px] font-normal leading-none">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 lg:hidden">
                <span className="font-display text-4xl text-white/90">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="relative flex w-full items-center bg-surface lg:w-1/2">
              <div className="w-full px-6 py-12 sm:px-8 sm:py-14 lg:px-16 lg:py-20">
                <div className="mb-6 hidden items-center gap-3 lg:flex">
                  <Icon className="h-5 w-5 text-clay" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    Step {step.step}
                  </span>
                </div>

                <div className="mb-4 lg:hidden">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    Step {step.step} of {experienceSteps.length}
                  </span>
                </div>

                <h3 className="mb-3 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl lg:text-5xl">
                  {step.title}
                </h3>

                <p className="mb-5 font-display text-lg italic text-clay sm:mb-6 sm:text-xl">
                  {step.subtitle}
                </p>

                <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
                  {step.description}
                </p>

                <div className="mb-8 space-y-3 sm:mb-10 sm:space-y-4">
                  {step.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-clay" />
                      <span className="text-sm leading-relaxed text-ink/80 sm:text-base">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-line" />
                  <span className="text-xs font-medium text-muted">
                    {step.step} / {experienceSteps.length}
                  </span>
                  <div className="h-px flex-1 bg-line" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="relative bg-paper px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="section-title mb-5">
            {copy('experience.finalTitle', t.experience.finalTitle)}
          </h3>

          <p className="section-lead mx-auto mb-9 max-w-xl">
            {copy('experience.finalDescription', t.experience.finalDescription)}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/book" className="btn-primary">
              {copy('experience.bookExperience', t.experience.bookExperience)}
            </a>
            <a href="/packages" className="btn-outline">
              {copy('experience.learnMore', t.experience.learnMore)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

TheExperienceV2.displayName = 'TheExperienceV2';

export default TheExperienceV2;
