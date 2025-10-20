'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types/faq-contact.types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-xl"
            aria-expanded={openItem === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="text-dark-blue font-medium pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ${
                openItem === faq.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div
            id={`faq-answer-${faq.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItem === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 pt-2">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-gray-700 leading-relaxed text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
