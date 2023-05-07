import { faker } from '@faker-js/faker';
import { Booking } from '../types';

before('Health Check', () => {
  cy.healthCheck();
});

beforeEach('Create a new token', () => {
  const username: string = Cypress.env('username');
  const password: string = Cypress.env('password');
  cy.createToken(username, password);
});

describe('Booker', () => {
  let bookingId: string;

  it('should create a new booking', () => {
    const booking: Booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 1, max: 100 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.recent().toISOString().split('T')[0],
        checkout: faker.date.soon().toISOString().split('T')[0],
      },
      additionalneeds: 'Breakfast',
    };

    cy.createBooking(booking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.property('bookingid');
      bookingId = body.bookingid;
      cy.log(`Booking's ID: ${body.bookingid}`);
    });
  });

  it('should update the created booking', () => {
    const booking: Booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 1, max: 100 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.recent().toISOString().split('T')[0],
        checkout: faker.date.soon().toISOString().split('T')[0],
      },
      additionalneeds: 'Dinner',
    };

    cy.updateBooking(bookingId, booking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.totalprice).to.eq(booking.totalprice);
      expect(body.depositpaid).to.eq(booking.depositpaid);
      expect(body.additionalneeds).to.eq(booking.additionalneeds);
    });
  });

  const updatedBooking: { firstname: string; lastname: string } = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
  };

  it('should even update partially the updated booking', () => {
    cy.partialUpdateBooking(bookingId, updatedBooking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.firstname).to.eq(updatedBooking.firstname);
      expect(body.lastname).to.eq(updatedBooking.lastname);
    });
  });

  it('should recieve a booking information by id', () => {
    cy.getBooking(bookingId).then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('should find booking by firstname and lastname', () => {
    cy.getBooking('', {
      firstname: updatedBooking.firstname,
      lastname: updatedBooking.lastname,
    }).should(({ body }) => {
      expect(body[0].bookingid).to.eq(bookingId);
    });
  });

  it('should delete the created booking by id', () => {
    cy.deleteBooking(bookingId).its('status').should('eq', 201);
  });
});
