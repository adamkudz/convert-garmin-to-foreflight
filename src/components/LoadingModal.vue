<script setup lang="ts">
const props = defineProps<{
	loadingMessage: string;
	statusMessage?: string;
}>();
</script>
<template>
	<q-dialog>
		<div data-cy="loadingModal" class="modalContainer text-grey-5">
			<div class="top-section">
				<p
					v-if="props.loadingMessage"
					class="text-title text-uppercase loadingMessage"
				>
					{{ props.loadingMessage }}
				</p>
			</div>
			<div class="middle-section">
				<p v-if="props.statusMessage" class="text-title statusMessage">
					{{ props.statusMessage.toUpperCase() }}
				</p>
				<div v-if="props.loadingMessage" class="gearSpinner">
					<q-spinner-gears color="grey-4" size="80px" />
				</div>
			</div>
		</div>
	</q-dialog>
</template>

<style lang="scss" scoped>
.modalContainer {
	height: 300px;
	width: 470px;
	display: grid;

	grid-template-rows: max-content 1fr;
	background-color: var(--colors-blue2);
	border: 1px solid var(--colors-blue11);
	border-radius: 36px;
	display: grid;
	place-items: center;
	padding: 3rem;
}
</style>
