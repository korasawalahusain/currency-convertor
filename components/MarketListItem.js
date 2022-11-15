import { View, Text } from "react-native";
import React from "react";

export default function MarketListItem({ item }) {
  return (
    <View className="w-full bg-black" style={animatedItemStyle}>
      <View className="flex flex-row w-full p-3 justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: item.country.flag }}
            className="h-10 w-10 rounded-md"
          />
          <View className="flex flex-col justify-evenly ml-2">
            <Text className="font-futura_bold text-lg text-quinary">
              {item.country.currency.code}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-end">
          <Text className="font-futura_bold text-quinary text-lg">
            {item.percetage}
          </Text>
          <Text className="font-futura text-quinary text-xs">{item.value}</Text>
        </View>
      </View>
    </View>
  );
}
