import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; // Siguraduhing dito galing

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* SMALLER, REFINED ICON SECTION */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-sharp" size={40} color="#16AB4C" />
          </View>
        </View>

        {/* REFINED TEXT CONTENT */}
        <View style={styles.textContainer}>
          <Text style={styles.statusText}>Order Successful</Text>
          <Text style={styles.title}>Sent to Kitchen</Text>
          <Text style={styles.desc}>
            The order for <Text style={styles.highlight}>Table 1 </Text>
            has been successfully placed and is now being prepared.
          </Text>
        </View>

        {/* ORDER INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Status</Text>
            <Text style={[styles.infoValue, { color: "#16AB4C" }]}>
              Preparing
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Table</Text>
            <Text style={styles.infoValue}>T-01</Text>
          </View>
        </View>
      </View>

      {/* FIXED BOTTOM BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80, // Pinaliit na natin
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9", // Light green background para mas malinis tingnan
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16AB4C",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E1E",
    textAlign: "center",
  },
  desc: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  highlight: {
    color: "#1E1E1E",
    fontWeight: "700",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#1E1E1E",
    fontWeight: "700",
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 18,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
