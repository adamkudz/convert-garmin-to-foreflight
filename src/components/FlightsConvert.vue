<script setup lang="ts">
import Papa from 'papaparse';

import { uid } from 'quasar';
import { ref, computed } from 'vue';

import {
	calculateFinalData,
	getFlightPositions,
	filterUploadFiles,
	calculateDistanceBySegment,
} from 'src/functions/index.js';

import type {
	FlightEntry,
	PapaReturn,
	PapaReturnData,
} from 'app/types/LogbookTypes';

import SelectedFlightsDisplay from 'src/components/ConvertFlights/SelectedFlightsDisplay.vue';

import FileUpload from 'src/components/FileUpload.vue';
import { useAircraftStore } from 'src/stores/AircraftStore';
import FlightsReview from './FlightsReview.vue';

const emit = defineEmits<{
	(e: 'openModal', message: string): void;
	(e: 'closeModal'): void;
}>();

const step = ref<number>(1);
const showPreview = ref<boolean>(false);

const aircraftStore = useAircraftStore();
const aircraftId = computed(() => aircraftStore.getAircraftId);

let selectedFiles: File[] = [];
let removedFiles: File[] = [];
let newEntries: FlightEntry[] = [];

function resetConverter(stReset = true) {
	selectedFiles = [];
	removedFiles = [];
	newEntries = [];
	step.value = 1;
	if (stReset) {
		aircraftStore.$reset();
	}
}

function selectFiles(csvInput: HTMLInputElement) {
	if (!csvInput) {
		return;
	}
	step.value++;
	let csv = Array.from(csvInput.files || []);

	const filtered = filterUploadFiles(csv);
	selectedFiles.push(...filtered);
}

function convertFlights(selectedFiles: File[]) {
	emit('openModal', 'Converting Files');

	const uploadFiles = selectedFiles;
	if (uploadFiles.length === 0) {
		return;
	}

	let defaultHeaders = [
		'lcltime',
		'lcldate',
		'utcofst',
		'latitude',
		'longitude',
		'ias',
		'e1ng',
		'atvwpt',
		'wptdst',
		'altind',
		'altmsl',
		'tas',
		'vspd',
	];
	try {
		async function parseFile(file: File) {
			if (!file) {
				return;
			}

			let flightId = uid();
			let originalFilename = file.name;

			let flightData: PapaReturnData[] = [];

			Papa.parse(file, {
				header: true,
				fastMode: true,
				skipEmptyLines: true,
				dynamicTyping: true,
				chunkSize: 20000,
				comments: '#',

				transformHeader: (header) => {
					return header.trim().replace(/\s/g, '').toLowerCase();
				},

				transform: (value) => value.trim().replace(/\s/g, ''),

				step: function (row: PapaReturn) {
					let newObj: PapaReturnData = {};
					defaultHeaders.forEach((head) => {
						newObj[head] = row.data[head];
					});
					flightData.push(newObj as PapaReturnData);
				},

				complete: async function () {
					let positions = await getFlightPositions(flightData);
					let flightEntry = await calculateFinalData(
						positions,
						aircraftId.value,
						flightId,
						originalFilename
					);

					if (newEntries.length === uploadFiles.length) {
						emit('closeModal');
						console.log('show preview');

						showPreview.value = true;
					}
					if (flightEntry) {
						flightEntry.Distance =
							calculateDistanceBySegment(flightEntry);
						newEntries.push(flightEntry as FlightEntry);
						if (newEntries.length === uploadFiles.length) {
							emit('closeModal');

							showPreview.value = true;
							step.value++;
						}
					} else {
						console.log('no flight entry');
					}
				},
			});
		}

		async function runParser(uploadFiles: File[]) {
			if (uploadFiles.length === 0) {
				return;
			}
			let file = uploadFiles[0];
			await parseFile(file);
			runParser(uploadFiles.slice(1));
		}

		runParser(uploadFiles);
	} catch (err) {
		return err;
	}
}
</script>
<template>
	<div class="CONVERT_PAGE">
		<transition appear name="fade">
			<div
				v-if="step === 1 && aircraftStore.getAircraftId"
				class="uploadBox q-pa-md"
			>
				<div>
					<p class="text-title text-center q-mb-md">
						Convert your Data Files
					</p>
					<p class="q-mb-md text-center">
						Select your files from the Garmin SD card. At this time,
						you may convert a maximum of 15 files at once. Files
						with a size of less than 750kb will not be processed.
					</p>
					<p class="text-title text-center">Select Files for</p>
					<p class="text-title text-italic text-center q-mb-md">
						{{ aircraftStore.getAircraftId }}
					</p>
				</div>
				<div
					class="fileUploadButton column items-center justify-center"
				>
					<FileUpload
						class="fileUploadComponent"
						:aircraft-id="aircraftStore.getAircraftId"
						@files-selected="selectFiles"
					/>
					<div class="cancelButton">
						<q-btn
							@click="resetConverter()"
							flat
							color="negative"
							label="Cancel"
						/>
					</div>
				</div>
			</div>
		</transition>
		<transition appear name="delayed-fade">
			<div v-if="step === 2" id="flight-step-2" class="q-mb-md">
				<SelectedFlightsDisplay
					@convert-flights="convertFlights"
					:selected-files="selectedFiles"
					:removed-files="removedFiles"
					@reset="resetConverter"
				/>
				<div
					v-if="aircraftStore.getAircraftId && step === 2"
					class="cancelButton"
				>
					<q-btn
						@click="resetConverter()"
						flat
						color="negative"
						label="Cancel"
					/>
				</div>
			</div>
		</transition>
		<div v-if="showPreview && step === 3" id="flight-step-3">
			<FlightsReview :new-entries="newEntries" />
			<div class="continueButtons">
				<q-btn
					@click="resetConverter(false)"
					class="mainButton"
					label="Convert More Flights"
				/>
				<q-btn
					@click="resetConverter()"
					class="mainButton"
					label="No Thanks"
				/>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.CONVERT_PAGE {
	position: relative;
}

