// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Modal,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import DeliveryMap from "../../components/DeliveryMap";

// const DELIVERY_DATA = [
//   {
//     id: "ORD-9921",
//     customer: "James Reid",
//     address: "123 Greenview Subd., Quezon City",
//     items: "2x Original Burger, 1x Large Fries",
//     status: "On the Way",
//     time: "12:44 AM",
//     rider: "Kuya Jojo",
//     hub: "Quezon City Hub",
//   },
//   {
//     id: "ORD-9922",
//     customer: "Liza Soberano",
//     address: "Penthouse B, Sky Tower, Makati",
//     items: "1x Garden Salad, 1x Fresh Juice",
//     status: "Preparing",
//     time: "12:50 AM",
//     rider: "Assigning...",
//     hub: "Makati Kitchen",
//   },
//   {
//     id: "ORD-9923",
//     customer: "Daniel Padilla",
//     address: "Block 5 Lot 12, Blue Village, Pasig",
//     items: "3x Sushi Maki, 2x Miso Soup",
//     status: "Delivered",
//     time: "12:15 AM",
//     rider: "Rider Bong",
//     hub: "Pasig Hub",
//   },
// ];

// export default function DeliveryScreen() {
//   const insets = useSafeAreaInsets();
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);

//   const getStatusColor = (status: string) => {
//     if (status === "Delivered" || status === "On the Way") return "#16AB4C";
//     return "#FF9800";
//   };

//   const renderDeliveryCard = ({
//     item,
//   }: {
//     item: (typeof DELIVERY_DATA)[0];
//   }) => (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <View style={styles.shopRow}>
//           <MaterialCommunityIcons
//             name="truck-delivery"
//             size={18}
//             color="#16AB4C"
//           />
//           <Text style={styles.hubText}>{item.hub}</Text>
//         </View>
//         <Text
//           style={[styles.statusText, { color: getStatusColor(item.status) }]}
//         >
//           {item.status}
//         </Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.productSection}>
//         <View style={styles.productInfo}>
//           <Text style={styles.orderIdText}>
//             {item.id} • {item.customer}
//           </Text>
//           <Text style={styles.itemsText}>{item.items}</Text>
//         </View>
//         <Text style={styles.timeText}>{item.time}</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.logisticsRow}
//         onPress={() => item.status === "On the Way" && setSelectedOrder(item)}
//       >
//         <View style={styles.stepperContainer}>
//           <View
//             style={[
//               styles.stepDot,
//               { backgroundColor: getStatusColor(item.status) },
//             ]}
//           />
//           <View style={styles.stepLine} />
//           <View style={[styles.stepDot, { backgroundColor: "#DDD" }]} />
//         </View>
//         <View style={styles.logisticsContent}>
//           <Text style={styles.logisticsTitle} numberOfLines={1}>
//             {item.status === "On the Way"
//               ? `Parcel is out for delivery (${item.rider})`
//               : `Order is at ${item.hub}`}
//           </Text>
//           <Text style={styles.addressText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={16} color="#999" />
//       </TouchableOpacity>

//       <View style={styles.cardFooter}>
//         <Text style={styles.footerInfo}>
//           Rider: <Text style={{ fontWeight: "700" }}>{item.rider}</Text>
//         </Text>
//         <View style={styles.btnRow}>
//           <TouchableOpacity style={styles.secondaryBtn}>
//             <Text style={styles.secondaryBtnText}>Contact</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.primaryBtn,
//               { backgroundColor: getStatusColor(item.status) },
//             ]}
//             onPress={() =>
//               item.status === "On the Way" && setSelectedOrder(item)
//             }
//           >
//             <Text style={styles.primaryBtnText}>Details</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Deliveries</Text>
//         <TouchableOpacity>
//           <Ionicons name="chatbox-ellipses-outline" size={24} color="#16AB4C" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tabContainer}>
//         {["All", "To Ship", "To Receive", "Completed"].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab)}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab && styles.activeTabText,
//               ]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <FlatList
//         data={DELIVERY_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={renderDeliveryCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* FIXED MODAL: Ginagamit na ang DeliveryMap component */}
//       <Modal visible={!!selectedOrder} animationType="slide">
//         <DeliveryMap onClose={() => setSelectedOrder(null)} />
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F5F5" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     backgroundColor: "#FFF",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E1E1E" },
//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
//   activeTab: { borderBottomWidth: 2, borderBottomColor: "#16AB4C" },
//   tabText: { fontSize: 13, color: "#666" },
//   activeTabText: { color: "#16AB4C", fontWeight: "700" },
//   listContent: { paddingBottom: 100 },
//   card: { backgroundColor: "#FFF", marginTop: 10, padding: 15 },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   shopRow: { flexDirection: "row", alignItems: "center", gap: 5 },
//   hubText: { fontSize: 13, fontWeight: "700", color: "#1E1E1E" },
//   statusText: { fontSize: 13, fontWeight: "500" },
//   divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 5 },
//   productSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 10,
//   },
//   productInfo: { flex: 1 },
//   orderIdText: { fontSize: 14, fontWeight: "600" },
//   itemsText: { fontSize: 12, color: "#888", marginTop: 2 },
//   timeText: { fontSize: 11, color: "#AAA" },
//   logisticsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8FDF9",
//     padding: 10,
//     borderRadius: 4,
//     marginVertical: 10,
//   },
//   stepperContainer: { alignItems: "center", marginRight: 10 },
//   stepDot: { width: 8, height: 8, borderRadius: 4 },
//   stepLine: {
//     width: 1,
//     height: 15,
//     backgroundColor: "#DDD",
//     marginVertical: 2,
//   },
//   logisticsContent: { flex: 1 },
//   logisticsTitle: { fontSize: 12, color: "#16AB4C", fontWeight: "600" },
//   addressText: { fontSize: 11, color: "#888" },
//   cardFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#F5F5F5",
//     paddingTop: 15,
//   },
//   footerInfo: { fontSize: 12, color: "#666" },
//   btnRow: { flexDirection: "row", gap: 8 },
//   secondaryBtn: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#DDD",
//   },
//   secondaryBtnText: { fontSize: 12, color: "#555" },
//   primaryBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4 },
//   primaryBtnText: { fontSize: 12, color: "#FFF", fontWeight: "600" },
// });

