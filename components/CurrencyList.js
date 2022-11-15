import React, { useState } from "react";
import CurrencyListItem from "./CurrencyListItem";
import CurrencyListHeader from "./CurrencyListHeader";
import countries from "../assets/data/countries.json";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function CurrencyList({ onCurrenyPicked }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <CurrencyListHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <BottomSheetFlatList
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
              onCurrenyPicked={onCurrenyPicked}
            />
          );
        }}
        keyExtractor={(country) => country.id}
      />
    </>
  );
}
