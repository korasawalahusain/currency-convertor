import React from 'react';
import Animated, {
	measure,
	runOnJS,
	withTiming,
	useSharedValue,
	useAnimatedRef,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics';

export default function RippleButton({ onTap, text, className }) {
	const centerX = useSharedValue(0);
	const centerY = useSharedValue(0);
	const scale = useSharedValue(0);

	const width = useSharedValue(0);
	const height = useSharedValue(0);

	const rippleOpacity = useSharedValue(1);
	const aRef = useAnimatedRef();

	const tapGesture = Gesture.Tap()
		.onStart((event) => {
			runOnJS(notificationAsync)(NotificationFeedbackType.Success);
			centerX.value = event.x;
			centerY.value = event.y;

			const measurments = measure(aRef);

			width.value = measurments.width;
			height.value = measurments.height;

			rippleOpacity.value = 1;

			scale.value = 0;
			scale.value = withTiming(1, { duration: 500 });
		})
		.onEnd(() => {
			rippleOpacity.value = withTiming(0, { duration: 500 });
			if (onTap) runOnJS(onTap)();
		});
	const rippleStyle = useAnimatedStyle(() => {
		const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
		const translateX = centerX.value - circleRadius;
		const translateY = centerY.value - circleRadius;

		return {
			height: circleRadius * 2,
			width: circleRadius * 2,
			borderRadius: circleRadius,
			backgroundColor: 'rgba(0,0,0,0.2)',
			opacity: rippleOpacity.value,
			position: 'absolute',
			transform: [
				{ translateX },
				{ translateY },
				{
					scale: scale.value,
				},
			],
		};
	});

	return (
		<GestureDetector gesture={tapGesture}>
			<View className="flex-1 overflow-hidden bg-quaternary2 rounded-[60px]">
				<Animated.View
					ref={aRef}
					className="flex-1 items-center justify-center">
					<Text className="font-futura text-[30px]">{text}</Text>
				</Animated.View>
				<Animated.View style={rippleStyle}></Animated.View>
			</View>
		</GestureDetector>
	);
}
