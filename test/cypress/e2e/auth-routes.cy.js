context('Check that the authorized routes work correctly', function () {
	before(function () {
		cy.log('Clearing and Seeding');
		cy.task('supabase:getTestUserAndClear');
		cy.task('mongo:clearuser', {
			api_url: Cypress.env('API_URL'),
			email: Cypress.env('NEW_USER_EMAIL'),
		}).as('mongoUser');
	});

	it('Checks the aircraft create route', function () {
		cy.visit('/aircraftcreate');
		cy.url().should('not.contain', '/aircraftcreate');
		cy.url().should('eq', 'http://localhost:9000/');
	});
	it('Checks the Convert Flights route', function () {
		cy.visit('/flightsconvert');
		cy.url().should('not.contain', '/flightsconvert');
		cy.url().should('eq', 'http://localhost:9000/');
		cy.visit('/flightsreview');
		cy.url().should('not.contain', '/flightsreview');
		cy.url().should('eq', 'http://localhost:9000/');
	});
	it('Checks the User Route', function () {
		cy.visit('/userhome');
		cy.url().should('not.contain', '/userhome');
		cy.url().should('eq', 'http://localhost:9000/');
		cy.visit('/account');
		cy.url().should('not.contain', '/account');
		cy.url().should('eq', 'http://localhost:9000/');
	});
	it('Checks the Public Routes', function () {
		cy.visit('/');
		cy.url().should('eq', 'http://localhost:9000/');

		cy.visit('/requestreset');
		cy.url().should('eq', 'http://localhost:9000/requestreset');
		cy.get('[data-cy="request-back-button"]').click();
		cy.url().should('eq', 'http://localhost:9000/');
		cy.visit('/register');
		cy.url().should('eq', 'http://localhost:9000/register');
	});
});
