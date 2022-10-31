import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-black">
			<Text className="text-white">Hello World!</Text>
			<StatusBar style="auto" />
		</View>
	);
}
