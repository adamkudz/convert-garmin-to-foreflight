<script setup lang="ts">
defineProps<{
	selectedFiles: File[];
	removedFiles: File[];
}>();

defineEmits<{
	(e: 'convertFlights', value: File[]): void;
	(e: 'reset'): void;
}>();
</script>
<template>
	<div>
		<div data-cy="selected-flights-removed" v-if="removedFiles.length">
			<p class="text-h4 q-mb-sm text-center text-negative text-uppercase">
				Warning
			</p>
			<p class="text-center q-mb-sm">
				We have detected and removed the following
				<span> ({{ removedFiles.length }}) </span
				><span class="text-uppercase"> duplicate files </span>from your
				selected uploads.
			</p>
			<div class="removedContainer">
				<div
					class="removedFiles"
					v-for="(file, index) in removedFiles"
					:key="index"
				>
					<span class="q-ma-none text-italic">{{ file.name }}</span>
				</div>
			</div>
		</div>
		<div data-cy="selected-flights-selected" class="selected-files">
			<p class="text-title text-center q-mb-sm">
				({{ selectedFiles.length }}) Files Selected
			</p>

			<div
				v-if="selectedFiles.length"
				style="max-width: 50ch"
				class="q-mx-auto"
			>
				<p class="uploadMessage text-center text-para q-mb-md">
					You are now ready to convert your files into a Foreflight
					compatible format. Click "Convert Flights" to continue.
				</p>
			</div>
			<div
				data-cy="selected-flights-none-selected"
				v-else
				style="max-width: 50ch"
				class="q-mx-auto"
			>
				<p class="noFlightsMessage text-center text-para q-mb-xl">
					You have no flights available for upload. Please click below
					to try again.
				</p>
			</div>
		</div>
		<div
			v-if="selectedFiles.length"
			style="height: 75px"
			class="convertFilesButton q-pa-sm relative"
		>
			<q-btn
				@click="$emit('convertFlights', selectedFiles as File[])"
				class="mainButton block q-mx-auto text-uppercase"
				label="convert flights"
				data-cy="convert-create-button"
			/>
		</div>
		<div
			v-else
			style="height: 75px"
			class="convertFilesButton q-pa-sm relative"
		>
			<q-btn
				@click="$emit('reset')"
				class="mainButton block q-mx-auto text-uppercase"
				label="go back"
				data-cy="convert-return-button"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.selected-files {
	display: grid;
	grid-template-rows: 1fr, 50px;
}

.removedContainer {
	// width: 600px;
	// height: 100px;
	display: grid;
	gap: 0.1rem;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-flow: row;
}

.removedFiles {
	padding: 0.1rem 0.3rem;
	color: var(--yellow-warning);
}
</style>
