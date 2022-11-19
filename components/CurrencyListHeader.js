import React from "react";
import Svg, { Path } from "react-native-svg";
import { TextInput, View } from "react-native";

export default function CurrencyListHeader({ searchValue, setSearchValue }) {
  return (
    <View className="w-full px-3 py-2 sticky top-0">
      <View className="flex flex-row items-center bg-[#303030] rounded-md py-1.5 px-3">
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-quinary"
        >
          <Path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </Svg>

        <TextInput
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
          style={{
            height: "100%",
            width: "100%",
            marginLeft: 8,
            fontFamily: "Futura",
            color: "white",
            fontSize: 16,
          }}
          placeholder="Search"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </View>
    </View>
  );
}
