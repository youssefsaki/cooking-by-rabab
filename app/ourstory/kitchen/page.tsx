'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OurKitchenPage() {
  const { t } = useLanguage();

  // Kitchen gallery images
  const galleryImages = [
    { src: '/our-story/our-kitchen/wood-fire-oven.jpg', alt: 'Traditional Amazigh wood-fired oven in authentic Moroccan kitchen' },
    { src: '/our-story/our-kitchen/traditional-tagines.jpg', alt: 'Traditional tagine pots and cooking utensils in Moroccan kitchen' },
    { src: '/our-story/our-kitchen/kitchen-workspace.jpg', alt: 'Authentic Amazigh kitchen workspace with traditional tools' },
    { src: '/our-story/our-kitchen/spices.jpg', alt: 'Traditional Moroccan spices and ingredients display' },
    { src: '/our-story/our-kitchen/bread-making-station.jpg', alt: 'Traditional bread making area in Amazigh kitchen' },
    { src: '/our-story/our-kitchen/kitchen-overview.jpg', alt: 'Complete view of authentic traditional Moroccan kitchen' }
  ].map((img, index) => ({ ...img, title: t.ourStory.kitchen.galleryImages[index] }));

  return (
    <main className="overflow-x-hidden">
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              {t.ourStory.kitchen.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 font-light max-w-2xl mx-auto drop-shadow-lg">
              {t.ourStory.kitchen.heroSubtitle}
            </p>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-amber-600 font-bold text-sm uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-full">
                    {t.ourStory.kitchen.badge}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t.ourStory.kitchen.introTitle} <span className="text-amber-600">{t.ourStory.kitchen.introTitleHighlight}</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.ourStory.kitchen.introP1}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.ourStory.kitchen.introP2}
                </p>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/our-story/our-kitchen/main.jpg"
                    alt="Authentic traditional Moroccan Amazigh kitchen in Taghazout Atlas Mountains"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Kitchen Features */}
        <section className="py-20 bg-gradient-to-b from-white to-amber-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t.ourStory.kitchen.featuresTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.ourStory.kitchen.featuresSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.ourStory.kitchen.features.map((feature, index) => {
                const icons = ['🔥', '🍲', '🌾', '🥖', '🧂', '🏺'];
                return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-5xl mb-4">{icons[index]}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t.ourStory.kitchen.galleryTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.ourStory.kitchen.gallerySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* Kitchen Image */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-white/90">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {t.ourStory.kitchen.ctaTitle}
            </h2>
            <p className="text-xl text-white/95 mb-10 drop-shadow-md">
              {t.ourStory.kitchen.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-amber-600 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {t.ourStory.kitchen.bookYourExperience}
              </Link>
              <Link 
                href="/packages"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                {t.ourStory.kitchen.viewPackages}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
}
