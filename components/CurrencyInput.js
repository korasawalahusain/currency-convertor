import React from "react";
import { Svg, Path } from "react-native-svg";
import { BaseButton } from "react-native-gesture-handler";
import { View, Text, TextInput, Image } from "react-native";

const CurrencyInput = ({
  type,
  value,
  country,
  focusOn,
  onFocus,
  conversionRate,
  openCurrenyPicker,
}) => {
  return (
    <View
      className={`flex-1  border-[3px] ${
        focusOn === type ? "border-black" : "border-[transparent]"
      } p-5 rounded-sm`}
    >
      <View className="flex flex-row w-full h-14">
        <View className="w-14 h-full bg-black items-center justify-center rounded-sm">
          <Image
            source={{ uri: country?.flag }}
            className="h-3/5 w-3/5 rounded-sm"
          />
        </View>
        <View className="flex flex-col justify-around ml-3">
          <BaseButton
            onPress={openCurrenyPicker}
            className="flex flex-row items-center justify-between"
          >
            <Text className="font-futura text-lg">
              {country?.currency.code ?? "xxx"}
            </Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-black"
            >
              <Path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
              />
            </Svg>
          </BaseButton>
          <Text className="font-futura text-xs">
            1{country?.currency.code ?? "xxx"} = {conversionRate ?? "xxx"}
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="xxx.xxx"
        className="font-futura text-3xl w-full h-12 mt-2.5"
        showSoftInputOnFocus={false}
        cursorColor="#000"
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
