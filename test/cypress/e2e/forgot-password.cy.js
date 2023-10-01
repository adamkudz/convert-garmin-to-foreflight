describe('Forgot Password', function () {
	before(() => {
		cy.seedData();
	});

	it('Forgot the password attempt to reset', function () {
		cy.mailosaurDeleteAllMessages('l6smqfno');
		cy.visit('/');
		cy.intercept('POST', '/auth/v1/recover').as('requestReset');
		cy.get('[data-cy="request-reset-button"]').click();
		cy.get('[data-cy="reset-email-input"]').type(
			Cypress.env('NEW_USER_EMAIL')
		);
		cy.get('[data-cy="request-reset-button"]').click();

		cy.mailosaurGetMessage('l6smqfno', {
			sentTo: Cypress.env('NEW_USER_EMAIL'),
		}).then((email) => {
			expect(email.subject).to.equal('Reset Your Password');

			cy.visit(email.html.links[0].href);
		});
		cy.url().should('eq', 'http://localhost:9000/passwordreset');
		cy.get('[data-cy="new-password-input"]').type(
			Cypress.env('CHANGED_PASSWORD')
		);

		cy.get('[data-cy="new-password-confirmation"]').type('random123*fksl');
		cy.get('[data-cy="new-password-button"]').then((btn) => {
			expect(btn).to.have.attr('aria-disabled', 'true');
		});

		cy.get('[data-cy="new-password-button"]').focus();
		cy.get('[data-cy="login-error-message"]').should('be.visible');
		cy.get('[data-cy="new-password-confirmation"]').type(
			`{selectAll}{backspace}${Cypress.env('CHANGED_PASSWORD')}`
		);

		cy.get('[data-cy="new-password-button"]').click();
		cy.get('.successMessage > .q-btn').click();
		cy.url().should('contain', 'localhost:9000/userhome');
	});
});
