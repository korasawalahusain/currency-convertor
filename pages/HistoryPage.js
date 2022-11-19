import React from "react";
import { useRecoilValue } from "recoil";
import Svg, { Path } from "react-native-svg";
import { historyState } from "../atoms/history";
import { SwipeableHistoryItem } from "../components";
import { Text, View, SectionList, Pressable } from "react-native";

export default function HistoryPage({ navigation }) {
  const historyList = useRecoilValue(historyState);

  return (
    <View className="flex-1 bg-black pt-6">
      {!historyList ? (
        <Text className="text-quinary mx-auto my-auto font-futura_bold text-3xl">
          No History Yet!
        </Text>
      ) : (
        <SectionList
          sections={historyList}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled
          className="bg-black"
          renderItem={({ item, index }) => {
            return <SwipeableHistoryItem item={item} key={index} />;
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
      )}

      <Pressable
        className="w-20 h-20 rounded-[40px] right-5 bottom-5 absolute bg-secondary items-center justify-center"
        onPress={() => navigation.navigate("Convertor")}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-7 h-7 text-quinary"
        >
          <Path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </Svg>
      </Pressable>
    </View>
  );
}
