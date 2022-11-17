import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function ChartPage({ route, navigation }) {
  const { to, from } = route.params;
  const [data, setData] = useState(null);
  const dArray = [5, 10, 15, 20, 25, 30];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loadData = async (d) => {
    setData(null);

    const response = await fetch(
      `https://api.exchangerate.host/timeseries?start_date=${
        new Date(new Date().setDate(new Date().getDate() - (d - 1)))
          .toISOString()
          .split("T")[0]
      }&end_date=${
        new Date().toISOString().split("T")[0]
      }&base=${from}&symbols=${to}`
    );

    const responseJson = await response.json();
    setData(responseJson.rates);
  };

  const labelsArray = (labels) => {
    if (labels.length === 5) {
      return labels;
    }

    return labels.filter((label, index) => index % 2 === 0);
  };

  useEffect(() => {
    loadData(5);
  }, []);

  return (
    <View className="flex-1 bg-black">
      <View className="flex flex-row w-full pt-12 px-4 justify-between">
        <View className="flex flex-row items-center space-x-3">
          <Text className="font-futura_bold text-lg text-quinary">{to}</Text>
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
          <Text className="font-futura_bold text-lg text-quinary">{from}</Text>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </Svg>
        </Pressable>
      </View>

      <View className="flex-1 justify-center">
        {data !== null ? (
          <LineChart
            data={{
              labels: labelsArray(
                Object.keys(data).map((date) => date.split("-")[2])
              ),
              datasets: [
                {
                  data: Object.values(data).map((value) => value[to]),
                  strokeWidth: 4,
                  withScrollableDot: true,
                  withDots: false,
                  color: () => "#FFFFFF",
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "6",
                fill: "white",
              },
            }}
            bezier
            transparent
            withShadow={false}
            withVerticalLines={false}
            withHorizontalLines={false}
          />
        ) : (
          <View className="h-[220px] items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )}

        <View className="w=full flex flex-row justify-between p-4">
          {dArray.map((d, index) => (
            <Pressable
              key={index}
              onPress={async () => {
                setSelectedIndex(index);
                await loadData(d);
              }}
              className={`${
                selectedIndex === index ? "bg-[#FFF]" : "bg-grey "
              } p-2 rounded-md`}
            >
              <Text
                className={`${
                  selectedIndex === index ? "text-black" : " text-quinary"
                } font-futura`}
              >
                {d}d
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
