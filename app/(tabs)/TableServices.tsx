// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// interface TableServicesProps {
//   cartItems?: any[];
//   setCartItems?: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems = () => {},
//   onClose = () => {},
// }) => {
//   const router = useRouter();
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [serviceType, setServiceType] = useState("Dine-in"); // Default selection

//   const [tableOrders, setTableOrders] = useState<{ [key: number]: any[] }>({
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//     6: [],
//   });

//   const tables = [1, 2, 3, 4, 5, 6];
//   const serviceOptions = ["Dine-in", "Take-out", "Delivery"];

//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     if (viewingTable) {
//       // Isasama natin yung serviceType sa order data
//       const updatedItems = cartItems.map((item) => ({ ...item, serviceType }));
//       setTableOrders((prev) => ({
//         ...prev,
//         [viewingTable]: [...prev[viewingTable], ...updatedItems],
//       }));
//       setCartItems([]);
//       if (onClose) onClose();
//       router.push("/Success");
//     }
//   };

//   const methods = [
//     { id: "Cash", icon: "cash" },
//     { id: "Card", icon: "card-outline" },
//     { id: "QR Code", icon: "qr-code-outline" },
//     { id: "Bank", icon: "business-outline" },
//   ];

//   const renderOrderDetails = () => {
//     const activeItems = viewingTable === 1 ? cartItems : [];
//     const historyItems = tableOrders[viewingTable!] || [];
//     const displayData = [...historyItems, ...activeItems];

//     return (
//       <View style={styles.detailsContainer}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             onPress={() => setViewingTable(null)}
//             style={styles.backBtn}
//           >
//             <Ionicons name="chevron-back" size={24} color="#16AB4C" />
//             <Text style={styles.backText}>Tables</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Table {viewingTable}</Text>
//           <View style={{ width: 40 }} />
//         </View>

//         <FlatList
//           data={displayData}
//           keyExtractor={(_, index) => `order-${index}`}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 150 }}
//           ListHeaderComponent={
//             <View>
//               {/* SERVICE TYPE SELECTION */}
//               {activeItems.length > 0 && (
//                 <View style={styles.serviceSelectionBox}>
//                   <Text style={styles.smallSectionTitle}>Order Type</Text>
//                   <View style={styles.serviceTabContainer}>
//                     {serviceOptions.map((opt) => (
//                       <TouchableOpacity
//                         key={opt}
//                         onPress={() => setServiceType(opt)}
//                         style={[
//                           styles.serviceTab,
//                           serviceType === opt && styles.activeServiceTab,
//                         ]}
//                       >
//                         <Text
//                           style={[
//                             styles.serviceTabText,
//                             serviceType === opt && styles.activeServiceTabText,
//                           ]}
//                         >
//                           {opt}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>
//               )}
//               <Text style={styles.sectionTitle}>Order Summary</Text>
//             </View>
//           }
//           renderItem={({ item, index }) => {
//             const isHistory = index < historyItems.length;
//             const orderID = `ORD-${202500 + index}`;
//             const type = item.serviceType || serviceType;

//             return (
//               <View style={[styles.orderItem, isHistory && styles.historyItem]}>
//                 <View style={styles.itemTextContainer}>
//                   <View style={styles.orderMetaRow}>
//                     <Text style={styles.orderNumberText}>{orderID}</Text>
//                     <View style={styles.serviceTag}>
//                       <Text style={styles.serviceTagText}>{type}</Text>
//                     </View>
//                   </View>
//                   <Text style={styles.itemName} numberOfLines={0}>
//                     {item.name}
//                   </Text>
//                   <Text style={styles.itemQty}>
//                     Qty: {item.quantity} • {isHistory ? "Cooking" : "Pending"}
//                   </Text>
//                 </View>
//                 <View style={styles.priceContainer}>
//                   <Text style={styles.itemPrice}>
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </Text>
//                 </View>
//               </View>
//             );
//           }}
//           ListFooterComponent={
//             activeItems.length > 0 ? (
//               <View style={styles.footerContent}>
//                 <View style={styles.summaryBox}>
//                   <View style={styles.summaryRow}>
//                     <Text style={styles.summaryLabel}>Sub Total</Text>
//                     <Text style={styles.summaryValue}>
//                       ${subTotal.toFixed(2)}
//                     </Text>
//                   </View>
//                   <View style={styles.summaryRow}>
//                     <Text style={styles.summaryLabel}>Service Tax (5%)</Text>
//                     <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
//                   </View>
//                   <View style={styles.totalRow}>
//                     <Text style={styles.totalLabel}>Total Amount</Text>
//                     <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//                   </View>
//                 </View>

