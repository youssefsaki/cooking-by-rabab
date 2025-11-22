export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FAQData {
  categories: string[];
  faqs: FAQ[];
}

export interface ContactInfo {
  phone: {
    number: string;
    availability: string;
  };
  email: {
    address: string;
    responseTime: string;
  };
  whatsapp: {
    number: string;
    note: string;
  };
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  emergencyNote: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
















