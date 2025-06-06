import { Booking } from '@/types';
import { faker } from '@faker-js/faker';

export const generateBooking = (): Booking => {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 1, max: 100 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.recent().toISOString().split('T')[0],
      checkout: faker.date.soon().toISOString().split('T')[0]
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Launch', 'Dinner'])
  };
};
