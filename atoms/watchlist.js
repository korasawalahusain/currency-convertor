import { atom } from 'recoil';

export const watchlistState = atom({
	key: 'watchlist',
	default: [
		{
			to: '',
			from: '',
			count: '',
		},
	],
});
