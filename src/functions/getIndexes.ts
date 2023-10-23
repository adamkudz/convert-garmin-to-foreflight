import { PapaReturnData } from 'app/types/LogbookTypes';

export function getIndexes(flight: PapaReturnData[]): {
	sIndex: number;
	offIndex: number;
	onIndex: number;
	eIndex: number;
} {
	const sIndex = flight.findIndex((r: PapaReturnData) => r.latitude > 0); // GPS is powered on
	const offIndex = flight.findIndex((r) => r.ias > 50); // Airspeed > 50kts
	const onIndex = flight.findLastIndex((r) => r.ias > 50); // Airspeed > 50kts
	const eIndex = flight.findLastIndex(
		(r) => r.latitude > 0 && r.longitude !== undefined
	); //
	return { sIndex, offIndex, onIndex, eIndex };
}
