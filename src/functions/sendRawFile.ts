export async function sendRawFile(rawFile: File) {
	try {
		const reader = new FileReader();
		const fileName = rawFile.name.split('.')[0];
		reader.readAsBinaryString(rawFile);

		reader.onload = async (evt) => {
			await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/log/events/new-flights/rawdata`,
				{
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'text/plain',
						charset: 'x-user-defined-binary',
						'x-file-name': fileName,
					},
					body: evt.target?.result,
				}
			);
		};
	} catch (err) {
		console.log('This is the catch error', err);
	}
}
