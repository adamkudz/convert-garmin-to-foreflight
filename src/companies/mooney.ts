import { AircraftCompany } from 'app/types/LogbookTypes';

//mooney
const Mooney = <AircraftCompany>{
	companyName: 'Mooney',
	models: [
		['M20J', 'M20J'],
		['M20K', 'M20K'],
		['M20M', 'M20M'],
		['M20R', 'M20R'],
		['M20S', 'M20S'],
		['M20T', 'M20T'],
	],
	acDefaultValues: {
		EquipmentType: 'Aircraft',
		TypeCode: '',
		Category: 'airplane',
		Class: 'airplane_single_engine_land',
		GearType: 'fixed_tricycle',
		EngineType: 'Piston',
		Complex: false,
		TAA: true,
		HighPerformance: false,
		Pressurized: false,
	},
};

export default Mooney;