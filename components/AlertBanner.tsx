import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AlertBanner = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.iconWrapper}>
        <Ionicons name="warning" size={20} color="#FFF" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>INVENTORY ALERT</Text>
        <Text style={styles.message}>
          Warning: Beef Patties is running low (5 left)!
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="rgba(255,255,255,0.7)"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E53935", // Professional Warning Red
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  message: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
});

export default AlertBanner;
