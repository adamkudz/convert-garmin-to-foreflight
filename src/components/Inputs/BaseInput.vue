<template>
	<q-input
		v-model="value"
		dense
		bg-color="grey-4"
		standout
		outlined
		type="text"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['modelValue']);
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

<style lang="scss" scoped>
.q-field-highlighted {
	color: brown;
}
</style>
