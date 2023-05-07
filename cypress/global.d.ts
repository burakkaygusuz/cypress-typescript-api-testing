declare namespace Cypress {
  import { Booking } from './types';

  interface Chainable {
    /**
     * @description Confirms whether the API is up and running.
     * @example
     *   cy.healthCheck()
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
     */
    healthCheck(): Chainable<void>;

    /**
     * @description Allows to create a new auth token to use for access to the PUT and DELETE /booking
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     * @example
     *    cy.createToken('username', 'password')
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken
     */
    createToken(username: string, password: string): Cypress.Response<any>;

    /**
     * @description Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids.
     * @param {string} bookingId - The booking id to search for.
     * @param {object} queryParams - The query parameters to search for.
     * @example
     *    cy.getBooking('1', {'firstname': 'Jim', 'lastname': 'Brown'})
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-GetBooking
     */
    getBooking(
      bookingId?: string,
      queryParams?: { firstname?: string; lastname?: string; checkin?: string; checkout?: string },
    ): Chainable<Cypress.Response<any>>;

    /**
     * @description Create a new booking in the API.
     * @param {Booking} booking - The booking information to create.
     * @example
     *    cy.createBooking({"Jim", "Brown", 111, true {"2018-01-01",  "2019-01-01"}, "Breakfast"})
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking
     */
    createBooking(booking: Booking): Chainable<Cypress.Response<any>>;

    /**
     * @description Update a current booking.
     * @param {string} bookingId - The booking id to update.
     * @param {Booking} booking - The booking information to update.
     * @example
     *    cy.updateBooking({"James", "Brown", 111, true, {"2018-01-01",  "2019-01-01"}, "Breakfast"})
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-UpdateBooking
     */
    updateBooking(bookingId: string, booking: Booking): Chainable<Cypress.Response<any>>;

    /**
     * @description Updates a current booking with a partial payload.
     * @param {string} bookingId - The booking id to update.
     * @param {Booking} booking - The booking information to update.
     * @example
     *    cy.partialUpdateBooking({"James", "Brown"})
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-PartialUpdateBooking
     */
    partialUpdateBooking(bookingId: string, booking: Booking): Chainable<Cypress.Response<any>>;

    /**
     * @description Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids..
     * @param {string} bookingId - The booking id to delete.
     * @example
     *    cy.deleteBooking("1")
     * @see https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-DeleteBooking
     */
    deleteBooking(bookingId: string): Chainable<Cypress.Response<any>>;
  }
}
