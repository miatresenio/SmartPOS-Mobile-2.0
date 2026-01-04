// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "../../types/colors";

// import HomeIcon from "../../components/icon/HomeIcon";
// import TableServices from "../../components/icon/TableServices";
// import Reservation from "../../components/icon/Reservation";
// import Delivery from "../../components/icon/Delivery";
// import Accounting from "../../components/icon/Accounting";

// import Home from ".";
// import TableServicesScreen from "./TableServices";
// import ReservationScreen from "./Reservation";
// import AccountingScreen from "./Accounting";
// import DeliveryScreen from "./Delivery";

// import SettingsScreen from "./Settings";

// const Tab = createBottomTabNavigator();

// export default function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: Colors.primary,
//         tabBarInactiveTintColor: Colors.gray,
//         tabBarIcon: ({ focused, color, size }) => {
//           if (route.name === "Home") {
//             return (
//               <HomeIcon
//                 width={size}
//                 height={size}
//                 fill={focused ? Colors.primary : Colors.gray}
//               />
//             );
//           }

//           if (route.name === "Table Services") {
//             return (
//               <TableServices
//                 width={size}
//                 height={size}
//                 fill={focused ? Colors.primary : Colors.gray}
//               />
//             );
//           }

//           if (route.name === "Reservation") {
//             return (
//               <Reservation
//                 width={size}
//                 height={size}
//                 fill={focused ? Colors.primary : Colors.gray}
//               />
//             );
//           }

//           if (route.name === "Delivery") {
//             return (
//               <Delivery
//                 width={size}
//                 height={size}
//                 fill={focused ? Colors.primary : Colors.gray}
//               />
//             );
//           }

//           if (route.name === "Accounting") {
//             return (
//               <Accounting
//                 width={size}
//                 height={size}
//                 fill={focused ? Colors.primary : Colors.gray}
//               />
//             );
//           }

//           let iconName: keyof typeof Ionicons.glyphMap;

//           switch (route.name) {
//             case "Accounting":
//               iconName = focused ? "settings" : "settings-outline";
//               break;

//             default:
//               iconName = "help-circle-outline";
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Table Services" component={TableServices} />
//       <Tab.Screen name="Reservation" component={ReservationScreen} />
//       <Tab.Screen name="Delivery" component={DeliveryScreen} />
//       <Tab.Screen name="Accounting" component={AccountingScreen} />
//     </Tab.Navigator>
//   );
// }

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../types/colors";

// 1. I-rename natin ang icons para hindi magulo sa screen names
import HomeIcon from "../../components/icon/HomeIcon";
import TableIcon from "../../components/icon/TableServices"; // Ginawa nating TableIcon
import ReservationIcon from "../../components/icon/Reservation";
import DeliveryIcon from "../../components/icon/Delivery";
import AccountingIcon from "../../components/icon/Accounting";

// 2. Ang Screens (Dapat ito ang gagamitin sa component={...})
import Home from ".";
import TableServicesScreen from "./TableServices";
import ReservationScreen from "./Reservation";
import AccountingScreen from "./Accounting";
import DeliveryScreen from "./Delivery";

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
          // Gagamitin natin yung nirename nating Icons dito
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
              <TableIcon
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }
          if (route.name === "Reservation") {
            return (
              <ReservationIcon
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }
          if (route.name === "Delivery") {
            return (
              <DeliveryIcon
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }
          if (route.name === "Accounting") {
            return (
              <AccountingIcon
                width={size}
                height={size}
                fill={focused ? Colors.primary : Colors.gray}
              />
            );
          }
          return (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* 3. SIGURADUHIN na TableServicesScreen ang nakalagay dito! */}
      <Tab.Screen name="Table Services" component={TableServicesScreen} />
      <Tab.Screen name="Reservation" component={ReservationScreen} />
      <Tab.Screen name="Delivery" component={DeliveryScreen} />
      <Tab.Screen name="Accounting" component={AccountingScreen} />
    </Tab.Navigator>
  );
}
