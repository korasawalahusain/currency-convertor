import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

function CurrencyListItem({ country, onCurrenyPicked }) {
  return (
    <TouchableOpacity
      onPress={() => onCurrenyPicked(country)}
      className="w-full p-3"
    >
      <View className="flex flex-row w-full items-center">
        <Image
          source={{ uri: country.flag }}
          className="h-10 w-10 rounded-md"
        />
        <View className="flex flex-col justify-evenly ml-3">
          <Text className="font-futura_bold text-md text-quinary">
            {country.currency.code}
          </Text>
          <Text className="font-futura text-xs text-quinary">
            {country.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(CurrencyListItem);
