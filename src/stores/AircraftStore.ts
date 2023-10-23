import { defineStore } from 'pinia';
import type { Aircraft } from '../../types/LogbookTypes';
import { Avionics } from 'app/types/GarminTypes';

export const useAircraftStore = defineStore('aircraft', {
	state: () => ({
		aircraft: <Aircraft | null>null,
		aircraftCsv: <string | null>null,
		avionics: <Avionics | null>null,
	}),

	getters: {
		getAircraftId(state): string {
			return state.aircraft?.AircraftId as string;
		},
		getAircraftCsv(state): string {
			return state.aircraftCsv as string;
		},
		getAvionics(state): Avionics {
			return state.avionics as Avionics;
		},
	},

	actions: {
		setAircraft(aircraft: Aircraft) {
			this.aircraft = aircraft;
		},
		setAircraftCsv(csv: string) {
			this.aircraftCsv = csv;
		},
		setAvionics(avionics: Avionics) {
			this.avionics = avionics;
		},
	},
});