//                 <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
//                   Payment Method
//                 </Text>
//                 <View style={styles.paymentGrid}>
//                   {methods.map((m) => (
//                     <TouchableOpacity
//                       key={m.id}
//                       style={[
//                         styles.methodCard,
//                         paymentMethod === m.id && styles.activeMethod,
//                       ]}
//                       onPress={() => setPaymentMethod(m.id)}
//                     >
//                       <Ionicons
//                         name={m.icon as any}
//                         size={20}
//                         color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                       />
//                       <Text
//                         style={[
//                           styles.methodText,
//                           paymentMethod === m.id && styles.activeMethodText,
//                         ]}
//                       >
//                         {m.id}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>

//                 <TouchableOpacity
//                   style={styles.completeBtn}
//                   onPress={handleCompleteOrder}
//                 >
//                   <Text style={styles.completeBtnText}>Confirm Order</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : null
//           }
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {!viewingTable && <Text style={styles.mainTitle}>Table Services</Text>}
//       {viewingTable ? (
//         renderOrderDetails()
//       ) : (
//         <FlatList
//           data={tables}
//           numColumns={2}
//           keyExtractor={(item) => item.toString()}
//           columnWrapperStyle={styles.columnWrapper}
//           renderItem={({ item: num }) => {
//             const isActive =
//               (num === 1 && cartItems.length > 0) ||
//               tableOrders[num].length > 0;
//             return (
//               <TouchableOpacity
//                 style={[styles.tableCard, isActive && styles.activeTableCard]}
//                 onPress={() => setViewingTable(num)}
//               >
//                 <Text
//                   style={[
//                     styles.tableNumber,
//                     isActive && styles.activeTableText,
//                   ]}
//                 >
//                   Table {num}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     paddingHorizontal: 20,
//     paddingTop: 60,
//   },
//   mainTitle: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#1A1A1A",
//     marginBottom: 20,
//   },
//   columnWrapper: { justifyContent: "space-between", marginBottom: 15 },
//   tableCard: {
//     width: (width - 55) / 2,
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 30,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEE",
//   },
//   activeTableCard: { backgroundColor: "#16AB4C", borderColor: "#16AB4C" },
//   tableNumber: { fontSize: 17, fontWeight: "700", color: "#444" },
//   activeTableText: { color: "#FFF" },
//   detailsContainer: { flex: 1 },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   backBtn: { flexDirection: "row", alignItems: "center" },
//   backText: {
//     color: "#16AB4C",
//     fontWeight: "700",
//     fontSize: 16,
//     marginLeft: 2,
//   },
//   headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },

