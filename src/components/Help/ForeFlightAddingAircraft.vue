<script setup lang="ts"></script>
<template>
	<div>
		<p>
			On the top of the page, select the "Import" tab. From this page, you
			may "drag and drop" your Aircraft file into the area on the right,
			or select "Browse Files". Find the "aircraft" file that you
			downloaded to your computer and select it.
		</p>
		<slot name="img1">image here</slot>
		<p>
			You will likely get a warning when you upload the file. Go ahead and
			hit the "IMPORT TO LOGBOOK" button.
		</p>
		<slot name="img2">image here</slot>

		<p>
			If all goes as planned, your should receive another success message
			indicating your upload is complete!
		</p>
		<slot name="img3"></slot>
		<p>
			Now select the Logbook Aircraft tab on the top menu to see your
			aircraft.
		</p>
		<slot name="img4"></slot>
		<p>
			However, if you inspect the "Entries" tab, you'll notice that we
			have no flights in our logbook yet. We are now ready to covert our
			"flight" files and upload them to Foreflight.
		</p>
		<slot name="img5"></slot>
	</div>
</template>

<style scoped></style>
