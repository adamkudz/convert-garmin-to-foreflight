import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function getAirports(
	req: VercelRequest,
	res: VercelResponse
) {
	const uri = `${process.env.MONGODB_URI}`;
	const client = new MongoClient(uri);
	const db = client.db('airportdb');
	const slon = parseFloat(req.query.slon as string);
	const slat = parseFloat(req.query.slat as string);
	const elon = parseFloat(req.query.elon as string);
	const elat = parseFloat(req.query.elat as string);

	try {
		const sApt = await db.collection('geoairports').findOne({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [slon, slat],
					},
					$maxDistance: 5000,
				},
			},
		});
		const eApt = await db.collection('geoairports').findOne({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [elon, elat],
					},
					$maxDistance: 5000,
				},
			},
		});
		if (sApt && eApt)
			res.status(200).json({
				airports: { start: sApt.ident, end: eApt.ident },
			});
	} catch (err) {
		console.log(err);
	}
}
