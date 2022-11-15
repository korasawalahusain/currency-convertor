import React from 'react';
import TabbarIcon from './TabbarIcon';
import { Pressable, View } from 'react-native';

export default function TabBar({ tabs, onButtonPress, focusedIndex }) {
	return (
		<View className="bg-black">
			<View className="bg-grey h-[80] rounded-t-3xl flex flex-row items-center">
				{tabs.map(({ id, name }, index) => {
					const isFocused = focusedIndex === id;

					return (
						<Pressable
							key={index}
							className={`w-1/5 h-full items-center justify-center ${
								name === 'Convertor' &&
								'-top-10 rounded-full border-8 border-black bg-secondary'
							} `}
							onPress={() => onButtonPress(id)}>
							<TabbarIcon isFocused={isFocused} name={name} />
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
