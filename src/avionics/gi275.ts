import { Avionics } from 'app/types/GarminTypes';
import { defaultHeaders } from './defaultHeaders.mjs';

const headers = defaultHeaders;

const gi275: Avionics = {
	name: 'gi275',
	headers: defaultHeaders,
	hasEngInst: true,
	fileFilter: function (flights: File[]) {
		return flights.filter((_file) => _file.size >= 750000);
	},
};

export default gi275;
