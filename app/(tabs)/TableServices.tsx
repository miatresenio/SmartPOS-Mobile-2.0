// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator, // Para sa realistic loading
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router"; // Para sa navigation
// import axios from "axios";
// import NonVegIcon from "../../components/icon/MeatIcon";
// import SuccessScreen from "@/app/Success";
// import { SafeAreaView } from "react-native-safe-area-context"; // Dito dapat galing

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   type: string;
// }

// const imageMap: { [key: string]: any } = {
//   "salad.png": require("../../assets/images/salad.png"),
//   "burger.png": require("../../assets/images/burger.png"),
//   "tacos.png": require("../../assets/images/tacos.png"),
//   "orange_juice.png": require("../../assets/images/orange_juice.png"),
//   "burger_fries.png": require("../../assets/images/burger_fries.png"),
//   "sushi.png": require("../../assets/images/sushi.png"),
// };

// const TableServices = () => {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [orderType, setOrderType] = useState("Dine in");
//   const [paymentMethod, setPaymentMethod] = useState("QR Code");
//   const [isOrdering, setIsOrdering] = useState(false); // State para sa loading simulation

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("http://localhost:5005/cart");
//       setCartItems(res.data);
//     } catch (err) {
//       console.log("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // EXACT CALCULATIONS
//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   // REALISTIC ORDER LOGIC
//   const handlePlaceOrder = () => {
//     setIsOrdering(true);

//     // Simulate sending order to kitchen (1.5 seconds)
//     setTimeout(() => {
//       setIsOrdering(false);
//       router.push("../Success"); // Lilipat sa success screen na ginawa natin kanina
//     }, 1500);
//   };

//   const renderPaymentDetails = () => {
//     if (paymentMethod === "QR Code") {
//       return (
//         <View style={styles.staticPaymentBox}>
//           <Text style={styles.staticTitle}>Scan to Pay via GCash</Text>
//           <View style={styles.qrPlaceholder}>
//             <Ionicons name="qr-code" size={120} color="#007dfe" />
//             <Text style={styles.staticSubtitle}>SmartPOS Restaurant</Text>
//           </View>
//         </View>
//       );
//     }

//     if (paymentMethod === "Card" || paymentMethod === "Bank Transfer") {
//       return (
//         <View style={styles.staticPaymentBox}>
//           <Text style={styles.staticTitle}>Bank Transfer Details</Text>
//           <View style={styles.bankDetailRow}>
//             <Text style={styles.bankLabel}>Bank:</Text>
//             <Text style={styles.bankValue}>BDO Unibank</Text>
//           </View>
//           <View style={styles.bankDetailRow}>
//             <Text style={styles.bankLabel}>Account Name:</Text>
//             <Text style={styles.bankValue}>SmartPOS Corp.</Text>
//           </View>
//           <View style={styles.bankDetailRow}>
//             <Text style={styles.bankLabel}>Account No:</Text>
//             <Text style={styles.bankValue}>0012 3456 7890</Text>
//           </View>
//           <Text style={styles.staticInstruction}>
//             Please send the screenshot of your receipt to the counter.
//           </Text>
//         </View>
//       );
//     }
//     return null;
//   };

//   const renderScrollableFooter = () => (
//     <View style={styles.footerContainer}>
//       <View style={styles.summaryCard}>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryLabel}>Sub Total</Text>
//           <Text style={styles.summaryValue}>${subTotal.toFixed(2)}</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryLabel}>Tax 5 %</Text>
//           <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.summaryRow}>
//           <Text style={styles.totalLabel}>Total Amount</Text>
//           <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Payment Method</Text>
//       <View style={styles.paymentContainer}>
//         {[
//           { id: "Cash", icon: "cash", lib: "MaterialCommunityIcons" },
//           { id: "Card", icon: "card-outline", lib: "Ionicons" },
//           { id: "QR Code", icon: "qr-code-outline", lib: "Ionicons" },
//           { id: "Bank Transfer", icon: "business-outline", lib: "Ionicons" },
//         ].map((method) => (
//           <TouchableOpacity
//             key={method.id}
//             style={[
//               styles.payBtn,
//               paymentMethod === method.id && styles.activePayBtn,
//             ]}
//             onPress={() => setPaymentMethod(method.id)}
//           >
//             {method.lib === "Ionicons" ? (
//               <Ionicons name={method.icon as any} size={20} color="black" />
//             ) : (
//               <MaterialCommunityIcons
//                 name={method.icon as any}
//                 size={20}
//                 color="black"
//               />
//             )}
//             <Text style={styles.payText}>{method.id}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {renderPaymentDetails()}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.fixedTopSection}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Table 1</Text>
//             {/* UPDATED: Jacob Jones | 4 Pax */}
//             <Text style={styles.subtitle}>Jacob Jones | 4 Pax</Text>
//           </View>
//           <TouchableOpacity style={styles.editBtn}>
//             <Ionicons name="create-outline" size={20} color="black" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.typeSelector}>
//           {["Dine in", "Take Away", "Delivery"].map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 orderType === type && styles.activeTypeBtn,
//               ]}
//               onPress={() => setOrderType(type)}
//             >
//               <Text
//                 style={[
//                   styles.typeText,
//                   orderType === type && styles.activeTypeText,
//                 ]}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listPadding}
//         renderItem={({ item }) => (
//           <View style={styles.orderCard}>
//             <Image source={imageMap[item.image]} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <View style={styles.tagRow}>
//                 {item.type === "Veg" ? (
//                   <Ionicons name="leaf" size={12} color="#4CAF50" />
//                 ) : (
//                   <NonVegIcon />
//                 )}
//                 <Text
//                   style={[
//                     styles.tagText,
//                     { color: item.type === "Veg" ? "#4CAF50" : "#FF5252" },
//                   ]}
//                 >
//                   {item.type}
//                 </Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//                 <Text style={styles.qtyLabel}>x{item.quantity}</Text>
//               </View>
//             </View>
//             <Text style={styles.itemTotal}>
//               ${(item.price * item.quantity).toFixed(2)}
//             </Text>
//           </View>
//         )}
//         ListFooterComponent={renderScrollableFooter}
//       />

//       <View style={styles.fixedActionContainer}>
//         {/* UPDATED: Place Order with Loading Simulation */}
//         <TouchableOpacity
//           style={[
//             styles.placeOrderBtn,
//             isOrdering && { backgroundColor: "#81C784" },
//           ]}
//           onPress={handlePlaceOrder}
//           disabled={isOrdering}
//         >
//           {isOrdering ? (
//             <ActivityIndicator color="#FFF" />
//           ) : (
//             <Text style={styles.placeOrderText}>Place Order</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F9F9F9" },
//   fixedTopSection: {
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 10,
//     backgroundColor: "#F9F9F9",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: { fontSize: 24, fontWeight: "bold" },
//   subtitle: { color: "#999", fontSize: 13, fontWeight: "600" },
//   editBtn: {
//     padding: 8,
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     elevation: 1,
//   },
//   typeSelector: {
//     flexDirection: "row",
//     backgroundColor: "#EEE",
//     borderRadius: 12,
//     padding: 4,
//     marginBottom: 10,
//   },
//   typeBtn: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   activeTypeBtn: { backgroundColor: "#B0E1BE", elevation: 1 },
//   typeText: { color: "#666", fontWeight: "600", fontSize: 13 },
//   activeTypeText: { color: "#000" },

//   listPadding: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 160 },

