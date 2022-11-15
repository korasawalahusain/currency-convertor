import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { PAGES, TABES } from "./constants";
import { StatusBar } from "expo-status-bar";
import useLoadAssets from "./helpers/LoadAssets";
import TabNavigationBar from "./navigation/TabNavigator";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setVisibilityAsync, useVisibility } from "expo-navigation-bar";

preventAutoHideAsync();

const fonts = {
  Futura: require("./assets/fonts/futura/Futura.ttf"),
  FuturaBold: require("./assets/fonts/futura/FuturaBold.ttf"),
};

export default function App() {
  const visibility = useVisibility();
  const [assetsLoaded] = useLoadAssets([], fonts);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (assetsLoaded) {
        await hideAsync();
      }
    };

    hideSplashScreen();
  }, [assetsLoaded]);

  useEffect(() => {
    const setNavBarVisibility = async () => {
      await setVisibilityAsync("hidden");
    };

    setNavBarVisibility();
  }, [visibility]);

  if (!assetsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <GestureHandlerRootView className="flex-1">
        <StatusBar style="light" />
        <TabNavigationBar tabs={TABES} pages={PAGES} />
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
