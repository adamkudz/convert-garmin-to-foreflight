context('Checking Duplicate Function', () => {
	before(function () {
		cy.seedDataWithAircraft();
	});

	it('Has Some Flights Removed', function () {
		cy.loginNewUser();
		cy.get('[data-cy="userhome-convert-more-flights-button"]').click();
		cy.get('[data-cy="convert-tailnumber"]').type(
			Cypress.env('TEST_AIRCRAFT_ID')
		);
		cy.get('[data-cy="csv-file-input"]').as('csvFile');
		cy.get('[data-cy="csv-file-select"]').click();
		cy.pause();

		cy.get('[data-cy="selected-flights-removed"]').should(
			'contain',
			'Warning'
		);
		cy.get('[data-cy="selected-flights-selected"]').should(
			'contain',
			'You are now ready'
		);
	});
	it.only('Has All Flights Removed', function () {
		cy.loginNewUser();
		cy.get('[data-cy="userhome-convert-more-flights-button"]').click();

		cy.get('[data-cy="csv-file-input"]').as('csvFile');
		cy.get('[data-cy="csv-file-select"]').click();
		cy.pause();

		cy.get('[data-cy="selected-flights-removed"]').should(
			'contain',
			'Warning'
		);
		cy.get('[data-cy="selected-flights-selected"]').should(
			'contain',
			'(0) Files Selected'
		);
		cy.get('[data-cy="selected-flights-none-selected"]').should(
			'contain',
			'You have no flights available'
		);
	});
});
