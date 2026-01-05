import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInRight } from "react-native-reanimated";

// I-import ang data mula sa iyong project structure
import DB_DATA from "../data/db.json";

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return { name: "alert-circle", color: "#FF9500", bg: "#FFF4E5" };
      case "success":
        return { name: "checkmark-circle", color: "#16AB4C", bg: "#E8F5E9" };
      default:
        return { name: "information-circle", color: "#007AFF", bg: "#E5F1FF" };
    }
  };

  const renderItem = ({ item, index }: any) => {
    const iconConfig = getIcon(item.type);

    return (
      <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
        <TouchableOpacity
          style={[styles.card, !item.read && styles.unreadCard]}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}
          >
            <Ionicons
              name={iconConfig.name as any}
              size={24}
              color={iconConfig.color}
            />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.row}>
              <Text style={styles.notifTitle}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notifDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.notifTime}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER WITH BACK BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#16AB4C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DB_DATA.notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backBtn: { padding: 5 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    flex: 1,
    marginLeft: 10,

    letterSpacing: -0.5,
  },
  markReadText: { fontSize: 12, color: "#16AB4C", fontWeight: "600" },
  listContent: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: "#16AB4C" },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifTitle: { fontSize: 15, fontWeight: "700", color: "#333" },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16AB4C",
  },
  notifDesc: { fontSize: 13, color: "#666", marginTop: 4, lineHeight: 18 },
  notifTime: { fontSize: 11, color: "#AAA", marginTop: 8 },
});
