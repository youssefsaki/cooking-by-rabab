'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { RoomsSectionData } from '@/types';

interface RoomsSectionProps {
  data: RoomsSectionData;
}

const RoomsSection: React.FC<RoomsSectionProps> = memo(({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headings */}
        <div className="text-center mb-16">
          {/* Small Heading */}
          <h3 className="text-sm font-medium tracking-tight uppercase text-gray-500 mb-4">
            {data.smallHeading}
          </h3>
          
          {/* Main Heading */}
          <Link href="/houseandrooms" className="block group">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-dark-blue group-hover:text-primary transition-colors duration-300 cursor-pointer">
              {data.mainHeading}
            </h2>
          </Link>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.rooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#f8f8f8] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >
              {/* Room Image - Clickable */}
              <Link href={room.link.href} className="block">
                <div className="relative w-full h-64 mb-6 rounded-t-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-300">
                  <Image
                    src={room.image.src}
                    alt={room.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={room.id === 'private-room'}
                  />
                </div>
              </Link>

              {/* Room Content */}
              <div className="flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-lg font-bold uppercase text-dark-blue tracking-wide mb-4">
                  {room.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                  {room.description}
                </p>

                {/* Link Row - Always at bottom */}
                <div className="mt-auto">
                  <Link
                    href={room.link.href}
                    className="inline-flex items-center gap-1 text-dark-blue font-bold hover:text-primary transition-colors duration-300 group-hover:translate-x-1"
                  >
                    <span>{room.link.text}</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

RoomsSection.displayName = 'RoomsSection';

export default RoomsSection;
