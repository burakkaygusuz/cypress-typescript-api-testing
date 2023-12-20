import { Booking } from '../../types';

const healthCheck = (): Cypress.Chainable<null> => {
  return cy.session('healthCheck', () => {
    cy.request('/ping').then(({ status }) => {
      expect(status).to.eq(201);
    });
  });
};

const createToken = (username: string, password: string): Cypress.Chainable<null> => {
  return cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      const body: { token: string } = response.body;
      cy.setCookie('token', body.token);
    });
  });
};

const getBookingIds = (qs?: {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
}): Cypress.Chainable<Cypress.Response<Array<{ bookingid: number }>>> => {
  return cy.request({
    method: 'GET',
    url: '/booking',
    qs: qs,
  });
};

const getBooking = (
  bookingId: number,
  qs?: { firstname?: string; lastname?: string; checkin?: string; checkout?: string },
): Cypress.Chainable<Cypress.Response<Booking>> => {
  return cy.request({
    method: 'GET',
    url: `/booking/${bookingId}`,
    qs: qs,
  });
};

const createBooking = (
  booking: Booking,
): Cypress.Chainable<
  Cypress.Response<{
    bookingid: number;
    booking: Booking;
  }>
> => {
  return cy.request({
    method: 'POST',
    url: '/booking',
    body: booking,
  });
};

const updateBooking = (
  bookingId: number,
  booking: Booking,
): Cypress.Chainable<Cypress.Response<Booking>> => {
  return cy.request({
    method: 'PUT',
    url: `/booking/${bookingId}`,
    body: booking,
  });
};

const partialUpdateBooking = (
  bookingId: number,
  booking: Booking,
): Cypress.Chainable<Cypress.Response<Booking>> => {
  return cy.request({
    method: 'PATCH',
    url: `/booking/${bookingId}`,
    body: booking,
  });
};

const deleteBooking = (bookingId: number): Cypress.Chainable<Cypress.Response<null>> => {
  return cy.request({
    method: 'DELETE',
    url: `/booking/${bookingId}`,
  });
};

Cypress.Commands.add('healthCheck', healthCheck);
Cypress.Commands.add('createToken', createToken);
Cypress.Commands.add('getBooking', getBooking);
Cypress.Commands.add('getBookingIds', getBookingIds);
Cypress.Commands.add('createBooking', createBooking);
Cypress.Commands.add('updateBooking', updateBooking);
Cypress.Commands.add('partialUpdateBooking', partialUpdateBooking);
Cypress.Commands.add('deleteBooking', deleteBooking);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
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
       * @description Returns a specific booking based upon the booking id provided.
       * @param {string} bookingId - The booking id to search for.
       * @param {object} queryParams - The query parameters to search for.
       * @example
       *    cy.getBooking('1', {'firstname': 'Jim', 'lastname': 'Brown'})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-GetBooking
       */
      getBooking: typeof getBooking;

      /**
       * @description Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids.
       * @param {object} queryParams - The query parameters to search for.
       * @example
       *    cy.getBookingIds({'firstname': 'Jim', 'lastname': 'Brown'})
       * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-GetBookings
       */
      getBookingIds: typeof getBookingIds;

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

export {};
