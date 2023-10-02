<script setup lang="ts">
import ForeFlightAddingAircraft from 'src/components/Help/ForeFlightAddingAircraft.vue';
import AppAddingAircraft from 'src/components/Help/AppAddingAircraft.vue';
import ForeFlightAddingFlights from 'src/components/Help/ForeFlightAddingFlights.vue';
import AppAddingFlights from 'src/components/Help/AppAddingFlights.vue';
import ForeFlightDuplicates from 'src/components/Help/ForeFlightDuplicates.vue';
import ForeflightFiles from 'src/components/Help/ForeflightFiles.vue';
import { cld } from 'src/boot/cloudinaryBoot';
import { AdvancedImage } from '@cloudinary/vue';
import { ref } from 'vue';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

const appAddingAircraftRef = ref<HTMLElement | null>(null);
const aircraftForeflightRef = ref<HTMLElement | null>(null);
const appAddingFlightsRef = ref<HTMLElement | null>(null);
const foreflightAddingFlightsRef = ref<HTMLElement | null>(null);
const fileManagementRef = ref<HTMLElement | null>(null);

const activeSection = ref<string>();
function scrollToTop(id: HTMLElement, active: string) {
	console.log('scroll');
	activeSection.value = active;
	gsap.to(window, {
		duration: 1.5,
		scrollTo: { y: id, offsetY: 150 },
		ease: 'power1.inOut',
	});
}
</script>
<template>
	<q-page padding class="helpPageContainer">
		<div></div>
		<div class="helpMenu fixed-left">
			<h4 class="text-center">Topics</h4>
			<div class="topic">
				<p
					:class="activeSection === 'ac1' ? 'activeSection' : ''"
					@click="
						scrollToTop(appAddingAircraftRef as HTMLElement, 'ac1')
					"
				>
					Creating an Aircraft File
				</p>
			</div>
			<div class="topic">
				<p
					:class="activeSection === 'ac2' ? 'activeSection' : ''"
					@click="
						scrollToTop(aircraftForeflightRef as HTMLElement, 'ac2')
					"
				>
					Loading Your Aircraft Into Foreflight
				</p>
			</div>
			<div class="topic">
				<p
					:class="activeSection === 'fl1' ? 'activeSection' : ''"
					@click="
						scrollToTop(appAddingFlightsRef as HTMLElement, 'fl1')
					"
				>
					Converting Your Flights
				</p>
			</div>
			<div class="topic">
				<p
					:class="activeSection === 'fl2' ? 'activeSection' : ''"
					@click="
						scrollToTop(
							foreflightAddingFlightsRef as HTMLElement,
							'fl2'
						)
					"
				>
					Loading the Flights into Foreflight
				</p>
			</div>
			<div class="topic">
				<p
					:class="
						activeSection === 'fileManagement'
							? 'activeSection'
							: ''
					"
					@click="
						scrollToTop(
							fileManagementRef as HTMLElement,
							'fileManagement'
						)
					"
				>
					File Management
				</p>
			</div>
		</div>
		<!-- <q-separator color="grey-8" size="1px" vertical></q-separator> -->
		<div class="helpContent flex justify-center">
			<section
				class="helpSection appAddingAircraft"
				ref="appAddingAircraftRef"
			>
				<q-separator color="orange" spaced="3rem" />
				<h4>Creating An Aircraft File</h4>

				<AppAddingAircraft>
					<template #img1
						><AdvancedImage
							width="500"
							:cld-img="cld.image('Logbook/help-aircraft-01')"
					/></template>
					<template #img2
						><AdvancedImage
							width="500"
							:cld-img="cld.image('Logbook/help-aircraft-03')"
					/></template>
					<template #img3
						><AdvancedImage
							:cld-img="cld.image('Logbook/help-aircraft-04')"
					/></template>
				</AppAddingAircraft>
				<q-separator color="orange" spaced="3rem" />
			</section>
			<q-separator color="orange" spaced="3rem" />
			<section
				id="aircraft-foreflight"
				class="helpSection addingAircraftForeflight"
				ref="aircraftForeflightRef"
			>
				<h4>Loading Your Aircraft Into Foreflight</h4>
				<ForeFlightAddingAircraft>
					<template #img1
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-aircraft-1')"
					/></template>
					<template #img2
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-aircraft-2')"
					/></template>
					<template #img3
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-aircraft-3')"
					/></template>
					<template #img4
						><AdvancedImage
							width="700"
							:cld-img="cld.image('Logbook/help-aircraft-4')"
					/></template>
					<template #img5
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-aircraft-5')"
					/></template>
					<template #img6
						><AdvancedImage
							:cld-img="cld.image('Logbook/help-aircraft-6')"
					/></template>
				</ForeFlightAddingAircraft>
				<q-separator color="orange" spaced="3rem" />
			</section>
			<section
				class="helpSection appAddingFlights"
				ref="appAddingFlightsRef"
			>
				<h4>Converting Your Flights</h4>

				<AppAddingFlights>
					<template #img1
						><AdvancedImage
							width="400"
							:cld-img="cld.image('Logbook/help-flights-01')"
					/></template>
					<template #img2
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-02')"
					/></template>
					<template #img3
						><AdvancedImage
							width="400"
							:cld-img="cld.image('Logbook/help-flights-03')"
					/></template>
					<template #img4
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-05')"
					/></template>
					<template #img5
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-06')"
					/></template>
				</AppAddingFlights>
				<q-separator color="orange" spaced="3rem" />
			</section>
			<section
				class="foreFlightAddingFlights"
				ref="foreflightAddingFlightsRef"
			>
				<h4>Loading Flights Into Foreflight</h4>
				<ForeFlightAddingFlights>
					<template #img1
						><AdvancedImage
							:cld-img="cld.image('Logbook/help-flights-1')"
					/></template>
					<template #img2
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-2')"
					/></template>
					<template #img3
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-3')"
					/></template>
					<template #img4
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-4')"
					/></template>

					<template #img6
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-flights-6')"
					/></template>
				</ForeFlightAddingFlights>
				<q-separator color="orange" spaced="3rem" />
			</section>

			<q-separator color="orange" spaced="3rem" />
			<section class="helpSection fileManagement" ref="fileManagementRef">
				<h4>File Management</h4>
				<ForeFlightDuplicates>
					<template #img1
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-files-1')"
					/></template>
					<template #img2
						><AdvancedImage
							width="600"
							:cld-img="cld.image('Logbook/help-files-03')"
					/></template>
				</ForeFlightDuplicates>
			</section>
			<section class="fileStuff">
				<ForeflightFiles>
					<template #img1
						><AdvancedImage
							:cld-img="cld.image('Logbook/help-files-2')"
					/></template>
				</ForeflightFiles>
			</section>
		</div>
	</q-page>
</template>

<style lang="scss" scoped>
.helpPageContainer {
	display: grid;
	grid-template-columns: 300px min-content 1fr;
	max-width: 1200px;
	margin: 0 auto;
	font-size: 18px;
}

.activeSection {
	color: green;
}
.topic {
	margin: 1rem;
	cursor: pointer;
}

.helpMenu {
	padding-top: 67px;
	box-shadow: var(--box-shadow);
}

img {
	display: block;
	margin: 0 auto;
	border: solid 1px var(--colors-blue6);
	padding: 1rem;
}

.fileStuff p {
	color: red;
}

.helpSection:deep(p) {
	margin: 2rem;
}

section:deep(p) {
	margin: 2rem;
	max-width: 70ch;
}
</style>
