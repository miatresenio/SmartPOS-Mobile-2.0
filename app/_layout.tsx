import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/images/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Gawin nating initial route ang splash screen */}
      {/* <Stack.Screen name="splash" options={{ animation: "fade" }} />
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} /> */}
      {/* 1. Unang lilitaw na screen */}
      {/* 1. Redirector / Splash check */}
      <Stack.Screen name="index" />

      {/* 2. Onboarding */}
      <Stack.Screen name="onboarding" options={{ animation: "fade" }} />

      {/* 3. Auth Group (Eto yung kulang mo) */}
      <Stack.Screen name="(auth)" options={{ animation: "slide_from_right" }} />

      {/* 4. Main App */}
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />

      {/* 5. Modals */}
      <Stack.Screen name="Success" options={{ presentation: "modal" }} />
    </Stack>
  );
}
