<script setup lang="ts"></script>
<template>
	<div>
		<p>
			Log into Foreflight and select the "Logbook" tab on the left side of
			your screen.
		</p>
		<slot name="img1"></slot>
		<p>
			On the top of the page, select the "Import" tab. From this page, you
			may "drag and drop" your Aircraft file into the area on the right,
			or select "Browse Files". Find the "aircraft" file that you
			downloaded to your computer and select it.
		</p>
		<slot name="img2"></slot>
		<p>
			Once again, you may receive an error message when loading the Flight
			file. Verify that the number of entries looks correct, and then hit
			"IMPORT TO LOGBOOK".
		</p>
		<slot name="img3"></slot>
		<p>
			If all goes as planned, your should receive another success message
			indicating your upload is complete!
		</p>
		<slot name="img4"></slot>
		<p>
			You can now head over to the "Entries" tab to verify that your
			flights are now uploaded to Foreflight.
		</p>
		<slot name="img6"></slot>
	</div>
</template>

<style scoped></style>
