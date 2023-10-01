/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// DO NOT REMOVE
// Imports Quasar Cypress AE predefined commands
import { join } from 'path';
import { Session, AuthResponse } from '@supabase/gotrue-js';
const downloadsFolder = Cypress.config('downloadsFolder');
const aircraft = {
	aircraftId: 'n321ff',
	aircraftType: 'TBM 850',
};
const filename = join(
	downloadsFolder,
	`aircraft-${aircraft.aircraftId.toUpperCase()}.csv`
);

Cypress.Commands.add('seedData', () => {
	let uid = '';
	cy.log('Clearing and Seeding');
	cy.task('csv:flightsDelete');
	cy.task('supabase:getTestUserAndClear').as('supabaseClearUser');
	cy.task('mongo:clearuser', {
		api_url: Cypress.env('API_URL'),
		email: Cypress.env('NEW_USER_EMAIL'),
	}).as('mongoUser');
	cy.get('@mongoUser');
	cy.task('supabase:createnew').then((data: any) => {
		uid = data.user.id;
		cy.request({
			method: 'POST',
			url: `${Cypress.env('API_URL')}/testuser/createuser`,
			body: {
				email: data.user.email,
				auth: { ...data.user },
				aircraft: null,
				uid: uid,
				subscribed: false,
			},
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.isOkStatusCode);
		});
		cy.fixture('test-aircraft.json').then((testAircraft) => {
			cy.request({
				method: 'POST',
				url: `${Cypress.env('API_URL')}/testuser/addaircraft`,
				body: { uid: uid, aircraft: testAircraft },
			}).then((res) => {
				expect(res.isOkStatusCode);
			});
		});
	});
});
Cypress.Commands.add('seedDataWithAircraft', () => {
	let uid = '';
	cy.task('csv:flightsDelete');
	cy.log('Clearing and Seeding');
	cy.task('supabase:getTestUserAndClear');
	cy.task('mongo:clearuser', {
		api_url: Cypress.env('API_URL'),
		email: Cypress.env('NEW_USER_EMAIL'),
	}).as('mongoUser');
	cy.get('@mongoUser');
	cy.task('supabase:createnew').then((user: any) => {
		uid = user.id;
		cy.request({
			method: 'POST',
			url: `${Cypress.env('API_URL')}/testuser/createuser`,
			body: { ...user, uid: uid },
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.isOkStatusCode);
		});
		cy.fixture('test-aircraft.json').then((testAircraft) => {
			cy.request({
				method: 'POST',
				url: `${Cypress.env('API_URL')}/testuser/addaircraft`,
				body: { uid: uid, aircraft: testAircraft },
			}).then((res) => {
				expect(res.isOkStatusCode);
			});
		});
		cy.fixture('first-flights.json').then((data) => {
			cy.request({
				method: 'POST',
				url: `${Cypress.env('API_URL')}/testuser/addentries`,
				body: { uid: uid, ...data },
			}).then((res) => {
				expect(res.isOkStatusCode);
			});
		});
	});
});

Cypress.Commands.add('createNewUser', () => {
	cy.mailosaurDeleteAllMessages('l6smqfno');
	cy.task('supabase:getTestUserAndClear');
	cy.task('mongo:clearuser', {
		api_url: Cypress.env('API_URL'),
		email: Cypress.env('NEW_USER_EMAIL'),
	}).as('mongoUser');
	cy.get('@mongoUser');
	cy.task('csv:flightsDelete');
	cy.log('Clearing Complete');
	cy.fixture('test-aircraft.csv').as('testAircraft');

	context('Creating a New User', { testIsolation: true }, function () {
		describe('Register Flow', function () {
			let registerNewAccountLink;

			let compareId;
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
					compareId = call.response!.body.id;
				});

				cy.mailosaurGetMessage('l6smqfno', {
					sentTo: Cypress.env('NEW_USER_EMAIL'),
				}).then((email) => {
					expect(email.subject).to.equal('Confirm Your Signup');
					registerNewAccountLink = email.html!.links![0].href;
					cy.visit(registerNewAccountLink!);
					cy.url().should('include', '/aircraftcreate');
					cy.get('[data-cy="nav-user-email-display"]').should(
						'include.text',
						`${Cypress.env('NEW_USER_EMAIL')}`
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
				cy.log('**read downloaded file**');
				cy.get('@originalCsv');
				cy.readFile(filename, { timeout: 20000, log: true })
					.should('contain', aircraft.aircraftId.toUpperCase())
					.and('contain', aircraft.aircraftType);
				cy.get('[data-cy="aircraft-card-acId"]').should(
					'contain',
					aircraft.aircraftId.toUpperCase()
				);

				cy.wait('@mongoAddAircraft').then((x) => {
					const body = x.response!.body.value;
					expect(body.aircraft).to.not.eq(null);
					expect(body.aircraft.AircraftId).to.eq(
						`${aircraft.aircraftId.toUpperCase()}`
					);
				});
			});
		});
	});
});

Cypress.Commands.add('loginNewUser', () => {
	cy.visit('/');
	const API = Cypress.env('API_URL');
	cy.intercept(`${API}/logbookuser/getuser`, async (req) => {
		req.continue((res) => {
			console.log(res.body);
			expect(res.body.email).to.eq(`${Cypress.env('NEW_USER_EMAIL')}`);
		});
	}).as('loginRequest');
	cy.get('.userEmail').type(`${Cypress.env('NEW_USER_EMAIL')}`);
	cy.get('.userPassword').type(Cypress.env('NEW_USER_PASSWORD'));
	cy.get('.loginButton').click();
});

import { registerCommands } from '@quasar/quasar-app-extension-testing-e2e-cypress';

registerCommands();
import 'cypress-mailosaur';
import authboot from 'src/boot/authboot';

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to select DOM element by data-cy attribute.
			 * @example cy.dataCy('greeting')
			 */
			loginNewUser(): Chainable<void>;
			createNewUser(): Chainable<void>;
			registerNewUser(): Chainable<void>;
			loginuser(user: {
				email: string;
				password: string;
			}): Chainable<void>;
			seedData(user: {
				email: string;
				password: string;
			}): Chainable<void>;
			seedDataWithAircraft(user: {
				email: string;
				password: string;
			}): Chainable<void>;
		}
	}
}