//   // SERVICE SELECTION STYLES
//   serviceSelectionBox: { marginBottom: 20 },
//   smallSectionTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#666",
//     marginBottom: 10,
//   },
//   serviceTabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#F4F4F4",
//     borderRadius: 12,
//     padding: 4,
//   },
//   serviceTab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   activeServiceTab: {
//     backgroundColor: "#FFF",
//     elevation: 2,
//     shadowOpacity: 0.1,
//   },
//   serviceTabText: { fontSize: 13, fontWeight: "600", color: "#888" },
//   activeServiceTabText: { color: "#16AB4C", fontWeight: "700" },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//   },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     backgroundColor: "#F8F9FA",
//     padding: 15,
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   historyItem: { backgroundColor: "#FFF", borderColor: "#E8F5E9" },
//   itemTextContainer: { flex: 1, marginRight: 10 },
//   orderMetaRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 6,
//   },
//   orderNumberText: { fontSize: 11, fontWeight: "800", color: "#999" },
//   serviceTag: {
//     backgroundColor: "#E8F5E9",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   serviceTagText: {
//     fontSize: 9,
//     fontWeight: "800",
//     color: "#16AB4C",
//     textTransform: "uppercase",
//   },
//   itemName: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1A1A1A",
//     lineHeight: 20,
//   },
//   itemQty: { fontSize: 13, color: "#777", marginTop: 2 },
//   priceContainer: { alignItems: "flex-end", minWidth: 60, marginTop: 25 },
//   itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },

//   footerContent: { marginTop: 10 },
//   summaryBox: { backgroundColor: "#F9F9F9", borderRadius: 15, padding: 15 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   summaryLabel: { color: "#777", fontSize: 14 },
//   summaryValue: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//   },
//   totalLabel: { fontSize: 18, fontWeight: "800" },
//   totalValue: { fontSize: 22, fontWeight: "900", color: "#16AB4C" },

//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 10,
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEE",
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 8,
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 13, fontWeight: "700", color: "#666" },
//   activeMethodText: { color: "#16AB4C" },

//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 18,
//     borderRadius: 15,
//     alignItems: "center",
//     marginTop: 20,
//     elevation: 3,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
// });

// export default TableServices;

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";

// const { width } = Dimensions.get("window");

// export default function TableServicesScreen() {
//   const tables = [1, 2, 3, 4, 5, 6];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Table Management</Text>
//       <FlatList
//         data={tables}
//         numColumns={2}
//         keyExtractor={(item) => item.toString()}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.tableCard}>
//             <Text style={styles.tableNumber}>T{item}</Text>
//             <Text style={styles.status}>Available</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", padding: 20, paddingTop: 60 },
//   title: { fontSize: 26, fontWeight: "900", marginBottom: 20 },
//   row: { justifyContent: "space-between", marginBottom: 15 },
//   tableCard: {
//     width: (width - 60) / 2,
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 30,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEE",
//   },
//   tableNumber: { fontSize: 20, fontWeight: "800", color: "#16AB4C" },
//   status: { fontSize: 12, color: "#999", marginTop: 5 },
// });

