// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import HomeHeader from "../../components/HomeHeader";
// import SearchBar from "../../components/SearchBar";
// import CategoryList from "../../components/CategoryList";
// import ProductCard from "../../components/ProfuctCard";
// import TableSelector from "@/components/TableSelector";
// import FloatingAI from "@/components/FloatingAI";
// import TopSelling from "@/components/TopSelling";
// import { Colors } from "@/types/colors";

// export default function HomeScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const isSearching = searchQuery.length > 0;

//   useEffect(() => {
//     // Note: Siguraduhin na running ang json-server mo sa port 5005
//     axios
//       .get("http://localhost:5005/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//       });
//   }, []);

//   const filteredProducts = products.filter((item: any) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         {/* FIXED TOP SECTION */}
//         <View style={styles.fixedHeader}>
//           <HomeHeader />
//           <View style={styles.searchWrapper}>
//             <SearchBar
//               value={searchQuery}
//               onChangeText={(text: string) => setSearchQuery(text)}
//             />
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* AI SMART ALERT: Simulation ng sinasabi ni Sir Tom na auto-notify */}
//           {!isSearching && (
//             <TouchableOpacity
//               style={styles.aiAlertBanner}
//               onPress={() => router.push("/ChatAI")} // Forwarded sa ChatAI base sa utos ni Sir Tom
//               activeOpacity={0.9}
//             >
//               <View style={styles.aiAlertLeft}>
//                 <View style={styles.aiIconCircle}>
//                   <Ionicons name="sparkles" size={18} color="#FFF" />
//                 </View>
//                 <View style={styles.aiTextContainer}>
//                   <Text style={styles.aiAlertTitle}>AI Stock Prediction</Text>
//                   <Text style={styles.aiAlertDesc}>
//                     Beef Patties & Lettuce are running low.
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.aiAlertBtn}>
//                 <Text style={styles.aiAlertBtnText}>Fix Now</Text>
//                 <Ionicons name="chevron-forward" size={14} color="#FFF" />
//               </View>
//             </TouchableOpacity>
//           )}

//           {!isSearching && (
//             <View style={styles.heroSection}>
//               <TopSelling />
//               <CategoryList />
//             </View>
//           )}

//           {/* PRODUCT RESULTS AREA */}
//           <View style={styles.mainGridSection}>
//             {isSearching && (
//               <Text style={styles.searchTitle}>
//                 Search Results ({filteredProducts.length})
//               </Text>
//             )}

