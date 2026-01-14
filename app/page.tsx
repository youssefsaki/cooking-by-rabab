'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
// Design 1: Warm Bento Grid
// import HeroSection from '@/components/HeroSection';
// Design 2: Dark Cinematic Editorial
// import HeroSection from '@/components/HeroSectionV2';
// Design 3: Minimalist Modern Split
import HeroSection from '@/components/HeroSectionV3';
// The Experience - Design 1: Card Grid
// import TheExperience from '@/components/TheExperience';
// The Experience - Design 2: Split-Screen Editorial
import TheExperience from '@/components/TheExperienceV2';
// The Experience - Design 3: Horizontal Scroll Slider
// import TheExperience from '@/components/TheExperienceV3';
// Design 4: Horizontal Scroll Gallery
import PackagesSection from '@/components/PackagesSectionV4';
// Cooking Classes - Design 1: Icon Grid Cards
// import ActivitiesShowcase from '@/components/ActivitiesShowcase';
// Cooking Classes - Design 2: Featured Carousel
// import ActivitiesShowcase from '@/components/ActivitiesShowcaseV2';
// Cooking Classes - Design 3: Horizontal Scroll Gallery
// import ActivitiesShowcase from '@/components/ActivitiesShowcaseV3';
// Cooking Classes - Design 4: Alternating Split Layout (Magazine Editorial)
import ActivitiesShowcase from '@/components/ActivitiesShowcaseV4';
// Cooking Classes - Design 5: Interactive Tab System
// import ActivitiesShowcase from '@/components/ActivitiesShowcaseV5';
import PhotoGallery from '@/components/PhotoGallery';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import MeetTheTeam from '@/components/MeetTheTeam';
import FAQSection from '@/components/FAQSection';
import LocationMap from '@/components/LocationMap';
import PrivateGroupsCTA from '@/components/PrivateGroupsCTA';
import Footer from '@/components/Footer';
import { getStaticNavigationData, getStaticHeroData, getStaticHeroSectionData, getStaticGoogleReviewsData, getStaticFooterData } from '@/lib/static-data';

export default function HomePage() {
  const navigationData = getStaticNavigationData();
  const heroData = getStaticHeroData();
  const heroSectionData = getStaticHeroSectionData();
  const googleReviewsData = getStaticGoogleReviewsData();
  const footerData = getStaticFooterData();

  return (
    <main className="min-h-screen">
      <Header navigationData={navigationData} />
      <Hero heroData={heroData} />
      <HeroSection data={heroSectionData} />
      <TheExperience />
      <PackagesSection />
      <ActivitiesShowcase />
      <PhotoGallery />
      <GoogleReviewsSection data={googleReviewsData} />
      <MeetTheTeam />
      <FAQSection />
      <LocationMap />
      <PrivateGroupsCTA />
      <Footer data={footerData} />
    </main>
  );
}
