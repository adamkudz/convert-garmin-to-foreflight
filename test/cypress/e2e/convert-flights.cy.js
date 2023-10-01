/* eslint-disable cypress/no-unnecessary-waiting */
import { join } from 'path';

const aircraft = {
	aircraftId: Cypress.env('TEST_AIRCRAFT_ID'),
	aircraftType: Cypress.env('TEST_AIRCRAFT_TYPE'),
};
const downloadsFolder = Cypress.config('downloadsFolder');
const filename = join(
	downloadsFolder,
	`aircraft-${aircraft.aircraftId.toUpperCase()}.csv`
);

const email = Cypress.env('NEW_USER_EMAIL');
const password = Cypress.env('NEW_USER_PASSWORD');

describe('Converts Flights', function () {
	before(() => {
		cy.seedData();
		cy.loginNewUser();
	});

	it.only('Creates 5 Flights and Downloads', function () {
		cy.intercept('/flightsreview').as('flightsReviewPage');
		cy.intercept('**/addentries').as('newEntries');
		cy.intercept('http://localhost:9000/flightsreview').as(
			'flightsReviewPage'
		);
		cy.intercept('http://localhost:5000/storage/addflights').as(
			's3AddFlights'
		);

		cy.get('[data-cy="userhome-convert-flights-button"]').click();
		cy.get('[data-cy="csv-file-select"]').click();
		cy.pause();
		// eslint-disable-next-line cypress/no-unnecessary-waiting

		cy.get('[data-cy="convert-create-button"]').click();

		cy.get('[data-cy="loadingModal"]').should('be.visible');
		cy.wait(5000, { log: true, timeout: 5000 });

		cy.get('[data-cy="create-flight-csv-button"]').click();
		cy.wait('@newEntries').then((res) => {
			expect(res.response.statusCode).to.eq(200);
			expect(res.response.body.value.logbookEntries[0]).to.have.property(
				'originalFilename'
			);
		});
	});
});

// const login = (email, password) => {
// 	cy.session(
// 		[email, password],
// 		() => {
// 			cy.seedData();
// 			cy.loginNewUser();
// 		},
// 		{
// 			validate() {
// 				cy.get('[data-cy="nav-user-email-display"]').should(
// 					'contain',
// 					`${email}`
// 				);
// 			},
// 		}
// 	);
// };
// describe('Testing Aircraft Creation', { testIsolation: true }, function () {
// 	before(function () {
// 		login(email, password);
// 		cy.visit('/');
// 	});

// 	// it('Navigates to aircraft create', function () {
// 	// 	cy.get('[data-cy="userhome-create-aircraft-button"]').click();
// 	// 	cy.url('should.include', '/aircraftcreate');
// 	// });
// 	// it('Navigates to Account Page', function () {
// 	// 	cy.get('[data-cy="nav-account-button"]');
// 	// 	cy.url('should.include', '/account');
// 	// });
// 	it.only('Selects csv files for conversion', function () {
// 		const airportRequests = [];
// 		cy.intercept('/flightsreview').as('flightsReviewPage');
// 		cy.intercept('**/addentries').as('flightEntries');

// 		cy.get('[data-cy="nav-home-button"]').as('navHomeButton').click();
// 		cy.get('[data-cy="userhome-convert-flights-button"]').click();
// 		cy.get('[data-cy="convert-tailnumber"]').type(aircraft.aircraftId);
// 		cy.get('[data-cy="csv-file-input"]').as('csvFile');
// 		cy.get('[data-cy="csv-file-select"]').click();
// 		cy.pause();
// 		// eslint-disable-next-line cypress/no-unnecessary-waiting

// 		cy.get('[data-cy="convert-create-button"]').click();

// 		cy.wait('@flightEntries', { log: true, timeout: 10000 });
// 		cy.get('[data-cy="loadingModal"]').should('be.visible');

// 		cy.get('[data-cy="create-flight-csv-button"]').click();
// 	});
// });