//             <View style={styles.grid}>
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((item: any) => (
//                   <TouchableOpacity
//                     key={item.id}
//                     activeOpacity={0.8}
//                     onPress={() => setSelectedId(item.id)}
//                     style={styles.cardContainer}
//                   >
//                     <ProductCard
//                       item={item}
//                       isActive={selectedId === item.id}
//                     />
//                   </TouchableOpacity>
//                 ))
//               ) : (
//                 <View style={styles.noResultContainer}>
//                   <Text style={styles.noResultText}>
//                     Walang nahanap na "{searchQuery}"
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           {!isSearching && (
//             <View style={styles.tableSection}>
//               <TableSelector />
//             </View>
//           )}

//           <View style={{ height: 120 }} />
//         </ScrollView>

//         <FloatingAI />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//   },
//   fixedHeader: {
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//     zIndex: 10,
//     elevation: 2,
//   },
//   searchWrapper: {
//     paddingBottom: 10,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   aiAlertBanner: {
//     flexDirection: "row",
//     // backgroundColor: "#1E1E1E", // Dark professional look para standout
//     backgroundColor: "#F0FDF4",
//     marginHorizontal: 20,
//     marginTop: 15,
//     padding: 15,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   aiAlertLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   aiIconCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#16AB4C",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   aiTextContainer: {
//     flex: 1,
//   },
//   aiAlertTitle: {
//     color: Colors.green,
//     fontSize: 14,
//     fontWeight: "800",
//   },
//   aiAlertDesc: {
//     color: "#AAA",
//     fontSize: 12,
//     marginTop: 2,
//   },
//   aiAlertBtn: {
//     flexDirection: "row",
//     backgroundColor: Colors.green,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 12,
//     alignItems: "center",
//     gap: 4,
//   },
//   aiAlertBtnText: {
//     color: Colors.white,
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   heroSection: {
//     paddingTop: 10,
//   },
//   mainGridSection: {
//     paddingTop: 15,
//   },
//   searchTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#16AB4C",
//     paddingHorizontal: 25,
//     marginBottom: 10,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   cardContainer: {
//     width: "48%",
//     marginBottom: 10,
//   },
//   tableSection: {
//     marginTop: 10,
//   },
//   noResultContainer: {
//     width: "100%",
//     paddingVertical: 50,
//     alignItems: "center",
//   },
//   noResultText: {
//     color: "#999",
//     fontSize: 15,
//     fontWeight: "500",
//   },
// });

//New
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Modal,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import HomeHeader from "../../components/HomeHeader";
// import SearchBar from "../../components/SearchBar";
// import CategoryList from "../../components/CategoryList";
// import ProductCard from "../../components/ProfuctCard";
// import TableSelector from "@/components/TableSelector";
// import FloatingAI from "@/components/FloatingAI";
// import TopSelling from "@/components/TopSelling";
// import { Colors } from "@/types/colors";

// // Import natin ang TableServices UI para gamitin sa loob ng Modal
// import TableServices from "./TableServices";

// export default function HomeScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // --- NEW STATES FOR ORDERING FLOW ---
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const isSearching = searchQuery.length > 0;

//   useEffect(() => {
//     axios
//       .get("http://localhost:5005/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//       });
//   }, []);

//   // --- HANDLER PARA SA QUANTITY SELECTOR ---
//   const handleUpdateCart = (item: any, action: "add" | "remove") => {
//     setCartItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (action === "add") {
//         if (existing) {
//           return prev.map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//           );
//         }
//         setModalVisible(true); // Buksan ang modal sa unang add
//         return [...prev, { ...item, quantity: 1 }];
//       } else {
//         return prev
//           .map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
//           )
//           .filter((i) => i.quantity > 0);
//       }
//     });
//   };

//   const filteredProducts = products.filter((item: any) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         {/* FIXED TOP SECTION */}
//         <View style={styles.fixedHeader}>
//           <HomeHeader />
//           <View style={styles.searchWrapper}>
//             <SearchBar
//               value={searchQuery}
//               onChangeText={(text: string) => setSearchQuery(text)}
//             />
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           {!isSearching && (
//             <TouchableOpacity
//               style={styles.aiAlertBanner}
//               onPress={() => router.push("/ChatAI")}
//               activeOpacity={0.9}
//             >
//               <View style={styles.aiAlertLeft}>
//                 <View style={styles.aiIconCircle}>
//                   <Ionicons name="sparkles" size={18} color="#FFF" />
//                 </View>
//                 <View style={styles.aiTextContainer}>
//                   <Text style={styles.aiAlertTitle}>AI Stock Prediction</Text>
//                   <Text style={styles.aiAlertDesc}>
//                     Beef Patties & Lettuce are running low.
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.aiAlertBtn}>
//                 <Text style={styles.aiAlertBtnText}>Fix Now</Text>
//                 <Ionicons name="chevron-forward" size={14} color="#FFF" />
//               </View>
//             </TouchableOpacity>
//           )}

//           {!isSearching && (
//             <View style={styles.heroSection}>
//               <TopSelling />
//               <CategoryList />
//             </View>
//           )}

//           <View style={styles.mainGridSection}>
//             {isSearching && (
//               <Text style={styles.searchTitle}>
//                 Search Results ({filteredProducts.length})
//               </Text>
//             )}

//             <View style={styles.grid}>
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((item: any) => {
//                   const cartItem = cartItems.find((i) => i.id === item.id);
//                   return (
//                     <View key={item.id} style={styles.cardContainer}>
//                       <ProductCard
//                         item={item}
//                         isActive={selectedId === item.id}
//                         quantity={cartItem?.quantity || 0}
//                         onAdd={() => handleUpdateCart(item, "add")}
//                         onRemove={() => handleUpdateCart(item, "remove")}
//                       />
//                     </View>
//                   );
//                 })
//               ) : (
//                 <View style={styles.noResultContainer}>
//                   <Text style={styles.noResultText}>
//                     Walang nahanap na "{searchQuery}"
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           {!isSearching && (
//             <View style={styles.tableSection}>
//               <TableSelector />
//             </View>
//           )}

//           <View style={{ height: 120 }} />
//         </ScrollView>

//         {/* --- BOTTOM SHEET MODAL PARA SA ORDER SUMMARY --- */}
//         <Modal
//           visible={isModalVisible}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <View style={styles.dragHandle} />
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeBtn}
//                 >
//                   <Ionicons name="close-circle" size={24} color="#CCC" />
//                 </TouchableOpacity>
//               </View>

//               {/* Dito natin ni-reuse ang TableServices UI */}
//               <TableServices
//                 isModalMode={true}
//                 cartItems={cartItems}
//                 setCartItems={setCartItems}
//               />
//             </View>
//           </View>
//         </Modal>

//         <FloatingAI />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F9FA" },
//   fixedHeader: {
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//     zIndex: 10,
//     elevation: 2,
//   },
//   searchWrapper: { paddingBottom: 10 },
//   scrollContent: { flexGrow: 1 },
//   aiAlertBanner: {
//     flexDirection: "row",
//     backgroundColor: "#F0FDF4",
//     marginHorizontal: 20,
//     marginTop: 15,
//     padding: 15,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 4,
//   },
//   aiAlertLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
//   aiIconCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#16AB4C",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   aiTextContainer: { flex: 1 },
//   aiAlertTitle: { color: Colors.green, fontSize: 14, fontWeight: "800" },
//   aiAlertDesc: { color: "#AAA", fontSize: 12, marginTop: 2 },
//   aiAlertBtn: {
//     flexDirection: "row",
//     backgroundColor: Colors.green,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 12,
//     alignItems: "center",
//     gap: 4,
//   },
//   aiAlertBtnText: { color: Colors.white, fontSize: 12, fontWeight: "700" },
//   heroSection: { paddingTop: 10 },
//   mainGridSection: { paddingTop: 15 },
//   searchTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#16AB4C",
//     paddingHorizontal: 25,
//     marginBottom: 10,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   cardContainer: { width: "48%", marginBottom: 10 },
//   tableSection: { marginTop: 10 },
//   noResultContainer: {
//     width: "100%",
//     paddingVertical: 50,
//     alignItems: "center",
//   },
//   noResultText: { color: "#999", fontSize: 15, fontWeight: "500" },

//   // MODAL STYLES
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     height: "75%",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 20,
//   },
//   modalHeader: {
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   dragHandle: {
//     width: 40,
//     height: 5,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 3,
//   },
//   closeBtn: {
//     position: "absolute",
//     right: 20,
//     top: 10,
//   },
// });

// NEW WORKING
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Modal,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import HomeHeader from "../../components/HomeHeader";
// import SearchBar from "../../components/SearchBar";
// import CategoryList from "../../components/CategoryList";
// import ProductCard from "../../components/ProfuctCard";
// import TableSelector from "@/components/TableSelector";
// import FloatingAI from "@/components/FloatingAI";
// import TopSelling from "@/components/TopSelling";
// import { Colors } from "@/types/colors";
// import TableServices from "./TableServices";

// export default function HomeScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [isModalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5005/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.log("Error:", err));
//   }, []);

//   const handleUpdateCart = (item: any, action: "add" | "remove") => {
//     setCartItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (action === "add") {
//         if (existing) {
//           return prev.map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//           );
//         }
//         setModalVisible(true); // Lalabas ang modal sa unang add
//         return [...prev, { ...item, quantity: 1 }];
//       } else {
//         return prev
//           .map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
//           )
//           .filter((i) => i.quantity > 0);
//       }
//     });
//   };

//   const filteredProducts = products.filter((item: any) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         <View style={styles.fixedHeader}>
//           <HomeHeader />
//           <View style={styles.searchWrapper}>
//             <SearchBar
//               value={searchQuery}
//               onChangeText={(text: string) => setSearchQuery(text)}
//             />
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.grid}>
//             {filteredProducts.map((item: any) => {
//               const cartItem = cartItems.find((i) => i.id === item.id);
//               return (
//                 <View key={item.id} style={styles.cardContainer}>
//                   <ProductCard
//                     item={item}
//                     isActive={selectedId === item.id}
//                     quantity={cartItem?.quantity || 0}
//                     onAdd={() => handleUpdateCart(item, "add")}
//                     onRemove={() => handleUpdateCart(item, "remove")}
//                   />
//                 </View>
//               );
//             })}
//           </View>
//           <View style={styles.tableSection}>
//             <TableSelector />
//           </View>
//           <View style={{ height: 120 }} />
//         </ScrollView>

//         <Modal
//           visible={isModalVisible}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <TouchableOpacity
//               style={{ flex: 1 }}
//               activeOpacity={1}
//               onPress={() => setModalVisible(false)}
//             />
//             <View style={styles.modalContent}>
//               <View style={styles.dragIndicator} />
//               <TableServices
//                 cartItems={cartItems}
//                 setCartItems={setCartItems}
//                 onClose={() => setModalVisible(false)}
//               />
//             </View>
//           </View>
//         </Modal>

//         <FloatingAI />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F9FA" },
//   fixedHeader: {
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//     zIndex: 10,
//   },
//   searchWrapper: { paddingBottom: 10 },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   cardContainer: { width: "48%", marginBottom: 10 },
//   tableSection: { marginTop: 10 },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     height: "80%",
//   },
//   dragIndicator: {
//     width: 40,
//     height: 5,
//     backgroundColor: "#DDD",
//     borderRadius: 3,
//     alignSelf: "center",
//     marginTop: 10,
//   },
// });

// FIXED NAIDAGDAG NA YUNG UI SA TOPSELLING, AI BANNER & CATEGORY LIST
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Fixed import
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "../../components/SearchBar";
import CategoryList from "../../components/CategoryList"; // Restored
import ProductCard from "../../components/ProfuctCard";
import TableSelector from "@/components/TableSelector";
import FloatingAI from "@/components/FloatingAI";
import TopSelling from "@/components/TopSelling"; // Restored
import { Colors } from "@/types/colors";
import TableServices from "./TableServices";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Data States
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Cart & Modal States
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const isSearching = searchQuery.length > 0;

  useEffect(() => {
    // Palitan mo ito ng tamang IP Address mo kung nasa device ka (e.g., 192.168.x.x)
    axios
      .get("http://localhost:5005/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  // Logic: Add/Remove items + Open Modal on first add
  const handleUpdateCart = (item: any, action: "add" | "remove") => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (action === "add") {
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        setModalVisible(true); // Open modal pag nag-add ng bagong item
        return [...prev, { ...item, quantity: 1 }];
      } else {
        return prev
          .map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0);
      }
    });
  };

  const filteredProducts = products.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* FIXED HEADER */}
        <View style={styles.fixedHeader}>
          <HomeHeader />
          <View style={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* IBALIK NATIN ANG DASHBOARD SECTIONS (Kapag hindi nagse-search) */}
          {!isSearching && (
            <>
              {/* AI Alert Banner */}
              <TouchableOpacity
                style={styles.aiAlertBanner}
                onPress={() => router.push("/ChatAI")}
                activeOpacity={0.9}
              >
                <View style={styles.aiAlertLeft}>
                  <View style={styles.aiIconCircle}>
                    <Ionicons name="sparkles" size={18} color="#FFF" />
                  </View>
                  <View style={styles.aiTextContainer}>
                    <Text style={styles.aiAlertTitle}>AI Insights</Text>
                    <Text style={styles.aiAlertDesc}>
                      Beef Patties & Lettuce are running low.
                    </Text>
                  </View>
                </View>
                <View style={styles.aiAlertBtn}>
                  <Text style={styles.aiAlertBtnText}>Fix Now</Text>
                  <Ionicons name="chevron-forward" size={14} color="#FFF" />
                </View>
              </TouchableOpacity>

              {/* Top Selling & Categories */}
              <View style={styles.heroSection}>
                <TopSelling />
                <CategoryList />
              </View>
            </>
          )}

          {/* PRODUCT GRID SECTION */}
          <View style={styles.mainGridSection}>
            {isSearching && (
              <Text style={styles.searchTitle}>
                Search Results ({filteredProducts.length})
              </Text>
            )}

            <View style={styles.grid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item: any) => {
                  const cartItem = cartItems.find((i) => i.id === item.id);
                  return (
                    <View key={item.id} style={styles.cardContainer}>
                      <ProductCard
                        item={item}
                        isActive={selectedId === item.id}
                        quantity={cartItem?.quantity || 0} // Pass quantity
                        onAdd={() => handleUpdateCart(item, "add")}
                        onRemove={() => handleUpdateCart(item, "remove")}
                      />
                    </View>
                  );
                })
              ) : (
                <View style={styles.noResultContainer}>
                  <Text style={styles.noResultText}>
                    Walang nahanap na "{searchQuery}"
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* TABLE SELECTOR (Nasa baba) */}
          {/* {!isSearching && (
            <View style={styles.tableSection}>
              <TableSelector />
            </View>
          )} */}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* ORDER MODAL (Non-blocking) */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            {/* Click outside to close */}
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            />

            <View style={styles.modalContent}>
              <View style={styles.dragIndicator} />
              <TableServices
                cartItems={cartItems}
                setCartItems={setCartItems}
                onClose={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <FloatingAI />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  fixedHeader: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    zIndex: 10,
    elevation: 2,
  },
  searchWrapper: { paddingBottom: 10 },
  scrollContent: { flexGrow: 1 },

  // AI Alert Styles (Restored)
  aiAlertBanner: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  aiAlertLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  aiIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#16AB4C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aiTextContainer: { flex: 1 },
  aiAlertTitle: { color: Colors.green, fontSize: 14, fontWeight: "800" },
  aiAlertDesc: { color: "#AAA", fontSize: 12, marginTop: 2 },
  aiAlertBtn: {
    flexDirection: "row",
    backgroundColor: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
  },
  aiAlertBtnText: { color: Colors.white, fontSize: 12, fontWeight: "700" },

  // Sections
  heroSection: { paddingTop: 10 },
  mainGridSection: { paddingTop: 15 },
  searchTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16AB4C",
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cardContainer: { width: "48%", marginBottom: 10 },
  tableSection: { marginTop: 10 },
  noResultContainer: {
    width: "100%",
    paddingVertical: 50,
    alignItems: "center",
  },
  noResultText: { color: "#999", fontSize: 15, fontWeight: "500" },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "80%",
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#DDD",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
  },
});
