import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSectionV3';
import PackagesSection from '@/components/PackagesV3';
import { getStaticHeroData, getStaticHeroSectionData } from '@/lib/static-data';

// Lazy load below-the-fold components for better initial page load
const TheExperience = dynamic(() => import('@/components/TheExperienceV2'), {
  loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse" />,
});

const MeetTheTeam = dynamic(() => import('@/components/MeetTheChefV2'), {
  loading: () => <div className="min-h-[500px] bg-white animate-pulse" />,
});

const ActivitiesShowcase = dynamic(() => import('@/components/ActivitiesShowcaseV4'), {
  loading: () => <div className="min-h-[800px] bg-white animate-pulse" />,
});

const PhotoGallery = dynamic(() => import('@/components/PhotoGallery'), {
  loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse" />,
});

const GoogleReviewsSection = dynamic(() => import('@/components/GoogleReviewsSectionV2'), {
  loading: () => <div className="min-h-[400px] bg-white animate-pulse" />,
});

const SupportingChildren = dynamic(() => import('@/components/SupportingChildrenV4'), {
  loading: () => <div className="min-h-[500px] bg-gray-900 animate-pulse" />,
});

const FAQSection = dynamic(() => import('@/components/FAQSectionV3'), {
  loading: () => <div className="min-h-[500px] bg-gray-900 animate-pulse" />,
});

const LocationMap = dynamic(() => import('@/components/LocationMapV3'), {
  loading: () => <div className="min-h-[600px] bg-amber-50 animate-pulse" />,
  ssr: false,
});

const PrivateGroupsCTA = dynamic(() => import('@/components/PrivateGroupsCTA'), {
  loading: () => <div className="min-h-[300px] bg-gray-900 animate-pulse" />,
});

export default function HomePage() {
  const heroData = getStaticHeroData();
  const heroSectionData = getStaticHeroSectionData();

  return (
    <main className="min-h-screen">
      {/* Hero - Full Screen */}
      <Hero heroData={heroData} />
      
      {/* Packages Section - Directly under Hero */}
      <section id="packages">
        <PackagesSection />
      </section>
      
      {/* Hero Section with ratings and experience includes */}
      <HeroSection data={heroSectionData} />
      
      {/* The Journey Section */}
      <section id="the-experience">
        <TheExperience />
      </section>
      
      {/* Community Impact Section */}
      <section id="supporting-children">
        <SupportingChildren />
      </section>
      
      {/* Reviews Section */}
      <section id="reviews">
        <GoogleReviewsSection />
      </section>
      
      {/* Map Section */}
      <LocationMap />
    </main>
  );
}
