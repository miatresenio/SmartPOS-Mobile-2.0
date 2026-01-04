import { View } from "react-native";
import { Link } from "expo-router";
import { Button, Text } from "@react-navigation/elements";
import { Redirect } from "expo-router";

export default function Index() {
  // return <Redirect href="/(tabs)" />;
  return <Redirect href="/splash" />;
}
