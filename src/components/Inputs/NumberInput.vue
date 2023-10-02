<template>
	<q-input v-model="value" color="accent" dark outlined type="text" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0,
	},
	unknownProp: {
		type: String,
		default: 'default value',
	},
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<style lang="scss" scoped></style>
