// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import AlertBanner from "@/components/AlertBanner";

// export default function AccountingScreen() {
//   const insets = useSafeAreaInsets();

//   // MOCK DATA PARA SA CHARTS
//   const bestSellers = [
//     { name: "Tasty Salad", sales: 85, color: "#16AB4C" },
//     { name: "Cheese Burger", sales: 70, color: "#34C759" },
//     { name: "Sushi Maki", sales: 45, color: "#FFD700" },
//   ];

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       {/* 1. HEADER SECTION */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Financial Reports</Text>
//           <Text style={styles.subtitle}>Daily Business Overview</Text>
//         </View>
//         <TouchableOpacity style={styles.filterBtn}>
//           <Ionicons name="calendar-outline" size={18} color="#16AB4C" />
//           <Text style={styles.filterText}>Today</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         {/* 2. INVENTORY ALERT */}
//         <AlertBanner />

//         <View style={styles.content}>
//           {/* 3. FINANCIAL SUMMARY CARDS */}
//           <View style={styles.summaryRow}>
//             <View style={[styles.card, { backgroundColor: "#E8F5E9" }]}>
//               <View style={styles.cardHeaderRow}>
//                 <Ionicons name="trending-up" size={20} color="#16AB4C" />
//                 <Text style={styles.percentageText}>+12%</Text>
//               </View>
//               <Text style={styles.cardLabel}>Total Revenue</Text>
//               <Text style={styles.cardValue}>$1,250.00</Text>
//             </View>

//             <View style={[styles.card, { backgroundColor: "#E3F2FD" }]}>
//               <View style={styles.cardHeaderRow}>
//                 <Ionicons name="receipt" size={20} color="#2196F3" />
//                 <Text style={[styles.percentageText, { color: "#2196F3" }]}>
//                   +5
//                 </Text>
//               </View>
//               <Text style={styles.cardLabel}>Total Orders</Text>
//               <Text style={styles.cardValue}>48</Text>
//             </View>
//           </View>

//           {/* 4. BEST SELLERS SECTION (CHART STYLE) */}
//           <View style={styles.chartCard}>
//             <Text style={styles.sectionTitle}>Most In-Demand</Text>
//             {bestSellers.map((item, index) => (
//               <View key={index} style={styles.chartRow}>
//                 <View style={styles.chartTextRow}>
//                   <Text style={styles.productName}>{item.name}</Text>
//                   <Text style={styles.salesValue}>{item.sales}%</Text>
//                 </View>
//                 <View style={styles.barBg}>
//                   <View
//                     style={[
//                       styles.barFill,
//                       { width: `${item.sales}%`, backgroundColor: item.color },
//                     ]}
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* 5. EXPENSES (PROFESSIONAL STRIP) */}
//           <View style={styles.expenseStrip}>
//             <View style={styles.expenseInfo}>
//               <View style={styles.iconCircle}>
//                 <MaterialCommunityIcons
//                   name="wallet-outline"
//                   size={20}
//                   color="#FF9800"
//                 />
//               </View>
//               <View>
//                 <Text style={styles.expenseLabel}>Operating Expenses</Text>
//                 <Text style={styles.expenseSub}>Utilities, Rent, Supplies</Text>
//               </View>
//             </View>
//             <Text style={styles.expenseValue}>$420.50</Text>
//           </View>

