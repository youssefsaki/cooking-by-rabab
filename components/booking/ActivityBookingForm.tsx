'use client';

import React, { useState, useCallback } from 'react';
import DatePicker from './DatePicker';
import BookingLoader from './BookingLoader';
import CountryPhoneInput from './CountryPhoneInput';
import { X, Loader2, User, Mail, Phone, Calendar, Users, MessageSquare } from 'lucide-react';

interface ActivityBookingFormProps {
  activityType: string;
  activityName: string;
  onClose: () => void;
}

const ActivityBookingForm: React.FC<ActivityBookingFormProps> = ({
  activityType,
  activityName,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activityDate: null as Date | null,
    numberOfGuests: '1',
    timeSlot: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing - use functional update to avoid dependency
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleDateChange = useCallback((date: Date | null) => {
    setFormData(prev => ({ ...prev, activityDate: date }));
    setErrors(prev => {
      if (prev.activityDate) {
        const newErrors = { ...prev };
        delete newErrors.activityDate;
        return newErrors;
      }
      return prev;
    });
  }, []);

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim()
      .substring(0, 500); // Limit length
  };

  // Sanitize phone number (preserve + and numbers)
  const sanitizePhone = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim()
      .substring(0, 30); // Limit length for phone numbers
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    const name = formData.name.trim();
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    } else if (email.length > 254) {
      newErrors.email = 'Email is too long';
    }

    // Phone validation (now includes country code)
    const phone = formData.phone.trim();
    if (!phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?\d[\d\s\-\(\)]+$/.test(phone)) {
      newErrors.phone = 'Invalid phone number format';
    } else if (phone.length < 10 || phone.length > 25) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (!formData.activityDate) {
      newErrors.activityDate = 'Please select a date';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (formData.activityDate < today) {
        newErrors.activityDate = 'Activity date cannot be in the past';
      }
    }

    // Number of guests validation
    const guests = parseInt(formData.numberOfGuests);
    if (!formData.numberOfGuests || isNaN(guests) || guests < 1) {
      newErrors.numberOfGuests = 'Number of guests must be at least 1';
    } else if (guests > 50) {
      newErrors.numberOfGuests = 'Maximum 50 guests per booking';
    }

    // Special requests validation
    if (formData.specialRequests && formData.specialRequests.length > 1000) {
      newErrors.specialRequests = 'Special requests must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Sanitize all inputs before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email.toLowerCase()),
        phone: sanitizePhone(formData.phone), // Use phone-specific sanitization
        activityType: sanitizeInput(activityType),
        activityDate: formData.activityDate?.toISOString().split('T')[0],
        numberOfGuests: formData.numberOfGuests,
        timeSlot: formData.timeSlot || '',
        specialRequests: formData.specialRequests ? sanitizeInput(formData.specialRequests) : '',
      };

      const response = await fetch('/api/bookings/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Server error occurred' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setIsSubmitting(false);
        alert(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setIsSubmitting(false);
      
      // More specific error message
      const errorMessage = error?.message || 'Unknown error occurred';
      if (errorMessage.includes('fetch')) {
        alert('Connection error: Could not reach the server. Please check if the server is running.');
      } else {
        alert(`Error: ${errorMessage}\n\nPlease try again or contact support if the problem persists.`);
      }
    }
  };

  // Show loading screen while submitting
  if (isSubmitting) {
    return <BookingLoader bookingType="activity" />;
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="relative max-w-lg w-full">
          {/* Success Card */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500"></div>
            
            {/* Warm Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative z-10">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Subtle Ring */}
                  <div className="absolute inset-0 border-2 border-teal-200 rounded-full animate-pulse opacity-50"></div>
                  {/* Success Circle */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Submitted Successfully
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Your booking request has been received
                </p>
                <div className="inline-block bg-teal-50 border border-teal-100 rounded-lg px-4 py-2 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-teal-700">{activityName}</span>
                  </p>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  We'll review your request and contact you within 24 hours to confirm availability and finalize your booking.
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">What happens next?</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our team will carefully review your booking details and get back to you via email or phone to confirm everything is set up perfectly for your adventure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thank You Footer */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Thank you for choosing <span className="font-semibold text-gray-700">Playa Surf House</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header with Warm Gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-black text-white mb-1">Book {activityName}</h2>
            <p className="text-white/90 text-sm">Let's get you booked for an amazing experience!</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form with Warm Background */}
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <User className="w-4 h-4 text-amber-600" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.name 
                  ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                  : 'border-amber-200 focus:ring-amber-400 bg-white focus:border-amber-400'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
              <span>⚠️</span> {errors.name}
            </p>}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <Mail className="w-4 h-4 text-amber-600" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                  : 'border-amber-200 focus:ring-amber-400 bg-white focus:border-amber-400'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
              <span>⚠️</span> {errors.email}
            </p>}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <Phone className="w-4 h-4 text-amber-600" />
              Phone Number *
            </label>
            <CountryPhoneInput
              value={formData.phone}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, phone: value }));
                setErrors(prev => {
                  if (prev.phone) {
                    const newErrors = { ...prev };
                    delete newErrors.phone;
                    return newErrors;
                  }
                  return prev;
                });
              }}
              error={errors.phone}
              placeholder="Enter phone number"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              Activity Date *
            </label>
            <div className={`border-2 rounded-xl transition-all ${
              errors.activityDate ? 'border-red-400' : 'border-amber-200'
            }`}>
              <DatePicker
                selectedDate={formData.activityDate}
                onChange={handleDateChange}
                placeholder="Select activity date"
              />
            </div>
            {errors.activityDate && <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
              <span>⚠️</span> {errors.activityDate}
            </p>}
          </div>

          {/* Number of Guests */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <Users className="w-4 h-4 text-amber-600" />
              Number of Guests *
            </label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              max="20"
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.numberOfGuests 
                  ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                  : 'border-amber-200 focus:ring-amber-400 bg-white focus:border-amber-400'
              }`}
              placeholder="1"
            />
            {errors.numberOfGuests && <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
              <span>⚠️</span> {errors.numberOfGuests}
            </p>}
          </div>

          {/* Special Requests */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3.5 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white focus:border-amber-400 transition-all resize-none"
              placeholder="Any special requirements, dietary needs, or questions? We're here to help!"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 px-6 rounded-xl font-black text-white transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #ffc414 50%, #fbbf24 100%)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                '🎉 Confirm Booking'
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders when parent re-renders
export default React.memo(ActivityBookingForm);

