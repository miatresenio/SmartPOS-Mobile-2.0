import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../types/colors";
import SettingsIcon from "./icon/SettingsIcon";
import ShoppingBagIcon from "../components/icon/ShoppingbagIcon"; // Import yung bagong icon

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* BILOG NA GREEN SHAPE */}
        <View style={styles.logoCircle}>
          <ShoppingBagIcon width={20} height={20} fill="#FFFFFF" />
        </View>
        <Text style={styles.title}>SmartPOS</Text>
      </View>

      <TouchableOpacity style={styles.settingsBtn}>
        <SettingsIcon width={24} height={24} fill={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 36,
    height: 36,
    backgroundColor: Colors.primary, // Green color
    borderRadius: 18, // Para maging perfect circle (Half ng width/height)
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textDark,
    letterSpacing: -0.5,
  },
  settingsBtn: {
    padding: 10,

    borderRadius: 12,
  },
});

export default HomeHeader;
