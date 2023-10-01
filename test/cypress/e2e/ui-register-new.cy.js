/// <reference types="cypress" />
import { join } from 'path';
const downloadsFolder = Cypress.config('downloadsFolder');
const aircraft = {
	aircraftId: 'n321ff',
	aircraftType: 'TBM 850',
};
const filename = join(
	downloadsFolder,
	`aircraft-${aircraft.aircraftId.toUpperCase()}.csv`
);
describe('End to end test with UI', function () {
	let registerNewAccountLink;

	let compareId;
	before(function () {
		cy.mailosaurDeleteAllMessages('l6smqfno');
		cy.task('supabase:getTestUserAndClear').as('supaGetandClear');
		cy.task('mongo:clearuser', {
			api_url: Cypress.env('API_URL'),
			email: Cypress.env('NEW_USER_EMAIL'),
		}).as('mongoUser');
		cy.get('@mongoUser');
		cy.task('csv:flightsDelete');
		cy.log('Clearing Complete');
		cy.fixture('test-aircraft.csv').as('testAircraft');
	});
	context('Creating a New User', { testIsolation: true }, function () {
		describe('Register Flow', function () {
			it('Navigates to Register Page and creates a new account', function () {
				cy.intercept('/auth/v1/signup').as('registercall');

				cy.visit('/');
				cy.get('[data-cy="goto-register-button"]').click();
				cy.get('[data-cy="register-email"]').type(
					Cypress.env('NEW_USER_EMAIL')
				);
				cy.get('[data-cy="register-password"]').type(
					Cypress.env('NEW_USER_PASSWORD')
				);
				cy.get('[data-cy="register-button"]').click();

				cy.wait('@registercall').then((call) => {
					compareId = call.response.body.id;
				});

				cy.mailosaurGetMessage('l6smqfno', {
					sentTo: Cypress.env('NEW_USER_EMAIL'),
				}).then((email) => {
					expect(email.subject).to.contain('Confirm Your Signup');
					registerNewAccountLink = email.html.links[0].href;
					cy.visit(registerNewAccountLink);

					cy.get('[data-cy="aircraft-create-message"]').should(
						'contain',
						'Account Created!'
					);
				});
				cy.fixture('/test-aircraft.csv').as('originalCsv');
				cy.intercept('/logbookuser/addaircraft').as('mongoAddAircraft');
				cy.get('[data-cy="create-aircraft-id"]').type(
					aircraft.aircraftId
				);
				cy.get('[data-cy]')
					.closest('.q-select')
					.type(`${aircraft.aircraftType}{enter}`);
				cy.get('[data-cy="create-aircraft-button"]').click();

				cy.get('.downloadCsvBox').click();

				cy.get('@originalCsv');
				// cy.readFile(filename, { timeout: 20000, log: true })
				// 	.should('contain', aircraft.aircraftId.toUpperCase())
				// 	.and('contain', aircraft.aircraftType);
				// cy.get('[data-cy="aircraft-card-acId"]').should(
				// 	'contain',
				// 	aircraft.aircraftId.toUpperCase()
				// );

				cy.wait('@mongoAddAircraft').then((x) => {
					let body = x.response.body.value;
					expect(body.aircraft).to.not.eq(null);
					expect(body.aircraft.AircraftId).to.eq(
						`${aircraft.aircraftId.toUpperCase()}`
					);
				});
			});
		});
	});
});
