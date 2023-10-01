<script setup lang="ts">
import { gsap } from 'gsap';

function onEnter() {
	let tl = gsap.timeline().delay(0.5);
	tl.from('#step-1', {
		duration: 0.5,
		opacity: 0,
		y: -0,
		ease: 'power1',
	});
	tl.from(
		'#step-2',
		{
			duration: 0.5,
			opacity: 0,
			y: 0,
			ease: 'power1',
		},
		'<.30'
	);
	tl.from(
		'#step-3',
		{
			duration: 0.5,
			opacity: 0,
			y: 0,
			ease: 'power1',
		},
		'<.30'
	);
	tl.from('.descriptionText', {
		duration: 1,
		opacity: 0,
		ease: 'sine-in-out',
	});
}
</script>
<template>
	<Transition appear @enter="onEnter">
		<div>
			<div class="stepsGrid q-mb-md">
				<div class="step" id="step-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						viewBox="0 0 42 42"
						id="number-1"
						class="number-icon"
					>
						<g
							fill="var(--button-color)"
							stroke="#3498db"
							stroke-width="0"
						>
							<circle cx="21" cy="21" r="21" stroke="none" />
							<circle cx="21" cy="21" r="20.5" fill="none" />
						</g>
						<text
							transform="translate(9 3)"
							fill="rgba(255,255,255,0.9)"
							font-size="25"
							font-family="open_sansregular"
							font-weight="600"
							letter-spacing="-0.023em"
							class="number"
						>
							<tspan x="5" y="27" xml:space="preserve">1</tspan>
						</text>
					</svg>

					<div class="stepBox">
						<p class="text-step-desc">
							Upload the log files located on your Garmin SD Card.
						</p>
					</div>
				</div>
				<div class="step" id="step-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						viewBox="0 0 42 42"
						id="number-1"
						class="number-icon"
					>
						<g
							fill="var(--button-color)"
							stroke="#3498db"
							stroke-width="0"
						>
							<circle cx="21" cy="21" r="21" stroke="none" />
							<circle cx="21" cy="21" r="20.5" fill="none" />
						</g>
						<text
							transform="translate(9 3)"
							fill="rgba(189,189,189)"
							font-size="25"
							font-family="open_sansregular"
							font-weight="600"
							letter-spacing="-0.023em"
						>
							<tspan x="5" y="27" xml:space="preserve">2</tspan>
						</text>
					</svg>
					<div class="stepBox">
						<p class="text-step-desc">
							Review your data, then download your Foreflight
							compatible CSV file.
						</p>
					</div>
				</div>
				<div class="step" id="step-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						viewBox="0 0 42 42"
						id="number-1"
						class="number-icon"
					>
						<g
							fill="var(--button-color)"
							stroke="#3498db"
							stroke-width="0"
						>
							<circle cx="21" cy="21" r="21" stroke="none" />
							<circle cx="21" cy="21" r="20.5" fill="none" />
						</g>
						<text
							transform="translate(9 3)"
							fill="rgba(255,255,255,0.9)"
							font-size="25"
							font-family="open_sansregular"
							font-weight="600"
							letter-spacing="-0.023em"
						>
							<tspan x="5" y="27" xml:space="preserve">3</tspan>
						</text>
					</svg>
					<div class="stepBox">
						<p class="text-step-desc">
							Log into Foreflight Web to upload your flight data
							to your logbook.
						</p>
					</div>
				</div>
			</div>
			<div class="descriptionText">
				<div class="">
					<p class="text-para text-left">
						Uses the data recorded on your Garmin SD card to create
						a complete Foreflight logbook history for your aircraft.
					</p>
				</div>
				<div class="">
					<p class="text-para text-left">
						Automatically determines departure and destination
						airport, total time, distance and more.
					</p>
				</div>
				<div>
					<p class="text-para text-left">
						Works with existing Foreflight logbooks or create a new
						AIRCRAFT FILE to start a new logbook.
					</p>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style lang="scss" scoped>
.stepsGrid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
}
.step {
	display: grid;
	max-height: 268px;
	padding: 0.5rem;
	gap: 1.3rem;
	.number-icon {
		justify-self: center;
	}
}

#text-1 {
	font-size: 30px;
}

.stepBox {
	// border: 1px solid rgba(167, 167, 167, 0.692);
	height: 96px;
	max-width: 210px;
	padding: 0 0.3rem;
	margin: auto;
	display: grid;
	place-content: center;
	text-align: center;
	border-radius: 5px;
	box-shadow: var(--box-shadow);
	background-color: var(--colors-blue);
	border: var(--box-border);
	p {
		color: var(--light-white);
		letter-spacing: 0px;
	}
}

circle {
}

.descriptionText {
	display: grid;

	grid-template-columns: 1fr 1fr 1fr;
	div {
		min-width: 33%;
		p {
			margin: 0 1rem;
			text-align: center;
		}
	}
}
</style>
