// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Colors } from "../types/colors";
// import SettingsIcon from "./icon/SettingsIcon";
// import { Link } from "expo-router";
// import ShoppingBagIcon from "../components/icon/ShoppingbagIcon"; // Import yung bagong icon

// const HomeHeader = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.leftSection}>
//         {/* BILOG NA GREEN SHAPE */}
//         <View style={styles.logoCircle}>
//           <ShoppingBagIcon width={20} height={20} fill="#FFFFFF" />
//         </View>
//         <Text style={styles.title}>SmartPOS</Text>
//       </View>

//       <Link href="/settings" asChild>
//         <TouchableOpacity style={styles.settingsBtn}>
//           <SettingsIcon width={24} height={24} fill={Colors.black} />
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: Colors.white,
//   },
//   leftSection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoCircle: {
//     width: 36,
//     height: 36,
//     backgroundColor: Colors.primary, // Green color
//     borderRadius: 18, // Para maging perfect circle (Half ng width/height)
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: Colors.textDark,
//     letterSpacing: -0.5,
//   },
//   settingsBtn: {
//     padding: 10,

//     borderRadius: 12,
//   },
// });

// export default HomeHeader;

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Colors } from "../types/colors";
// import SettingsIcon from "./icon/SettingsIcon";
// import { useRouter } from "expo-router"; // Gamitin ang useRouter para sigurado
// import ShoppingBagIcon from "../components/icon/ShoppingbagIcon";

// const HomeHeader = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftSection}>
//         <View style={styles.logoCircle}>
//           <ShoppingBagIcon width={20} height={20} fill="#FFFFFF" />
//         </View>
//         <Text style={styles.title}>SmartPOS</Text>
//       </View>

//       {/* Gamitin ang router.push imbes na Link kung nag-eerror */}
//       <TouchableOpacity
//         style={styles.settingsBtn}
//         onPress={() => router.push("/Settings")}
//       >
//         <SettingsIcon width={24} height={24} fill={Colors.black} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   leftSection: { flexDirection: "row", alignItems: "center" },
//   logoCircle: {
//     width: 36,
//     height: 36,
//     backgroundColor: "#16AB4C",
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   title: { fontSize: 22, fontWeight: "700", color: "#1E1E1E" },
//   settingsBtn: { padding: 8 },
// });

// export default HomeHeader;

//WORRKINNG
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Colors } from "../types/colors";
// import SettingsIcon from "./icon/SettingsIcon";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons"; // Para sa Bell icon
// import ShoppingBagIcon from "../components/icon/ShoppingbagIcon";

// const HomeHeader = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftSection}>
//         <View style={styles.logoCircle}>
//           <ShoppingBagIcon width={20} height={20} fill="#FFFFFF" />
//         </View>
//         <Text style={styles.title}>SmartPOS</Text>
//       </View>

//       <View style={styles.rightSection}>
//         {/* Notification Button */}
//         <TouchableOpacity
//           style={styles.iconBtn}
//           onPress={() => console.log("Notif clicked")}
//         >
//           <Ionicons
//             name="notifications-outline"
//             size={24}
//             color={Colors.black}
//           />
//           <View style={styles.badge} />
//         </TouchableOpacity>

//         {/* Settings Button */}
//         <TouchableOpacity
//           style={styles.iconBtn}
//           onPress={() => router.push("/Settings")}
//         >
//           <SettingsIcon width={24} height={24} fill={Colors.black} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   leftSection: { flexDirection: "row", alignItems: "center" },
//   rightSection: { flexDirection: "row", alignItems: "center", gap: 5 },
//   logoCircle: {
//     width: 36,
//     height: 36,
//     backgroundColor: "#16AB4C",
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   title: { fontSize: 22, fontWeight: "700", color: "#1E1E1E" },
//   iconBtn: { padding: 8, position: "relative" },
//   badge: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     width: 8,
//     height: 8,
//     backgroundColor: "#FF3B30",
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#FFF",
//   },
// });

// export default HomeHeader;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../types/colors";
import SettingsIcon from "./icon/SettingsIcon";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ShoppingBagIcon from "../components/icon/ShoppingbagIcon";

const HomeHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* BILOG NA GREEN SHAPE */}
        <View style={styles.logoCircle}>
          <ShoppingBagIcon width={20} height={20} fill="#FFFFFF" />
        </View>
        <Text style={styles.title}>SmartPOS</Text>
      </View>

      <View style={styles.rightSection}>
        {/* Notification Button - FIXED NAVIGATION */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.black}
          />
          {/* Pulang tuldok para sa unread notifications */}
          <View style={styles.badge} />
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/Settings")}
        >
          <SettingsIcon width={24} height={24} fill={Colors.black} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#FFFFFF",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoCircle: {
    width: 36,
    height: 36,
    backgroundColor: "#16AB4C",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    letterSpacing: -0.5,
  },
  iconBtn: {
    padding: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});

export default HomeHeader;
