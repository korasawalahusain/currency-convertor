import Animated, {
	withTiming,
	Extrapolate,
	interpolate,
	useSharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';

const BottomSheet = forwardRef(({ type = 'component', children }, ref) => {
	const translateY = useSharedValue(0);
	const active = useSharedValue(false);
	const context = useSharedValue({ y: 0 });

	const { height: SCREEN_HEIGHT } = Dimensions.get('window');
	const MAX_TRANSLATE_Y =
		type === 'screen'
			? -SCREEN_HEIGHT - 50
			: -SCREEN_HEIGHT - Constants.statusBarHeight;
	const INITIAL_SCROLL_POSITION = type === 'screen' ? MAX_TRANSLATE_Y : -650;

	const scrollTo = useCallback((destination) => {
		'worklet';
		active.value = destination !== 0;
		translateY.value = withTiming(destination, {
			duration: 1000,
		});
	}, []);

	const isActive = useCallback(() => {
		return active.value;
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			scrollTo,
			isActive,
		}),
		[scrollTo, isActive]
	);

	const panGesture = Gesture.Pan()
		.onStart(() => {
			context.value = {
				y: translateY.value,
			};
		})
		.onUpdate((event) => {
			translateY.value = event.translationY + context.value.y;
			if (type === 'screen' && translateY.value > MAX_TRANSLATE_Y) {
				translateY.value = MAX_TRANSLATE_Y;
			} else {
				translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
			}
		})
		.onEnd(() => {
			if (translateY.value > INITIAL_SCROLL_POSITION) {
				scrollTo(0);
			} else if (translateY.value < -SCREEN_HEIGHT / 2) {
				scrollTo(MAX_TRANSLATE_Y);
			}
		});

	const animatedButtomSheetStyle = useAnimatedStyle(() => {
		const borderRadius = interpolate(
			translateY.value,
			[MAX_TRANSLATE_Y + 300, MAX_TRANSLATE_Y],
			[25, 0],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ translateY: translateY.value }],
			borderRadius,
		};
	});

	if (type === 'screen') {
		return (
			<GestureDetector gesture={panGesture}>
				<Animated.View
					className={`absolute w-full bg-quaternary`}
					style={[
						{
							top: SCREEN_HEIGHT + 50,
							height: SCREEN_HEIGHT + 50,
							borderRadius: 25,
						},
						animatedButtomSheetStyle,
					]}>
					{children}
				</Animated.View>
			</GestureDetector>
		);
	} else {
		return (
			<Animated.View
				className={`absolute w-full bg-black`}
				style={[
					{
						top: SCREEN_HEIGHT + 50,
						height: SCREEN_HEIGHT + 50,
						borderRadius: 25,
					},
					animatedButtomSheetStyle,
				]}>
				<GestureDetector gesture={panGesture}>
					<View className="w-full py-4">
						<View className="w-[75px] h-[4px] bg-quinary opacity-50 self-center rounded-md" />
					</View>
				</GestureDetector>
				{children}
			</Animated.View>
		);
	}
});

export default BottomSheet;
