<script setup lang="ts"></script>
<template>
	<div>
		<p>
			If you haven't converted any flights yet, you will get an option to
			"Convert Flights" on the Home screen.
		</p>
		<slot name="img1"></slot>
		<p>
			If you haven't created an Aircraft File on the App, you will be
			prompted to enter your Tailnumber.
		</p>
		<slot name="img2"></slot>
		<p>
			You will be prompted to upload files from your computer for
			conversion. Use the SD card you removed from your Garmin Avionics
			system, and upload the files you wish to convert. The data files
			should start with "log_" and end in ".csv"
		</p>
		<slot name="img3"></slot>
		<p>
			After you select the files, the App will process the data and
			display the flights that have selected for conversion. Select
			"Convert Flights".
		</p>
		<slot name="img4"></slot>
		<p>
			The App will process your flight data and display the converted
			files. A CSV icon will appear below the list of flights. Click the
			icon to download the converted flights to your computer.
		</p>
		<slot name="img5"></slot>
		<slot name="img6"></slot>
	</div>
</template>

<style scoped></style>