//           {/* 6. RECENT TRANSACTIONS */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Transactions</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.transactionList}>
//             <View style={styles.transactionItem}>
//               <View style={styles.transIcon}>
//                 <Ionicons name="fast-food-outline" size={18} color="#666" />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.transTitle}>Table 1 - Dine In</Text>
//                 <Text style={styles.transTime}>10:24 AM • ORD-9921</Text>
//               </View>
//               <Text style={styles.transAmount}>+$79.76</Text>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.transactionItem}>
//               <View style={styles.transIcon}>
//                 <Ionicons name="bicycle-outline" size={18} color="#666" />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.transTitle}>Delivery Order</Text>
//                 <Text style={styles.transTime}>09:15 AM • ORD-9920</Text>
//               </View>
//               <Text style={styles.transAmount}>+$45.00</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F9FB" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: "#FFF",
//   },
//   headerTitle: { fontSize: 22, fontWeight: "800", color: "#1E1E1E" },
//   subtitle: { fontSize: 12, color: "#999" },
//   filterBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0F9F2",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     gap: 5,
//   },
//   filterText: { color: "#16AB4C", fontWeight: "700", fontSize: 12 },
//   content: { padding: 20 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   card: { width: "48%", padding: 15, borderRadius: 20 },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   percentageText: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: "#16AB4C",
//     backgroundColor: "rgba(255,255,255,0.5)",
//     paddingHorizontal: 5,
//     borderRadius: 5,
//   },
//   cardLabel: { fontSize: 12, color: "#555", marginTop: 10, fontWeight: "600" },
//   cardValue: {
//     fontSize: 20,
//     fontWeight: "900",
//     color: "#1E1E1E",
//     marginTop: 2,
//   },
//   chartCard: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 25,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#1E1E1E",
//     marginBottom: 15,
//   },
//   chartRow: { marginBottom: 15 },
//   chartTextRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },
//   productName: { fontSize: 13, color: "#444", fontWeight: "500" },
//   salesValue: { fontSize: 13, fontWeight: "700" },
//   barBg: { height: 6, backgroundColor: "#F0F0F0", borderRadius: 3 },
//   barFill: { height: "100%", borderRadius: 3 },
//   expenseStrip: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 25,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   expenseInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
//   iconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#FFF3E0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   expenseLabel: { fontSize: 13, fontWeight: "700", color: "#1E1E1E" },
//   expenseSub: { fontSize: 10, color: "#999" },
//   expenseValue: { fontSize: 16, fontWeight: "800", color: "#FF9800" },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   seeAll: { fontSize: 12, color: "#16AB4C", fontWeight: "700" },
//   transactionList: { backgroundColor: "#FFF", borderRadius: 25, padding: 15 },
//   transactionItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 10,
//   },
//   transIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#F5F5F5",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   transTitle: { fontSize: 14, fontWeight: "700", color: "#1E1E1E" },
//   transTime: { fontSize: 11, color: "#999" },
//   transAmount: { fontSize: 14, fontWeight: "800", color: "#16AB4C" },
//   divider: { height: 1, backgroundColor: "#F5F5F5", marginVertical: 5 },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated"; // Added Reanimated
import AlertBanner from "@/components/AlertBanner";

