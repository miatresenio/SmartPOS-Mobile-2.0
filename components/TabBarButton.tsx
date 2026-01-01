import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ✅ FIXED: In-define ang IconName locally para mawala ang error sa import
export type IconName =
  | "index"
  | "Accounting"
  | "Delivery"
  | "Inventory"
  | "Reservation"
  | "Settings"
  | "TableServices"
  | "ChatAI";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  label: string;
  routeName: IconName;
};

const TabBarButton = (props: Props) => {
  const { onPress, onLongPress, isFocused, label, routeName } = props;

  // ✅ MAPA NG MGA ICONS (Ionicons) base sa route name
  const getIcon = (name: IconName, focused: boolean) => {
    let iconName: any;

    switch (name) {
      case "index":
        iconName = focused ? "home" : "home-outline";
        break;
      case "TableServices":
        iconName = focused ? "restaurant" : "restaurant-outline";
        break;
      case "Reservation":
        iconName = focused ? "calendar" : "calendar-outline";
        break;
      case "Delivery":
        iconName = focused ? "bicycle" : "bicycle-outline";
        break;
      case "Accounting":
        iconName = focused ? "calculator" : "calculator-outline";
        break;
      case "Inventory":
        iconName = focused ? "cube" : "cube-outline";
        break;
      case "ChatAI":
        iconName = focused ? "sparkles" : "sparkles-outline";
        break;
      case "Settings":
        iconName = focused ? "settings" : "settings-outline";
        break;
      default:
        iconName = "apps-outline";
    }

    return (
      <Ionicons
        name={iconName}
        size={22}
        color={focused ? "#16AB4C" : "#8E8E93"}
      />
    );
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {/* Dynamic Badge - Lalabas lang halimbawa sa Delivery/Cart */}
      {routeName === "Delivery" && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      )}

      {/* Render Icon */}
      {getIcon(routeName, isFocused)}

      <Text
        style={[
          styles.labelStyle,
          { color: isFocused ? "#16AB4C" : "#8E8E93" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 4,
  },
  labelStyle: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  badgeWrapper: {
    position: "absolute",
    backgroundColor: "#FF3B30", // Red badge for attention
    top: -4,
    right: 15,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    zIndex: 10,
    minWidth: 18,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
});
