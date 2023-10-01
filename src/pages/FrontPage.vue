<script lang="ts">
import { Platform } from 'quasar';
import AircraftCreate from 'src/components/AircraftCreate.vue';
import FlightsConvert from 'src/components/FlightsConvert.vue';
import { ref } from 'vue';
import LoadingModal from 'src/components/LoadingModal.vue';

export default {
	preFetch({ redirect }) {
		if (Platform.is.mobile) {
			return redirect({ name: 'errordesktoponly' });
		}
	},
};
</script>

<script setup lang="ts">
import ThreeSteps from 'src/components/DisplayComponents/ThreeSteps.vue';
import { computed } from 'vue';

import { useAircraftStore } from 'src/stores/AircraftStore';

const aircraftStore = useAircraftStore();
const aircraftId = computed(() => aircraftStore.getAircraftId);
const showModal = ref(false);
const modalMessage = ref('');
function openModal(message: string): void {
	showModal.value = true;
	modalMessage.value = message;
}
function closeModal(): void {
	showModal.value = false;
	modalMessage.value = '';
}
</script>
<template>
	<div class="HOME_CONTAINER">
		<LoadingModal
			v-model="showModal"
			:loading-message="modalMessage || 'Loading..'"
		/>
		<div class="homeGrid">
			<header>
				<div class="flex justify-center q-mb-md">
					<img
						class="logoImage"
						id="garmin-logo"
						role="img"
						src="~assets/garmin-logo.svg"
						alt="garmin logo"
					/>
					<h1 class="text-large-title text-center q-mx-lg">
						Logbook Converter
					</h1>
					<img
						class="logoImage"
						id="foreflight-logo"
						src="~assets/foreflight-logo.svg"
						alt="foreflight logo"
						role="img"
					/>
				</div>
				<p class="text-title text-uppercase text-center">
					Quickly and easily convert your Garmin flight data to your
					Foreflight Logbook
				</p>
			</header>

			<section style="max-width: 1000px" class="newAircraft q-mx-auto">
				<ThreeSteps v-if="!aircraftId" />
				<AircraftCreate v-if="!aircraftId" />
			</section>
			<FlightsConvert @open-modal="openModal" @close-modal="closeModal" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.HOME_CONTAINER {
	height: 100%;
	padding: 2rem;
}
.homeGrid {
	display: grid;

	grid-template-rows: max-content, 1fr;
	gap: 3rem;
}

.newAircraft {
	display: flex;
	flex-direction: column;
	gap: 6rem;
}

.logoImage {
	height: 60px;
}

#foreflight-logo {
	filter: contrast(1.2);
}

.loginGrid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 5rem;
}

.loginMessage {
	align-self: center;
	justify-self: end;
}

.loginForm {
	align-self: center;
	justify-self: end;
}
</style>
