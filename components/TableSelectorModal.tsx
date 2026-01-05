// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// // DEFINE INTERFACE PARA MAWALA ANG ERROR SA INDEX.TSX
// interface TableSelectorModalProps {
//   visible: boolean;
//   onClose: () => void;
//   cartItems: any[];
//   setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
// }

// const { height } = Dimensions.get("window");

// export default function TableSelectorModal({
//   visible,
//   onClose,
//   cartItems,
//   setCartItems,
// }: TableSelectorModalProps) {
//   const router = useRouter();
//   const [serviceType, setServiceType] = useState("Dine-in");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   const subTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const tax = subTotal * 0.05;
//   const total = subTotal + tax;

//   const handleCompleteOrder = () => {
//     setCartItems([]);
//     onClose();
//     router.push("/Success");
//   };

//   const methods = [
//     { id: "Cash", icon: "cash" },
//     { id: "Card", icon: "card-outline" },
//     { id: "QR Code", icon: "qr-code-outline" },
//     { id: "Bank", icon: "business-outline" },
//   ];

//   const serviceOptions = ["Dine-in", "Take-out", "Delivery"];

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <TouchableOpacity
//           style={{ flex: 1 }}
//           activeOpacity={1}
//           onPress={onClose}
//         />
//         <View style={styles.modalContent}>
//           <View style={styles.dragIndicator} />

//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Order Summary</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Ionicons name="close-circle" size={28} color="#DDD" />
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id.toString()}
//             showsVerticalScrollIndicator={false}
//             ListHeaderComponent={
//               <View style={styles.serviceSelectionBox}>
//                 <Text style={styles.smallSectionTitle}>Order Type</Text>
//                 <View style={styles.serviceTabContainer}>
//                   {serviceOptions.map((opt) => (
//                     <TouchableOpacity
//                       key={opt}
//                       onPress={() => setServiceType(opt)}
//                       style={[
//                         styles.serviceTab,
//                         serviceType === opt && styles.activeServiceTab,
//                       ]}
//                     >
//                       <Text
//                         style={[
//                           styles.serviceTabText,
//                           serviceType === opt && styles.activeServiceTabText,
//                         ]}
//                       >
//                         {opt}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
//             }
//             renderItem={({ item }) => (
//               <View style={styles.orderItem}>
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemQty}>
//                     Qty: {item.quantity} • {serviceType}
//                   </Text>
//                 </View>
//                 <Text style={styles.itemPrice}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Text>
//               </View>
//             )}
//             ListFooterComponent={
//               <View style={styles.footer}>
//                 <View style={styles.summaryBox}>
//                   <View style={styles.summaryRow}>
//                     <Text style={styles.summaryLabel}>Sub Total</Text>
//                     <Text style={styles.summaryValue}>
//                       ${subTotal.toFixed(2)}
//                     </Text>
//                   </View>
//                   <View style={styles.summaryRow}>
//                     <Text style={styles.summaryLabel}>Tax (5%)</Text>
//                     <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
//                   </View>
//                   <View style={styles.totalRow}>
//                     <Text style={styles.totalLabel}>Total</Text>
//                     <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
//                   </View>
//                 </View>

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
//             }
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     height: "85%",
//     padding: 20,
//   },
//   dragIndicator: {
//     width: 40,
//     height: 5,
//     backgroundColor: "#DDD",
//     borderRadius: 3,
//     alignSelf: "center",
//     marginBottom: 15,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerTitle: { fontSize: 22, fontWeight: "800" },
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
//   activeServiceTab: { backgroundColor: "#FFF", elevation: 2 },
//   serviceTabText: { fontSize: 13, fontWeight: "600", color: "#888" },
//   activeServiceTabText: { color: "#16AB4C", fontWeight: "700" },
//   orderItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   itemInfo: { flex: 1 },
//   itemName: { fontSize: 15, fontWeight: "700" },
//   itemQty: { fontSize: 12, color: "#999" },
//   itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },
//   footer: { marginTop: 20, paddingBottom: 40 },
//   summaryBox: { backgroundColor: "#F8F9FA", padding: 15, borderRadius: 15 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   summaryLabel: { color: "#777" },
//   summaryValue: { fontWeight: "700" },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopWidth: 1,
//     borderTopColor: "#EEE",
//     paddingTop: 10,
//   },
//   totalLabel: { fontSize: 18, fontWeight: "800" },
//   totalValue: { fontSize: 20, fontWeight: "900", color: "#16AB4C" },
//   sectionTitle: { fontSize: 18, fontWeight: "800", marginVertical: 15 },
//   paymentGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 10,
//   },
//   methodCard: {
//     width: "48%",
//     padding: 15,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#EEE",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 8,
//   },
//   activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
//   methodText: { fontWeight: "700", color: "#666" },
//   activeMethodText: { color: "#16AB4C" },
//   completeBtn: {
//     backgroundColor: "#16AB4C",
//     padding: 18,
//     borderRadius: 15,
//     alignItems: "center",
//     marginTop: 25,
//   },
//   completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
// });

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useOrders } from "../app/context/OrderContext"; // Import ang context hook

