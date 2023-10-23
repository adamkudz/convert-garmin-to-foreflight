import { route } from 'quasar/wrappers';
import spacetime from 'spacetime';
import daylight from 'spacetime-daylight';
spacetime.extend(daylight);
import { getWaypointInfo } from 'src/functions/getWaypointInfo';
import { getIndexes, getAptData } from 'src/functions/index';
import type { PapaReturnData, AptObj } from 'app/types/LogbookTypes';

export async function getFlightPositions(flights: PapaReturnData[]) {
	if (!flights) {
		return;
	}
	try {
		let positions = {};
		const { sIndex, eIndex, offIndex, onIndex } = getIndexes(flights);
		const start = await getAptData(flights, sIndex, 'start');
		const end = await getAptData(flights, eIndex, 'end');
		const { routeString, wpts } = getWaypointInfo(
			flights,
			offIndex,
			onIndex
		);

		positions = { ...positions, ...start, ...end, routeString, wpts };

		return positions;
	} catch (err) {
		return err;
	}
}