.cancelButton {
	padding-top: 1rem;
}

.continueButtons {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.uploadBox {
	max-width: 500px;
	margin: 0 auto;
	box-shadow: var(--box-shadow);
}

#flight-step-1 {
	max-width: 700px;
	margin: 0 auto;
	display: grid;
	gap: 2rem;
	grid-template-rows: 30% min-content;
}

#flight-step-1a {
	max-width: 700px;

	margin: 0 auto;
	display: grid;
	gap: 2rem;
	grid-template-rows: 30% 1fr;
}

#flight-step-2 {
	max-width: 700px;
	margin: 0 auto;
	display: grid;
	place-content: center;
}

#flight-step-3 {
	align-self: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0 auto;
}

#selected-files {
	display: flex;
	flex-direction: column;
	box-shadow: var(--box-shadow);
	border-radius: 7px;
	padding: 2rem;
}

button,
input,
select,
textarea {
	font-family: inherit;
	font-size: 100%;
}
input[type='file'] {
	position: absolute;
	z-index: -1;
	opacity: 0;
}
.selectedList {
	border: 1px solid var(--black);
	border-radius: 7px;
	background-color: var(--modal-blue);
	span {
		max-width: 50ch;
	}
}

.styledInput {
	display: block;
	margin: 0 auto 1rem;
	width: 200px;
	height: 48px;
	border: 1px solid var(--black);
	background: var(--button-color);
	border-radius: 7px;
	opacity: 1;
	color: var(--white-90);
	text-align: center;
	line-height: 48px;
	cursor: pointer;
}
.greenHover {
	&:hover,
	&:focus,
	&:focus-visible {
		box-shadow: 0 0.5em 0.5em -0.4em var(--green-shadow),
			inset 0 0 0 2em var(--modal-blue);

		border: 2px solid var(--green-accent);
		outline-color: transparent;
	}
}
.q-field--focused :deep(.q-field__control) {
	// box-shadow: 0 0.5em 0.5em -0.4em var(--green-shadow);
	background-color: #001c37;
	border: 2px solid var(--green-accent);
}

button {
	display: block;
	margin: auto;
}
.acInput {
	width: 236px;
}

#csv-file {
	display: block;
	margin: auto;
}
</style>
