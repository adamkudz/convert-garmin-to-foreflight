import { ref } from 'vue';

export function acTypeSwitch(acModel) {
	const acType = ref('');

	switch (acModel) {
		case 'TBM 700 A':
		case 'TBM 700 B':
		case 'TBM 700 C2':
			acType.value = 'TBM7';
			break;
		case 'TBM 850':
			acType.value = 'TBM8';
			break;
		case 'TBM 900':
		case 'TBM 910':
		case 'TBM 930':
		case 'TBM 940':
		case 'TBM 960':
			acType.value = 'TBM9';
			break;
	}

	return { acType };
}
