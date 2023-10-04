<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { Aircraft } from 'app/types/LogbookTypes';
import { useVuelidate } from '@vuelidate/core';
import { required, alphaNum, helpers, maxLength } from '@vuelidate/validators';
import { acTypeSwitch } from 'src/composables/typeSwitch';
import { stringify } from 'csv-stringify/browser/esm';

import { useAircraftStore } from 'src/stores/AircraftStore';
import { api } from 'src/boot/axios';

const tailNumberInputRef = ref(null);

const acList = [
	'TBM 700 A',
	'TBM 700 B',
	'TBM 700 C2',
	'TBM 850',
	'TBM 900',
	'TBM 910',
	'TBM 930',
	'TBM 940',
	'TBM 960',
];
const aircraft = reactive<Aircraft>({
	AircraftId: '',
	EquipmentType: 'Aircraft',
	TypeCode: 'TBM9',
	Make: 'Socata',
	Model: 'TBM 900',
	Category: 'airplane',
	Class: 'airplane_single_engine_land',
	GearType: 'retractable_tricycle',
	EngineType: 'Turboprop',
	Complex: true,
	TAA: true,
	HighPerformance: true,
	Pressurized: true,
});

watch(
	aircraft,
	(x) => {
		const newX = acTypeSwitch(x.Model);
		aircraft.TypeCode = newX.acType.value;
	},

	{ immediate: true }
);

const rules = {
	AircraftId: {
		required: helpers.withMessage('Tail Number is required', required),
		alphaNum,
		$autoDirty: true,
		maxLength: helpers.withMessage('Limit of 6 characters', maxLength(6)),
	},
};

const Vuelidate = useVuelidate(rules, aircraft);

async function createAircraftTable() {
	aircraft.AircraftId = aircraft.AircraftId.toUpperCase();
	let aircraftStore = useAircraftStore();
	aircraftStore.setAircraft(aircraft);
	await api.post('/log/events/new-aircraft', aircraft);
	stringify([aircraft], { header: true }, function (err, output) {
		if (err) {
			return;
		}
		console.log(output);
		aircraftStore.setAircraftCsv(output);
	});
}
</script>
<template>
	<div class="flex">
		<div id="ac-step-1">
			<transition appear enter-active-class="animated fadeInDown">
				<div
					style="max-width: 732px; height: 310px"
					class="aircraftInfoContainer column q-gutter-lg q-mx-auto q-pa-lg box-shadow"
				>
					<p class="text-title text-center">
						Please enter your aircraft information
					</p>

					<div class="flex col-4">
						<q-input
							class="acInput"
							autofocus
							data-cy="create-aircraft-id"
							outlined
							borderless
							dark
							v-model="aircraft.AircraftId"
							label="Tail Number"
							ref="tailNumberInputRef"
							@on-blur="() => Vuelidate.$validate()"
							:error="Vuelidate.AircraftId.$error"
						>
							<template #error>
								<p
									data-cy="create-aircraft-id-error"
									class="negative-message"
								>
									{{
										Vuelidate.AircraftId.$errors[0]
											.$message
									}}.
								</p>
							</template>
						</q-input>

						<q-select
							class="acInput"
							dark
							data-cy="create-aircraft-selection"
							outlined
							borderless
							v-model="aircraft.Model"
							:options="acList"
							label="A/C Model"
						/>
					</div>
					<div class="q-mx-auto">
						<q-btn
							@click="createAircraftTable"
							class="mainButton"
							data-cy="create-aircraft-button"
							label="Create Aircraft File"
							:disabled="Vuelidate.$silentErrors.length"
						/>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<style lang="scss" scoped>
#ac-step-1 {
	max-width: 700px;
	grid-template-rows: 40% 1fr;
	margin: 0 auto;
	display: grid;
	gap: 2rem;
}

.q-field--focused :deep(.q-field__control) {
	box-shadow: 0 0.5em 0.5em -0.4em var(--green-shadow);
	background-color: var(--dark);
	border: 2px solid var(--green-accent);
}

.acInput {
	width: 236px;
	padding: 1rem 0;
	margin: 0 1rem;
}

.customInput {
	text-transform: uppercase;
}
</style>
