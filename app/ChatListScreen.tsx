import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const CHAT_DATA = [
  {
    id: "1",
    name: "Kuya Jojo (Rider)",
    lastMsg: "I'm here in lobby, sir.",
    time: "12:45 AM",
    unread: 2,
    avatar: "https://i.pravatar.cc/150?u=jojo",
    online: true,
  },
  {
    id: "2",
    name: "John Doe",
    lastMsg: "Thank you! Order received.",
    time: "Kahapon",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?u=liza",
    online: false,
  },
  {
    id: "3",
    name: "SmartPOS Support",
    lastMsg: "How's your experience today?",
    time: "Jan 03",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?u=support",
    online: true,
  },
  {
    id: "4",
    name: "Rider Bong",
    lastMsg: "Okay, copy that.",
    time: "Jan 02",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?u=bong",
    online: false,
  },
];

export default function ChatListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const renderChatItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => alert(`Opening chat with ${item.name}`)}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.online && <View style={styles.onlineBadge} />}
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.nameText} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>

          <View style={styles.msgRow}>
            <Text
              style={[styles.lastMsg, item.unread > 0 && styles.unreadMsg]}
              numberOfLines={1}
            >
              {item.lastMsg}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="create-outline" size={24} color="#16AB4C" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={styles.searchSection}
      >
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder="Search messages..."
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </Animated.View>

      {/* List */}
      <FlatList
        data={CHAT_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
  backBtn: { width: 40 },
  iconBtn: { width: 40, alignItems: "flex-end" },
  searchSection: { paddingHorizontal: 20, marginBottom: 15 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
  },
  input: { flex: 1, fontSize: 14, color: "#333" },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  chatCard: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    gap: 15,
  },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#EEE",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#16AB4C",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  chatInfo: { flex: 1, gap: 4 },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    maxWidth: "70%",
  },
  timeText: { fontSize: 12, color: "#999" },
  msgRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMsg: { fontSize: 14, color: "#666", flex: 1 },
  unreadMsg: { color: "#1A1A1A", fontWeight: "600" },
  unreadBadge: {
    backgroundColor: "#16AB4C",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  separator: { height: 1, backgroundColor: "#F0F0F0" },
});
