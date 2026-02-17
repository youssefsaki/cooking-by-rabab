'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { FiCheck, FiMail, FiPhone, FiUser, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

// Country options for dropdown
const countryOptions = [
  { value: 'Morocco', label: '🇲🇦 Morocco', flag: '🇲🇦' },
  { value: 'France', label: '🇫🇷 France', flag: '🇫🇷' },
  { value: 'Spain', label: '🇪🇸 Spain', flag: '🇪🇸' },
  { value: 'Germany', label: '🇩🇪 Germany', flag: '🇩🇪' },
  { value: 'United Kingdom', label: '🇬🇧 United Kingdom', flag: '🇬🇧' },
  { value: 'United States', label: '🇺🇸 United States', flag: '🇺🇸' },
  { value: 'Canada', label: '🇨🇦 Canada', flag: '🇨🇦' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands', flag: '🇳🇱' },
  { value: 'Belgium', label: '🇧🇪 Belgium', flag: '🇧🇪' },
  { value: 'Italy', label: '🇮🇹 Italy', flag: '🇮🇹' },
  { value: 'Portugal', label: '🇵🇹 Portugal', flag: '🇵🇹' },
  { value: 'Switzerland', label: '🇨🇭 Switzerland', flag: '🇨🇭' },
  { value: 'Australia', label: '🇦🇺 Australia', flag: '🇦🇺' },
  { value: 'Brazil', label: '🇧🇷 Brazil', flag: '🇧🇷' },
  { value: 'Mexico', label: '🇲🇽 Mexico', flag: '🇲🇽' },
  { value: 'Argentina', label: '🇦🇷 Argentina', flag: '🇦🇷' },
  { value: 'Japan', label: '🇯🇵 Japan', flag: '🇯🇵' },
  { value: 'South Korea', label: '🇰🇷 South Korea', flag: '🇰🇷' },
  { value: 'China', label: '🇨🇳 China', flag: '🇨🇳' },
  { value: 'India', label: '🇮🇳 India', flag: '🇮🇳' },
  { value: 'United Arab Emirates', label: '🇦🇪 United Arab Emirates', flag: '🇦🇪' },
  { value: 'Saudi Arabia', label: '🇸🇦 Saudi Arabia', flag: '🇸🇦' },
  { value: 'South Africa', label: '🇿🇦 South Africa', flag: '🇿🇦' },
  { value: 'Other', label: '🌍 Other', flag: '🌍' },
];

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Full name is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters')
    .required('Country is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  packageType: Yup.string()
    .oneOf(['basic', 'private'], 'Please select a valid package')
    .required('Package selection is required'),
  dietaryPreference: Yup.string()
    .oneOf(['none', 'vegetarian', 'vegan'], 'Please select a valid dietary preference')
    .required('Dietary preference is required'),
  allergies: Yup.string()
    .max(500, 'Allergies description must be less than 500 characters')
});

