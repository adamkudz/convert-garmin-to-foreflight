import { defineStore } from 'pinia';
import { platforms } from 'src/platforms';

export const usePlatformStore = defineStore('platformStore', {
	state: () => ({
		conversionType: 'garmin_to_foreflight',
		conversionOptions: ['Garmin To Foreflight', 'Garmin To LogbookPro'],
	}),

	getters: {
		platformConfig: (state) => {
			return platforms.find(
				(p) => state.conversionType.split('_to_')[1] === p.name
			);
		},
		platforms: (state) => state.conversionType,
	},

	actions: {
		setConversionType(platform: string) {
			this.conversionType = platform.replaceAll(' ', '_').toLowerCase();
		},
	},
});
