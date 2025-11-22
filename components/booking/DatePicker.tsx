'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  showTimeSelect?: boolean;
  timeIntervals?: number;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = 'Select date',
  minDate,
  showTimeSelect = false,
  timeIntervals = 30,
}) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
        <Calendar className="w-5 h-5 text-amber-600" />
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={minDate || new Date()}
        showTimeSelect={showTimeSelect}
        timeIntervals={timeIntervals}
        timeFormat="HH:mm"
        dateFormat={showTimeSelect ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
        placeholderText={placeholder}
        className="w-full pl-10 pr-4 py-3.5 text-gray-700 bg-transparent cursor-pointer focus:outline-none transition-colors"
        calendarClassName="font-sans shadow-xl"
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default CustomDatePicker;

