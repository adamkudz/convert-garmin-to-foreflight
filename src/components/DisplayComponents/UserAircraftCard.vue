<script setup lang="ts">
import { Aircraft, FlightEntry } from 'app/types/LogbookTypes.js';
import { AdvancedImage } from '@cloudinary/vue';
// import { Cloudinary, URLConfig } from '@cloudinary/url-gen';
import { computed } from 'vue';
import spacetime from 'spacetime';

import { cld } from 'boot/cloudinaryBoot';
const props = defineProps<{
	aircraft: Aircraft;
	flights?: FlightEntry[];
}>();

const dateRange = computed(() => {
	if (!props.flights) {
		return false;
	}
	let range = props.flights
		.map((flight) => spacetime(flight.Date))
		.map((time) => time.epoch)
		.sort((a, b) => a - b);

	return `${spacetime(range[0]).format('numeric-us')} -
		${spacetime(range[range.length - 1]).format('numeric-us')}`;
});
const totalDistance = computed(() => {
	if (!props.flights) {
		return false;
	}
	let td = props.flights
		.map((flight) => flight.Distance) // convert to int

		.reduce((prev, curr) => (prev = prev + curr), 0);

	return td;
});

const pathToLogo = computed(
	() =>
		`${props.aircraft.Model.split(
			' '
		)[0].toLowerCase()}/${props.aircraft.Model.split(
			' '
		)[1].toLowerCase()}-logo.png`
);
const cardIcon = cld.image(pathToLogo.value);
</script>
<template>
	<div class="USER_AIRCRAFT_CONTAINER">
		<div class="userAircraftGrid">
			<div class="acLogoBox">
				<AdvancedImage :cld-img="cardIcon" />
			</div>

			<div class="section-a">
				<h4 data-cy="aircraft-card-acId" class="text-title q-mb-xs">
					{{ aircraft.AircraftId }}
				</h4>
				<p
					data-cy="aircraft-card-effective-dates"
					style="font-size: 12px"
					class="text-italic faded"
				>
					{{ dateRange }}
				</p>
			</div>
			<div class="section-b">
				<div class="inverse-colors q-pa-xs">
					<p data-cy="aircraft-card-total-flights" id="total-flights">
						Flights: <span v-if="flights">{{ flights.length }}</span
						><span v-else>0</span>
					</p>
					<p data-cy="aircraft-card-totalNm" class="inverse">
						Total NM:
						<span v-if="totalDistance">{{ totalDistance }}</span
						><span v-else>0</span>
					</p>
				</div>
			</div>
			<div></div>
			<div class="acParams">
				<p>Make/Model</p>
				<q-separator dark color="grey-8" />
				<p data-cy="aircraft-card-acInfo">
					{{ aircraft.Make }}/{{ aircraft.Model }}({{
						aircraft.TypeCode
					}})
				</p>
			</div>
			<div class="acParams">
				<p>Landing Gear</p>
				<q-separator dark color="grey-8" />
				<p class="text-capitalize">
					{{ aircraft.GearType.split('_')[0] }}
				</p>
			</div>
			<div class="acParams">
				<p>Engine Type</p>
				<q-separator dark color="grey-8" />
				<p class="text-capitalize">{{ aircraft.EngineType }}</p>
			</div>
			<div class="acParams">
				<p>Class</p>
				<q-separator dark color="grey-8" />
				<p class="text-capitalize">
					{{ aircraft.Class.replaceAll('_', ' ') }}
				</p>
			</div>
			<div class="acParams">
				<p>High Performance</p>
				<q-separator dark color="grey-8" />
				<p
					class="text-uppercase text-bold"
					:class="
						aircraft.HighPerformance
							? 'text-positive'
							: 'text-negative'
					"
				>
					{{ aircraft.HighPerformance }}
				</p>
			</div>
			<div class="acParams">
				<p>Pressurized</p>
				<q-separator dark color="grey-8" />
				<p
					class="text-uppercase text-bold"
					:class="
						aircraft.Pressurized ? 'text-positive' : 'text-negative'
					"
				>
					{{ aircraft.Pressurized }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.USER_AIRCRAFT_CONTAINER {
	max-width: 640px;
	border: 1.5px solid var(--colors-blue6);
	background-color: var(--colors-blue3);
}

.acLogoBox {
	position: absolute;
	transform: translate3d(-68px, -50px, 0px);
}
.acLogo {
}

.userAircraftHeader {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.userAircraftGrid {
	display: grid;

	margin: 27px 40px;
	grid-template-columns: 6fr 4fr 4fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 1rem;
}

.section-a {
	align-self: center;
}

.section-b {
	line-height: 16px;
}

.acParams {
	line-height: 24px;
}

.acParams :nth-child(1) {
	font-style: italic;
	color: var(--grey-5);
}

.acParams :nth-child(2) {
	transform: translate3d(0px, -3px, 0px);
	margin-right: 1rem;
}

.acParams :nth-child(3),
h4 {
	color: var(--bright-white);
	line-height: 16px;
	// text-transform: capitalize;
}
</style>
