<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type {
	AircraftDetails,
	AircraftUserInputs,
	AircraftCompany,
} from 'app/types/LogbookTypes';
import { useVuelidate } from '@vuelidate/core';
import { required, alphaNum, helpers, maxLength } from '@vuelidate/validators';
import { stringify } from 'csv-stringify/browser/esm';
import { useGetModels } from 'src/composables/getModels';

import { useAircraftStore } from 'src/stores/AircraftStore';
import { api } from 'src/boot/axios';
import { Avionics } from 'app/types/GarminTypes';
const aircraftStore = useAircraftStore();
const tailNumberInputRef = ref(null);
const companyList = ['Daher', 'Cessna', 'Mooney'];
const acList = ref<string[]>();

const userInputs = ref<AircraftUserInputs>({
	AircraftId: '',
	Make: 'Daher',
	Model: '',
});

const aircraftDetails = ref<AircraftDetails>({
	EquipmentType: '',
	TypeCode: '',
	Category: '',
	Class: '',
	GearType: '',
	EngineType: '',
	Complex: false,
	TAA: false,
	HighPerformance: false,
	Pressurized: false,
});

watch(
	() => userInputs.value.Make,
	(make) => {
		console.log(make);
		const { selectedModels, selectedDetails, selectedAvionics } =
			useGetModels(make);
		acList.value = selectedModels.value?.map((x) => x[0]);
		aircraftDetails.value = selectedDetails.value as AircraftDetails;
		userInputs.value.Model = selectedModels.value?.[0][0] as string;
		aircraftStore.setAvionics(selectedAvionics.value as Avionics);
	},

	{ immediate: true }
);

watch(
	() => userInputs.value.Model,
	(model) => {
		aircraftDetails.value.TypeCode = useGetModels(
			userInputs.value.Make
		).selectedModels.value?.find((x) => x[0] === model)?.[1] as string;
	},
	{ immediate: true }
);

onMounted(() => {
	acList.value = useGetModels(
		userInputs.value.Make
	).selectedModels.value?.map((x) => x[0]);
	aircraftDetails.value = useGetModels(userInputs.value.Make).selectedDetails
		.value as AircraftDetails;
	userInputs.value.Model = acList.value?.[0] as string;
});

const rules = {
	AircraftId: {
		required: helpers.withMessage('Tail Number is required', required),
		alphaNum,
		$autoDirty: true,
		maxLength: helpers.withMessage('Limit of 6 characters', maxLength(6)),
	},
};

const Vuelidate = useVuelidate(rules, userInputs);

async function createAircraftTable() {
	userInputs.value.AircraftId = userInputs.value.AircraftId.toUpperCase();
	let aircraftStore = useAircraftStore();
	let aircraft = { ...userInputs.value, ...aircraftDetails.value };
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
				<div class="q-mx-auto q-pa-lg box-shadow">
					<p class="text-title text-center col-12">
						Please enter your aircraft information
					</p>

					<div class="aircraftInfoContainer">
						<div class="flex justify-center">
							<q-input
								class="acInput"
								autofocus
								data-cy="create-aircraft-id"
								outlined
								borderless
								dark
								v-model="userInputs.AircraftId"
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
						</div>

						<div class="flex justify-center">
							<q-select
								class="acInput"
								dark
								data-cy="create-aircraft-make"
								outlined
								borderless
								v-model="userInputs.Make"
								:options="companyList"
								label="A/C Make"
							/>
							<q-select
								class="acInput"
								dark
								data-cy="create-aircraft-model"
								outlined
								borderless
								v-model="userInputs.Model"
								:options="acList"
								label="A/C Model"
							/>
						</div>
						<div class="q-mx-auto q-pt-md">
							<q-btn
								@click="createAircraftTable"
								class="mainButton q-mx-auto"
								data-cy="create-aircraft-button"
								label="Create Aircraft File"
								:disabled="Vuelidate.$silentErrors.length"
							/>
						</div>
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
.aircraftInfoContainer {
	display: flex;
	flex-direction: column;
}

.q-field--focused :deep(.q-field__control) {
	box-shadow: 0 0.5em 0.5em -0.4em var(--green-shadow);
	background-color: var(--dark);
	border: 2px solid var(--green-accent);
}

.acInput {
	width: 236px;
	flex-shrink: 0;
	padding: 1rem 0;
	margin: 0 1rem;
	flex-basis: 236px;
}

.customInput {
	text-transform: uppercase;
}
</style>
