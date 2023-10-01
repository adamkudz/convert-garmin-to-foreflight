import spacetime from 'spacetime';
import daylight from 'spacetime-daylight';
spacetime.extend(daylight);
import { getWaypointInfo } from 'src/functions/getWaypointInfo';
import { getIndexes, getAptData } from 'src/functions/index';

export async function getFlightPositions(flight) {
	if (!flight) {
		return;
	}
	try {
		let positions = {};
		const { sIndex, eIndex, offIndex, onIndex } = getIndexes(flight);
		let start = await getAptData(flight, sIndex, 'start');
		let end = await getAptData(flight, eIndex, 'end');
		let { routeString, wpts } = getWaypointInfo(flight, offIndex, onIndex);
		positions = { ...positions, ...start, ...end, routeString, wpts };

		return positions;
		// calculateFinalData(flightObj, AircraftID);
	} catch (err) {
		return err;
	}
}
