<template>
	<button class="" @click="buttonClick">
		{{ props.label }}
	</button>
</template>

<script setup>
const emit = defineEmits(['buttonClick']);
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
});

function buttonClick() {
	emit('buttonClick');
}
</script>

<style lang="scss">
/* Layout Properties */
// .mainButton {
//   width: 236px;
//   height: 48px;
//   background-color: var(--accent-blue);
//   border: 3px solid var(--black);

//   border-radius: 7px;
//   opacity: 1;
//   color: var(--white-90);
//   transition: 0.2s;
//   cursor: pointer;
// }
// .greenHover {
//   &:hover,
//   &:focus {
//     box-shadow: 0 0.5em 0.5em -0.4em var(--green-shadow),
//       inset 0 0 0 2em var(--dark-blue);

//     border: 2px solid var(--green-accent);
//   }
// }
</style>
