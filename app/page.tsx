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
// Photo Gallery - Design 1: Masonry Grid with Lightbox
import PhotoGallery from '@/components/PhotoGallery';
// Photo Gallery - Design 2: Featured Image Slider with Thumbnails
// import PhotoGallery from '@/components/PhotoGalleryV2';
// Photo Gallery - Design 3: Instagram-Style Grid with Hover Cards
// import PhotoGallery from '@/components/PhotoGalleryV3';
// Google Reviews - Design 1: Card Grid
// import GoogleReviewsSection from '@/components/GoogleReviewsSection';
// Google Reviews - Design 2: Testimonial Carousel
import GoogleReviewsSection from '@/components/GoogleReviewsSectionV2';
// Google Reviews - Design 3: Horizontal Scroll with Stats
// import GoogleReviewsSection from '@/components/GoogleReviewsSectionV3';
// Meet the Team - Design 1: Team Grid (multiple members)
// import MeetTheTeam from '@/components/MeetTheTeam';
// Meet the Chef - Design 2: Personal Spotlight (Rabab only)
import MeetTheTeam from '@/components/MeetTheChefV2';
// FAQ - Design 1: Accordion with Categories & Search
// import FAQSection from '@/components/FAQSection';
// FAQ - Design 2: Two-Column Card Layout
// import FAQSection from '@/components/FAQSectionV2';
// FAQ - Design 3: Minimalist Fullwidth Accordion
import FAQSection from '@/components/FAQSectionV3';
// Location - Design 1: Split Layout with Info Cards
// import LocationMap from '@/components/LocationMap';
// Location - Design 2: Fullwidth Map with Floating Cards
// import LocationMap from '@/components/LocationMapV2';
// Location - Design 3: Journey Timeline with Map Card
import LocationMap from '@/components/LocationMapV3';
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
