import spacetime from 'spacetime';
import { Input } from 'csv-stringify';

import { FlightEntry, LogbookUser } from 'app/types/LogbookTypes';

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
	transformToCsv: (flightEntries: FlightEntry[], user: LogbookUser) => {
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
};

export default config;
