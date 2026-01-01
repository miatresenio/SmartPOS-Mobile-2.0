import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NonVegIcon from "./icon/MeatIcon"; // Siguraduhing tama ang path papunta sa MeatIcon mo

const { width } = Dimensions.get("window");
const cardWidth = (width - 50) / 2;

const imageMap: { [key: string]: any } = {
  "salad.png": require("../assets/images/salad.png"),
  "burger.png": require("../assets/images/burger.png"),
  "tacos.png": require("../assets/images/tacos.png"),
  "orange_juice.png": require("../assets/images/orange_juice.png"),
  "burger_fries.png": require("../assets/images/burger_fries.png"),
  "sushi.png": require("../assets/images/sushi.png"),
};

const ProductCard = ({ item, isActive }: any) => {
  return (
    <View
      style={[styles.card, isActive ? styles.activeCard : styles.inactiveCard]}
    >
      <Image
        source={imageMap[item.image]}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>

          {/* Dito ang logic para sa Meat Icon vs Leaf Icon */}
          <View
            style={[
              styles.tag,
              { backgroundColor: item.type === "Veg" ? "#F0F9F1" : "#FFF0F0" },
            ]}
          >
            {item.type === "Veg" ? (
              <Ionicons name="leaf" size={10} color="#4CAF50" />
            ) : (
              <NonVegIcon />
            )}
            <Text
              style={[
                styles.tagText,
                { color: item.type === "Veg" ? "#4CAF50" : "#FF5252" },
              ]}
            >
              {item.type}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  activeCard: {
    borderColor: "#4CAF50",
  },
  inactiveCard: {
    borderColor: "transparent",
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
  },
  info: { width: "100%" },
  name: { fontSize: 13, fontWeight: "600", color: "#1E1E1E", height: 38 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  price: { fontSize: 15, fontWeight: "700", color: "#4CAF50" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: { fontSize: 10, fontWeight: "700" },
  addButton: {
    backgroundColor: "#E8F5E9",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: { color: "#4CAF50", fontSize: 12, fontWeight: "700" },
});

export default ProductCard;
