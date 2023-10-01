import { defineStore } from 'pinia';
import type { Aircraft } from '../../types/LogbookTypes';

export const useAircraftStore = defineStore('aircraft', {
	state: () => ({
		aircraft: <Aircraft | null>null,
		aircraftCsv: <string | null>null,
	}),

	getters: {
		getAircraftId(state): string {
			return state.aircraft?.AircraftId as string;
		},
		getAircraftCsv(state): string {
			return state.aircraftCsv as string;
		},
	},

	actions: {
		setAircraft(aircraft: Aircraft) {
			this.aircraft = aircraft;
		},
		setAircraftCsv(csv: string) {
			this.aircraftCsv = csv;
		},
	},
});
