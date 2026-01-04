import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    title: "Fast Ordering",
    description:
      "Manage your restaurant orders with lightning speed and efficiency.",
    icon: "flash",
    color: "#16AB4C",
  },
  {
    id: "2",
    title: "Real-time Tracking",
    description:
      "Monitor your deliveries in real-time with our integrated map system.",
    icon: "map",
    color: "#16AB4C",
  },
  {
    id: "3",
    title: "Secure Payments",
    description: "Accept GCash, Cards, and Bank Transfers safely and easily.",
    icon: "shield-checkmark",
    color: "#16AB4C",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      (slidesRef.current as any).scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/login"); // Pupunta sa Login pag tapos na
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={100}
                  color={item.color}
                />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {/* Footer: Dots and Button */}
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 25, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === DATA.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  slide: { width, alignItems: "center", justifyContent: "center", padding: 40 },
  iconContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#F0FDF4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    height: height * 0.25,
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16AB4C",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#16AB4C",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
});
