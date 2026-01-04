// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Switch,
//   Alert, // Kailangan ito para sa handleLogout
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useRouter } from "expo-router"; // Kailangan ito para sa navigation

// export default function SettingsScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter(); // Initialize ang router
//   const [isDarkMode, setIsDarkMode] = React.useState(false);

//   const SettingItem = ({
//     icon,
//     title,
//     subtitle,
//     onPress,
//     type = "chevron",
//   }: any) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={onPress}
//       activeOpacity={0.7}
//       disabled={type === "switch"} // Disable touch kung switch ang gamit
//     >
//       <View style={styles.itemLeft}>
//         <View style={styles.iconContainer}>
//           <Ionicons name={icon} size={22} color="#16AB4C" />
//         </View>
//         <View>
//           <Text style={styles.itemTitle}>{title}</Text>
//           {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
//         </View>
//       </View>
//       {type === "chevron" ? (
//         <Ionicons name="chevron-forward" size={20} color="#CCC" />
//       ) : (
//         <Switch
//           value={isDarkMode}
//           onValueChange={setIsDarkMode}
//           trackColor={{ false: "#DDD", true: "#16AB4C" }}
//         />
//       )}
//     </TouchableOpacity>
//   );

//   const handleLogout = () => {
//     Alert.alert("Logout", "Sigurado ka bang gusto mong lumabas?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: () => {
//           // Gagamit ng replace para hindi na makabalik sa settings via back button
//           router.replace("/(auth)/login");
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Settings</Text>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Profile Section */}
//         <View style={styles.profileCard}>
//           <View style={styles.profileImage}>
//             <Ionicons name="person" size={40} color="#FFF" />
//           </View>
//           <View style={styles.profileInfo}>
//             <Text style={styles.profileName}>Admin User</Text>
//             <Text style={styles.profileRole}>Store Manager</Text>
//           </View>
//           <TouchableOpacity style={styles.editBtn}>
//             <Text style={styles.editBtnText}>Edit</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionLabel}>Account & Security</Text>
//         <View style={styles.group}>
//           <SettingItem
//             icon="person-outline"
//             title="Profile Details"
//             subtitle="Manage your info"
//             onPress={() => console.log("Profile details clicked")}
//           />
//           <SettingItem icon="lock-closed-outline" title="Change Password" />
//           <SettingItem icon="notifications-outline" title="Notifications" />
//         </View>

//         <Text style={styles.sectionLabel}>Business Settings</Text>
//         <View style={styles.group}>
//           <SettingItem icon="storefront-outline" title="Store Information" />
//           <SettingItem icon="receipt-outline" title="Tax & Receipts" />
//           <SettingItem icon="moon-outline" title="Dark Mode" type="switch" />
//         </View>

//         <Text style={styles.sectionLabel}>Support</Text>
//         <View style={styles.group}>
//           <SettingItem icon="help-circle-outline" title="Help Center" />
//           <SettingItem
//             icon="chatbubble-ellipses-outline"
//             title="Contact Support"
//           />
//           <SettingItem
//             icon="information-circle-outline"
//             title="About SmartPOS"
//           />
//         </View>

//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <Text style={styles.versionText}>Version 1.0.2 (Build 45)</Text>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F9FA" },
//   header: {
//     paddingHorizontal: 25,
//     paddingVertical: 20,
//     backgroundColor: "#FFF",
//   },
//   headerTitle: { fontSize: 28, fontWeight: "800", color: "#1E1E1E" },
//   scrollContent: { padding: 20 },
//   profileCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 20,
//     alignItems: "center",
//     marginBottom: 25,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#16AB4C",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileInfo: { flex: 1, marginLeft: 15 },
//   profileName: { fontSize: 18, fontWeight: "700", color: "#1E1E1E" },
//   profileRole: { fontSize: 14, color: "#999" },
//   editBtn: {
//     backgroundColor: "#E8F5E9",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 10,
//   },
//   editBtnText: { color: "#16AB4C", fontWeight: "700", fontSize: 13 },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#999",
//     marginBottom: 10,
//     marginLeft: 5,
//     textTransform: "uppercase",
//   },
//   group: {
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F8F9FA",
//   },
//   itemLeft: { flexDirection: "row", alignItems: "center" },
//   iconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   itemTitle: { fontSize: 15, fontWeight: "600", color: "#1E1E1E" },
//   itemSubtitle: { fontSize: 12, color: "#AAA", marginTop: 2 },
//   logoutBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 20,
//     marginTop: 10,
//     marginBottom: 10, // Konting space sa baba
//     gap: 8,
//   },
//   logoutText: { color: "#FF3B30", fontWeight: "700", fontSize: 16 },
//   versionText: {
//     textAlign: "center",
//     color: "#CCC",
//     fontSize: 12,
//     marginTop: 20,
//     marginBottom: 30,
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    type = "chevron",
  }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={type === "switch"}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#16AB4C" />
        </View>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {type === "chevron" ? (
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      ) : (
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: "#DDD", true: "#16AB4C" }}
        />
      )}
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Sigurado ka bang gusto mong lumabas?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER WITH BACK BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#16AB4C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#FFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Admin User</Text>
            <Text style={styles.profileRole}>Store Manager</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Account & Security</Text>
        <View style={styles.group}>
          <SettingItem
            icon="person-outline"
            title="Profile Details"
            subtitle="Manage your info"
          />
          <SettingItem icon="lock-closed-outline" title="Change Password" />
          <SettingItem icon="notifications-outline" title="Notifications" />
        </View>

        <Text style={styles.sectionLabel}>Business Settings</Text>
        <View style={styles.group}>
          <SettingItem icon="storefront-outline" title="Store Information" />
          <SettingItem icon="receipt-outline" title="Tax & Receipts" />
          <SettingItem icon="moon-outline" title="Dark Mode" type="switch" />
        </View>

        <Text style={styles.sectionLabel}>Support</Text>
        <View style={styles.group}>
          <SettingItem icon="help-circle-outline" title="Help Center" />
          <SettingItem
            icon="chatbubble-ellipses-outline"
            title="Contact Support"
          />
          <SettingItem
            icon="information-circle-outline"
            title="About SmartPOS"
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* <Text style={styles.versionText}>Version 1.0.2 (Build 45)</Text> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row", // Para magkatabi ang arrow at text
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#FFF",
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E1E",
    flex: 1, // Para sakop ang space
  },
  scrollContent: { padding: 20 },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16AB4C",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: { flex: 1, marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: "700", color: "#1E1E1E" },
  profileRole: { fontSize: 14, color: "#999" },
  editBtn: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editBtnText: { color: "#16AB4C", fontWeight: "700", fontSize: 13 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#999",
    marginBottom: 10,
    marginLeft: 5,
    textTransform: "uppercase",
  },
  group: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemTitle: { fontSize: 15, fontWeight: "600", color: "#1E1E1E" },
  itemSubtitle: { fontSize: 12, color: "#AAA", marginTop: 2 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    gap: 8,
  },
  logoutText: { color: "#FF3B30", fontWeight: "700", fontSize: 16 },
  versionText: {
    textAlign: "center",
    color: "#CCC",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 30,
  },
});
