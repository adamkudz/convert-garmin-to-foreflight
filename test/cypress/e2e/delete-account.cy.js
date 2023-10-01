describe('Forgot Password', function () {
	before(() => {
		cy.seedData();
	});

	it.only('Delete a user', function () {
		cy.loginNewUser();
		cy.intercept('**/deleteuser').as('deleteUser');
		cy.get("[data-cy='nav-account-button']").click();
		cy.url().should('include', '/account');

		cy.get('[data-cy="account-delete-button"]').click();
		cy.get(
			'[data-cy="abandon-delete-user-button"] > .q-btn__content'
		).click();
		cy.get('[data-cy="account-delete-button"]').click();
		cy.get('[data-cy="confirm-delete-user-button"]').click();
		cy.wait('@deleteUser').then((res) => {
			expect(res.response.statusCode).to.eq(200);
		});
	});

	it('Attempt to login without account', function () {
		cy.visit('/');
		cy.get('[data-cy="login-email"]').type(Cypress.env('NEW_USER_EMAIL'));
		cy.get('[data-cy="login-password"]').type(
			Cypress.env('NEW_USER_PASSWORD')
		);
		cy.get('[data-cy="login-button"]').click();
		cy.url().should('not.include', 'userhome');
	});
});
