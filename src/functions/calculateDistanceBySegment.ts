import { calculateDistance } from './calculateDistance';
import { FlightEntry, Position } from 'app/types/LogbookTypes';

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
	return total;
}