//GUMAGANA ANIMATION
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Modal,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import Animated, {
//   FadeInDown,
//   FadeInRight,
//   Layout,
// } from "react-native-reanimated"; // Added Reanimated
// import DeliveryMap from "../../components/DeliveryMap";

// const DELIVERY_DATA = [
//   {
//     id: "ORD-9921",
//     customer: "James Reid",
//     address: "123 Greenview Subd., Quezon City",
//     items: "2x Original Burger, 1x Large Fries",
//     status: "On the Way",
//     time: "12:44 AM",
//     rider: "Kuya Jojo",
//     hub: "Quezon City Hub",
//   },
//   {
//     id: "ORD-9922",
//     customer: "Liza Soberano",
//     address: "Penthouse B, Sky Tower, Makati",
//     items: "1x Garden Salad, 1x Fresh Juice",
//     status: "Preparing",
//     time: "12:50 AM",
//     rider: "Assigning...",
//     hub: "Makati Kitchen",
//   },
//   {
//     id: "ORD-9923",
//     customer: "Daniel Padilla",
//     address: "Block 5 Lot 12, Blue Village, Pasig",
//     items: "3x Sushi Maki, 2x Miso Soup",
//     status: "Delivered",
//     time: "12:15 AM",
//     rider: "Rider Bong",
//     hub: "Pasig Hub",
//   },
// ];

// export default function DeliveryScreen() {
//   const insets = useSafeAreaInsets();
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);

//   const getStatusColor = (status: string) => {
//     if (status === "Delivered" || status === "On the Way") return "#16AB4C";
//     return "#FF9800";
//   };

//   const renderDeliveryCard = ({
//     item,
//     index,
//   }: {
//     item: (typeof DELIVERY_DATA)[0];
//     index: number;
//   }) => (
//     // Slide in from right with delay based on index
//     <Animated.View
//       entering={FadeInRight.delay(index * 150).duration(500)}
//       layout={Layout.springify()} // Smooth layout changes
//       style={styles.card}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.shopRow}>
//           <MaterialCommunityIcons
//             name="truck-delivery"
//             size={18}
//             color="#16AB4C"
//           />
//           <Text style={styles.hubText}>{item.hub}</Text>
//         </View>
//         <Text
//           style={[styles.statusText, { color: getStatusColor(item.status) }]}
//         >
//           {item.status}
//         </Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.productSection}>
//         <View style={styles.productInfo}>
//           <Text style={styles.orderIdText}>
//             {item.id} • {item.customer}
//           </Text>
//           <Text style={styles.itemsText}>{item.items}</Text>
//         </View>
//         <Text style={styles.timeText}>{item.time}</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.logisticsRow}
//         onPress={() => item.status === "On the Way" && setSelectedOrder(item)}
//       >
//         <View style={styles.stepperContainer}>
//           <View
//             style={[
//               styles.stepDot,
//               { backgroundColor: getStatusColor(item.status) },
//             ]}
//           />
//           <View style={styles.stepLine} />
//           <View style={[styles.stepDot, { backgroundColor: "#DDD" }]} />
//         </View>
//         <View style={styles.logisticsContent}>
//           <Text style={styles.logisticsTitle} numberOfLines={1}>
//             {item.status === "On the Way"
//               ? `Parcel is out for delivery (${item.rider})`
//               : `Order is at ${item.hub}`}
//           </Text>
//           <Text style={styles.addressText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={16} color="#999" />
//       </TouchableOpacity>

