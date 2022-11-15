import { atom } from 'recoil';

export const convertorScreenState = atom({
	key: 'convertorScreen',
	default: {
		isActive: false,
		setActive: () => {},
		scrollTo: () => {},
	},
});
