// Daher
//

import { AircraftCompany } from 'app/types/LogbookTypes';

const Daher = <AircraftCompany>{
	companyName: 'Daher',

	models: [
		['TBM 700 A', 'TBM7'],
		['TBM 700 B', 'TBM7'],
		['TBM 700 C2', 'TBM7'],
		['TBM 850', 'TBM8'],
		['TBM 900', 'TBM9'],
		['TBM 910', 'TBM9'],
		['TBM 930', 'TBM9'],
		['TBM 940', 'TBM9'],
		['TBM 960', 'TBM9'],
	],
	acDefaultValues: {
		EquipmentType: 'Aircraft',
		TypeCode: '',
		Category: 'airplane',
		Class: 'airplane_single_engine_land',
		GearType: 'retractable_tricycle',
		EngineType: 'Turboprop',
		Complex: true,
		TAA: true,
		HighPerformance: true,
		Pressurized: true,
	},
};

export default Daher;