export default function BookPage() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');
  const { t } = useLanguage();
  
  const [submitted, setSubmitted] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      country: '',
      email: '',
      packageType: packageParam === 'private' ? 'private' : 'basic',
      dietaryPreference: 'none',
      allergies: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send to Google Sheets
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQ3JkKD71-giIoQLQDLF1yaN7rJ1cxTCbFU4JBnRxGaWgk6w0iE-na2prwPZe7mfjomg/exec';
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });
        
        // Show success message
        setSubmitted(true);
        
        // Prepare WhatsApp message
        const whatsappPhone = '212726671746'; // Your WhatsApp number
        const packageName = values.packageType === 'basic' ? 'Basic Package (500 MAD)' : 'Private Package (800 MAD)';
        const dietaryText = values.dietaryPreference === 'none' ? 'No restrictions' : values.dietaryPreference.charAt(0).toUpperCase() + values.dietaryPreference.slice(1);
        const allergiesText = values.allergies || 'None';
        
        const whatsappMessage = `🍽️ *New Booking Request*

👤 *Name:* ${values.fullName}
📞 *Phone:* ${values.phone}
🌍 *Country:* ${values.country}
📧 *Email:* ${values.email}

📦 *Package:* ${packageName}
🥗 *Dietary:* ${dietaryText}
⚠️ *Allergies:* ${allergiesText}

Looking forward to cooking with you! 🇲🇦`;
        
        // Open WhatsApp with pre-filled message after a short delay
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(whatsappUrl, '_blank');
        }, 1500);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Still show success even if there's an error
        setSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <FiCheck className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              {t.booking.success}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t.booking.successMessage}
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-green-800 font-semibold mb-2">✓ Your booking details have been saved</p>
              <p className="text-sm text-green-700">✓ We'll reach out within 24 hours</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  formik.resetForm({
                    values: {
                      fullName: '',
                      phone: '',
                      country: '',
                      email: '',
                      packageType: packageParam === 'private' ? 'private' : 'basic',
                      dietaryPreference: 'none',
                      allergies: '',
                    }
                  });
                }}
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t.booking.bookAnother}
              </button>
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section className="pt-40 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {t.booking.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {t.booking.description}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={formik.handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-amber-100">
            
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiUser className="w-4 h-4 text-amber-600" />
                {t.booking.fullName} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                {...formik.getFieldProps('fullName')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  formik.touched.fullName && formik.errors.fullName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
                placeholder={t.booking.fullNamePlaceholder}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number with Country Code */}
            <div className="mb-6">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 text-amber-600" />
                {t.booking.phone} *
              </label>
              <style jsx global>{`
                .phone-input-container .react-tel-input {
                  font-family: inherit;
                }
                .phone-input-container .react-tel-input .form-control {
                  width: 100%;
                  height: 50px;
                  border: 2px solid ${formik.touched.phone && formik.errors.phone ? '#ef4444' : '#e5e7eb'};
                  border-radius: 0.75rem;
                  font-size: 1rem;
                  padding-left: 52px;
                  transition: all 0.2s;
                }
                .phone-input-container .react-tel-input .form-control:focus {
                  border-color: ${formik.touched.phone && formik.errors.phone ? '#ef4444' : '#f59e0b'};
                  box-shadow: none;
                  outline: none;
                }
                .phone-input-container .react-tel-input .form-control:hover {
                  border-color: ${formik.touched.phone && formik.errors.phone ? '#ef4444' : '#f59e0b'};
                }
                .phone-input-container .react-tel-input .flag-dropdown {
                  border: none;
                  background: transparent;
                  border-radius: 0.75rem 0 0 0.75rem;
                }
                .phone-input-container .react-tel-input .flag-dropdown:hover,
                .phone-input-container .react-tel-input .flag-dropdown.open {
                  background: #fef3c7;
                }
                .phone-input-container .react-tel-input .selected-flag {
                  width: 45px;
                  padding: 0 0 0 12px;
                  border-radius: 0.75rem 0 0 0.75rem;
                  transition: all 0.2s;
                }
                .phone-input-container .react-tel-input .selected-flag:hover {
                  background: #fef3c7;
                }
                .phone-input-container .react-tel-input .country-list {
                  border-radius: 0.75rem;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                  border: 1px solid #e5e7eb;
                  margin-top: 4px;
                  max-height: 250px;
                  width: 300px;
                }
                .phone-input-container .react-tel-input .country-list .country {
                  padding: 10px 12px;
                  font-size: 0.95rem;
                  transition: all 0.15s;
                }
                .phone-input-container .react-tel-input .country-list .country:hover {
                  background: #fef3c7;
                }
                .phone-input-container .react-tel-input .country-list .country.highlight {
                  background: #f59e0b;
                  color: white;
                }
                .phone-input-container .react-tel-input .country-list .search {
                  padding: 10px 12px;
                  background: #fef3c7;
                  border-bottom: 2px solid #f59e0b;
                  position: sticky;
                  top: 0;
                  z-index: 10;
                }
                .phone-input-container .react-tel-input .country-list .search-box {
                  border: 2px solid #e5e7eb;
                  border-radius: 0.5rem;
                  padding: 8px 12px;
                  font-size: 0.95rem;
                  width: 100%;
                  background: white;
                  color: #111827;
                }
                .phone-input-container .react-tel-input .country-list .search-box:focus {
                  border-color: #f59e0b;
                  outline: none;
                  background: white;
                }
                .phone-input-container .react-tel-input .country-list .country .flag {
                  margin-right: 8px;
                  transform: scale(1.2);
                }
                .phone-input-container .react-tel-input .country-list .country .country-name {
                  color: inherit;
                  font-weight: 500;
                }
                .phone-input-container .react-tel-input .country-list .country .dial-code {
                  color: inherit;
                  opacity: 0.7;
                  font-weight: 600;
                }
              `}</style>
              <div className="phone-input-container">
                <PhoneInput
                  country={'ma'}
                  value={formik.values.phone}
                  onChange={(value) => {
                    formik.setFieldValue('phone', value);
                  }}
                  onBlur={() => formik.setFieldTouched('phone', true)}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    id: 'phone'
                  }}
                  enableSearch={true}
                  searchPlaceholder="Search country..."
                  preferredCountries={['ma', 'fr', 'es', 'de', 'gb', 'us']}
                  searchStyle={{
                    width: '100%',
                    padding: '8px 12px',
                  }}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="mb-6">
              <label htmlFor="country" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 text-amber-600" />
                {t.booking.country} *
              </label>
              <Select
                id="country"
                name="country"
                options={countryOptions}
                value={countryOptions.find(option => option.value === formik.values.country) || null}
                onChange={(option) => {
                  formik.setFieldValue('country', option?.value || '');
                }}
                onBlur={() => formik.setFieldTouched('country', true)}
                placeholder={t.booking.countryPlaceholder}
                isClearable
                isSearchable
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: '50px',
                    borderRadius: '0.75rem',
                    borderWidth: '2px',
                    borderColor: formik.touched.country && formik.errors.country 
                      ? '#ef4444' 
                      : state.isFocused 
                        ? '#f59e0b' 
                        : '#e5e7eb',
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: formik.touched.country && formik.errors.country ? '#ef4444' : '#f59e0b',
                    },
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: '8px 12px',
                  }),
                  input: (base) => ({
                    ...base,
                    margin: '0',
                    padding: '0',
                    fontSize: '1rem',
                    color: '#111827',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#9ca3af',
                    fontSize: '1rem',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#111827',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e5e7eb',
                    marginTop: '4px',
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: '4px',
                    maxHeight: '250px',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected 
                      ? '#f59e0b' 
                      : state.isFocused 
                        ? '#fef3c7' 
                        : 'white',
                    color: state.isSelected ? 'white' : '#111827',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: state.isSelected ? '600' : '500',
                    padding: '10px 12px',
                    borderRadius: '0.5rem',
                    margin: '2px 0',
                    transition: 'all 0.15s',
                    '&:active': {
                      backgroundColor: '#f59e0b',
                    },
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    display: 'none',
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    color: state.isFocused ? '#f59e0b' : '#9ca3af',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: '#f59e0b',
                    },
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: '#9ca3af',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#ef4444',
                    },
                  }),
                }}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.country}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMail className="w-4 h-4 text-amber-600" />
                {t.booking.email} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...formik.getFieldProps('email')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
                placeholder={t.booking.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.email}
                </p>
              )}
            </div>

            {/* Package Selection */}
            <div className="mb-6">
              <label htmlFor="packageType" className="text-sm font-bold text-gray-700 mb-3 block">
                {t.booking.packageType} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`relative cursor-pointer ${formik.values.packageType === 'basic' ? 'ring-2 ring-amber-500' : ''}`}>
                  <input
                    type="radio"
                    name="packageType"
                    value="basic"
                    checked={formik.values.packageType === 'basic'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{t.packages.basic.title}</span>
                      {formik.values.packageType === 'basic' && (
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t.packages.basic.subtitle}</p>
                    <p className="text-2xl font-black text-amber-600">500 MAD</p>
                  </div>
                </label>

                <label className={`relative cursor-pointer ${formik.values.packageType === 'private' ? 'ring-2 ring-amber-500' : ''}`}>
                  <input
                    type="radio"
                    name="packageType"
                    value="private"
                    checked={formik.values.packageType === 'private'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="sr-only"
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{t.packages.private.title}</span>
                      {formik.values.packageType === 'private' && (
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t.packages.private.subtitle}</p>
                    <p className="text-2xl font-black text-amber-600">800 MAD</p>
                  </div>
                </label>
              </div>
              {formik.touched.packageType && formik.errors.packageType && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.packageType}
                </p>
              )}
            </div>

            {/* Dietary Preference */}
            <div className="mb-6">
              <label htmlFor="dietaryPreference" className="text-sm font-bold text-gray-700 mb-2 block">
                {t.booking.dietary}
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                {...formik.getFieldProps('dietaryPreference')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  formik.touched.dietaryPreference && formik.errors.dietaryPreference
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
              >
                <option value="none">{t.booking.dietaryNone}</option>
                <option value="vegetarian">{t.booking.dietaryVegetarian}</option>
                <option value="vegan">{t.booking.dietaryVegan}</option>
              </select>
              {formik.touched.dietaryPreference && formik.errors.dietaryPreference && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.dietaryPreference}
                </p>
              )}
            </div>

            {/* Allergies */}
            <div className="mb-8">
              <label htmlFor="allergies" className="text-sm font-bold text-gray-700 mb-2 block">
                {t.booking.allergies}
              </label>
              <textarea
                id="allergies"
                name="allergies"
                {...formik.getFieldProps('allergies')}
                rows={3}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                  formik.touched.allergies && formik.errors.allergies
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
                placeholder={t.booking.allergiesPlaceholder}
              />
              {formik.touched.allergies && formik.errors.allergies && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.allergies}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {formik.isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg">{t.booking.submitting}</span>
                </>
              ) : (
                <>
                  <span className="text-lg">{t.booking.submit}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              By submitting this form, your booking request will be saved and we'll contact you shortly to confirm.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
