import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Dummy Data for Reservations
const RESERVATIONS_DATA = [
  {
    id: "1",
    customer: "Mark Anthony",
    time: "06:30 PM",
    date: "Dec 28, 2025",
    pax: 4,
    table: "T-05",
    status: "Confirmed",
    contact: "09123456789",
  },
  {
    id: "2",
    customer: "Sophia Ramos",
    time: "07:00 PM",
    date: "Dec 28, 2025",
    pax: 2,
    table: "T-02",
    status: "Pending",
    contact: "09987654321",
  },
  {
    id: "3",
    customer: "Chef Gelo",
    time: "08:15 PM",
    date: "Dec 28, 2025",
    pax: 8,
    table: "T-12",
    status: "Seated",
    contact: "09152436475",
  },
  {
    id: "4",
    customer: "Sir Tom",
    time: "09:00 PM",
    date: "Dec 28, 2025",
    pax: 3,
    table: "T-08",
    status: "Confirmed",
    contact: "09112223334",
  },
];

export default function ReservationScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "#16AB4C"; // Green
      case "Pending":
        return "#FF9800"; // Orange
      case "Seated":
        return "#2196F3"; // Blue
      default:
        return "#999";
    }
  };

  const renderReservationCard = ({
    item,
  }: {
    item: (typeof RESERVATIONS_DATA)[0];
  }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.contactText}>{item.contact}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.pax} Pax</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="restaurant-outline" size={16} color="#666" />
          <Text style={styles.infoText}>Table {item.table}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reservations</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={24} color="#16AB4C" />
          <Text style={styles.addBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      {/* Modern Tabs */}
      <View style={styles.tabContainer}>
        {["Upcoming", "Seated", "History"].map((tab) => (
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
        data={RESERVATIONS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderReservationCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No reservations found for today.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addBtnText: {
    color: "#16AB4C",
    fontWeight: "700",
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
    paddingBottom: 15,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },
  activeTab: {
    backgroundColor: "#16AB4C",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#FFF",
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  contactText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 15,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  actionBtn: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
});
