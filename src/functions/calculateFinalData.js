import { api } from 'src/boot/axios';
import spacetime from 'spacetime';
import daylight from 'spacetime-daylight';
import { calculateDistance } from '.';

spacetime.extend(daylight);

export async function calculateFinalData(
	flight,
	AircraftID,
	flightId,
	originalFilename
) {
	if (!flight) {
		return;
	}
	try {
		let { data } = await fetchAirports(flight.start, flight.end);
		let ffObj = {};
		ffObj._id = flightId;
		let finalTimes = calculateFinalTimes(flight);
		// ffObj.Distance = calculateDistance(
		// 	flight.start.lat,
		// 	flight.start.lon,
		// 	flight.end.lat,
		// 	flight.end.lon,
		// 	'N'
		// );
		ffObj.Distance = 0;
		ffObj.AircraftID = AircraftID.toUpperCase();
		ffObj.Date = flight.start.date;

		ffObj.TimeOut = spacetime(finalTimes.start).format('iso-utc');

		ffObj.TimeIn = spacetime(finalTimes.end).format('iso-utc');

		ffObj.From = data.start;
		ffObj.To = data.end;
		ffObj.Route = flight.routeString;
		ffObj.TotalTime = finalTimes.totalTime;
		let daylightResults = isDaytime(finalTimes.start, finalTimes.end);
		let { dt, dl, nt, nl } = calculateToAndLandings(daylightResults);
		ffObj.DayTakeoffs = dt;
		ffObj.DayLandingsFullStop = dl;
		ffObj.NightTakeoffs = nt;
		ffObj.NightLandingsFullStop = nl;
		ffObj.positionData = flight.wpts;
		ffObj.originalFilename = originalFilename;
		return ffObj;
	} catch (err) {
		return;
	}
}
async function fetchAirports(start, end) {
	const airports = await api.post(
		`${import.meta.env.VITE_API_URL}/getairport`,
		{
			start,
			end,
		}
	);
	return airports;
}

function isDaytime(startTime, endTime) {
	let sPos = spacetime(startTime);
	let ePos = spacetime(endTime);
	let isStartDaylight = sPos.isBetween(sPos.sunrise(), sPos.sunset());
	let isEndDaylight = ePos.isBetween(ePos.sunrise(), ePos.sunset());

	return { isStartDaylight, isEndDaylight };
}
function calculateFinalTimes(finalObj) {
	let start = spacetime(finalObj.start.nTime.epoch, finalObj.start.tz);
	let end = spacetime(finalObj.end.nTime.epoch, finalObj.end.tz);
	let compute = start.diff(end, 'minutes');
	let totalTime = parseFloat((compute / 60).toFixed(1));
	return { start, end, totalTime };
}

// function calculateNightTime(_startTime, _endTime) {
// 	let sPos = spacetime(_startTime);
// 	let ePos = spacetime(_endTime);
// 	let sunset = ePos.sunset();

// 	let diff = ePos.diff(sunset, 'minutes');
// 	let nightTime = parseFloat((diff / 60).toFixed(1));
// 	return nightTime;
// }

function calculateToAndLandings(daylightResults) {
	let sDayTime = daylightResults.isStartDaylight;
	let eDayTime = daylightResults.isEndDaylight;
	let dt = 0;
	let dl = 0;
	let nt = 0;
	let nl = 0;
	sDayTime ? dt++ : nt++;
	eDayTime ? dl++ : nl++;
	return { dt, dl, nt, nl };
}

// function calculateDistanceBySegment(flightEntry) {
// 	let total = 0;
// 	flightEntry?.positionData.forEach((pos, index) => {
// 		let nextPos = flightEntry?.positionData[index + 1];
// 		if (nextPos) {
// 			let distance = calculateDistance(
// 				pos.info.latitude,
// 				pos.info.longitude,
// 				nextPos.info.latitude,
// 				nextPos.info.longitude,
// 				'N'
// 			);
// 			total += parseFloat(distance);
// 			console.log(total);
// 		} else {
// 			return;
// 		}
// 	});
// 	if (flightEntry) {
// 		flightEntry.Distance = total;
// 	}
// 	return total;
// }