//       <View style={styles.cardFooter}>
//         <Text style={styles.footerInfo}>
//           Rider: <Text style={{ fontWeight: "700" }}>{item.rider}</Text>
//         </Text>
//         <View style={styles.btnRow}>
//           <TouchableOpacity style={styles.secondaryBtn}>
//             <Text style={styles.secondaryBtnText}>Contact</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.primaryBtn,
//               { backgroundColor: getStatusColor(item.status) },
//             ]}
//             onPress={() =>
//               item.status === "On the Way" && setSelectedOrder(item)
//             }
//           >
//             <Text style={styles.primaryBtnText}>Details</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Animated.View>
//   );

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       {/* HEADER - Fade in down */}
//       <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
//         <Text style={styles.headerTitle}>Deliveries</Text>
//         <TouchableOpacity>
//           <Ionicons name="chatbox-ellipses-outline" size={24} color="#16AB4C" />
//         </TouchableOpacity>
//       </Animated.View>

//       {/* TABS - Simple fade in */}
//       <Animated.View
//         entering={FadeInDown.delay(200)}
//         style={styles.tabContainer}
//       >
//         {["All", "To Ship", "To Receive", "Completed"].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab)}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab && styles.activeTabText,
//               ]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>

//       <FlatList
//         data={DELIVERY_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => renderDeliveryCard({ item, index })}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />

//       <Modal visible={!!selectedOrder} animationType="slide">
//         <DeliveryMap onClose={() => setSelectedOrder(null)} />
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F5F5" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     backgroundColor: "#FFF",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E1E1E" },
//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
//   activeTab: { borderBottomWidth: 2, borderBottomColor: "#16AB4C" },
//   tabText: { fontSize: 13, color: "#666" },
//   activeTabText: { color: "#16AB4C", fontWeight: "700" },
//   listContent: { paddingBottom: 100 },
//   card: { backgroundColor: "#FFF", marginTop: 10, padding: 15, elevation: 1 },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   shopRow: { flexDirection: "row", alignItems: "center", gap: 5 },
//   hubText: { fontSize: 13, fontWeight: "700", color: "#1E1E1E" },
//   statusText: { fontSize: 13, fontWeight: "500" },
//   divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 5 },
//   productSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 10,
//   },
//   productInfo: { flex: 1 },
//   orderIdText: { fontSize: 14, fontWeight: "600" },
//   itemsText: { fontSize: 12, color: "#888", marginTop: 2 },
//   timeText: { fontSize: 11, color: "#AAA" },
//   logisticsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8FDF9",
//     padding: 10,
//     borderRadius: 4,
//     marginVertical: 10,
//   },
//   stepperContainer: { alignItems: "center", marginRight: 10 },
//   stepDot: { width: 8, height: 8, borderRadius: 4 },
//   stepLine: {
//     width: 1,
//     height: 15,
//     backgroundColor: "#DDD",
//     marginVertical: 2,
//   },
//   logisticsContent: { flex: 1 },
//   logisticsTitle: { fontSize: 12, color: "#16AB4C", fontWeight: "600" },
//   addressText: { fontSize: 11, color: "#888" },
//   cardFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#F5F5F5",
//     paddingTop: 15,
//   },
//   footerInfo: { fontSize: 12, color: "#666" },
//   btnRow: { flexDirection: "row", gap: 8 },
//   secondaryBtn: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#DDD",
//   },
//   secondaryBtnText: { fontSize: 12, color: "#555" },
//   primaryBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4 },
//   primaryBtnText: { fontSize: 12, color: "#FFF", fontWeight: "600" },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, Layout, Easing } from "react-native-reanimated";
import DeliveryMap from "../../components/DeliveryMap";
import { router } from "expo-router";

const DELIVERY_DATA = [
  {
    id: "ORD-9921",
    customer: "James Reid",
    address: "123 Greenview Subd., Quezon City",
    items: "2x Original Burger, 1x Large Fries",
    status: "On the Way", // Mapping: To Receive
    time: "12:44 AM",
    rider: "Kuya Jojo",
    hub: "Quezon City Hub",
  },
  {
    id: "ORD-9922",
    customer: "Liza Soberano",
    address: "Penthouse B, Sky Tower, Makati",
    items: "1x Garden Salad, 1x Fresh Juice",
    status: "Preparing", // Mapping: To Ship
    time: "12:50 AM",
    rider: "Assigning...",
    hub: "Makati Kitchen",
  },
  {
    id: "ORD-9923",
    customer: "Daniel Padilla",
    address: "Block 5 Lot 12, Blue Village, Pasig",
    items: "3x Sushi Maki, 2x Miso Soup",
    status: "Delivered", // Mapping: Completed
    time: "12:15 AM",
    rider: "Rider Bong",
    hub: "Pasig Hub",
  },
];