//   orderCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     padding: 12,
//     borderRadius: 15,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   itemImage: { width: 50, height: 50, borderRadius: 10 },
//   itemDetails: { flex: 1, marginLeft: 15 },
//   itemName: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#1E1E1E",
//     lineHeight: 18,
//   },
//   tagRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
//   tagText: { fontSize: 10, fontWeight: "700" },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 4,
//   },
//   itemPrice: { fontSize: 13, color: "#4CAF50", fontWeight: "bold" },
//   qtyLabel: { color: "#999", fontSize: 12 },
//   itemTotal: { fontSize: 14, fontWeight: "800", color: "#4CAF50" },

//   footerContainer: { marginTop: 10 },
//   summaryCard: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 3,
//   },
//   summaryLabel: { color: "#999", fontSize: 14 },
//   summaryValue: { fontWeight: "700", fontSize: 14 },
//   divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },
//   totalLabel: { fontSize: 16, fontWeight: "800" },
//   totalValue: { fontSize: 18, fontWeight: "900" },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 10,
//     color: "#1E1E1E",
//   },

//   paymentContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginBottom: 20,
//   },
//   payBtn: {
//     width: "48%",
//     height: 60,
//     borderWidth: 1,
//     borderColor: "#EEE",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     gap: 2,
//   },
//   activePayBtn: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
//   payText: { fontSize: 10, fontWeight: "700", textAlign: "center" },

