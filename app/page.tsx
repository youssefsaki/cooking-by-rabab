import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import HeroIntroSection from '@/components/HeroIntroSection';
import HeroSection from '@/components/HeroSectionV3';
import PackagesSection from '@/components/PackagesV3';
import ThingsToDoSection from '@/components/ThingsToDoSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import HighlightsStrip, {
  DayFlowSection,
  MeetRababTeaser,
  FinalCtaBand,
} from '@/components/home/HomeExtras';
import { getStaticHeroData, getStaticHeroSectionData } from '@/lib/static-data';
import { getHeroContent } from '@/lib/content';

const TheExperience = dynamic(() => import('@/components/TheExperienceV2'), {
  loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse" />,
});

const GoogleReviewsSection = dynamic(() => import('@/components/GoogleReviewsSectionV2'), {
  loading: () => <div className="min-h-[400px] bg-white animate-pulse" />,
});

const CmsTestimonials = dynamic(() => import('@/components/CmsTestimonials'), {
  loading: () => null,
});

const SupportingChildren = dynamic(() => import('@/components/SupportingChildrenV4'), {
  loading: () => <div className="min-h-[500px] bg-gray-900 animate-pulse" />,
});

const LocationMap = dynamic(() => import('@/components/LocationMapV3'), {
  loading: () => <div className="min-h-[600px] bg-amber-50 animate-pulse" />,
  ssr: false,
});

export default async function HomePage() {
  const heroData = getStaticHeroData();
  const heroSectionData = getStaticHeroSectionData();
  // Server-load CMS so the hero description does not flash translation → CMS text
  const heroCms = await getHeroContent('en');

  return (
    <main className="min-h-screen">
      <ErrorBoundary name="Hero">
        <Hero heroData={heroData} initialCms={heroCms} />
      </ErrorBoundary>

      <ErrorBoundary name="HeroIntro">
        <HeroIntroSection />
      </ErrorBoundary>

      <ErrorBoundary name="Highlights">
        <HighlightsStrip />
      </ErrorBoundary>

      <ErrorBoundary name="GoogleReviews">
        <section id="reviews">
          <GoogleReviewsSection />
        </section>
      </ErrorBoundary>

      <ErrorBoundary name="CmsTestimonials">
        <CmsTestimonials />
      </ErrorBoundary>

      <ErrorBoundary name="Packages">
        <section id="packages">
          <PackagesSection />
        </section>
      </ErrorBoundary>

      <ErrorBoundary name="DayFlow">
        <DayFlowSection />
      </ErrorBoundary>

      <ErrorBoundary name="MeetRabab">
        <MeetRababTeaser />
      </ErrorBoundary>

      <ErrorBoundary name="HeroSection">
        <HeroSection data={heroSectionData} />
      </ErrorBoundary>

      <ErrorBoundary name="TheExperience">
        <section id="the-experience">
          <TheExperience />
        </section>
      </ErrorBoundary>

      <ErrorBoundary name="SupportingChildren">
        <section id="supporting-children">
          <SupportingChildren />
        </section>
      </ErrorBoundary>

      <ErrorBoundary name="ThingsToDo">
        <ThingsToDoSection />
      </ErrorBoundary>

      <ErrorBoundary name="LocationMap">
        <LocationMap />
      </ErrorBoundary>

      <ErrorBoundary name="FinalCta">
        <FinalCtaBand />
      </ErrorBoundary>
    </main>
  );
}
