import { Booking } from '../types';

Cypress.Commands.add('healthCheck', () => {
  cy.request('/ping').then(({ status }) => {
    expect(status).to.eq(201);
  });
});

Cypress.Commands.add('createToken', (username: string, password: string) => {
  cy.session([username, password], () => {
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
});

Cypress.Commands.add(
  'getBooking',
  (
    bookingId: string,
    qs?: {
      firstname?: string;
      lastname?: string;
      checkin?: string;
      checkout?: string;
    },
  ) => {
    cy.request({
      method: 'GET',
      url: `/booking/${bookingId}`,
      qs: qs,
    });
  },
);

Cypress.Commands.add(
  'createBooking',
  (booking: {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds: string;
  }) => {
    cy.request({
      method: 'POST',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
      },
      body: booking,
    });
  },
);

Cypress.Commands.add('updateBooking', (bookingId: string, booking: Booking) => {
  cy.request({
    method: 'PUT',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: booking,
  });
});

Cypress.Commands.add('partialUpdateBooking', (bookingId: string, booking: Booking) => {
  cy.request({
    method: 'PATCH',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: booking,
  });
});

Cypress.Commands.add('deleteBooking', (bookingId: string) => {
  cy.request({
    method: 'DELETE',
    url: `/booking/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
