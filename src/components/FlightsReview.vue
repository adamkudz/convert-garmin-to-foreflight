<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';
import { AdvancedImage } from '@cloudinary/vue';
import { cld } from 'src/boot/cloudinaryBoot';
import type { FlightEntry } from 'app/types/LogbookTypes';

import { stringify } from 'csv-stringify/browser/esm';
import { downloadFile } from 'src/functions/downloadFile.js';
import { foreflightFlightHeaders } from 'src/headers/';
import spacetime from 'spacetime';
import AircraftTable from 'src/components/DisplayComponents/AircraftTable.vue';
import { useAircraftStore } from 'src/stores/AircraftStore';

import { RouteRecordName } from 'vue-router';
import type { PropType } from 'vue';

const props = defineProps({
	newEntries: {
		type: Array as PropType<FlightEntry[]>,
		required: true,
	},
});

const emit = defineEmits<{
	(
		e: 'openCheckingModal',
		message: string,
		exitRoute: RouteRecordName,
		aircraftId?: string
	): void;
	(e: 'closeModal'): void;
	(e: 'downloadComplete'): void;
}>();

const aircraftStore = useAircraftStore();

const showPreview = ref<boolean>(true);

const rows = props.newEntries as FlightEntry[];
const csvImage = cld.image('Logbook/csv');

function createFlightCsvFromGarmin(format = 'foreflight') {
	const flightEntries = props.newEntries;

	if (format === 'foreflight') {
		flightEntries.forEach((flight) => {
			flight.Date = spacetime(flight.Date).format('numeric-us');
			flight.TimeOut = spacetime(flight.TimeOut).format(
				'{hour-24-pad}:{minute-pad}'
			);
			flight.TimeIn = spacetime(flight.TimeIn).format(
				'{hour-24-pad}:{minute-pad}'
			);
		});

		stringify(
			flightEntries,
			{
				header: true,
				columns: foreflightFlightHeaders,
			},
			async function (err, output) {
				if (err) {
					return err;
				}

				downloadFile(
					output,
					'flights',
					flightEntries[0].AircraftID,
					`${format}-${spacetime(flightEntries[0].Date).format(
						'numeric-us'
					)}`
				);

				showPreview.value = false;
			}
		);
	}
	if (format === 'logbookPro') {
		return;
	}
}

function createAircraftCsv(format = 'foreflight') {
	const csv = aircraftStore.getAircraftCsv;
	downloadFile(csv, 'aircraft', rows[0].AircraftID, format);
}

onBeforeRouteLeave((to) => {
	console.log('before route leave');

	emit(
		'openCheckingModal',
		'Are you sure you wish to leave now? Files not downloaded will be lost!',
		to.name as RouteRecordName
	);
	return false;
});
</script>
<template>
	<div class="displayPageGrid">
		<div class="self-center">
			<h4 class="text-center q-mb-md">Conversion Complete.</h4>
			<p class="text-center text-para">
				You may download this csv and upload the data to your Foreflight
				Logbook
			</p>
			<!-- <p class="text-center text-caption">
				Why aren't all my files converted?
			</p> -->
		</div>

		<div v-if="rows" class="q-mx-auto">
			<AircraftTable :rows="rows" />
		</div>
		<section class="downloadCsvButtons">
			<div class="q-mx-auto">
				<div
					v-if="newEntries"
					data-cy="create-flight-csv-button"
					class="downloadCsvBox"
					@click="createAircraftCsv('foreflight')"
				>
					<AdvancedImage width="60" :cld-img="csvImage" />
					<p
						v-if="newEntries !== undefined && newEntries.length"
						class="fileName text-italic"
					>
						aircraft-{{ $props.newEntries[0].AircraftID }}.csv
					</p>
				</div>
			</div>
			<div class="q-mx-auto">
				<div
					v-if="newEntries"
					data-cy="create-flight-csv-button"
					class="downloadCsvBox"
					@click="createFlightCsvFromGarmin('foreflight')"
				>
					<AdvancedImage width="60" :cld-img="csvImage" />
					<p
						v-if="newEntries !== undefined && newEntries.length"
						class="fileName text-italic"
					>
						flights-{{
							$props.newEntries[0].AircraftID
						}}-foreflight-{{ $props.newEntries[0].Date }}.csv
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.previewContainer {
	max-width: var(--table-max-width);

	button {
		display: block;
		margin: 0 auto 1rem;
	}
}

.downloadCsvButtons {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6rem;
	max-width: 600px;
	margin: 0 auto;
	padding-bottom: 1rem;
}
.displayPageGrid {
	display: grid;
	gap: 3rem;
}

.downloadCsvBox {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 122px;
	border-radius: 20px;
	box-shadow: var(--box-shadow);
	transition-property: all;
	transition-duration: 0.2s;
	cursor: pointer;
	&:hover {
		box-shadow: var(--box-shadow-green);
	}
}
.fileName {
	font-size: smaller;
	text-align: center;
	margin: 0rem 1rem 0.4rem 1rem;
}
.downloadPng {
	height: 60px;
	width: 60px;
	margin-top: 0.4rem;
}
.results-table {
	background-color: var(--colors-blue6);
}
</style>
