import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function getAirports(
	req: VercelRequest,
	res: VercelResponse
) {
	const uri = `${process.env.MONGODB_URI}`;
	const client = new MongoClient(uri);
	const db = client.db('airportdb');

	try {
		const sApt = await db.collection('geoairports').findOne({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [req.body.lon, req.body.lat],
					},
					$maxDistance: 5000,
				},
			},
		});

		res.status(200).send({ airports: { start: sApt } });
	} catch (err) {
		console.log(err);
	}
}
