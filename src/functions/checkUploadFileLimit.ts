export function checkUploadFileLimit(
	flights: File[],
	currentFlights: number,
	isSubscribed: boolean
) {
	if (!isSubscribed && flights.length + currentFlights > 15) {
		return flights.slice(0, 15 - currentFlights);
	}
	return flights;
}
