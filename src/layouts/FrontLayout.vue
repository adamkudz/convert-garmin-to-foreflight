<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
	<q-layout>
		<q-page-container class="text-grey-5">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</q-page-container>
		<q-footer elevated style="background-color: var(--modal-blue)">
			<div
				class="uploadMessage flex justify-center q-mx-auto q-py-md"
				style="max-width: var(--content-max-width); margin: auto"
			>
				<p class="text-center text-caption">
					This site is not affilliated with Garmin or Foreflight.
				</p>
			</div>
		</q-footer>
	</q-layout>
</template>
<style lang="scss" scoped></style>