export default function AccountingScreen() {
  const insets = useSafeAreaInsets();

  // MOCK DATA PARA SA CHARTS
  const bestSellers = [
    { name: "Tasty Salad", sales: 85, color: "#16AB4C" },
    { name: "Cheese Burger", sales: 70, color: "#34C759" },
    { name: "Sushi Maki", sales: 45, color: "#FFD700" },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 1. HEADER SECTION - Slide down effect */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Financial Reports</Text>
          <Text style={styles.subtitle}>Daily Business Overview</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="calendar-outline" size={18} color="#16AB4C" />
          <Text style={styles.filterText}>Today</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 2. INVENTORY ALERT */}
        <AlertBanner />

        <View style={styles.content}>
          {/* 3. FINANCIAL SUMMARY CARDS - Staggered entrance */}
          <View style={styles.summaryRow}>
            <Animated.View
              entering={FadeInDown.delay(200).duration(500)}
              style={[styles.card, { backgroundColor: "#E8F5E9" }]}
            >
              <View style={styles.cardHeaderRow}>
                <Ionicons name="trending-up" size={20} color="#16AB4C" />
                <Text style={styles.percentageText}>+12%</Text>
              </View>
              <Text style={styles.cardLabel}>Total Revenue</Text>
              <Text style={styles.cardValue}>$1,250.00</Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300).duration(500)}
              style={[styles.card, { backgroundColor: "#E3F2FD" }]}
            >
              <View style={styles.cardHeaderRow}>
                <Ionicons name="receipt" size={20} color="#2196F3" />
                <Text style={[styles.percentageText, { color: "#2196F3" }]}>
                  +5
                </Text>
              </View>
              <Text style={styles.cardLabel}>Total Orders</Text>
              <Text style={styles.cardValue}>48</Text>
            </Animated.View>
          </View>

          {/* 4. BEST SELLERS SECTION (CHART STYLE) */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.chartCard}
          >
            <Text style={styles.sectionTitle}>Most In-Demand</Text>
            {bestSellers.map((item, index) => (
              <View key={index} style={styles.chartRow}>
                <View style={styles.chartTextRow}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.salesValue}>{item.sales}%</Text>
                </View>
                <View style={styles.barBg}>
                  {/* Bar fill animation logic is handled by the initial render width */}
                  <View
                    style={[
                      styles.barFill,
                      { width: `${item.sales}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </Animated.View>

          {/* 5. EXPENSES STRIP */}
          <Animated.View
            entering={FadeInRight.delay(500).duration(500)}
            style={styles.expenseStrip}
          >
            <View style={styles.expenseInfo}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={20}
                  color="#FF9800"
                />
              </View>
              <View>
                <Text style={styles.expenseLabel}>Operating Expenses</Text>
                <Text style={styles.expenseSub}>Utilities, Rent, Supplies</Text>
              </View>
            </View>
            <Text style={styles.expenseValue}>$420.50</Text>
          </Animated.View>

          {/* 6. RECENT TRANSACTIONS */}
          <Animated.View entering={FadeInDown.delay(600).duration(500)}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionList}>
              <View style={styles.transactionItem}>
                <View style={styles.transIcon}>
                  <Ionicons name="fast-food-outline" size={18} color="#666" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transTitle}>Table 1 - Dine In</Text>
                  <Text style={styles.transTime}>10:24 AM • ORD-9921</Text>
                </View>
                <Text style={styles.transAmount}>+$79.76</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.transactionItem}>
                <View style={styles.transIcon}>
                  <Ionicons name="bicycle-outline" size={18} color="#666" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transTitle}>Delivery Order</Text>
                  <Text style={styles.transTime}>09:15 AM • ORD-9920</Text>
                </View>
                <Text style={styles.transAmount}>+$45.00</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    // Shadow for premium header
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 12, color: "#999" },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9F2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 5,
  },
  filterText: { color: "#16AB4C", fontWeight: "700", fontSize: 12 },
  content: { padding: 20 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: { width: "48%", padding: 15, borderRadius: 20 },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16AB4C",
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  cardLabel: { fontSize: 12, color: "#555", marginTop: 10, fontWeight: "600" },
  cardValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1E1E1E",
    marginTop: 2,
  },
  chartCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E1E",
    marginBottom: 15,
  },
  chartRow: { marginBottom: 15 },
  chartTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  productName: { fontSize: 13, color: "#444", fontWeight: "500" },
  salesValue: { fontSize: 13, fontWeight: "700" },
  barBg: { height: 6, backgroundColor: "#F0F0F0", borderRadius: 3 },
  barFill: { height: "100%", borderRadius: 3 },
  expenseStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  expenseInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
  },
  expenseLabel: { fontSize: 13, fontWeight: "700", color: "#1E1E1E" },
  expenseSub: { fontSize: 10, color: "#999" },
  expenseValue: { fontSize: 16, fontWeight: "800", color: "#FF9800" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: { fontSize: 12, color: "#16AB4C", fontWeight: "700" },
  transactionList: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  transIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  transTitle: { fontSize: 14, fontWeight: "700", color: "#1E1E1E" },
  transTime: { fontSize: 11, color: "#999" },
  transAmount: { fontSize: 14, fontWeight: "800", color: "#16AB4C" },
  divider: { height: 1, backgroundColor: "#F5F5F5", marginVertical: 5 },
});
