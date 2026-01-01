import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function splash() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Simple fade-in animation para sa logo at text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Lipat sa (tabs) o sa main index pagkatapos ng 2.5 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)"); // Siguraduhin na tama ang path ng main app mo
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Circular Green Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.circle}>
            <Ionicons name="bag-handle" size={60} color="#FFF" />
          </View>
        </View>

        {/* Title sa Ilalim */}
        <Text style={styles.title}>
          Smart<Text style={styles.boldTitle}>POS</Text>
        </Text>
        <Text style={styles.subtitle}>Your Digital Business Partner</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Light Green Background
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
    // Soft shadow para sa logo
    shadowColor: "#16AB4C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#16AB4C", // Green Logo Background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#1E1E1E",
    letterSpacing: 1,
  },
  boldTitle: {
    fontWeight: "900",
    color: "#16AB4C",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
