import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../types/colors";

import HomeIcon from "../../components/icon/HomeIcon";
import TableServices from "../../components/icon/TableServices";
import Reservation from "../../components/icon/Reservation";
import Delivery from "../../components/icon/Delivery";
import Accounting from "../../components/icon/Accounting";

import Home from ".";
import TableServicesScreen from "./TableServices";
import ReservationScreen from "./Reservation";
import AccountingScreen from "./Accounting";
import DeliveryScreen from "./Delivery";

import SettingsScreen from "./Settings";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <HomeIcon
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }

          if (route.name === "Table Services") {
            return (
              <TableServices
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }

          if (route.name === "Reservation") {
            return (
              <Reservation
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }

          if (route.name === "Delivery") {
            return (
              <Delivery
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }

          if (route.name === "Accounting") {
            return (
              <Accounting
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }

          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Accounting":
              iconName = focused ? "settings" : "settings-outline";
              break;

            default:
              iconName = "help-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Table Services" component={TableServicesScreen} />
      <Tab.Screen name="Reservation" component={ReservationScreen} />
      <Tab.Screen name="Delivery" component={DeliveryScreen} />
      <Tab.Screen name="Accounting" component={AccountingScreen} />
    </Tab.Navigator>
  );
}
