import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../types/colors";
import SoupIcon from "./icon/SoupIcon";
import PastaIcon from "./icon/PastaIcon";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState("1");

  // Logic para sa dynamic icons (Custom SVG vs Ionicons)
  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? "#FFFFFF" : "#4CAF50";

    // Check kung Soup Custom
    if (iconName === "soup-custom") {
      return <SoupIcon stroke={color} width={18} height={18} />;
    }

    // Check kung Pasta Custom
    if (iconName === "pasta-custom") {
      return <PastaIcon fill={color} width={18} height={18} />;
    }

    // Default: Gamit Ionicons para sa iba (grid, restaurant, fast-food, etc.)
    return <Ionicons name={iconName as any} size={18} color={color} />;
  };

  useEffect(() => {
    // Siguraduhin na naka-run ang json-server sa port 5005
    axios
      .get("http://localhost:5005/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Error fetching categories:", err));
  }, []);

  const renderItem = ({ item }: { item: Category }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[styles.categoryBtn, isSelected && styles.selectedBtn]}
        onPress={() => setSelectedId(item.id)}
      >
        {/* Tinatawag ang dynamic icon logic */}
        {renderCategoryIcon(item.icon, isSelected)}

        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    gap: 8,
    // Premium Look Shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedBtn: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});

export default CategoryList;
