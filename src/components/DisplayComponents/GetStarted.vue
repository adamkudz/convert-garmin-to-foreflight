<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const router = useRouter();
const $q = useQuasar();

async function gotoAircraftCreate() {
	$q.loading.show({ message: 'Loading' });
	// await router.push({ name: 'aircraftcreate' }).then(() => {
	// 	$q.loading.hide();
	router.push({ name: 'aircraftcreate' });
	$q.loading.hide();
}

async function gotoFlightsConvert(): Promise<void> {
	$q.loading.show({ message: 'Loading' });
	await router.push({ name: 'flightsconvert' }).then(() => {
		$q.loading.hide();
	});
}
</script>
<template>
	<div
		style="max-width: 1000px; min-width: 632px"
		class="getStartedContainer q-py-md q-mx-auto box-shadow"
	>
		<p class="text-title text-center q-mb-sm text-uppercase">Get Started</p>
		<p
			class="text-para text-center q-mx-auto q-mb-lg"
			style="max-width: 60ch"
		>
			If you have not already done so, please create an Aircraft File for
			your aircraft. This will be used to create your Foreflight logbook.
			If you have an existing Foreflight Logbook, you can select the
			"Convert Flights" button.
		</p>

		<div class="selectionContainer">
			<div class="optionSelection">
				<q-btn
					@click="gotoAircraftCreate"
					label="Create Aircraft File"
					class="q-mb-md mainButton"
					data-cy="started-aircraft-create"
				/>
				<p class="text-para text-center">
					I do <span>NOT</span> have a Foreflight logbook for this
					aircraft.
				</p>
			</div>
			<div class="optionSelection">
				<q-btn
					@click="gotoFlightsConvert"
					label="Convert Flights"
					class="q-mb-md mainButton"
					data-cy="started-flights-convert"
				/>
				<p class="text-para">
					I DO currently have an aircraft in Foreflight and want to
					add more flights.
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.selectionContainer {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.optionSelection {
	justify-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		max-width: 236px;
		text-align: center;
	}
}
</style>
