import { atom } from 'recoil';

export const conversionRates = atom({
	key: 'conversionRates',
	default: [
		{
			id: '',
			to: '',
			from: '',
			rate: '',
		},
	],
});
