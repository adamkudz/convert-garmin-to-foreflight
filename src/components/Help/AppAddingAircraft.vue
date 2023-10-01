<script setup lang="ts"></script>
<template>
	<div>
		<p>
			Enter your Aircraft Tail number in the input box and then select the
			"Create Aircraft File". You should always use your "N" in the tail
			number so that your flights will load properly.
		</p>
		<slot name="img1"></slot>
		<p>
			The app will generate a new aircraft for your foreflight logbook and
			when the process is complete, you will be prompted to download the
			Aircraft file.
		</p>
		<slot name="img2"></slot>
		<p>
			Download the file to your computer desktop or downloads folder. The
			csv file will begin with "aircraft"- your tail number, and a set of
			random numbers
		</p>
		<slot name="img3"></slot>
	</div>
</template>

<style scoped></style>
