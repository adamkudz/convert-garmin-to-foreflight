<template>
	<div>
		<p>
			Be very careful to not upload the same files twice. If you
			accidentally do this, Foreflight will create duplicate flights.
			Check your flights before you upload them!
		</p>
		<slot name="img1"> </slot>
		<p>
			If you attempt to convert files that you've previously converted,
			you will recieve a warning indicating which files were removed. The
			remaining selected files will be converted as normal.
		</p>
		<slot name="img2"> </slot>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
