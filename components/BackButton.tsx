import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/types/colors";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <Pressable onPress={() => router.back()}>
      <View style={styles.container}>
        <Ionicons name="arrow-back" size={27} color={Colors.green} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    marginLeft: 25,
    height: 30,
  },
});
