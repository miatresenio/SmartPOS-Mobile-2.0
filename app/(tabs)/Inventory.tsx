import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Static data na tugma sa sinabi ng AI sa screenshots
const INGREDIENTS_DATA = [
  {
    id: "1",
    name: "Beef Patties",
    stock: 12,
    unit: "pcs",
    status: "Low Stock",
    color: "#FF9800",
  },
  {
    id: "2",
    name: "Lettuce",
    stock: 2,
    unit: "kg",
    status: "Critical",
    color: "#E53935",
  },
  {
    id: "3",
    name: "Tomato Ketchup",
    stock: 8,
    unit: "bottles",
    status: "Stable",
    color: "#16AB4C",
  },
  {
    id: "4",
    name: "Burger Buns",
    stock: 15,
    unit: "pcs",
    status: "Stable",
    color: "#16AB4C",
  },
  {
    id: "5",
    name: "Mayonnaise",
    stock: 3,
    unit: "jars",
    status: "Low Stock",
    color: "#FF9800",
  },
];

export default function InventoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Live Inventory</Text>
          <Text style={styles.subtitle}>Real-time Stock Monitoring</Text>
        </View>
        <TouchableOpacity style={styles.syncBtn}>
          <Ionicons name="sparkles" size={16} color="#16AB4C" />
          <Text style={styles.syncText}>AI Synced</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={INGREDIENTS_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Eto yung itemInfo na may fix na sa styles sa baba */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemStock}>
                {item.stock} {item.unit} remaining
              </Text>
            </View>
            <View
              style={[styles.badge, { backgroundColor: item.color + "15" }]}
            >
              <Text style={[styles.badgeText, { color: item.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  syncBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  syncText: {
    color: "#16AB4C",
    fontWeight: "700",
    fontSize: 12,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  // FIXED: Added itemInfo style
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  itemStock: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
