import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
	cloud: {
		cloudName: 'adamkudz',
		apiKey: process.env.VITE_CLOUDINARY_API_KEY,
		apiSecret: process.env.VITE_CLOUDINARY_SECRET,
	},
});

export { cld };
