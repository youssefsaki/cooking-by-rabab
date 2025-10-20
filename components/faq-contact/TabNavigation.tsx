'use client';

import React from 'react';
import { FAQData } from '@/types/faq-contact.types';

interface TabNavigationProps {
  categories: string[];
  activeTab: string;
  onTabChange: (category: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  categories,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onTabChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === category
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

