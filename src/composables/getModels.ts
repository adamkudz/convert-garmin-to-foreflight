import { Daher, Cessna, Mooney } from 'src/companies';

import type { AircraftCompany } from 'app/types/LogbookTypes';
import type { Avionics } from 'app/types/GarminTypes';
import { ref } from 'vue';

export const useGetModels = (companyName: string) => {
	const selectedModels = ref<AircraftCompany['models']>();
	const selectedDetails = ref<AircraftCompany['acDefaultValues']>();
	const selectedAvionics = ref<Avionics>();

	switch (companyName) {
		case 'Daher':
			selectedModels.value = Daher.models;
			selectedDetails.value = Daher.acDefaultValues;
			selectedAvionics.value = Daher.avionics;

			break;

		case 'Cessna':
			selectedModels.value = Cessna.models;
			selectedDetails.value = Cessna.acDefaultValues;
			selectedAvionics.value = Cessna.avionics;

			break;

		case 'Mooney':
			selectedModels.value = Mooney.models;
			selectedDetails.value = Mooney.acDefaultValues;
			selectedAvionics.value = Mooney.avionics;

			break;
	}
	return { selectedModels, selectedDetails, selectedAvionics };
};