//   staticPaymentBox: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: 15,
//     padding: 20,
//     marginTop: -10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#EEE",
//     alignItems: "center",
//   },
//   staticTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 15,
//   },
//   qrPlaceholder: {
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   staticSubtitle: {
//     marginTop: 10,
//     fontSize: 12,
//     color: "#666",
//     fontWeight: "600",
//   },
//   bankDetailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 8,
//   },
//   bankLabel: { color: "#888", fontSize: 13 },
//   bankValue: { fontWeight: "700", color: "#333", fontSize: 13 },
//   staticInstruction: {
//     fontSize: 11,
//     color: "#4CAF50",
//     fontStyle: "italic",
//     marginTop: 10,
//     textAlign: "center",
//   },

//   fixedActionContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#FFF",
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     paddingBottom: 25,
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//     elevation: 10,
//   },
//   placeOrderBtn: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 16,
//     borderRadius: 15,
//     alignItems: "center",
//     minHeight: 56, // Para hindi gumalaw yung size pag lumabas ang loader
//     justifyContent: "center",
//   },
//   placeOrderText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
// });

// export default TableServices;

//New Working
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// // 1. Dito natin idadagdag ang setCartItems sa interface para mawala ang red line sa index.tsx
// interface TableServicesProps {
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>; // Ito ang kailangang dagdag
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems, // Tinatanggap na natin ang prop dito
//   onClose,
// }) => {
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const tables = [1, 2, 3, 4, 5, 6];

//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const total = subTotal + subTotal * 0.05;

//   // Function para i-clear ang order pag tapos na (Paid)
//   const handleCompleteOrder = () => {
//     setCartItems([]); // Gagamitin ang setCartItems para i-reset ang cart
//     setViewingTable(null);
//     if (onClose) onClose();
//   };

//   const renderTableGrid = () => (
//     <View style={styles.grid}>
//       {tables.map((num) => (
//         <TouchableOpacity
//           key={num}
//           style={[
//             styles.tableCard,
//             num === 1 && cartItems.length > 0 && styles.activeTableCard,
//           ]}
//           onPress={() => setViewingTable(num)}
//         >
//           <Ionicons
//             name="restaurant-outline"
//             size={24}
//             color={num === 1 && cartItems.length > 0 ? "#FFF" : "#666"}
//           />
//           <Text
//             style={[
//               styles.tableNumber,
//               num === 1 && cartItems.length > 0 && styles.activeTableText,
//             ]}
//           >
//             Table {num}
//           </Text>
//           {num === 1 && cartItems.length > 0 && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{cartItems.length} Items</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   const renderOrderDetails = () => (
//     <View style={styles.detailsContainer}>
//       <TouchableOpacity
//         onPress={() => setViewingTable(null)}
//         style={styles.backBtn}
//       >
//         <Ionicons name="arrow-back" size={20} color="#16AB4C" />
//         <Text style={styles.backText}>Back to Dashboard</Text>
//       </TouchableOpacity>

//       <Text style={styles.detailTitle}>Table {viewingTable} Orders</Text>

//       <FlatList
//         data={viewingTable === 1 ? cartItems : []}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No active orders for this table.</Text>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.orderItem}>
//             <View>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
//             </View>
//             <Text style={styles.itemPrice}>
//               ${(item.price * item.quantity).toFixed(2)}
//             </Text>
//           </View>
//         )}
//       />

//       {viewingTable === 1 && cartItems.length > 0 && (
//         <View style={styles.summaryBox}>
//           <View style={styles.summaryRow}>
//             <Text style={styles.totalLabel}>Total Amount</Text>
//             <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.completeBtn}
//             onPress={handleCompleteOrder}
//           >
//             <Text style={styles.completeBtnText}>Place Order</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.mainTitle}>Table Services</Text>
//       {viewingTable ? renderOrderDetails() : renderTableGrid()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F9FA", padding: 20 },
//   mainTitle: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#1E1E1E",
//     marginBottom: 20,
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
//     alignItems: "center",
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//   },
//   activeTableCard: { backgroundColor: "#16AB4C" },
//   tableNumber: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginTop: 10,
//     color: "#1E1E1E",
//   },
//   activeTableText: { color: "#FFF" },
//   badge: {
//     backgroundColor: "#FFF",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   badgeText: { fontSize: 10, color: "#16AB4C", fontWeight: "800" },
//   detailsContainer: { flex: 1 },
//   backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
//   backText: { color: "#16AB4C", fontWeight: "700", marginLeft: 5 },
//   detailTitle: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 15,
//     marginBottom: 10,
//   },
//   itemName: { fontSize: 16, fontWeight: "600" },
//   itemQty: { fontSize: 13, color: "#999" },
//   itemPrice: { fontSize: 16, fontWeight: "700", color: "#16AB4C" },
//   emptyText: { textAlign: "center", color: "#999", marginTop: 50 },
//   summaryBox: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 20,
//     marginTop: 10,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   totalLabel: { fontSize: 16, fontWeight: "700" },
//   totalValue: { fontSize: 20, fontWeight: "900", color: "#16AB4C" },
//   completeBtn: {
//     backgroundColor: "#1E1E1E",
//     paddingVertical: 15,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   completeBtnText: { color: "#FFF", fontWeight: "700" },
// });

// export default TableServices;

// with payment method
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// interface TableServicesProps {
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems,
//   onClose,
// }) => {
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash"); // Default selection

//   const tables = [1, 2, 3, 4, 5, 6];

//   // Calculations
//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     setCartItems([]);
//     setViewingTable(null);
//     if (onClose) onClose();
//   };

//   // Payment Methods Data
//   const methods = [
//     { id: "Cash", icon: "cash", type: "MaterialCommunityIcons" },
//     { id: "Card", icon: "card", type: "Ionicons" },
//     { id: "QR Code", icon: "qr-code-outline", type: "Ionicons" },
//     { id: "Bank Transfer", icon: "bank", type: "MaterialCommunityIcons" },
//   ];

//   const renderOrderDetails = () => (
//     <View style={styles.detailsContainer}>
//       <TouchableOpacity
//         onPress={() => setViewingTable(null)}
//         style={styles.backBtn}
//       >
//         <Ionicons name="arrow-back" size={20} color="#16AB4C" />
//         <Text style={styles.backText}>Back to Dashboard</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={viewingTable === 1 ? cartItems : []}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <Text style={styles.detailTitle}>Table {viewingTable} Orders</Text>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.orderItem}>
//             <View>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
//             </View>
//             <Text style={styles.itemPrice}>
//               ${(item.price * item.quantity).toFixed(2)}
//             </Text>
//           </View>
//         )}
//         ListFooterComponent={
//           viewingTable === 1 && cartItems.length > 0 ? (
//             <View style={styles.footerContent}>
//               {/* Pricing Summary */}
//               <View style={styles.summaryBox}>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>Sub Total</Text>
//                   <Text style={styles.summaryValue}>
//                     ${subTotal.toFixed(2)}
//                   </Text>
//                 </View>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>Tax 5%</Text>
//                   <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
//                 </View>
//                 <View style={[styles.summaryRow, { marginTop: 10 }]}>
//                   <Text style={styles.totalLabel}>Total Amount</Text>
//                   <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//                 </View>
//               </View>

//               {/* Payment Method Selection */}
//               <Text style={styles.sectionTitle}>Payment Method</Text>
//               <View style={styles.paymentGrid}>
//                 {methods.map((m) => (
//                   <TouchableOpacity
//                     key={m.id}
//                     style={[
//                       styles.methodCard,
//                       paymentMethod === m.id && styles.activeMethod,
//                     ]}
//                     onPress={() => setPaymentMethod(m.id)}
//                   >
//                     {m.type === "Ionicons" ? (
//                       <Ionicons
//                         name={m.icon as any}
//                         size={24}
//                         color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                       />
//                     ) : (
//                       <MaterialCommunityIcons
//                         name={m.icon as any}
//                         size={24}
//                         color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                       />
//                     )}
//                     <Text
//                       style={[
//                         styles.methodText,
//                         paymentMethod === m.id && styles.activeMethodText,
//                       ]}
//                     >
//                       {m.id}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               {/* Bank Details / QR View */}
//               {paymentMethod === "Bank Transfer" && (
//                 <View style={styles.infoBox}>
//                   <Text style={styles.infoTitle}>Bank Transfer Details</Text>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Bank:</Text>
//                     <Text style={styles.infoValue}>BDO Unibank</Text>
//                   </View>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Account Name:</Text>
//                     <Text style={styles.infoValue}>SmartPOS Corp.</Text>
//                   </View>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Account No:</Text>
//                     <Text style={styles.infoValue}>0012 3456 7890</Text>
//                   </View>
//                   <Text style={styles.infoFooter}>
//                     Please send the screenshot of your receipt to the counter.
//                   </Text>
//                 </View>
//               )}

//               {paymentMethod === "QR Code" && (
//                 <View style={styles.infoBox}>
//                   <Text style={styles.infoTitle}>Scan to Pay via GCash</Text>
//                   <Image
//                     source={{
//                       uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SmartPOS",
//                     }}
//                     style={styles.qrImage}
//                   />
//                   <Text style={styles.qrSub}>SmartPOS Restaurant</Text>
//                 </View>
//               )}

//               <TouchableOpacity
//                 style={styles.completeBtn}
//                 onPress={handleCompleteOrder}
//               >
//                 <Text style={styles.completeBtnText}>Place Order</Text>
//               </TouchableOpacity>
//             </View>
//           ) : null
//         }
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.mainTitle}>Table Services</Text>
//       {viewingTable ? (
//         renderOrderDetails()
//       ) : (
//         <View style={styles.grid}>
//           {tables.map((num) => (
//             <TouchableOpacity
//               key={num}
//               style={[
//                 styles.tableCard,
//                 num === 1 && cartItems.length > 0 && styles.activeTableCard,
//               ]}
//               onPress={() => setViewingTable(num)}
//             >
//               <Ionicons
//                 name="restaurant-outline"
//                 size={24}
//                 color={num === 1 && cartItems.length > 0 ? "#FFF" : "#666"}
//               />
//               <Text
//                 style={[
//                   styles.tableNumber,
//                   num === 1 && cartItems.length > 0 && styles.activeTableText,
//                 ]}
//               >
//                 Table {num}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
//   mainTitle: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   tableCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   activeTableCard: { backgroundColor: "#16AB4C" },
//   tableNumber: { fontSize: 16, fontWeight: "700", marginTop: 10 },
//   activeTableText: { color: "#FFF" },
//   detailsContainer: { flex: 1 },
//   backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   backText: { color: "#16AB4C", fontWeight: "700", marginLeft: 5 },
//   detailTitle: { fontSize: 22, fontWeight: "800", marginVertical: 15 },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   itemName: { fontSize: 15, fontWeight: "600" },
//   itemQty: { fontSize: 12, color: "#999" },
//   itemPrice: { fontSize: 15, fontWeight: "700", color: "#16AB4C" },
//   footerContent: { marginTop: 20, paddingBottom: 50 },
//   summaryBox: { marginBottom: 20 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   summaryLabel: { color: "#666" },
//   summaryValue: { fontWeight: "700" },
//   totalLabel: { fontSize: 18, fontWeight: "800" },
//   totalValue: { fontSize: 20, fontWeight: "900", color: "#16AB4C" },
//   sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 15 },
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "transparent",
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 12, fontWeight: "700", marginTop: 8, color: "#666" },
//   activeMethodText: { color: "#16AB4C" },
//   infoBox: {
//     backgroundColor: "#F8F9FA",
//     padding: 15,
//     borderRadius: 20,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   infoTitle: { fontWeight: "800", marginBottom: 10, fontSize: 14 },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 5,
//   },
//   infoLabel: { color: "#666", fontSize: 13 },
//   infoValue: { fontWeight: "700", fontSize: 13 },
//   infoFooter: {
//     fontSize: 11,
//     fontStyle: "italic",
//     color: "#16AB4C",
//     marginTop: 10,
//     textAlign: "center",
//   },
//   qrImage: { width: 120, height: 120, marginVertical: 10 },
//   qrSub: { fontWeight: "700", color: "#666" },
//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 18,
//     borderRadius: 18,
//     alignItems: "center",
//     marginTop: 25,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
// });

// export default TableServices;

// WORKING NICE PERO WALANG LAMAN YUNG TABLE 1 NA CARD
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router"; // Import router para sa navigation

// interface TableServicesProps {
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems,
//   onClose,
// }) => {
//   const router = useRouter(); // Initialize router
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   const tables = [1, 2, 3, 4, 5, 6];

//   // Calculations
//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   // FIXED FUNCTION: Ngayon mag-clear na ang cart at lilipat sa Success screen
//   const handleCompleteOrder = () => {
//     // 1. Clear the cart items
//     setCartItems([]);

//     // 2. Reset local state
//     setViewingTable(null);

//     // 3. Close the modal in HomeScreen
//     if (onClose) onClose();

//     // 4. Navigate to Success screen
//     router.push("/Success");
//   };

//   const methods = [
//     { id: "Cash", icon: "cash", type: "MaterialCommunityIcons" },
//     { id: "Card", icon: "card", type: "Ionicons" },
//     { id: "QR Code", icon: "qr-code-outline", type: "Ionicons" },
//     { id: "Bank Transfer", icon: "bank", type: "MaterialCommunityIcons" },
//   ];

