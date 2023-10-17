export function filterUploadFiles(
	flights: File[],
	filterFunction?: (flights: File[]) => File[]
) {
	console.log(flights[0].type);
	let relevantFiles;

	if (!filterFunction) {
		relevantFiles = flights.filter(
			(_file) => !_file.name.includes('____') && _file.size >= 750000
		);
	} else {
		relevantFiles = filterFunction(flights);
	}

	const filtered = relevantFiles.filter((_flight) => {
		return (
			_flight.type === 'application/vnd.ms-excel' ||
			_flight.type === 'text/csv'
		);
	});

	return filtered;
}
