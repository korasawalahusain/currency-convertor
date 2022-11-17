import React from "react";
import { COUNTRY_CODES } from "../constants";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";

const CurrencyInput = ({
  type,
  value,
  onFocus,
  focusOn,
  currency,
  setCurrency,
  conversionRate,
}) => {
  return (
    <View
      className={`flex-1  border-[3px] ${
        focusOn === type ? "border-black" : "border-[transparent]"
      } rounded-3xl p-5`}
    >
      <View className="flex flex-row w-full h-14">
        <View className="flex flex-col justify-around relative w-1/2">
          <Picker
            selectedValue={currency}
            onValueChange={(itemValue, itemIndex) => setCurrency(itemIndex)}
          >
            {COUNTRY_CODES.map((code, index) => (
              <Picker.Item
                style={{ fontFamily: "Futura", fontSize: 20 }}
                label={`${code}`}
                value={`${code}`}
                key={index}
              />
            ))}
          </Picker>
          <Text className="font-futura text-xs">
            1{currency ?? "xxx"} = {conversionRate ?? "xxx"}
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="xxx.xxx"
        className="font-futura text-3xl w-full h-12 mt-2.5"
        showSoftInputOnFocus={false}
        onFocus={onFocus}
        value={value}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
    </View>
  );
};

export default CurrencyInput;
