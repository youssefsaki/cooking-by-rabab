'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
// Design 1: Warm Bento Grid
// import HeroSection from '@/components/HeroSection';
// Design 2: Dark Cinematic Editorial
// import HeroSection from '@/components/HeroSectionV2';
// Design 3: Minimalist Modern Split
import HeroSection from '@/components/HeroSectionV3';
// Design 4: Horizontal Scroll Gallery
import PackagesSection from '@/components/PackagesSectionV4';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
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
      <PackagesSection />
      <GoogleReviewsSection data={googleReviewsData} />
      <Footer data={footerData} />
    </main>
  );
}
