import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Para sa realistic loading
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Para sa navigation
import axios from "axios";
import NonVegIcon from "../../components/icon/MeatIcon";
import SuccessScreen from "@/app/Success";
import { SafeAreaView } from "react-native-safe-area-context"; // Dito dapat galing

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: string;
}

const imageMap: { [key: string]: any } = {
  "salad.png": require("../../assets/images/salad.png"),
  "burger.png": require("../../assets/images/burger.png"),
  "tacos.png": require("../../assets/images/tacos.png"),
  "orange_juice.png": require("../../assets/images/orange_juice.png"),
  "burger_fries.png": require("../../assets/images/burger_fries.png"),
  "sushi.png": require("../../assets/images/sushi.png"),
};

const TableServices = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState("Dine in");
  const [paymentMethod, setPaymentMethod] = useState("QR Code");
  const [isOrdering, setIsOrdering] = useState(false); // State para sa loading simulation

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5005/cart");
      setCartItems(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // EXACT CALCULATIONS
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.05;
  const total = subTotal + tax;

  // REALISTIC ORDER LOGIC
  const handlePlaceOrder = () => {
    setIsOrdering(true);

    // Simulate sending order to kitchen (1.5 seconds)
    setTimeout(() => {
      setIsOrdering(false);
      router.push("../Success"); // Lilipat sa success screen na ginawa natin kanina
    }, 1500);
  };

  const renderPaymentDetails = () => {
    if (paymentMethod === "QR Code") {
      return (
        <View style={styles.staticPaymentBox}>
          <Text style={styles.staticTitle}>Scan to Pay via GCash</Text>
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code" size={120} color="#007dfe" />
            <Text style={styles.staticSubtitle}>SmartPOS Restaurant</Text>
          </View>
        </View>
      );
    }

    if (paymentMethod === "Card" || paymentMethod === "Bank Transfer") {
      return (
        <View style={styles.staticPaymentBox}>
          <Text style={styles.staticTitle}>Bank Transfer Details</Text>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankLabel}>Bank:</Text>
            <Text style={styles.bankValue}>BDO Unibank</Text>
          </View>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankLabel}>Account Name:</Text>
            <Text style={styles.bankValue}>SmartPOS Corp.</Text>
          </View>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankLabel}>Account No:</Text>
            <Text style={styles.bankValue}>0012 3456 7890</Text>
          </View>
          <Text style={styles.staticInstruction}>
            Please send the screenshot of your receipt to the counter.
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderScrollableFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sub Total</Text>
          <Text style={styles.summaryValue}>${subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax 5 %</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        {[
          { id: "Cash", icon: "cash", lib: "MaterialCommunityIcons" },
          { id: "Card", icon: "card-outline", lib: "Ionicons" },
          { id: "QR Code", icon: "qr-code-outline", lib: "Ionicons" },
          { id: "Bank Transfer", icon: "business-outline", lib: "Ionicons" },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.payBtn,
              paymentMethod === method.id && styles.activePayBtn,
            ]}
            onPress={() => setPaymentMethod(method.id)}
          >
            {method.lib === "Ionicons" ? (
              <Ionicons name={method.icon as any} size={20} color="black" />
            ) : (
              <MaterialCommunityIcons
                name={method.icon as any}
                size={20}
                color="black"
              />
            )}
            <Text style={styles.payText}>{method.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderPaymentDetails()}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedTopSection}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Table 1</Text>
            {/* UPDATED: Jacob Jones | 4 Pax */}
            <Text style={styles.subtitle}>Jacob Jones | 4 Pax</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.typeSelector}>
          {["Dine in", "Take Away", "Delivery"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                orderType === type && styles.activeTypeBtn,
              ]}
              onPress={() => setOrderType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  orderType === type && styles.activeTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Image source={imageMap[item.image]} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.tagRow}>
                {item.type === "Veg" ? (
                  <Ionicons name="leaf" size={12} color="#4CAF50" />
                ) : (
                  <NonVegIcon />
                )}
                <Text
                  style={[
                    styles.tagText,
                    { color: item.type === "Veg" ? "#4CAF50" : "#FF5252" },
                  ]}
                >
                  {item.type}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.qtyLabel}>x{item.quantity}</Text>
              </View>
            </View>
            <Text style={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
        ListFooterComponent={renderScrollableFooter}
      />

      <View style={styles.fixedActionContainer}>
        {/* UPDATED: Place Order with Loading Simulation */}
        <TouchableOpacity
          style={[
            styles.placeOrderBtn,
            isOrdering && { backgroundColor: "#81C784" },
          ]}
          onPress={handlePlaceOrder}
          disabled={isOrdering}
        >
          {isOrdering ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  fixedTopSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#999", fontSize: 13, fontWeight: "600" },
  editBtn: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 1,
  },
  typeSelector: {
    flexDirection: "row",
    backgroundColor: "#EEE",
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTypeBtn: { backgroundColor: "#B0E1BE", elevation: 1 },
  typeText: { color: "#666", fontWeight: "600", fontSize: 13 },
  activeTypeText: { color: "#000" },

  listPadding: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 160 },

  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: { width: 50, height: 50, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E1E",
    lineHeight: 18,
  },
  tagRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  tagText: { fontSize: 10, fontWeight: "700" },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  itemPrice: { fontSize: 13, color: "#4CAF50", fontWeight: "bold" },
  qtyLabel: { color: "#999", fontSize: 12 },
  itemTotal: { fontSize: 14, fontWeight: "800", color: "#4CAF50" },

  footerContainer: { marginTop: 10 },
  summaryCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  summaryLabel: { color: "#999", fontSize: 14 },
  summaryValue: { fontWeight: "700", fontSize: 14 },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: "800" },
  totalValue: { fontSize: 18, fontWeight: "900" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1E1E1E",
  },

  paymentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  payBtn: {
    width: "48%",
    height: 60,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 2,
  },
  activePayBtn: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  payText: { fontSize: 10, fontWeight: "700", textAlign: "center" },

  staticPaymentBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    padding: 20,
    marginTop: -10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },
  staticTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  qrPlaceholder: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  staticSubtitle: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  bankDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  bankLabel: { color: "#888", fontSize: 13 },
  bankValue: { fontWeight: "700", color: "#333", fontSize: 13 },
  staticInstruction: {
    fontSize: 11,
    color: "#4CAF50",
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },

  fixedActionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    elevation: 10,
  },
  placeOrderBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    minHeight: 56, // Para hindi gumalaw yung size pag lumabas ang loader
    justifyContent: "center",
  },
  placeOrderText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default TableServices;
