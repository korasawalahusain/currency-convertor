import React, { useState } from "react";
import { countries } from "../constants";
import { FlatList, View } from "react-native";
import { CurrencyListItem, CurrencyListHeader } from "../components";

export default function CurrencyList({ route, navigation }) {
  const { setData } = route.params;
  const [searchValue, setSearchValue] = useState("");

  return (
    <View className="bg-black flex-1 pt-10">
      <CurrencyListHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <FlatList
        removeClippedSubviews={true}
        data={countries.filter(
          (country) =>
            country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            country.currency.code
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        )}
        renderItem={({ item, index }) => {
          return (
            <CurrencyListItem
              key={index}
              country={item}
              onCurrenyPicked={(code) => {
                setData(code);
                navigation.goBack();
              }}
            />
          );
        }}
        keyExtractor={(country) => country.id}
      />
    </View>
  );
}