interface TableSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function TableSelectorModal({
  visible,
  onClose,
  cartItems,
  setCartItems,
}: TableSelectorModalProps) {
  const router = useRouter();
  const { assignOrderToTable } = useOrders(); // Gamitin ang function mula sa context
  const [serviceType, setServiceType] = useState("Dine-in");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const orderId = useMemo(
    () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    [visible]
  );

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.05;
  const total = subTotal + tax;

  const handleDeleteItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    if (updatedCart.length === 0) onClose();
  };

  const handleCompleteOrder = () => {
    // 1. I-save ang order sa Global State kung Dine-in
    if (serviceType === "Dine-in") {
      assignOrderToTable("T1", {
        orderId,
        items: cartItems,
        total: total,
        type: serviceType,
      });
    }

    // 2. Clear Cart at Close Modal
    setCartItems([]);
    onClose();
    router.push("/Success");
  };

  const methods = [
    { id: "Cash", icon: "cash" },
    {
      id: "Card",
      icon: "card-outline",
      details: "Visa/Mastercard Terminal #01",
    },
    {
      id: "QR Code",
      icon: "qr-code-outline",
      details: "GCash/Maya: 0912 345 6789",
    },
    { id: "Bank", icon: "business-outline", details: "BPI: 1234-5678-90" },
  ];

  const serviceOptions = ["Dine-in", "Take-out", "Delivery"];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />

          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Order Summary</Text>
              <Text style={styles.orderIdText}>{orderId}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#DDD" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
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
            }
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>
                    Qty: {item.quantity} • {serviceType}
                  </Text>
                </View>
                <View style={styles.itemRightAction}>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteItem(item.id)}
                    style={styles.deleteBtn}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Sub Total</Text>
                    <Text style={styles.summaryValue}>
                      ${subTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (5%)</Text>
                    <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Payment Method</Text>
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

                {paymentMethod !== "Cash" && (
                  <View style={styles.paymentDetailBox}>
                    <Ionicons
                      name="information-circle-outline"
                      size={16}
                      color="#16AB4C"
                    />
                    <Text style={styles.paymentDetailText}>
                      {methods.find((m) => m.id === paymentMethod)?.details}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.completeBtn}
                  onPress={handleCompleteOrder}
                >
                  <Text style={styles.completeBtnText}>Confirm Order</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
}

// ... Manatili ang styles mo sa ilalim ...

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "85%",
    padding: 20,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#DDD",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    letterSpacing: -0.5,
  },
  orderIdText: {
    fontSize: 13,
    color: "#16AB4C",
    fontWeight: "700",
    marginTop: 2,
  },
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
  activeServiceTab: { backgroundColor: "#FFF", elevation: 2 },
  serviceTabText: { fontSize: 13, fontWeight: "600", color: "#888" },
  activeServiceTabText: { color: "#16AB4C", fontWeight: "700" },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemRightAction: { flexDirection: "row", alignItems: "center", gap: 15 },
  itemName: { fontSize: 15, fontWeight: "700" },
  itemQty: { fontSize: 12, color: "#999" },
  itemPrice: { fontSize: 16, fontWeight: "800", color: "#16AB4C" },
  deleteBtn: { padding: 5 },
  footer: { marginTop: 20, paddingBottom: 40 },
  summaryBox: { backgroundColor: "#F8F9FA", padding: 15, borderRadius: 15 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { color: "#777" },
  summaryValue: { fontWeight: "700" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
  },
  totalLabel: { fontSize: 18, fontWeight: "800" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#16AB4C" },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginVertical: 15 },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  methodCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  activeMethod: { borderColor: "#16AB4C", backgroundColor: "#F0FDF4" },
  methodText: { fontWeight: "700", color: "#666" },
  activeMethodText: { color: "#16AB4C" },
  paymentDetailBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  paymentDetailText: { fontSize: 13, color: "#166534", fontWeight: "600" },
  completeBtn: {
    backgroundColor: "#16AB4C",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
  },
  completeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
});
