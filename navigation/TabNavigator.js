import { useRef, useState } from "react";
import { ConvertorPage } from "../pages";
import { Page, TabBar } from "../components";
import BottomSheet from "@gorhom/bottom-sheet";
import { Dimensions, ScrollView } from "react-native";
import { useAnimatedRef } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TabNavigationBar = ({ pages, tabs }) => {
  const convertPageRef = useRef();
  const scrollViewRef = useAnimatedRef();
  const [focusedIndex, setFocucedIndex] = useState(1);

  const tabbarIconPressed = (id) => {
    if (id === 3) {
      convertPageRef.current?.snapToIndex(0);
    } else if (id <= 2) {
      scrollViewRef.current.scrollTo({
        x: (id - 1) * SCREEN_WIDTH,
        animation: false,
      });
      setFocucedIndex(id);
    } else {
      scrollViewRef.current.scrollTo({
        x: (id - 2) * SCREEN_WIDTH,
        animation: false,
      });
      setFocucedIndex(id);
    }
  };

  return (
    <>
      <ScrollView
        className="flex-1"
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page) => {
          return <Page key={page.id}>{page.compoment}</Page>;
        })}
      </ScrollView>
      <TabBar
        tabs={tabs}
        focusedIndex={focusedIndex}
        onButtonPress={tabbarIconPressed}
      />
      <BottomSheet
        index={-1}
        ref={convertPageRef}
        snapPoints={["100%"]}
        animationConfigs={{ damping: 50 }}
        backgroundStyle={{ backgroundColor: "#8eb991" }}
      >
        <ConvertorPage onClose={() => convertPageRef.current?.close()} />
      </BottomSheet>
    </>
  );
};

export default TabNavigationBar;
