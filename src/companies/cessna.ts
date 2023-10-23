// Cessna
//

import { AircraftCompany } from 'app/types/LogbookTypes';
import g1000nxi from 'src/avionics/g1000nxi';

const Cessna = <AircraftCompany>{
	companyName: 'Cessna',
	models: [
		['150', 'c150'],
		['152', 'c152'],
		['172', 'c172'],
		['182', 'c182'],
		['206', 'c206'],
		['208', 'c208'],
		['210', 'c210'],
		['310', 'c310'],
		['340', 'c340'],
		['414', 'c414'],
		['421', 'c421'],
		['425', 'c425'],
		['441', 'c441'],
		['501', 'c501'],
		['525', 'c525'],
		['550', 'c550'],
		['560', 'c560'],
		['650', 'c650'],
		['750', 'c750'],
		['850', 'c850'],
		['900', 'c900'],
		['1000', 'c1000'],
		['1200', 'c1200'],
		['1500', 'c1500'],
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
	avionics: g1000nxi,
};

export default Cessna;
