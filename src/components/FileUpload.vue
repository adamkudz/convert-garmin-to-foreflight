<script setup lang="ts">
import { ref } from 'vue';
const csvRef = ref<HTMLInputElement>();
defineEmits<{ (e: 'filesSelected', files: HTMLInputElement): void }>();
const props = defineProps<{
	aircraftId: string | undefined;
}>();
</script>

<template>
	<form
		v-if="props.aircraftId"
		class="flex"
		enctype="multipart/form-data"
		ref="formRef"
	>
		<q-btn
			v-if="props.aircraftId!.length > 3"
			label="select files"
			data-cy="csv-file-select"
			class="mainButton"
			tabindex="0"
			@click="csvRef!.click()"
			@keyup.enter="csvRef!.click()"
		>
			<input
				@change="$emit('filesSelected', csvRef as HTMLInputElement)"
				type="file"
				name="csvFile"
				id="csv-file"
				ref="csvRef"
				hidden
				multiple
				data-cy="csv-file-input"
			/>
		</q-btn>
	</form>
</template>

<style scoped></style>
