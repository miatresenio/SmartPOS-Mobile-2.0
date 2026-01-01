import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "../../components/SearchBar";
import CategoryList from "../../components/CategoryList";
import ProductCard from "../../components/ProfuctCard";
import TableSelector from "@/components/TableSelector";
import FloatingAI from "@/components/FloatingAI";
import TopSelling from "@/components/TopSelling";
import { Colors } from "@/types/colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.length > 0;

  useEffect(() => {
    // Note: Siguraduhin na running ang json-server mo sa port 5005
    axios
      .get("http://localhost:5005/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  }, []);

  const filteredProducts = products.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* FIXED TOP SECTION */}
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
          {/* AI SMART ALERT: Simulation ng sinasabi ni Sir Tom na auto-notify */}
          {!isSearching && (
            <TouchableOpacity
              style={styles.aiAlertBanner}
              onPress={() => router.push("/ChatAI")} // Forwarded sa ChatAI base sa utos ni Sir Tom
              activeOpacity={0.9}
            >
              <View style={styles.aiAlertLeft}>
                <View style={styles.aiIconCircle}>
                  <Ionicons name="sparkles" size={18} color="#FFF" />
                </View>
                <View style={styles.aiTextContainer}>
                  <Text style={styles.aiAlertTitle}>AI Stock Prediction</Text>
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
          )}

          {!isSearching && (
            <View style={styles.heroSection}>
              <TopSelling />
              <CategoryList />
            </View>
          )}

          {/* PRODUCT RESULTS AREA */}
          <View style={styles.mainGridSection}>
            {isSearching && (
              <Text style={styles.searchTitle}>
                Search Results ({filteredProducts.length})
              </Text>
            )}

            <View style={styles.grid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item: any) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedId(item.id)}
                    style={styles.cardContainer}
                  >
                    <ProductCard
                      item={item}
                      isActive={selectedId === item.id}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noResultContainer}>
                  <Text style={styles.noResultText}>
                    Walang nahanap na "{searchQuery}"
                  </Text>
                </View>
              )}
            </View>
          </View>

          {!isSearching && (
            <View style={styles.tableSection}>
              <TableSelector />
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        <FloatingAI />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  fixedHeader: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    zIndex: 10,
    elevation: 2,
  },
  searchWrapper: {
    paddingBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  aiAlertBanner: {
    flexDirection: "row",
    // backgroundColor: "#1E1E1E", // Dark professional look para standout
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
  aiAlertLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  aiIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#16AB4C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiAlertTitle: {
    color: Colors.green,
    fontSize: 14,
    fontWeight: "800",
  },
  aiAlertDesc: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 2,
  },
  aiAlertBtn: {
    flexDirection: "row",
    backgroundColor: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
  },
  aiAlertBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  heroSection: {
    paddingTop: 10,
  },
  mainGridSection: {
    paddingTop: 15,
  },
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
  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },
  tableSection: {
    marginTop: 10,
  },
  noResultContainer: {
    width: "100%",
    paddingVertical: 50,
    alignItems: "center",
  },
  noResultText: {
    color: "#999",
    fontSize: 15,
    fontWeight: "500",
  },
});
