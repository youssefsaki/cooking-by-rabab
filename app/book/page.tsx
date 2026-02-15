'use client';

import React, { useState } from 'react';
import { FiCheck, FiMail, FiPhone, FiUser, FiMapPin } from 'react-icons/fi';

export default function BookPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: '',
    email: '',
    packageType: 'basic',
    dietaryPreference: 'none',
    allergies: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `Hi Rabab! I would like to book a cooking class.

*Booking Details:*
Name: ${formData.fullName}
Phone: ${formData.phone}
Country: ${formData.country}
Email: ${formData.email}
Package: ${formData.packageType === 'basic' ? 'Basic Package (500 MAD)' : 'Private Package (800 MAD)'}
Dietary Preference: ${formData.dietaryPreference === 'none' ? 'No restrictions' : formData.dietaryPreference}
${formData.allergies ? `Allergies: ${formData.allergies}` : ''}

Looking forward to the experience!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212661736563?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-amber-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Booking Request Sent!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We've received your booking request and will contact you shortly on WhatsApp to confirm your reservation.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  phone: '',
                  country: '',
                  email: '',
                  packageType: 'basic',
                  dietaryPreference: 'none',
                  allergies: '',
                });
              }}
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              Book Another Experience
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border border-amber-200 mb-6">
            <span className="text-2xl">📅</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Book Your Experience
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Start Your{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Culinary Journey
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Fill out the form below and we'll contact you on WhatsApp to confirm your booking.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-amber-100">
            
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiUser className="w-4 h-4 text-amber-600" />
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 text-amber-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="+212 XXX XXX XXX"
              />
            </div>

            {/* Country */}
            <div className="mb-6">
              <label htmlFor="country" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 text-amber-600" />
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Enter your country"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMail className="w-4 h-4 text-amber-600" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Package Selection */}
            <div className="mb-6">
              <label htmlFor="packageType" className="text-sm font-bold text-gray-700 mb-3 block">
                Select Package *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`relative cursor-pointer ${formData.packageType === 'basic' ? 'ring-2 ring-amber-500' : ''}`}>
                  <input
                    type="radio"
                    name="packageType"
                    value="basic"
                    checked={formData.packageType === 'basic'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">Basic Package</span>
                      {formData.packageType === 'basic' && (
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Half-day immersive experience</p>
                    <p className="text-2xl font-black text-amber-600">500 MAD</p>
                  </div>
                </label>

                <label className={`relative cursor-pointer ${formData.packageType === 'private' ? 'ring-2 ring-amber-500' : ''}`}>
                  <input
                    type="radio"
                    name="packageType"
                    value="private"
                    checked={formData.packageType === 'private'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">Private Package</span>
                      {formData.packageType === 'private' && (
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Exclusive personalized journey</p>
                    <p className="text-2xl font-black text-amber-600">800 MAD</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="mb-6">
              <label htmlFor="dietaryPreference" className="text-sm font-bold text-gray-700 mb-2 block">
                Dietary Preference
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              >
                <option value="none">No restrictions</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* Allergies */}
            <div className="mb-8">
              <label htmlFor="allergies" className="text-sm font-bold text-gray-700 mb-2 block">
                Allergies or Special Requirements
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors resize-none"
                placeholder="Please let us know if you have any allergies or special dietary requirements..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Continue to WhatsApp</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              By submitting this form, you'll be redirected to WhatsApp to confirm your booking with us directly.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
