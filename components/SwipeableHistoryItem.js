import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  I18nManager,
} from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const AnimatedView = Animated.createAnimatedComponent(View);

function SwipeableHistoryItem({ item }) {
  const renderLeftActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <RectButton
        className={`flex-1 bg-quaternary2 justify-end items-center ${
          I18nManager.isRTL ? "flex-row" : "flex-row-reverse"
        }`}
        onPress={close}
      >
        <AnimatedView
          style={{ transform: [{ scale }] }}
          className="w-6 h-6 mx-5"
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-full h-full text-quinary"
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </Svg>
        </AnimatedView>
      </RectButton>
    );
  };

  const renderRightActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <RectButton
        className={`flex-1 bg-quinary2 justify-end items-center ${
          I18nManager.isRTL ? "flex-row-reverse" : "flex-row"
        }`}
        onPress={close}
      >
        <AnimatedView
          style={{ transform: [{ scale }] }}
          className="w-6 h-6 mx-5"
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-full h-full text-quinary"
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </Svg>
        </AnimatedView>
      </RectButton>
    );
  };

  let swipeableRow = null;

  const updateRef = (ref) => {
    swipeableRow = ref;
  };

  const close = () => {
    swipeableRow?.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={100}
      enableTrackpadTwoFingerGesture
      rightThreshold={100}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      shouldCancelWhenOutside
    >
      <View className="w-full bg-black">
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
              className="w-5 h-5 text-quinary rotate-90"
            >
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
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: "plum",
    height: 20,
  },
});

export default React.memo(SwipeableHistoryItem);
