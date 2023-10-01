export function filterUploadFiles(flights: File[]) {
	console.log(flights[0].type);
	const relevantFiles = flights.filter(
		(_file) => !_file.name.includes('____') && _file.size >= 750000
	);
	const filtered = relevantFiles.filter((_flight) => {
		return (
			_flight.type === 'application/vnd.ms-excel' ||
			_flight.type === 'text/csv'
		);
	});

	return filtered;
}
