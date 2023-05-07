export type Booking = {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  bookingdates?: BookingDates;
  additionalneeds?: string;
};

type BookingDates = {
  checkin: string;
  checkout: string;
};
