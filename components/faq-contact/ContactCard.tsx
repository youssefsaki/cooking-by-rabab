'use client';

import React from 'react';
import { Phone, Mail, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { ContactInfo } from '@/types/faq-contact.types';

interface ContactCardProps {
  contactInfo: ContactInfo;
}

const ContactCard: React.FC<ContactCardProps> = ({ contactInfo }) => {
  return (
    <div className="space-y-6">
      {/* Quick Contact */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-dark-blue">Quick Contact</h3>
        </div>
        
        <div className="space-y-4">
          {/* Phone */}
          <div className="bg-primary-pale rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-blue">Call Us</h4>
                <p className="text-lg font-bold text-dark-blue">{contactInfo.phone.number}</p>
                <p className="text-sm text-gray-600">{contactInfo.phone.availability}</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-blue">Email Us</h4>
                <p className="text-lg font-bold text-dark-blue">{contactInfo.email.address}</p>
                <p className="text-sm text-gray-600">{contactInfo.email.responseTime}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-blue">WhatsApp</h4>
                <p className="text-lg font-bold text-dark-blue">{contactInfo.whatsapp.number}</p>
                <p className="text-sm text-gray-600">{contactInfo.whatsapp.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-dark-blue">Office Hours</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-semibold text-dark-blue">{contactInfo.officeHours.weekdays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-semibold text-dark-blue">{contactInfo.officeHours.saturday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-semibold text-dark-blue">{contactInfo.officeHours.sunday}</span>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="mt-4 bg-primary-pale rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" />
          <p className="text-sm text-gray-700">{contactInfo.emergencyNote}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;










