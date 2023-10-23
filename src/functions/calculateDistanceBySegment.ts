import { calculateDistance } from './calculateDistance';
import { FlightEntry, PapaReturnData, Position } from 'app/types/LogbookTypes';

export function calculateDistanceBySegment(flightEntry: FlightEntry) {
	let total = 0;
	if (flightEntry === undefined || flightEntry.positionData.length === 0)
		return 0;
	flightEntry.positionData.forEach(
		(pos: Position, index: number, array: Position[]) => {
			if (index === array.length - 1) return;
			if (pos.positionInfo === undefined) return;
			const distance = calculateDistance(
				pos.positionInfo.latitude,
				pos.positionInfo.longitude,
				array[index + 1].positionInfo.latitude,
				array[index + 1].positionInfo.longitude,
				'N'
			);

			if (!isNaN(distance)) total += distance;
		}
	);
	return Math.round(total);
}

export function calculateDistanceWithoutWaypoints(
	flightData: PapaReturnData[]
) {
	let total = 0;
	const previous = { latitude: 0, longitude: 0, track: 0 };
	for (let i = 0; i < flightData.length; i++) {
		if (i === flightData.length - 1) return Math.round(total);
		if (
			flightData[i].latitude === undefined ||
			flightData[i].latitude === null ||
			flightData[i].longitude === undefined ||
			flightData[i].longitude === null
		)
			continue;
		if (i % 15 !== 0) continue;
		if (previous.latitude === 0 && previous.longitude === 0) {
			previous.latitude = flightData[i].latitude;
			previous.longitude = flightData[i].longitude;
			previous.track = flightData[i].trk as number;
			continue;
		}

		const distance = calculateDistance(
			previous.latitude,
			previous.longitude,
			flightData[i].latitude,
			flightData[i].longitude,
			'N'
		);

		previous.latitude = flightData[i].latitude;
		previous.longitude = flightData[i].longitude;
		previous.track = flightData[i].trk as number;
		if (!isNaN(distance)) {
			total += distance;
		}
	}
}
