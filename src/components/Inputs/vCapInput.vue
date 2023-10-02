<template>
	<q-input v-model="value" type="text" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	modelModifiers: {
		type: Object,
		default: () => ({}),
	},
});
const emits = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		if (props.modelModifiers.allcaps) {
			value = value?.toUpperCase();
		}
		emits('update:modelValue', value);
	},
});
</script>

<style scoped>
.q-field-highlighted {
	color: brown;
}
</style>
