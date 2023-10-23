import { avif } from '@cloudinary/url-gen/qualifiers/format';
import { Avionics } from 'app/types/GarminTypes';
import Papa from 'papaparse';

import g1000nxi from 'src/avionics/g1000nxi';
import gi275 from 'src/avionics/gi275';
import { useAircraftStore } from 'src/stores/AircraftStore';

export async function getAvionicsType(
	files: File[]
): Promise<Avionics | undefined> {
	const results: Promise<Avionics | undefined> = new Promise(
		(resolve, reject) => {
			Papa.parse(files[0], {
				preview: 1,
				complete: function (results) {
					if (results.errors.length > 0) {
						console.log(results.errors[0].message);
						reject(results.errors[0].message);
					}
					const resultsData = results.data[0] as string[];
					console.log('resultsData: ', resultsData);
					let airframeName = resultsData.find((item) =>
						item.includes('airframe_name')
					);
					let product = resultsData.find((item) =>
						item.includes('Product')
					);

					airframeName = airframeName
						?.replaceAll('"', '')
						.split('=')[1]
						.toLowerCase()
						.replace(' ', '')
						.replaceAll('"', '');
					// if (airframeName === undefined || airframeName === '') {
					// 	airframeName = undefined;
					// }
					product = product
						?.replaceAll('"', '')
						.split('=')[1]
						.toLowerCase()
						.replace(' ', '');

					let avionics: Avionics | undefined;

					if (
						airframeName?.includes('socata') ||
						airframeName?.includes('garminflight')
					) {
						avionics = g1000nxi;
					}
					if (product?.includes('gi275')) {
						avionics = gi275;
					}

					resolve(avionics as Avionics);
				},
			});
		}
	);
	return results;
}
