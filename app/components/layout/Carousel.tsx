import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  DimensionValue,
  FlatList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { PropType } from "CarouselType";
import useThemeStore from "@/utils/stores/usethemeProp";

export default function Carousel({
  children,
  height,
  onScroll,
  first,
}: PropType) {
  const testRef = useRef<FlatList<any>>(null);
  const [width, setWidth] = useState(100);
  const [page, setPage] = useState(0);
  const { theme } = useThemeStore();

  const handleScroll = useCallback(
    (e: any) => {
      const newPage = Math.floor(e.nativeEvent.contentOffset.x / (width - 20));
      if (newPage !== page && onScroll) {
        onScroll(newPage);
      }
      setPage(newPage);
    },
    [width, page, onScroll]
  );

  const styleInLine = {
    height: height as DimensionValue,
    width: width,
  } as StyleProp<ViewStyle>;

  const Renderor = ({ item }: { item: React.ReactNode }) => {
    return <View style={styleInLine}>{item}</View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={testRef}
        horizontal
        removeClippedSubviews
        disableIntervalMomentum
        data={children}
        overScrollMode="never"
        onScroll={handleScroll}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        keyExtractor={(_, index) => index.toString()}
        renderItem={Renderor}
        onLayout={(event) => {
          const { width: _width } = event.nativeEvent.layout;
          if (_width > 0 && _width !== width) {
            setWidth(_width);
            if (first) {
              setTimeout(() => {
                testRef.current?.scrollToOffset({
                  animated: false,
                  offset: _width * first,
                });
              }, 5);
            }
          }
        }}
        onScrollToIndexFailed={() => {}}
      />
      <View style={styles.indicatorContainer}>
        {Array.from(Array(children?.length).keys()).map((item) => (
          <View
            key={item}
            style={[
              styles.indicatorElement,
              {
                width: item === page ? 20 : 8,
                backgroundColor:
                  item === page ? theme.Main[400] : theme.Gray[100],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "70%",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 5,
  },
  indicatorElement: {
    height: 8,
    borderRadius: 10,
  },
});
