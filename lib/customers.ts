export type CustomerRow = {
  key: string;
  email: string | null;
  phone: string | null;
  name: string;
  totalBookings: number;
  totalSpentEur: number;
  firstBookingAt: string;
  lastBookingAt: string;
  tag: 'new' | 'returning';
  countries: string[];
  packageTypes: string[];
};
