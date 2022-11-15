import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export default function ChartPage({ to, from }) {
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
    (async () => {
      await loadData(5);
    })();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
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
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>

      <View className="w=full flex flex-row justify-evenly py-3">
        {dArray.map((d, index) => (
          <Pressable
            key={index}
            onPress={async () => {
              setSelectedIndex(index);
              await loadData(d);
            }}
            className={`${
              selectedIndex === index
                ? "bg-[#FFF] text-black"
                : "bg-grey text-quinary"
            } p-2 rounded-md`}
          >
            <Text className="font-futura">{d}d</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
