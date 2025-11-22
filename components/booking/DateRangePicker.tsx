'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Start Date */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">
          Check-in Date
        </label>
        <div className="relative border-2 border-amber-200 rounded-xl bg-white hover:border-amber-300 transition-colors">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <DatePicker
            selected={startDate}
            onChange={onStartDateChange}
            minDate={new Date()}
            placeholderText="Select check-in date"
            dateFormat="dd/MM/yyyy"
            className="w-full pl-10 pr-4 py-3.5 text-gray-700 bg-transparent cursor-pointer focus:outline-none transition-colors"
            calendarClassName="font-sans shadow-xl"
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">
          Check-out Date
        </label>
        <div className="relative border-2 border-amber-200 rounded-xl bg-white hover:border-amber-300 transition-colors">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <DatePicker
            selected={endDate}
            onChange={onEndDateChange}
            minDate={startDate || new Date()}
            placeholderText="Select check-out date"
            dateFormat="dd/MM/yyyy"
            className="w-full pl-10 pr-4 py-3.5 text-gray-700 bg-transparent cursor-pointer focus:outline-none transition-colors"
            calendarClassName="font-sans shadow-xl"
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* Duration Display */}
      {startDate && endDate && (
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl p-4">
          <p className="text-base font-bold text-amber-800 flex items-center gap-2">
            <span>📅</span>
            Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} nights
            <span className="text-sm font-normal text-amber-700">
              ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

