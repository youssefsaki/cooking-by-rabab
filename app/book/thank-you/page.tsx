'use client';

import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import Link from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/gtag';
import { readBookingThankYou } from '@/lib/booking-thank-you';

export default function BookingThankYouPage() {
  const { t } = useLanguage();
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    const stored = readBookingThankYou();
    const url = stored?.whatsappUrl || '';
    setWhatsappUrl(url);
    if (!url) return;
    const timer = window.setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{t.booking.success}</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.booking.successMessage}</p>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 text-left space-y-2">
            <p className="text-sm text-green-800 font-semibold">✓ Booking saved in our system</p>
            <p className="text-sm text-green-700">✓ A WhatsApp message opens so you can confirm with Rabab</p>
            <p className="text-sm text-green-700">✓ We&apos;ll follow up within 24 hours</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'booking_success' })}
                className="inline-block bg-[#25D366] text-white font-bold px-8 py-4 rounded-full hover:bg-[#1ebe57] transition-all duration-300 shadow-lg hover:scale-105"
              >
                Open WhatsApp
              </a>
            ) : null}
            <Link
              href="/book"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t.booking.bookAnother}
            </Link>
            <Link
              href="/"
              className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t.booking.backHome}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
