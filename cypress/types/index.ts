export type Booking = {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  bookingdates?: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: 'Breakfast' | 'Launch' | 'Dinner';
};