export default function DeliveryScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // LOGIC PARA SA FILTERING NG TABS
  const filteredData = DELIVERY_DATA.filter((item) => {
    if (activeTab === "To Ship") return item.status === "Preparing";
    if (activeTab === "To Receive") return item.status === "On the Way";
    if (activeTab === "Completed") return item.status === "Delivered";
    return true; // All
  });

  const getStatusColor = (status: string) => {
    if (status === "Delivered" || status === "On the Way") return "#16AB4C";
    return "#FF9800";
  };

  const renderDeliveryCard = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <Animated.View
      // Professional Entrance (No bounce)
      entering={FadeInDown.duration(400)
        .delay(index * 50)
        .easing(Easing.out(Easing.quad))}
      // Smooth sliding when switching tabs
      layout={Layout.duration(300)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.shopRow}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={18}
            color="#16AB4C"
          />
          <Text style={styles.hubText}>{item.hub}</Text>
        </View>
        <Text
          style={[styles.statusText, { color: getStatusColor(item.status) }]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.productSection}>
        <View style={styles.productInfo}>
          <Text style={styles.orderIdText}>
            {item.id} • {item.customer}
          </Text>
          <Text style={styles.itemsText}>{item.items}</Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <TouchableOpacity
        style={styles.logisticsRow}
        onPress={() => item.status === "On the Way" && setSelectedOrder(item)}
      >
        <View style={styles.stepperContainer}>
          <View
            style={[
              styles.stepDot,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          />
          <View style={styles.stepLine} />
          <View style={[styles.stepDot, { backgroundColor: "#DDD" }]} />
        </View>
        <View style={styles.logisticsContent}>
          <Text style={styles.logisticsTitle} numberOfLines={1}>
            {item.status === "On the Way"
              ? `Parcel is out for delivery (${item.rider})`
              : item.status === "Delivered"
              ? "Order has been received"
              : `Order is being prepared at ${item.hub}`}
          </Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </TouchableOpacity>

      <View style={styles.cardFooter}>
        <Text style={styles.footerInfo}>
          Rider: <Text style={{ fontWeight: "700" }}>{item.rider}</Text>
        </Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { backgroundColor: getStatusColor(item.status) },
            ]}
            onPress={() =>
              item.status === "On the Way" && setSelectedOrder(item)
            }
          >
            <Text style={styles.primaryBtnText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Deliveries</Text>
        <TouchableOpacity onPress={() => router.push("../ChatListScreen")}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#16AB4C" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["All", "To Ship", "To Receive", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderDeliveryCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Walang orders sa {activeTab}.</Text>
          </View>
        }
      />

      <Modal
        visible={!!selectedOrder}
        animationType="slide"
        transparent={false}
      >
        <DeliveryMap onClose={() => setSelectedOrder(null)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    letterSpacing: -0.5,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 14 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#16AB4C" },
  tabText: { fontSize: 13, color: "#666", fontWeight: "500" },
  activeTabText: { color: "#16AB4C", fontWeight: "700" },
  listContent: { paddingBottom: 30 },
  card: {
    backgroundColor: "#FFF",
    marginTop: 8,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  shopRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  hubText: { fontSize: 13, fontWeight: "700", color: "#1A1A1A" },
  statusText: { fontSize: 12, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 8 },
  productSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  productInfo: { flex: 1 },
  orderIdText: { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },
  itemsText: { fontSize: 12, color: "#777", marginTop: 2 },
  timeText: { fontSize: 11, color: "#AAA" },
  logisticsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  stepperContainer: { alignItems: "center", marginRight: 12 },
  stepDot: { width: 7, height: 7, borderRadius: 3.5 },
  stepLine: {
    width: 1,
    height: 12,
    backgroundColor: "#DDD",
    marginVertical: 2,
  },
  logisticsContent: { flex: 1 },
  logisticsTitle: { fontSize: 12, color: "#16AB4C", fontWeight: "600" },
  addressText: { fontSize: 11, color: "#888", marginTop: 2 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 15,
  },
  footerInfo: { fontSize: 12, color: "#666" },
  btnRow: { flexDirection: "row", gap: 8 },
  secondaryBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  secondaryBtnText: { fontSize: 12, color: "#555", fontWeight: "600" },
  primaryBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 6 },
  primaryBtnText: { fontSize: 12, color: "#FFF", fontWeight: "700" },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#999", fontSize: 14 },
});