//   const renderOrderDetails = () => (
//     <View style={styles.detailsContainer}>
//       <TouchableOpacity
//         onPress={() => setViewingTable(null)}
//         style={styles.backBtn}
//       >
//         <Ionicons name="arrow-back" size={20} color="#16AB4C" />
//         <Text style={styles.backText}>Back to Dashboard</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={viewingTable === 1 ? cartItems : []}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <Text style={styles.detailTitle}>Table {viewingTable} Orders</Text>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.orderItem}>
//             <View>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
//             </View>
//             <Text style={styles.itemPrice}>
//               ${(item.price * item.quantity).toFixed(2)}
//             </Text>
//           </View>
//         )}
//         ListFooterComponent={
//           viewingTable === 1 && cartItems.length > 0 ? (
//             <View style={styles.footerContent}>
//               <View style={styles.summaryBox}>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>Sub Total</Text>
//                   <Text style={styles.summaryValue}>
//                     ${subTotal.toFixed(2)}
//                   </Text>
//                 </View>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>Tax 5%</Text>
//                   <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
//                 </View>
//                 <View style={[styles.summaryRow, { marginTop: 10 }]}>
//                   <Text style={styles.totalLabel}>Total Amount</Text>
//                   <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//                 </View>
//               </View>

//               <Text style={styles.sectionTitle}>Payment Method</Text>
//               <View style={styles.paymentGrid}>
//                 {methods.map((m) => (
//                   <TouchableOpacity
//                     key={m.id}
//                     style={[
//                       styles.methodCard,
//                       paymentMethod === m.id && styles.activeMethod,
//                     ]}
//                     onPress={() => setPaymentMethod(m.id)}
//                   >
//                     {m.type === "Ionicons" ? (
//                       <Ionicons
//                         name={m.icon as any}
//                         size={24}
//                         color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                       />
//                     ) : (
//                       <MaterialCommunityIcons
//                         name={m.icon as any}
//                         size={24}
//                         color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                       />
//                     )}
//                     <Text
//                       style={[
//                         styles.methodText,
//                         paymentMethod === m.id && styles.activeMethodText,
//                       ]}
//                     >
//                       {m.id}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               {paymentMethod === "Bank Transfer" && (
//                 <View style={styles.infoBox}>
//                   <Text style={styles.infoTitle}>Bank Transfer Details</Text>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Bank:</Text>
//                     <Text style={styles.infoValue}>BDO Unibank</Text>
//                   </View>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Account Name:</Text>
//                     <Text style={styles.infoValue}>SmartPOS Corp.</Text>
//                   </View>
//                   <View style={styles.infoRow}>
//                     <Text style={styles.infoLabel}>Account No:</Text>
//                     <Text style={styles.infoValue}>0012 3456 7890</Text>
//                   </View>
//                   <Text style={styles.infoFooter}>
//                     Please send the screenshot of your receipt to the counter.
//                   </Text>
//                 </View>
//               )}

//               {paymentMethod === "QR Code" && (
//                 <View style={styles.infoBox}>
//                   <Text style={styles.infoTitle}>Scan to Pay via GCash</Text>
//                   <Image
//                     source={{
//                       uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SmartPOS",
//                     }}
//                     style={styles.qrImage}
//                   />
//                   <Text style={styles.qrSub}>SmartPOS Restaurant</Text>
//                 </View>
//               )}

//               <TouchableOpacity
//                 style={styles.completeBtn}
//                 onPress={handleCompleteOrder}
//               >
//                 <Text style={styles.completeBtnText}>Place Order</Text>
//               </TouchableOpacity>
//             </View>
//           ) : null
//         }
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.mainTitle}>Table Services</Text>
//       {viewingTable ? (
//         renderOrderDetails()
//       ) : (
//         <View style={styles.grid}>
//           {tables.map((num) => (
//             <TouchableOpacity
//               key={num}
//               style={[
//                 styles.tableCard,
//                 num === 1 && cartItems.length > 0 && styles.activeTableCard,
//               ]}
//               onPress={() => setViewingTable(num)}
//             >
//               <Ionicons
//                 name="restaurant-outline"
//                 size={24}
//                 color={num === 1 && cartItems.length > 0 ? "#FFF" : "#666"}
//               />
//               <Text
//                 style={[
//                   styles.tableNumber,
//                   num === 1 && cartItems.length > 0 && styles.activeTableText,
//                 ]}
//               >
//                 Table {num}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
//   mainTitle: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   tableCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   activeTableCard: { backgroundColor: "#16AB4C" },
//   tableNumber: { fontSize: 16, fontWeight: "700", marginTop: 10 },
//   activeTableText: { color: "#FFF" },
//   detailsContainer: { flex: 1 },
//   backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   backText: { color: "#16AB4C", fontWeight: "700", marginLeft: 5 },
//   detailTitle: { fontSize: 22, fontWeight: "800", marginVertical: 15 },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   itemName: { fontSize: 15, fontWeight: "600" },
//   itemQty: { fontSize: 12, color: "#999" },
//   itemPrice: { fontSize: 15, fontWeight: "700", color: "#16AB4C" },
//   footerContent: { marginTop: 20, paddingBottom: 50 },
//   summaryBox: { marginBottom: 20 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   summaryLabel: { color: "#666" },
//   summaryValue: { fontWeight: "700" },
//   totalLabel: { fontSize: 18, fontWeight: "800" },
//   totalValue: { fontSize: 20, fontWeight: "900", color: "#16AB4C" },
//   sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 15 },
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "transparent",
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 12, fontWeight: "700", marginTop: 8, color: "#666" },
//   activeMethodText: { color: "#16AB4C" },
//   infoBox: {
//     backgroundColor: "#F8F9FA",
//     padding: 15,
//     borderRadius: 20,
//     marginTop: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   infoTitle: { fontWeight: "800", marginBottom: 10, fontSize: 14 },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 5,
//   },
//   infoLabel: { color: "#666", fontSize: 13 },
//   infoValue: { fontWeight: "700", fontSize: 13 },
//   infoFooter: {
//     fontSize: 11,
//     fontStyle: "italic",
//     color: "#16AB4C",
//     marginTop: 10,
//     textAlign: "center",
//   },
//   qrImage: { width: 120, height: 120, marginVertical: 10 },
//   qrSub: { fontWeight: "700", color: "#666" },
//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 18,
//     borderRadius: 18,
//     alignItems: "center",
//     marginTop: 25,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
// });

// export default TableServices;

// NAGANA HAHAHHAHAHA PERO WALANG LAMAN CARD SA ILALIM, BANK AT QR
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// interface TableServicesProps {
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems,
//   onClose,
// }) => {
//   const router = useRouter();
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   // 1. MOCK DATA / PERSISTENT STATE para sa mga orders na "In Kitchen" na
//   const [tableOrders, setTableOrders] = useState<{ [key: number]: any[] }>({
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//     6: [],
//   });

//   const tables = [1, 2, 3, 4, 5, 6];

//   // Calculations for current active cart
//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     if (viewingTable) {
//       // I-save ang cart items sa history ng table
//       setTableOrders((prev) => ({
//         ...prev,
//         [viewingTable]: [...prev[viewingTable], ...cartItems],
//       }));

//       setCartItems([]); // Clear active cart
//       if (onClose) onClose();
//       router.push("/Success");
//     }
//   };

//   const methods = [
//     { id: "Cash", icon: "cash", type: "MaterialCommunityIcons" },
//     { id: "Card", icon: "card", type: "Ionicons" },
//     { id: "QR Code", icon: "qr-code-outline", type: "Ionicons" },
//     { id: "Bank Transfer", icon: "bank", type: "MaterialCommunityIcons" },
//   ];

