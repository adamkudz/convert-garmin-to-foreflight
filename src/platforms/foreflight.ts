import spacetime from 'spacetime';
import { Input } from 'csv-stringify';

import { FlightEntry } from 'app/types/LogbookTypes';

const config = {
	name: 'foreflight',
	aircraftHeaders: [
		'AircraftID',
		'EquipmentType',
		'TypeCode',
		'Year',
		'Make',
		'Model',
		'Category',
		'Class',
		'GearType',
		'EngineType',
		'Complex',
		'TAA',
		'HighPerformance',
		'Pressurized',
	],
	flightHeaders: [
		'Date',
		'AircraftID',
		'From',
		'To',
		'Route',
		'TimeOut',
		'TimeOff',
		'TimeOn',
		'TimeIn',
		'OnDuty',
		'OffDuty',
		'TotalTime',
		'PIC',
		'SIC',
		'Night',
		'Solo',
		'CrossCountry',
		'NVG',
		'NVG Ops',
		'Distance',
		'DayTakeoffs',
		'DayLandingsFullStop',
		'NightTakeoffs',
		'NightLandingsFullStop',
		'AllLandings',
		'ActualInstrument',
		'SimulatedInstrument',
		'HobbsStart',
		'HobbsEnd',
		'TachStart',
		'TachEnd',
		'Holds',
		'Approach1',
		'Approach2',
		'Approach3',
		'Approach4',
		'Approach5',
		'Approach6',
		'DualGiven',
		'DualReceived',
		'SimulatedFlight',
		'GroundTraining',
		'InstructorName',
		'InstructorComments',
		'FlightReview',
		'Checkride',
		'IPC',
		'NVG Proficiency',
		'FAA6158',
		'PilotComments',
	],
	transformToCsv: (flightEntries: FlightEntry[]) => {
		const csvArray: Input = [];
		flightEntries.forEach((flight) => {
			flight.Date = spacetime(flight.Date).format('numeric-us');
			flight.TimeOut = spacetime(flight.TimeOut).format(
				'{hour-24-pad}:{minute-pad}'
			);
			flight.TimeIn = spacetime(flight.TimeIn).format(
				'{hour-24-pad}:{minute-pad}'
			);

			csvArray.push(flight);
		});
		return csvArray;
	},
	aircraftOptions: {
		categoryClass: [
			'Airplane Single Engine Lane (ASEL)',
			'Airplane Multi Engine Land (AMEL)',
			'Airplane Single Engine Sea (AMES)',
			'Airplace Single Engine Sea (ASES)',
			'Rotorcraft Helicopter (RH)',
			'Rotorcraft Gyroplane (RG)',
			'Glider (GL)',
			'Lighter Than Air Airship (LA)',
			'Lighter Than Air Balloon (LTB)',
			'Powered Lift (PLIFT)',
			'Powered Parachute Land (PL)',
			'Powered Parachute Sea (PS)',
			'Weight Shift Control Land (WL)',
			'Weight Shift Control Sea (WS)',
		],
		EquipmentType: [
			'Aircraft',
			'Full Flight Simulator (FFS)',
			'Flight Training Device (FTD)',
			'Basic Aircraft Training Device (BATD)',
			'Advanced Aircraft Training Device (AATD)',
		],
		GearType: [
			'None',
			'Fixed Tailwheel (FC)',
			'Fixed Tricycle (FT)',
			'Amphibian (AM)',
			'Retractable Tailwheel (RC)',
			'Fixed Tailwheel (FC)',
			'Skids',
			'Skis',
			'Floats (FL)',
		],
		EngineType: [
			'Diesel',
			'Electric',
			'Non-Powered',
			'Piston',
			'Radial',
			'TurboFan',
			'TurboShaft',
			'Turboprop',
			'Turbojet',
		],
	},
};

export default config;
