import { Daher, Cessna, Mooney } from 'src/companies';
import type { AircraftCompany, AircraftDetails } from 'app/types/LogbookTypes';
import { ref } from 'vue';

export const useGetModels = (companyName: string) => {
	const selectedModels = ref<AircraftCompany['models']>();
	const selectedDetails = ref<AircraftCompany['acDefaultValues']>();

	switch (companyName) {
		case 'Daher':
			selectedModels.value = Daher.models;
			selectedDetails.value = Daher.acDefaultValues;
			break;

		case 'Cessna':
			selectedModels.value = Cessna.models;
			selectedDetails.value = Cessna.acDefaultValues;
			break;

		case 'Mooney':
			selectedModels.value = Mooney.models;
			selectedDetails.value = Mooney.acDefaultValues;
			break;
	}
	return { selectedModels, selectedDetails };
};
