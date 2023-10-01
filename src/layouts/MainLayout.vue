<script setup lang="ts">
import { ref, computed, watch, unref, toRef } from 'vue';
import { useAuthPinia } from 'src/stores/authPinia';
import { useRoute } from 'vue-router';
import CheckingModal from 'src/components/CheckingModal.vue';
import LoadingModal from 'src/components/LoadingModal.vue';
import DeleteAccountModal from 'src/components/DeleteAccountModal.vue';
import LogOutButton from 'src/components/auth/LogOutButton.vue';

const route = useRoute();
const authStore = useAuthPinia();

const modalLoadingMessage = ref<string | null>(null);
const modalStatusMessage = ref<string | null>(null);
const checkingModalMessage = ref<string | null>(null);
const showModal = ref<boolean>(false);
const showCheckingModal = ref<boolean>(false);
const showDeleteAccountModal = ref<boolean>(false);

const exitRouteRef = ref<string | undefined>(undefined);
const aircraftIdRef = ref<string | undefined>(undefined);

const active = ref<string>('');

watch(
	route,
	(before, after) => {
		active.value = before.name as string;
	},
	{ immediate: true }
);
const user = computed(() => authStore.user);

function openDeleteAccountModal() {
	showDeleteAccountModal.value = true;
}
function closeDeleteAccountModal() {
	showDeleteAccountModal.value = false;
}

function openModal(loadingMessage: string) {
	showModal.value = true;
	modalLoadingMessage.value = loadingMessage;
}
function openCheckingModal(
	loadingMessage: string,
	exitRoute: string,
	aircraftId: string
) {
	showCheckingModal.value = true;
	checkingModalMessage.value = loadingMessage;
	exitRouteRef.value = exitRoute;
	aircraftIdRef.value = aircraftId;
}
function closeModal() {
	showModal.value = false;
}
function closeCheckingModal() {
	showCheckingModal.value = false;
}
</script>
<template>
	<q-layout view="lHh lpr lFf">
		<LoadingModal
			v-model="showModal"
			:loadingMessage="modalLoadingMessage"
			:statusMessage="modalStatusMessage"
		/>
		<CheckingModal
			v-model="showCheckingModal"
			@openCheckingModal="openCheckingModal"
			@closeCheckingModal="closeCheckingModal"
			:exitRoute="(exitRouteRef as string)"
			:message="(checkingModalMessage as string)"
			:aircraftId="aircraftIdRef"
		/>
		<DeleteAccountModal
			v-model="showDeleteAccountModal"
			@openDeleteAccountModal="openDeleteAccountModal"
			@closeDeleteAccountModal="closeDeleteAccountModal"
		/>
		<q-header elevated style="background-color: var(--modal-blue)">
			<div class="q-pa-sm row">
				<div
					style="max-width: 1500px"
					class="row justify-around text-grey-5 q-px-md col"
				>
					<p
						@click="$router.push({ name: 'userhome' })"
						class="navLinks"
						data-cy="nav-home-button"
						:class="active === 'userhome' ? 'active' : ''"
					>
						Home
					</p>

					<p
						@click="$router.push({ name: 'flightsconvert' })"
						class="navLinks"
						:class="active === 'flightsconvert' ? 'active' : ''"
					>
						Convert Flights
					</p>
					<!-- <p
						@click="$router.push({ name: 'options' })"
						class="navLinks"
						data-cy="nav-options-button"
						:class="active === 'options' ? 'active' : ''"
					>
						Options
					</p> -->
					<p
						@click="$router.push({ name: 'account' })"
						class="navLinks"
						data-cy="nav-account-button"
						:class="active === 'accountPage' ? 'active' : ''"
					>
						Account
					</p>
					<p
						@click="$router.push({ name: 'helppage' })"
						class="navLinks"
						:class="active === 'helppage' ? 'active' : ''"
					>
						Help
					</p>
				</div>

				<span
					class="text-positive q-px-md self-center"
					data-cy="nav-user-email-display"
					@click="$router.push({ name: 'userhome' })"
					v-if="user"
				>
					{{ user.email }}
				</span>

				<LogOutButton class="loggedBox" v-if="user" label="Logged In" />
			</div>
		</q-header>

		<q-page-container class="gradientBackground text-grey-5">
			<router-view
				v-slot="{ Component }"
				@openModal="openModal"
				@closeModal="closeModal"
				@openCheckingModal="openCheckingModal"
				@openDeleteAccountModal="openDeleteAccountModal"
			>
				<Transition name="fade" mode="out-in">
					<component :is="Component" />
				</Transition>
			</router-view>
		</q-page-container>
		<q-footer elevated style="background-color: var(--modal-blue)">
			<div
				class="uploadMessage flex justify-center q-mx-auto q-py-md"
				style="max-width: var(--content-max-width); margin: auto"
			>
				<p class="text-center text-caption text-grey-5">
					This site is not affilliated with Garmin or Foreflight.
				</p>
			</div>
		</q-footer>
	</q-layout>
</template>
<style lang="scss" scoped>
.navLinks {
	cursor: pointer;
	align-self: center;
	text-transform: uppercase;
	font-weight: bold;
	position: relative;
	transition: color;
	transition-duration: 0.2s;
}

.navLinks:hover {
	color: var(--text-green);
}
.userEmail {
}
.loggedBox {
	border: 2px solid var(--colors-green7);
	padding: 0.1rem;
	background-color: var(--colors-green2);
	transition: border;
	transition-duration: 0.2;
	color: #0fa100;
	cursor: pointer;
}

.loggedBox:hover {
	border: 2px solid var(--red-negative);
}

.loggedBox:hover::before {
	position: absolute;
	z-index: 10;
	content: 'Log Out';
	padding: 0.2rem;

	color: var(--light-white);
	background-color: #a52a2a;
}
</style>
