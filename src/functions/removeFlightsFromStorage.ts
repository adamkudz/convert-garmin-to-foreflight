import { api } from 'src/boot/axios';

export async function removeFlightsFromStorage(flights: any) {
	try {
		const response = await api.post('/storage/removeflights', {
			flights: flights,
		});
		return response;
	} catch (err) {
		console.log(err);
	}
}
