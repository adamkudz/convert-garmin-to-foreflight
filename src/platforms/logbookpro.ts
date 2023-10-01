import spacetime from 'spacetime';
import { Input } from 'csv-stringify';
import { FlightEntry, LogbookUser } from 'app/types/LogbookTypes';
import { LogbookPro_Flight_Entry } from 'app/types/LogbookProTypes';

const config = {
	name: 'logbookpro',
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
		'DATE',
		'AIRCRAFT MAKE & MODEL',
		'AIRCRAFT IDENT',
		'ROUTE OF FLIGHT',
		'DURATION',
		'INSTRUCTOR',
		'Duty In',
		'Duty Out',
		'Total Duty',
		'LANDINGS DAY',
		'LANDINGS NIGHT',
		'INSTRUMENT',
		'LEGS',
		'SIMULATED INSTRUMENT',
		'APPROACHES & TYPE',
		'NIGHT',
		'SIMULATOR',
		'CROSS COUNTRY',
		'SOLO',
		'PILOT IN COMMAND',
		'SECOND IN COMMAND',
		'DUAL',
		'FLIGHT COST',
		'EXPENSES',
		'REMARKS',
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

			let logbookEntry = {} as LogbookPro_Flight_Entry;

			logbookEntry.DATE = flight.Date;
			logbookEntry['AIRCRAFT MAKE & MODEL'] = user.aircraft
				?.Model as string;
			logbookEntry['AIRCRAFT IDENT'] = user.aircraft
				?.AircraftId as string;
			logbookEntry['ROUTE OF FLIGHT'] = `${flight.From} - ${flight.To}`;
			logbookEntry.DURATION = flight.TotalTime;
			logbookEntry['LANDINGS DAY'] = flight.DayLandingsFullStop;
			logbookEntry['LANDINGS NIGHT'] = flight.NightLandingsFullStop;
			logbookEntry['PILOT IN COMMAND'] = flight.PIC as number;
			csvArray.push(logbookEntry);
			logbookEntry = {} as LogbookPro_Flight_Entry;
		});
		return csvArray;
	},
};

export default config;