//WORKING
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useOrders } from "../context/OrderContext"; // Siguraduhing tama ang path na ito
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function TableManagement() {
//   const { tableOrders } = useOrders();
//   const insets = useSafeAreaInsets();

//   // Helper function para i-render ang bawat table
//   const renderTable = (id: string) => {
//     // Kinukuha ang data sa context. Kung walang order, null ito.
//     const orderData = tableOrders[id];
//     const hasOrder = !!orderData;

//     return (
//       <TouchableOpacity
//         key={id}
//         activeOpacity={0.7}
//         style={[styles.tableCard, hasOrder && styles.occupiedTable]}
//         onPress={() => {
//           if (hasOrder) {
//             alert(
//               `Order ID: ${orderData?.orderId}\nType: ${
//                 orderData?.type
//               }\nTotal Amount: $${orderData?.total.toFixed(2)}`
//             );
//           } else {
//             alert(`Table ${id} is currently available.`);
//           }
//         }}
//       >
//         <View style={styles.tableHeader}>
//           <Text style={[styles.tableId, hasOrder && styles.occupiedText]}>
//             {id}
//           </Text>
//           {hasOrder && <View style={styles.activeDot} />}
//         </View>

//         <Text
//           style={[styles.tableStatus, hasOrder && styles.occupiedStatusText]}
//         >
//           {hasOrder ? "Occupied" : "Available"}
//         </Text>

//         {hasOrder && (
//           <Text style={styles.orderAmount}>${orderData?.total.toFixed(2)}</Text>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <View style={styles.headerSection}>
//         <Text style={styles.headerTitle}>Table Management</Text>
//         {/* <Text style={styles.subTitle}>Real-time floor monitor</Text> */}
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.grid}>
//           {/* I-render ang tables T1 hanggang T6 */}
//           {["T1", "T2", "T3", "T4", "T5", "T6"].map((id) => renderTable(id))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//   },
//   headerSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#1A1A1A",
//   },
//   subTitle: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 2,
//   },
//   scrollContent: {
//     padding: 15,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   tableCard: {
//     width: "48%",
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#EEE",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     minHeight: 120,
//     justifyContent: "center",
//   },
//   occupiedTable: {
//     backgroundColor: "#16AB4C",
//     borderColor: "#16AB4C",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   tableId: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#16AB4C",
//   },
//   activeDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#FFF",
//   },
//   occupiedText: {
//     color: "#FFF",
//   },
//   tableStatus: {
//     fontSize: 12,
//     color: "#999",
//     fontWeight: "600",
//   },
//   occupiedStatusText: {
//     color: "rgba(255,255,255,0.7)",
//   },
//   orderAmount: {
//     color: "#FFF",
//     fontWeight: "900",
//     marginTop: 10,
//     fontSize: 18,
//   },
// });

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from "react-native";
import { useOrders } from "../context/OrderContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Enable LayoutAnimation para sa Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TableManagement() {
  const { tableOrders } = useOrders();
  const insets = useSafeAreaInsets();

  // Fade animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Simple Fade-in animation pag-load ng screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // 2. Smooth transition kapag nagbago ang status ng table (Available -> Occupied)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [tableOrders]);

  const renderTable = (id: string) => {
    const orderData = tableOrders[id];
    const hasOrder = !!orderData;

    return (
      <TouchableOpacity
        key={id}
        activeOpacity={0.8}
        style={[styles.tableCard, hasOrder && styles.occupiedTable]}
        onPress={() => {
          if (hasOrder) {
            alert(
              `Order ID: ${orderData?.orderId}\nType: ${
                orderData?.type
              }\nTotal Amount: $${orderData?.total.toFixed(2)}`
            );
          } else {
            alert(`Table ${id} is available.`);
          }
        }}
      >
        <View style={styles.tableHeader}>
          <Text style={[styles.tableId, hasOrder && styles.occupiedText]}>
            {id}
          </Text>
          {hasOrder && <View style={styles.activeDot} />}
        </View>

        <Text
          style={[styles.tableStatus, hasOrder && styles.occupiedStatusText]}
        >
          {hasOrder ? "Occupied" : "Available"}
        </Text>

        {hasOrder && (
          <View style={styles.priceContainer}>
            <Text style={styles.orderAmount}>
              ${orderData?.total.toFixed(2)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      style={[styles.container, { paddingTop: insets.top, opacity: fadeAnim }]}
    >
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Table Management</Text>
        {/* <Text style={styles.subTitle}>Live Floor Monitor</Text> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {["T1", "T2", "T3", "T4", "T5", "T6"].map((id) => renderTable(id))}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 13,
    color: "#16AB4C",
    fontWeight: "600",
    marginTop: 2,
    textTransform: "uppercase",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tableCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    minHeight: 125,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    // Simple Shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  occupiedTable: {
    backgroundColor: "#16AB4C",
    borderColor: "#16AB4C",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  tableId: {
    fontSize: 20,
    fontWeight: "800",
    color: "#16AB4C",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
  },
  occupiedText: {
    color: "#FFF",
  },
  tableStatus: {
    fontSize: 12,
    color: "#999",
    fontWeight: "700",
  },
  occupiedStatusText: {
    color: "rgba(255,255,255,0.7)",
  },
  priceContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  orderAmount: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 18,
  },
});
