'use client';

import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
import RoomsSection from '@/components/RoomsSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { getStaticHeroData, getStaticHeroSectionData, getStaticRoomsSectionData, getStaticGoogleReviewsData } from '@/lib/static-data';

export default function HomePage() {
  const heroData = getStaticHeroData();
  const heroSectionData = getStaticHeroSectionData();
  const roomsSectionData = getStaticRoomsSectionData();
  const googleReviewsData = getStaticGoogleReviewsData();

  return (
    <>
      <Hero heroData={heroData} />
      <HeroSection data={heroSectionData} />
      <RoomsSection data={roomsSectionData} />
      <GoogleReviewsSection data={googleReviewsData} />
    </>
  );
}
