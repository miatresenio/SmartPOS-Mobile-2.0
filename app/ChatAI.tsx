import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

// Constants para sa backend ni Carl
const BASE_URL = "https://posagent-production.up.railway.app";
const APP_NAME = "Inventory_agent";
const USER_ID = "user_4";
const SESSION_ID = "s_004";

// PINAGSAMANG CONTEXT (Reservations + Deliveries + Static Inventory & Suppliers)
const BUSINESS_CONTEXT = `
SYSTEM CONTEXT (Tandaan mo ito AI):

CURRENT INVENTORY (Critical):
- Beef Patties: 5 pcs left (Critical)
- Lettuce: 2 kg left (Critical)
- Burger Buns: 12 pcs (Low)
- Ketchup: 8 bottles (Stable)
- Mayonnaise: 3 jars (Low)

SUPPLIER PREDICTION:
- FreshFarm Inc. has Lettuce and Beef Patties available for immediate delivery.
- QuickLogistics can accommodate the delivery within 2 hours.

RESERVATIONS:
- Mark Anthony (06:30 PM), Sophia Ramos (07:00 PM), Chef Gelo (08:15 PM), Sir Tom (09:00 PM).

DELIVERIES:
- James Reid (ORD-9921): On the Way (12 mins).
`;

const ChatAI = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  // WELCOMING MESSAGE IN ENGLISH (Requirement ni Sir Tom)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Welcome! SmartPOS AI here. I've analyzed your inventory and noticed some items are running low. How can I assist you with your orders or stock monitoring today?",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      try {
        await axios.post(`${BASE_URL}/session`, {
          appName: APP_NAME,
          userId: USER_ID,
          sessionId: SESSION_ID,
        });

        await axios.post(`${BASE_URL}/run`, {
          appName: APP_NAME,
          userId: USER_ID,
          sessionId: SESSION_ID,
          newMessage: {
            parts: [
              {
                text: `System Note: You are a professional AI Assistant. Here is the business status: ${BUSINESS_CONTEXT}. If the user asks for stock, list the items. If they ask for supplier, suggest FreshFarm Inc. If they agree to purchase, tell them you will process it.`,
              },
            ],
          },
        });
      } catch (err) {
        console.log("Context Error:", err);
      }
    };
    initSession();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, [messages]);

  // SIMULATED AI ALERT DIALOG (Requirement ni Sir Tom)
  const showAIPurchaseAlert = () => {
    Alert.alert(
      "AI Smart Purchase",
      "You're already SK for the supplies for the supplier using AI integration. Would you like to finalize the automated restock?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Proceed",
          onPress: () => {
            const confirmMsg = {
              id: Date.now().toString(),
              text: "Understood. AI has automatically sent the purchase order to FreshFarm Inc. I will notify you once the supplier confirms.",
              sender: "bot",
            };
            setMessages((prev) => [...prev, confirmMsg]);
          },
        },
      ]
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMsg = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/run`, {
        appName: APP_NAME,
        userId: USER_ID,
        sessionId: SESSION_ID,
        newMessage: {
          parts: [{ text: userText }],
        },
      });

      const aiResponse = response.data.response;
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);

      // TRIGGER: Kung ang sagot ng AI ay tungkol sa pag-order o supplier, ipakita ang Alert Dialog
      if (
        userText.toLowerCase().includes("order") ||
        userText.toLowerCase().includes("purchase") ||
        userText.toLowerCase().includes("yes")
      ) {
        setTimeout(() => showAIPurchaseAlert(), 1000);
      }
    } catch (err) {
      console.log("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          text: "I'm having trouble connecting to the server. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-circle" size={32} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SmartPOS AI Assistant</Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text
              style={[
                styles.text,
                item.sender === "user" ? styles.userText : styles.botText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#16AB4C" />
              <Text style={styles.loadingText}>
                AI is predicting stock levels...
              </Text>
            </View>
          ) : null
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask about burger ingredients or suppliers..."
            value={input}
            onChangeText={setInput}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendBtn, isLoading && { opacity: 0.5 }]}
            onPress={sendMessage}
            disabled={isLoading}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E1E1E" },
  chatList: { padding: 20 },
  bubble: { padding: 14, borderRadius: 20, marginBottom: 12, maxWidth: "85%" },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#16AB4C",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F3F3",
    borderBottomLeftRadius: 4,
  },
  userText: { color: "#FFF", fontWeight: "500" },
  botText: { color: "#333" },
  text: { fontSize: 15, lineHeight: 20 },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
  },
  sendBtn: {
    backgroundColor: "#16AB4C",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  loadingText: { fontSize: 12, color: "#999", fontStyle: "italic" },
});

export default ChatAI;
