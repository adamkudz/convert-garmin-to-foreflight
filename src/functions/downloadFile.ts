// Makes converts the input to a Blob then makes it available for download

export const downloadFile = async function (
	csvFile: string,
	AircraftId: string,
	prefix: string,
	configName: string
) {
	const csvBlob = new Blob([csvFile], { type: 'text/csv' });
	const a = document.createElement('a');
	a.download = `${prefix}-${AircraftId}-${Date.now()}-${configName}.csv`;
	const url = URL.createObjectURL(csvBlob);
	a.href = url;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
