import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const TableSelector = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("1");

  useEffect(() => {
    // Note: Siguraduhin na ang backend ay nagbibigay ng 'capacity' field
    axios
      .get("http://localhost:5005/tables")
      .then((res) => setTables(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tables.map((table: any) => (
          <TouchableOpacity
            key={table.id}
            style={[
              styles.tableCard,
              selectedTable === table.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedTable(table.id)}
          >
            <View
              style={[
                styles.circle,
                selectedTable === table.id
                  ? styles.selectedCircle
                  : styles.unselectedCircle,
              ]}
            >
              <Text
                style={[
                  styles.tableName,
                  selectedTable === table.id && styles.selectedText,
                ]}
              >
                {table.name}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.waiterName}>{table.waiter}</Text>
              {/* Pinalitan ang Lorem Ipsum ng Pax Capacity */}
              <Text style={styles.status}>
                {table.capacity ? `${table.capacity} Pax` : "4 Pax"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#FFF", // Nilagyan ko ng background para malinis
  },
  container: { paddingHorizontal: 20, gap: 12 },
  tableCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EEE",
    minWidth: 130,
    // Konting shadow para premium feel
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCard: {
    borderColor: "#16AB4C", // SmartPOS Green
    backgroundColor: "#E8F5E9",
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  unselectedCircle: { backgroundColor: "#FFD700" }, // Gold/Yellow T1
  selectedCircle: { backgroundColor: "#16AB4C" }, // SmartPOS Green
  tableName: { fontSize: 13, fontWeight: "900", color: "#000" },
  selectedText: { color: "#FFF" },
  info: { marginLeft: 10, marginRight: 12 },
  waiterName: { fontSize: 11, fontWeight: "700", color: "#1E1E1E" },
  status: { fontSize: 10, color: "#16AB4C", fontWeight: "600" }, // Green text for Pax
});

export default TableSelector;
