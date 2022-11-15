import React from 'react';
import Constants from 'expo-constants';
import { Dimensions, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const Page = ({ children }) => {
	return (
		<View
			className="bg-black"
			style={{
				height: '100%',
				width: SCREEN_WIDTH,
				paddingTop: STATUS_BAR_HEIGHT,
			}}>
			{children}
		</View>
	);
};

export default Page;
