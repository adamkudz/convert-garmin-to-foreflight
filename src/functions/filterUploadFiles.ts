import type { Avionics } from 'app/types/GarminTypes';

export function filterUploadFiles(flights: File[], avionics: Avionics) {
	const relevantFiles = avionics.fileFilter(flights);
	console.log('relevantFiles: ', relevantFiles);

	const filtered = relevantFiles.filter((_flight) => {
		return (
			_flight.type === 'application/vnd.ms-excel' ||
			_flight.type === 'text/csv'
		);
	});

	return filtered;
}