//   const renderOrderDetails = () => {
//     // Combine history and current cart if viewing Table 1 (or specific table)
//     // Note: Sa logic mo, cartItems ay global. Sa production, dapat per table ito.
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
//           contentContainerStyle={{ paddingBottom: 100 }}
//           ListHeaderComponent={
//             <View style={styles.listHeader}>
//               <Text style={styles.sectionTitle}>Order Summary</Text>
//               {displayData.length === 0 && (
//                 <View style={styles.emptyContainer}>
//                   <Ionicons name="receipt-outline" size={60} color="#DDD" />
//                   <Text style={styles.emptyText}>No active orders yet.</Text>
//                 </View>
//               )}
//             </View>
//           }
//           renderItem={({ item, index }) => {
//             // Check if item is from history or new cart
//             const isHistory = index < historyItems.length;
//             return (
//               <View style={[styles.orderItem, isHistory && styles.historyItem]}>
//                 <View style={styles.orderItemLeft}>
//                   <View
//                     style={[
//                       styles.statusDot,
//                       { backgroundColor: isHistory ? "#16AB4C" : "#FFA500" },
//                     ]}
//                   />
//                   <View>
//                     <Text style={styles.itemName}>{item.name}</Text>
//                     <Text style={styles.itemQty}>
//                       Qty: {item.quantity} • {isHistory ? "Cooking" : "Pending"}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.itemPrice}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Text>
//               </View>
//             );
//           }}
//           ListFooterComponent={
//             activeItems.length > 0 ? (
//               <View style={styles.footerContent}>
//                 <View style={styles.divider} />

//                 {/* Summary Box */}
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

//                 {/* Payment Methods */}
//                 <Text style={styles.sectionTitle}>Payment Method</Text>
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
//                       {m.type === "Ionicons" ? (
//                         <Ionicons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       ) : (
//                         <MaterialCommunityIcons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       )}
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
//                   <Text style={styles.completeBtnText}>
//                     Confirm & Place Order
//                   </Text>
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
//             const hasActiveCart = num === 1 && cartItems.length > 0;
//             const hasHistory = tableOrders[num].length > 0;
//             const isActive = hasActiveCart || hasHistory;

//             return (
//               <TouchableOpacity
//                 style={[styles.tableCard, isActive && styles.activeTableCard]}
//                 onPress={() => setViewingTable(num)}
//                 activeOpacity={0.7}
//               >
//                 <View
//                   style={[
//                     styles.iconCircle,
//                     {
//                       backgroundColor: isActive
//                         ? "rgba(255,255,255,0.2)"
//                         : "#F0F0F0",
//                     },
//                   ]}
//                 >
//                   <Ionicons
//                     name="restaurant"
//                     size={24}
//                     color={isActive ? "#FFF" : "#666"}
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.tableNumber,
//                     isActive && styles.activeTableText,
//                   ]}
//                 >
//                   Table {num}
//                 </Text>

//                 {isActive && (
//                   <View style={styles.activeBadge}>
//                     <Text style={styles.activeBadgeText}>
//                       {hasActiveCart ? "Ordering" : "Occupied"}
//                     </Text>
//                   </View>
//                 )}
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
//     paddingTop: 65,
//   },
//   mainTitle: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#1A1A1A",
//     marginBottom: 20,
//   },
//   columnWrapper: { justifyContent: "space-between", marginBottom: 15 },

//   // Table Grid Styles
//   tableCard: {
//     width: (width - 55) / 2,
//     backgroundColor: "#F8F9FA",
//     borderRadius: 24,
//     padding: 20,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   activeTableCard: {
//     backgroundColor: "#16AB4C",
//     borderColor: "#16AB4C",
//     elevation: 8,
//     shadowColor: "#16AB4C",
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//   },
//   iconCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   tableNumber: { fontSize: 17, fontWeight: "700", color: "#444" },
//   activeTableText: { color: "#FFF" },
//   activeBadge: {
//     marginTop: 8,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   activeBadgeText: {
//     color: "#FFF",
//     fontSize: 10,
//     fontWeight: "800",
//     textTransform: "uppercase",
//   },

//   // Details Styles
//   detailsContainer: { flex: 1 },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backBtn: { flexDirection: "row", alignItems: "center" },
//   backText: {
//     color: "#16AB4C",
//     fontWeight: "700",
//     fontSize: 16,
//     marginLeft: 2,
//   },
//   headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
//   listHeader: { marginBottom: 10 },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//   },

//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   historyItem: { backgroundColor: "#FFF", borderColor: "#E8F5E9" },
//   orderItemLeft: { flexDirection: "row", alignItems: "center" },
//   statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
//   itemName: { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
//   itemQty: { fontSize: 13, color: "#777", marginTop: 2 },
//   itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },

//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: { color: "#AAA", marginTop: 10, fontSize: 15, fontWeight: "500" },

//   footerContent: { marginTop: 10 },
//   divider: { height: 1, backgroundColor: "#EEE", marginVertical: 20 },
//   summaryBox: { backgroundColor: "#FDFDFD", borderRadius: 20, padding: 5 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   summaryLabel: { color: "#777", fontSize: 14, fontWeight: "500" },
//   summaryValue: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//   },
//   totalLabel: { fontSize: 18, fontWeight: "800", color: "#1A1A1A" },
//   totalValue: { fontSize: 22, fontWeight: "900", color: "#16AB4C" },

//   // Payment Grid
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 1.5,
//     borderColor: "transparent",
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 13, fontWeight: "700", marginTop: 8, color: "#666" },
//   activeMethodText: { color: "#16AB4C" },

//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 20,
//     borderRadius: 20,
//     alignItems: "center",
//     marginTop: 20,
//     shadowColor: "#16AB4C",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
// });

// export default TableServices;

