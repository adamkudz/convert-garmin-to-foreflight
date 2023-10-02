import { on } from 'events';

const aircraft = {
	aircraftId: Cypress.env('TEST_AIRCRAFT_ID'),
	aircraftType: Cypress.env('TEST_AIRCRAFT_TYPE'),
};

describe('End to End', function () {
	it('creates an aircraft and converts flights', function () {
		cy.task('csv:flightsDelete');
		cy.visit('/');
		cy.get('[data-cy="create-aircraft-id').type(`${aircraft.aircraftId}`);
		cy.get('[data-cy]')
			.closest('.q-select')
			.type(`${aircraft.aircraftType}{enter}`);
		cy.get('[data-cy="create-aircraft-button"]').click();
		cy.get('[data-cy="csv-file-select"]').click();
		cy.pause();
		cy.get('[data-cy="convert-create-button"]').click();

		cy.get('[data-cy="loadingModal"]').should('be.visible');
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(5000, { log: true, timeout: 5000 });
		cy.get(':nth-child(1) > [data-cy="create-flight-csv-button"]').click();
		cy.get(':nth-child(2) > [data-cy="create-flight-csv-button"]').click();
		cy.task('csv:getDownloads').then((flights) => {
			expect(flights[0]).to.contain(
				`${aircraft.aircraftId.toUpperCase()}-aircraft`
			);
			expect(flights[1]).to.contain(
				`${aircraft.aircraftId.toUpperCase()}-flights`
			);
		});
		cy.get('.continueButtons > :nth-child(1)').click();

		cy.get('[data-cy="csv-file-select"]').click();
		cy.pause();
		cy.get('[data-cy="convert-create-button"]').click();

		cy.get('[data-cy="loadingModal"]').should('be.visible');
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(5000, { log: true, timeout: 5000 });
		cy.get(':nth-child(1) > [data-cy="create-flight-csv-button"]').click();
		cy.get(':nth-child(2) > [data-cy="create-flight-csv-button"]').click();
		cy.task('csv:getDownloads').then((flights) => {
			expect(flights[2]).to.contain(
				`${aircraft.aircraftId.toUpperCase()}`
			);
			expect(flights[3]).to.contain(
				`${aircraft.aircraftId.toUpperCase()}`
			);
		});
		cy.get('.continueButtons > :nth-child(2)').click();
	});
});
