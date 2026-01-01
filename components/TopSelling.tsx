import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

const TOP_SELLING_DATA = [
  {
    id: "1",
    name: "Fresh Garden Salad",
    description:
      "A refreshing salad packed with leafy greens and crunchy veggies.",
    image: require("../assets/images/salad.png"),
  },
  {
    id: "2",
    name: "Original Cheese Burger",
    description:
      "Juicy beef patty with melted cheese and fresh fries on the side.",
    image: require("../assets/images/burger.png"),
  },
  {
    id: "3",
    name: "Meat Sushi Maki",
    description: "Premium tuna and shrimp rolls with a signature sauce.",
    image: require("../assets/images/sushi.png"),
  },
];

const TopSelling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto-slide logic every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex =
        currentIndex === TOP_SELLING_DATA.length - 1 ? 0 : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }: { item: (typeof TOP_SELLING_DATA)[0] }) => (
    <View style={styles.card}>
      {/* Left Side: Image */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      {/* Right Side: Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.topLabel}>TOP SELLING</Text>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={3}>
          {item.description}
        </Text>

        {/* Pagination dots inside the card info area */}
        <View style={styles.pagination}>
          {TOP_SELLING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={TOP_SELLING_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={CARD_WIDTH + 20} // Width + margin
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 160,
    // backgroundColor: "#E8F5E9", // Very Light Green Background
    backgroundColor: "#FFF", // Very Light Green Background
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginRight: 20, // Space between cards
    alignItems: "center",
  },
  imageContainer: {
    width: "35%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  topLabel: {
    color: "#16AB4C", // SmartPOS Green
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  itemName: {
    color: "#1E1E1E",
    fontSize: 18,
    fontWeight: "800",
  },
  itemDescription: {
    color: "#666",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 5,
    fontWeight: "400",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 12,
  },
  dot: {
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  activeDot: {
    width: 15,
    backgroundColor: "#16AB4C",
  },
  inactiveDot: {
    width: 5,
    backgroundColor: "rgba(22, 171, 76, 0.2)",
  },
});

export default TopSelling;
