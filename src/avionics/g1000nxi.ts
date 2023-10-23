import { Avionics } from 'app/types/GarminTypes';
import { defaultHeaders } from './defaultHeaders.mjs';

const g1000nxi: Avionics = {
	name: 'G1000 NXi',
	headers: defaultHeaders,
	hasEngInst: true,
	fileFilter: function (flights: File[]) {
		return flights.filter(
			(_file) => !_file.name.includes('____') && _file.size >= 750000
		);
	},
};

export default g1000nxi;
