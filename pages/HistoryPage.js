import React from "react";
import { useRecoilState } from "recoil";
import { HistoryItem } from "../components";
import { historyState } from "../atoms/history";
import { Text, View, SectionList } from "react-native";

export default function HistoryPage() {
  const [historyList, setHistoryList] = useRecoilState(historyState);

  if (!historyList) {
    return null;
  }

  return (
    <SectionList
      sections={historyList}
      keyExtractor={(item, index) => index}
      stickySectionHeadersEnabled
      renderItem={({ item, index }) => {
        return <HistoryItem item={item} key={index} />;
      }}
      renderSectionHeader={({ section }) => (
        <View className="px-3 py-1 bg-black">
          <Text className="text-quinary font-futura_bold text-xl">
            {section.date}
          </Text>
        </View>
      )}
      removeClippedSubviews
    />
  );
}
