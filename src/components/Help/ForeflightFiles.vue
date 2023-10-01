<template>
	<div>
		<p>
			When you create Aircraft files and Flight files, they have a
			particular syntax which makes them easy to recognize. The file name
			will always start with "aircraft" or "flights" and will be followed
			by your tail number, a timestamp, and a series of random numbers.
			The file will always be a .csv file.
		</p>
		<slot name="img1"></slot>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
