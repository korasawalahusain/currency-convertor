import {
  ChartPage,
  HistoryPage,
  ConvertorPage,
  CurrencyListPage,
} from "./pages";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";
import useLoadAssets from "./helpers/LoadAssets";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";

preventAutoHideAsync();

const fonts = {
  Futura: require("./assets/fonts/futura/Futura.ttf"),
  FuturaBold: require("./assets/fonts/futura/FuturaBold.ttf"),
};

export default function App() {
  const [assetsLoaded] = useLoadAssets([], fonts);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (assetsLoaded) {
        await hideAsync();
      }
    };

    hideSplashScreen();
  }, [assetsLoaded]);

  if (!assetsLoaded) {
    return null;
  }
  const RootStack = createStackNavigator();

  return (
    <RecoilRoot>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="History"
        >
          <RootStack.Screen name="History" component={HistoryPage} />
          <RootStack.Screen
            name="Convertor"
            component={ConvertorPage}
            options={{
              presentation: "modal",
              gestureEnabled: true,
              gestureDirection: "vertical",
            }}
          />
          <RootStack.Screen
            name="Chart"
            component={ChartPage}
            options={{
              presentation: "modal",
              gestureEnabled: true,
              gestureDirection: "vertical",
            }}
          />
          <RootStack.Screen
            name="CurrencyList"
            component={CurrencyListPage}
            options={{
              presentation: "modal",
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
