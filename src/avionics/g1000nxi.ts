const g1000nxi = {
	hasEngInst: true,
	fileFilter: function (flights: File[]) {
		return flights.filter(
			(_file) => !_file.name.includes('____') && _file.size >= 750000
		);
	},
};

export default g1000nxi;