// OKAY NA MAY UI NA YUNG CADDS SA ILALIM
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// interface TableServicesProps {
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems,
//   onClose,
// }) => {
//   const router = useRouter();
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   const [tableOrders, setTableOrders] = useState<{ [key: number]: any[] }>({
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//     6: [],
//   });

//   const tables = [1, 2, 3, 4, 5, 6];

//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     if (viewingTable) {
//       setTableOrders((prev) => ({
//         ...prev,
//         [viewingTable]: [...prev[viewingTable], ...cartItems],
//       }));
//       setCartItems([]);
//       if (onClose) onClose();
//       router.push("/Success");
//     }
//   };

//   const methods = [
//     { id: "Cash", icon: "cash", type: "MaterialCommunityIcons" },
//     { id: "Card", icon: "card", type: "Ionicons" },
//     { id: "QR Code", icon: "qr-code-outline", type: "Ionicons" },
//     { id: "Bank Transfer", icon: "bank", type: "MaterialCommunityIcons" },
//   ];

//   // --- UI COMPONENTS PARA SA PAYMENT DETAILS ---
//   const renderPaymentDetails = () => {
//     if (paymentMethod === "Bank Transfer") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Bank Transfer Details</Text>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Bank:</Text>
//             <Text style={styles.infoValue}>BDO Unibank</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Account Name:</Text>
//             <Text style={styles.infoValue}>SmartPOS Corp.</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Account No:</Text>
//             <Text style={styles.infoValue}>0012 3456 7890</Text>
//           </View>
//           <Text style={styles.paymentFootnote}>
//             Please send the screenshot of your receipt to the counter.
//           </Text>
//         </View>
//       );
//     }

//     if (paymentMethod === "QR Code") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Scan to Pay via GCash</Text>
//           <View style={styles.qrPlaceholder}>
//             <Ionicons name="qr-code" size={120} color="#1A1A1A" />
//             <Text style={styles.qrBrand}>SmartPOS Restaurant</Text>
//           </View>
//           <Text style={styles.paymentFootnote}>
//             Show the successful transaction to our waiter.
//           </Text>
//         </View>
//       );
//     }

//     if (paymentMethod === "Card") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Credit / Debit Card</Text>
//           <View style={styles.cardInfoBox}>
//             <Ionicons name="card" size={30} color="#16AB4C" />
//             <Text style={styles.cardInfoText}>
//               Please use our POS terminal at the counter for card payments.
//             </Text>
//           </View>
//         </View>
//       );
//     }

//     return null; // No extra UI for Cash
//   };

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
//             <View style={styles.listHeader}>
//               <Text style={styles.sectionTitle}>Order Summary</Text>
//               {displayData.length === 0 && (
//                 <View style={styles.emptyContainer}>
//                   <Ionicons name="receipt-outline" size={60} color="#DDD" />
//                   <Text style={styles.emptyText}>No active orders yet.</Text>
//                 </View>
//               )}
//             </View>
//           }
//           renderItem={({ item, index }) => {
//             const isHistory = index < historyItems.length;
//             return (
//               <View style={[styles.orderItem, isHistory && styles.historyItem]}>
//                 <View style={styles.orderItemLeft}>
//                   <View
//                     style={[
//                       styles.statusDot,
//                       { backgroundColor: isHistory ? "#16AB4C" : "#FFA500" },
//                     ]}
//                   />
//                   <View>
//                     <Text style={styles.itemName}>{item.name}</Text>
//                     <Text style={styles.itemQty}>
//                       Qty: {item.quantity} • {isHistory ? "Cooking" : "Pending"}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.itemPrice}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Text>
//               </View>
//             );
//           }}
//           ListFooterComponent={
//             activeItems.length > 0 ? (
//               <View style={styles.footerContent}>
//                 <View style={styles.divider} />

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

//                 <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
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
//                       {m.type === "Ionicons" ? (
//                         <Ionicons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       ) : (
//                         <MaterialCommunityIcons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       )}
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

//                 {/* DITO LALABAS YUNG QR / BANK INFO */}
//                 {renderPaymentDetails()}

//                 <TouchableOpacity
//                   style={styles.completeBtn}
//                   onPress={handleCompleteOrder}
//                 >
//                   <Text style={styles.completeBtnText}>
//                     Confirm & Place Order
//                   </Text>
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
//                 <View
//                   style={[
//                     styles.iconCircle,
//                     {
//                       backgroundColor: isActive
//                         ? "rgba(255,255,255,0.2)"
//                         : "#F0F0F0",
//                     },
//                   ]}
//                 >
//                   <Ionicons
//                     name="restaurant"
//                     size={24}
//                     color={isActive ? "#FFF" : "#666"}
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.tableNumber,
//                     isActive && styles.activeTableText,
//                   ]}
//                 >
//                   Table {num}
//                 </Text>
//                 {isActive && (
//                   <View style={styles.activeBadge}>
//                     <Text style={styles.activeBadgeText}>Occupied</Text>
//                   </View>
//                 )}
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
//     paddingTop: 65,
//   },
//   mainTitle: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#1A1A1A",
//     marginBottom: 20,
//   },
//   columnWrapper: { justifyContent: "space-between", marginBottom: 15 },
//   tableCard: {
//     width: (width - 55) / 2,
//     backgroundColor: "#F8F9FA",
//     borderRadius: 24,
//     padding: 20,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   activeTableCard: {
//     backgroundColor: "#16AB4C",
//     borderColor: "#16AB4C",
//     elevation: 8,
//   },
//   iconCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   tableNumber: { fontSize: 17, fontWeight: "700", color: "#444" },
//   activeTableText: { color: "#FFF" },
//   activeBadge: {
//     marginTop: 8,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   activeBadgeText: {
//     color: "#FFF",
//     fontSize: 10,
//     fontWeight: "800",
//     textTransform: "uppercase",
//   },
//   detailsContainer: { flex: 1 },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backBtn: { flexDirection: "row", alignItems: "center" },
//   backText: {
//     color: "#16AB4C",
//     fontWeight: "700",
//     fontSize: 16,
//     marginLeft: 2,
//   },
//   headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
//   listHeader: { marginBottom: 10 },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//   },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   historyItem: { backgroundColor: "#FFF", borderColor: "#E8F5E9" },
//   orderItemLeft: { flexDirection: "row", alignItems: "center" },
//   statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
//   itemName: { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
//   itemQty: { fontSize: 13, color: "#777", marginTop: 2 },
//   itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: { color: "#AAA", marginTop: 10, fontSize: 15, fontWeight: "500" },
//   footerContent: { marginTop: 10 },
//   divider: { height: 1, backgroundColor: "#EEE", marginVertical: 20 },
//   summaryBox: { backgroundColor: "#FDFDFD", borderRadius: 20, padding: 5 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   summaryLabel: { color: "#777", fontSize: 14, fontWeight: "500" },
//   summaryValue: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//   },
//   totalLabel: { fontSize: 18, fontWeight: "800", color: "#1A1A1A" },
//   totalValue: { fontSize: 22, fontWeight: "900", color: "#16AB4C" },
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 1.5,
//     borderColor: "transparent",
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 13, fontWeight: "700", marginTop: 8, color: "#666" },
//   activeMethodText: { color: "#16AB4C" },
//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 20,
//     borderRadius: 20,
//     alignItems: "center",
//     marginTop: 25,
//     elevation: 5,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },

//   // --- NEW PAYMENT INFO STYLES ---
//   paymentInfoCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#EEE",
//   },
//   paymentInfoTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   infoLabel: { color: "#777", fontSize: 13 },
//   infoValue: { fontWeight: "700", color: "#1A1A1A", fontSize: 13 },
//   paymentFootnote: {
//     fontSize: 11,
//     color: "#16AB4C",
//     textAlign: "center",
//     marginTop: 15,
//     fontStyle: "italic",
//   },
//   qrPlaceholder: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     backgroundColor: "#FFF",
//     borderRadius: 15,
//   },
//   qrBrand: {
//     marginTop: 10,
//     fontWeight: "700",
//     color: "#666",
//     fontSize: 12,
//   },
//   cardInfoBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 15,
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 15,
//   },
//   cardInfoText: {
//     flex: 1,
//     fontSize: 12,
//     color: "#444",
//     lineHeight: 18,
//   },
// });

// export default TableServices;

// WORKING TO GUMAGANA
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// // FIX 1: Ginawang optional (?) ang props para hindi mag-error ang Navigation
// interface TableServicesProps {
//   cartItems?: any[];
//   setCartItems?: React.Dispatch<React.SetStateAction<any[]>>;
//   onClose?: () => void;
// }

// // FIX 2: Nilagyan ng default values (= []) ang destructuring
// const TableServices: React.FC<TableServicesProps> = ({
//   cartItems = [],
//   setCartItems = () => {},
//   onClose = () => {},
// }) => {
//   const router = useRouter();
//   const [viewingTable, setViewingTable] = useState<number | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   const [tableOrders, setTableOrders] = useState<{ [key: number]: any[] }>({
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//     6: [],
//   });

//   const tables = [1, 2, 3, 4, 5, 6];

//   // Logic for calculations
//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     if (viewingTable) {
//       setTableOrders((prev) => ({
//         ...prev,
//         [viewingTable]: [...prev[viewingTable], ...cartItems],
//       }));
//       setCartItems([]);
//       if (onClose) onClose();
//       router.push("/Success");
//     }
//   };

//   const methods = [
//     { id: "Cash", icon: "cash", type: "MaterialCommunityIcons" },
//     { id: "Card", icon: "card", type: "Ionicons" },
//     { id: "QR Code", icon: "qr-code-outline", type: "Ionicons" },
//     { id: "Bank Transfer", icon: "bank", type: "MaterialCommunityIcons" },
//   ];

//   const renderPaymentDetails = () => {
//     if (paymentMethod === "Bank Transfer") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Bank Transfer Details</Text>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Bank:</Text>
//             <Text style={styles.infoValue}>BDO Unibank</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Account Name:</Text>
//             <Text style={styles.infoValue}>SmartPOS Corp.</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Account No:</Text>
//             <Text style={styles.infoValue}>0012 3456 7890</Text>
//           </View>
//           <Text style={styles.paymentFootnote}>
//             Please send the screenshot of your receipt to the counter.
//           </Text>
//         </View>
//       );
//     }
//     if (paymentMethod === "QR Code") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Scan to Pay via GCash</Text>
//           <View style={styles.qrPlaceholder}>
//             <Ionicons name="qr-code" size={120} color="#1A1A1A" />
//             <Text style={styles.qrBrand}>SmartPOS Restaurant</Text>
//           </View>
//           <Text style={styles.paymentFootnote}>
//             Show the successful transaction to our waiter.
//           </Text>
//         </View>
//       );
//     }
//     if (paymentMethod === "Card") {
//       return (
//         <View style={styles.paymentInfoCard}>
//           <Text style={styles.paymentInfoTitle}>Credit / Debit Card</Text>
//           <View style={styles.cardInfoBox}>
//             <Ionicons name="card" size={30} color="#16AB4C" />
//             <Text style={styles.cardInfoText}>
//               Please use our POS terminal at the counter for card payments.
//             </Text>
//           </View>
//         </View>
//       );
//     }
//     return null;
//   };

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
//             <View style={styles.listHeader}>
//               <Text style={styles.sectionTitle}>Order Summary</Text>
//               {displayData.length === 0 && (
//                 <View style={styles.emptyContainer}>
//                   <Ionicons name="receipt-outline" size={60} color="#DDD" />
//                   <Text style={styles.emptyText}>No active orders yet.</Text>
//                 </View>
//               )}
//             </View>
//           }
//           renderItem={({ item, index }) => {
//             const isHistory = index < historyItems.length;
//             return (
//               <View style={[styles.orderItem, isHistory && styles.historyItem]}>
//                 <View style={styles.orderItemLeft}>
//                   <View
//                     style={[
//                       styles.statusDot,
//                       { backgroundColor: isHistory ? "#16AB4C" : "#FFA500" },
//                     ]}
//                   />
//                   <View>
//                     <Text style={styles.itemName}>{item.name}</Text>
//                     <Text style={styles.itemQty}>
//                       Qty: {item.quantity} • {isHistory ? "Cooking" : "Pending"}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.itemPrice}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Text>
//               </View>
//             );
//           }}
//           ListFooterComponent={
//             activeItems.length > 0 ? (
//               <View style={styles.footerContent}>
//                 <View style={styles.divider} />
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
//                 <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
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
//                       {m.type === "Ionicons" ? (
//                         <Ionicons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       ) : (
//                         <MaterialCommunityIcons
//                           name={m.icon as any}
//                           size={22}
//                           color={paymentMethod === m.id ? "#16AB4C" : "#666"}
//                         />
//                       )}
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
//                 {renderPaymentDetails()}
//                 <TouchableOpacity
//                   style={styles.completeBtn}
//                   onPress={handleCompleteOrder}
//                 >
//                   <Text style={styles.completeBtnText}>
//                     Confirm & Place Order
//                   </Text>
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
//                 <View
//                   style={[
//                     styles.iconCircle,
//                     {
//                       backgroundColor: isActive
//                         ? "rgba(255,255,255,0.2)"
//                         : "#F0F0F0",
//                     },
//                   ]}
//                 >
//                   <Ionicons
//                     name="restaurant"
//                     size={24}
//                     color={isActive ? "#FFF" : "#666"}
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.tableNumber,
//                     isActive && styles.activeTableText,
//                   ]}
//                 >
//                   Table {num}
//                 </Text>
//                 {isActive && (
//                   <View style={styles.activeBadge}>
//                     <Text style={styles.activeBadgeText}>Occupied</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// };

// // --- STYLES ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     paddingHorizontal: 20,
//     paddingTop: 65,
//   },
//   mainTitle: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#1A1A1A",
//     marginBottom: 20,
//   },
//   columnWrapper: { justifyContent: "space-between", marginBottom: 15 },
//   tableCard: {
//     width: (width - 55) / 2,
//     backgroundColor: "#F8F9FA",
//     borderRadius: 24,
//     padding: 20,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   activeTableCard: {
//     backgroundColor: "#16AB4C",
//     borderColor: "#16AB4C",
//     elevation: 8,
//   },
//   iconCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   tableNumber: { fontSize: 17, fontWeight: "700", color: "#444" },
//   activeTableText: { color: "#FFF" },
//   activeBadge: {
//     marginTop: 8,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   activeBadgeText: {
//     color: "#FFF",
//     fontSize: 10,
//     fontWeight: "800",
//     textTransform: "uppercase",
//   },
//   detailsContainer: { flex: 1 },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backBtn: { flexDirection: "row", alignItems: "center" },
//   backText: {
//     color: "#16AB4C",
//     fontWeight: "700",
//     fontSize: 16,
//     marginLeft: 2,
//   },
//   headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
//   listHeader: { marginBottom: 10 },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//   },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   historyItem: { backgroundColor: "#FFF", borderColor: "#E8F5E9" },
//   orderItemLeft: { flexDirection: "row", alignItems: "center" },
//   statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
//   itemName: { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
//   itemQty: { fontSize: 13, color: "#777", marginTop: 2 },
//   itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: { color: "#AAA", marginTop: 10, fontSize: 15, fontWeight: "500" },
//   footerContent: { marginTop: 10 },
//   divider: { height: 1, backgroundColor: "#EEE", marginVertical: 20 },
//   summaryBox: { backgroundColor: "#FDFDFD", borderRadius: 20, padding: 5 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   summaryLabel: { color: "#777", fontSize: 14, fontWeight: "500" },
//   summaryValue: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//   },
//   totalLabel: { fontSize: 18, fontWeight: "800", color: "#1A1A1A" },
//   totalValue: { fontSize: 22, fontWeight: "900", color: "#16AB4C" },
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   methodCard: {
//     width: "48%",
//     backgroundColor: "#F8F9FA",
//     padding: 16,
//     borderRadius: 18,
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 1.5,
//     borderColor: "transparent",
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontSize: 13, fontWeight: "700", marginTop: 8, color: "#666" },
//   activeMethodText: { color: "#16AB4C" },
//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     paddingVertical: 20,
//     borderRadius: 20,
//     alignItems: "center",
//     marginTop: 25,
//     elevation: 5,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
//   paymentInfoCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#EEE",
//   },
//   paymentInfoTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   infoLabel: { color: "#777", fontSize: 13 },
//   infoValue: { fontWeight: "700", color: "#1A1A1A", fontSize: 13 },
//   paymentFootnote: {
//     fontSize: 11,
//     color: "#16AB4C",
//     textAlign: "center",
//     marginTop: 15,
//     fontStyle: "italic",
//   },
//   qrPlaceholder: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     backgroundColor: "#FFF",
//     borderRadius: 15,
//   },
//   qrBrand: { marginTop: 10, fontWeight: "700", color: "#666", fontSize: 12 },
//   cardInfoBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 15,
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 15,
//   },
//   cardInfoText: { flex: 1, fontSize: 12, color: "#444", lineHeight: 18 },
// });

// // FIX 3: Siguraduhin na 'TableServices' ang exported default
// export default TableServices;

// BAGO
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface TableServicesProps {
  cartItems?: any[];
  setCartItems?: React.Dispatch<React.SetStateAction<any[]>>;
  onClose?: () => void;
}

const TableServices: React.FC<TableServicesProps> = ({
  cartItems = [],
  setCartItems = () => {},
  onClose = () => {},
}) => {
  const router = useRouter();
  const [viewingTable, setViewingTable] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [serviceType, setServiceType] = useState("Dine-in"); // Default selection

  const [tableOrders, setTableOrders] = useState<{ [key: number]: any[] }>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const tables = [1, 2, 3, 4, 5, 6];
  const serviceOptions = ["Dine-in", "Take-out", "Delivery"];

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.05;
  const total = subTotal + tax;

  const handleCompleteOrder = () => {
    if (viewingTable) {
      // Isasama natin yung serviceType sa order data
      const updatedItems = cartItems.map((item) => ({ ...item, serviceType }));
      setTableOrders((prev) => ({
        ...prev,
        [viewingTable]: [...prev[viewingTable], ...updatedItems],
      }));
      setCartItems([]);
      if (onClose) onClose();
      router.push("/Success");
    }
  };

  const methods = [
    { id: "Cash", icon: "cash" },
    { id: "Card", icon: "card-outline" },
    { id: "QR Code", icon: "qr-code-outline" },
    { id: "Bank", icon: "business-outline" },
  ];

  const renderOrderDetails = () => {
    const activeItems = viewingTable === 1 ? cartItems : [];
    const historyItems = tableOrders[viewingTable!] || [];
    const displayData = [...historyItems, ...activeItems];

    return (
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => setViewingTable(null)}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#16AB4C" />
            <Text style={styles.backText}>Tables</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Table {viewingTable}</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={displayData}
          keyExtractor={(_, index) => `order-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
          ListHeaderComponent={
            <View>
              {/* SERVICE TYPE SELECTION */}
              {activeItems.length > 0 && (
                <View style={styles.serviceSelectionBox}>
                  <Text style={styles.smallSectionTitle}>Order Type</Text>
                  <View style={styles.serviceTabContainer}>
                    {serviceOptions.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => setServiceType(opt)}
                        style={[
                          styles.serviceTab,
                          serviceType === opt && styles.activeServiceTab,
                        ]}
                      >
                        <Text
                          style={[
                            styles.serviceTabText,
                            serviceType === opt && styles.activeServiceTabText,
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              <Text style={styles.sectionTitle}>Order Summary</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const isHistory = index < historyItems.length;
            const orderID = `ORD-${202500 + index}`;
            const type = item.serviceType || serviceType;

            return (
              <View style={[styles.orderItem, isHistory && styles.historyItem]}>
                <View style={styles.itemTextContainer}>
                  <View style={styles.orderMetaRow}>
                    <Text style={styles.orderNumberText}>{orderID}</Text>
                    <View style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{type}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemName} numberOfLines={0}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemQty}>
                    Qty: {item.quantity} • {isHistory ? "Cooking" : "Pending"}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            activeItems.length > 0 ? (
              <View style={styles.footerContent}>
                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Sub Total</Text>
                    <Text style={styles.summaryValue}>
                      ${subTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Service Tax (5%)</Text>
                    <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                  </View>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                  Payment Method
                </Text>
                <View style={styles.paymentGrid}>
                  {methods.map((m) => (
                    <TouchableOpacity
                      key={m.id}
                      style={[
                        styles.methodCard,
                        paymentMethod === m.id && styles.activeMethod,
                      ]}
                      onPress={() => setPaymentMethod(m.id)}
                    >
                      <Ionicons
                        name={m.icon as any}
                        size={20}
                        color={paymentMethod === m.id ? "#16AB4C" : "#666"}
                      />
                      <Text
                        style={[
                          styles.methodText,
                          paymentMethod === m.id && styles.activeMethodText,
                        ]}
                      >
                        {m.id}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.completeBtn}
                  onPress={handleCompleteOrder}
                >
                  <Text style={styles.completeBtnText}>Confirm Order</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!viewingTable && <Text style={styles.mainTitle}>Table Services</Text>}
      {viewingTable ? (
        renderOrderDetails()
      ) : (
        <FlatList
          data={tables}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item: num }) => {
            const isActive =
              (num === 1 && cartItems.length > 0) ||
              tableOrders[num].length > 0;
            return (
              <TouchableOpacity
                style={[styles.tableCard, isActive && styles.activeTableCard]}
                onPress={() => setViewingTable(num)}
              >
                <Text
                  style={[
                    styles.tableNumber,
                    isActive && styles.activeTableText,
                  ]}
                >
                  Table {num}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  columnWrapper: { justifyContent: "space-between", marginBottom: 15 },
  tableCard: {
    width: (width - 55) / 2,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  activeTableCard: { backgroundColor: "#16AB4C", borderColor: "#16AB4C" },
  tableNumber: { fontSize: 17, fontWeight: "700", color: "#444" },
  activeTableText: { color: "#FFF" },
  detailsContainer: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: {
    color: "#16AB4C",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },

  // SERVICE SELECTION STYLES
  serviceSelectionBox: { marginBottom: 20 },
  smallSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    marginBottom: 10,
  },
  serviceTabContainer: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 4,
  },
  serviceTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeServiceTab: {
    backgroundColor: "#FFF",
    elevation: 2,
    shadowOpacity: 0.1,
  },
  serviceTabText: { fontSize: 13, fontWeight: "600", color: "#888" },
  activeServiceTabText: { color: "#16AB4C", fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  historyItem: { backgroundColor: "#FFF", borderColor: "#E8F5E9" },
  itemTextContainer: { flex: 1, marginRight: 10 },
  orderMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  orderNumberText: { fontSize: 11, fontWeight: "800", color: "#999" },
  serviceTag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  serviceTagText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#16AB4C",
    textTransform: "uppercase",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 20,
  },
  itemQty: { fontSize: 13, color: "#777", marginTop: 2 },
  priceContainer: { alignItems: "flex-end", minWidth: 60, marginTop: 25 },
  itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },

  footerContent: { marginTop: 10 },
  summaryBox: { backgroundColor: "#F9F9F9", borderRadius: 15, padding: 15 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { color: "#777", fontSize: 14 },
  summaryValue: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalLabel: { fontSize: 18, fontWeight: "800" },
  totalValue: { fontSize: 22, fontWeight: "900", color: "#16AB4C" },

  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  methodCard: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
  methodText: { fontSize: 13, fontWeight: "700", color: "#666" },
  activeMethodText: { color: "#16AB4C" },

  completeBtn: {
    backgroundColor: "#16AB4C",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
});

export default TableServices;
