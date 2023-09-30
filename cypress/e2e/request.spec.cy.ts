import { faker } from '@faker-js/faker';
import { Booking } from '../types';
import { generateBooking } from 'cypress/support/utils/data';

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
    const newBooking: Booking = generateBooking();

    cy.createBooking(newBooking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.property('bookingid');
      bookingId = body.bookingid;
      cy.log(`Booking's ID: ${body.bookingid}`);
    });
  });

  it('should update the created booking', () => {
    const updatedBooking: Booking = generateBooking();

    cy.updateBooking(bookingId, updatedBooking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.totalprice).to.eq(updatedBooking.totalprice);
      expect(body.depositpaid).to.eq(updatedBooking.depositpaid);
      expect(body.additionalneeds).to.eq(updatedBooking.additionalneeds);
    });
  });

  const partiallyUpdatedBooking: { firstname: string; lastname: string } = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
  };

  it('should even update partially the updated booking', () => {
    cy.partialUpdateBooking(bookingId, partiallyUpdatedBooking).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.firstname).to.eq(partiallyUpdatedBooking.firstname);
      expect(body.lastname).to.eq(partiallyUpdatedBooking.lastname);
    });
  });

  it('should recieve a booking information by id', () => {
    cy.getBooking(bookingId).then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('should find booking by firstname and lastname', () => {
    cy.getBooking('', {
      firstname: partiallyUpdatedBooking.firstname,
      lastname: partiallyUpdatedBooking.lastname,
    }).should(({ body }) => {
      expect(body[0].bookingid).to.eq(bookingId);
    });
  });

  it('should delete the created booking by id', () => {
    cy.deleteBooking(bookingId).its('status').should('eq', 201);
  });
});
