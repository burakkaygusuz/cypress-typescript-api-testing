import { Booking } from '../types';

const healthCheck = () => {
  return cy.session('healthCheck', () => {
    cy.request('/ping').then(({ status }) => {
      expect(status).to.eq(201);
    });
  });
};

const createToken = (username: string, password: string) => {
  return cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: username,
        password: password,
      },
    }).then(({ body }) => {
      cy.setCookie('token', body.token);
    });
  });
};

const getBooking = (
  bookingId: string,
  qs?: { firstname?: string; lastname?: string; checkin?: string; checkout?: string },
) => {
  return cy.request({
    method: 'GET',
    url: `/booking/${bookingId}`,
    qs: qs,
  });
};

const createBooking = (booking: Booking) => {
  return cy.request({
    method: 'POST',
    url: '/booking',
    headers: {
      'Content-Type': 'application/json',
    },
    body: booking,
  });
};

const updateBooking = (bookingId: string, booking: Booking) => {
  return cy.request({
    method: 'PUT',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: booking,
  });
};

const partialUpdateBooking = (bookingId: string, booking: Booking) => {
  return cy.request({
    method: 'PATCH',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: booking,
  });
};

const deleteBooking = (bookingId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

Cypress.Commands.add('healthCheck', healthCheck);
Cypress.Commands.add('createToken', createToken);
Cypress.Commands.add('getBooking', getBooking);
Cypress.Commands.add('createBooking', createBooking);
Cypress.Commands.add('updateBooking', updateBooking);
Cypress.Commands.add('partialUpdateBooking', partialUpdateBooking);
Cypress.Commands.add('deleteBooking', deleteBooking);

declare global {
  declare namespace Cypress {
    interface Chainable {
      /**
       * @description Confirms whether the API is up and running.
       * @example
       *   cy.healthCheck()
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
       */
      healthCheck: typeof healthCheck;

      /**
       * @description Allows to create a new auth token to use for access to the PUT and DELETE /booking
       * @param {string} username - The username to log in with.
       * @param {string} password - The password to log in with.
       * @example
       *    cy.createToken('username', 'password')
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken
       */
      createToken: typeof createToken;

      /**
       * @description Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids.
       * @param {string} bookingId - The booking id to search for.
       * @param {object} queryParams - The query parameters to search for.
       * @example
       *    cy.getBooking('1', {'firstname': 'Jim', 'lastname': 'Brown'})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-GetBooking
       */
      getBooking: typeof getBooking;

      /**
       * @description Create a new booking in the API.
       * @param {Booking} booking - The booking information to create.
       * @example
       *    cy.createBooking({"Jim", "Brown", 111, true {"2018-01-01",  "2019-01-01"}, "Breakfast"})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking
       */
      createBooking: typeof createBooking;

      /**
       * @description Update a current booking.
       * @param {string} bookingId - The booking id to update.
       * @param {Booking} booking - The booking information to update.
       * @example
       *    cy.updateBooking({"James", "Brown", 111, true, {"2018-01-01",  "2019-01-01"}, "Breakfast"})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-UpdateBooking
       */
      updateBooking: typeof updateBooking;

      /**
       * @description Updates a current booking with a partial payload.
       * @param {string} bookingId - The booking id to update.
       * @param {Booking} booking - The booking information to update.
       * @example
       *    cy.partialUpdateBooking({"James", "Brown"})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-PartialUpdateBooking
       */
      partialUpdateBooking: typeof partialUpdateBooking;

      /**
       * @description Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids..
       * @param {string} bookingId - The booking id to delete.
       * @example
       *    cy.deleteBooking("1")
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-DeleteBooking
       */
      deleteBooking: typeof deleteBooking;
    }
  }
}
