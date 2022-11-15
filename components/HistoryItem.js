import React from 'react';
import Animated, {
	withTiming,
	interpolate,
	Extrapolate,
	useSharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { View, Text, Image, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 72.8;
const MAX_LEFT_SCROLL = -SCREEN_WIDTH * 0.35;

function HistoryItem({ item }) {
	const translateX = useSharedValue(0);
	const itemHeight = useSharedValue(ITEM_HEIGHT);

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			translateX.value = event.translationX;
			if (translateX.value > 0) {
				translateX.value = 0;
			}
		})
		.onEnd(() => {
			if (translateX.value < MAX_LEFT_SCROLL) {
				translateX.value = withTiming(-SCREEN_WIDTH);
				itemHeight.value = withTiming(0);
			} else {
				translateX.value = withTiming(0);
			}
		})
		.minDistance(10)
		.failOffsetY([-10, 10]);

	const animatedIconStyle = useAnimatedStyle(() => {
		const opacity = withTiming(translateX.value > MAX_LEFT_SCROLL ? 0 : 1);
		return {
			opacity,
		};
	});

	const animatedHeightStyle = useAnimatedStyle(() => ({
		height: itemHeight.value,
	}));

	const animatedItemStyle = useAnimatedStyle(() => {
		const borderRadius = interpolate(
			translateX.value,
			[0, MAX_LEFT_SCROLL],
			[0, 5],
			Extrapolate.CLAMP
		);

		return {
			transform: [
				{
					translateX: translateX.value,
				},
			],
			borderRadius,
		};
	});

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View className="w-full" style={[animatedHeightStyle]}>
				<View className="absolute w-full h-full px-6 bg-quinary2 flex flex-row justify-end items-center">
					<Animated.View style={[animatedIconStyle]}>
						<Svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 text-quinary">
							<Path
								fill-rule="evenodd"
								d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
								clip-rule="evenodd"
							/>
						</Svg>
					</Animated.View>
				</View>

				<Animated.View className="w-full bg-black" style={animatedItemStyle}>
					<View className="flex flex-row w-full p-3 justify-between">
						<View className="flex flex-row items-center space-x-3">
							<View className="flex flex-row items-center">
								<Image
									source={{ uri: item.to.flag }}
									className="h-10 w-10 rounded-md"
								/>
								<View className="flex flex-col justify-evenly ml-2">
									<Text className="font-futura_bold text-lg text-quinary">
										{item.to.currency.code}
									</Text>
								</View>
							</View>
							<Svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5 text-quinary rotate-90">
								<Path
									fill-rule="evenodd"
									d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
									clip-rule="evenodd"
								/>
							</Svg>
							<View className="flex flex-row items-center">
								<Image
									source={{ uri: item.from.flag }}
									className="h-10 w-10 rounded-md"
								/>
								<View className="flex flex-col justify-evenly ml-2">
									<Text className="font-futura_bold text-lg text-quinary">
										{item.from.currency.code}
									</Text>
								</View>
							</View>
						</View>
						<View className="flex flex-col items-end">
							<Text className="font-futura_bold text-quinary text-lg">
								{item.from.currency.symbol} {item.fromValue}
							</Text>
							<Text className="font-futura text-quinary text-xs">
								{item.to.currency.symbol} {item.toValue}
							</Text>
						</View>
					</View>
				</Animated.View>
			</Animated.View>
		</GestureDetector>
	);
}

export default React.memo(HistoryItem);
