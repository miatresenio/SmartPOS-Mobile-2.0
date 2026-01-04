// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function splash() {
//   const router = useRouter();
//   const fadeAnim = new Animated.Value(0);

//   useEffect(() => {
//     // Simple fade-in animation para sa logo at text
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();

//     // Lipat sa (tabs) o sa main index pagkatapos ng 2.5 seconds
//     const timer = setTimeout(() => {
//       router.replace("/(tabs)"); // Siguraduhin na tama ang path ng main app mo
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         {/* Circular Green Logo */}
//         <View style={styles.logoContainer}>
//           <View style={styles.circle}>
//             <Ionicons name="bag-handle" size={60} color="#FFF" />
//           </View>
//         </View>

//         {/* Title sa Ilalim */}
//         <Text style={styles.title}>
//           Smart<Text style={styles.boldTitle}>POS</Text>
//         </Text>
//         <Text style={styles.subtitle}>Your Digital Business Partner</Text>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E8F5E9", // Light Green Background
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginBottom: 20,
//     // Soft shadow para sa logo
//     shadowColor: "#16AB4C",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   circle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#16AB4C", // Green Logo Background
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 32,
//     color: "#1E1E1E",
//     letterSpacing: 1,
//   },
//   boldTitle: {
//     fontWeight: "900",
//     color: "#16AB4C",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 5,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//   },
// });

// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Platform } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import Animated, {
//   FadeInDown,
//   ZoomIn,
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";

// export default function SplashScreen() {
//   const router = useRouter();

//   // Para sa floating effect ng logo
//   const translateY = useSharedValue(0);

//   useEffect(() => {
//     // Floating animation: aangat at bababa ang logo
//     translateY.value = withRepeat(
//       withSequence(
//         withTiming(-10, { duration: 1500 }),
//         withTiming(0, { duration: 1500 })
//       ),
//       -10, // Repeat indefinitely
//       true // Reverse animation
//     );

//     // Redirect after 3 seconds para makita mo sa iOS
//     const timer = setTimeout(() => {
//       router.replace("/(tabs)");
//     }, 3500);

//     return () => clearTimeout(timer);
//   }, []);

//   const floatingStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   return (
//     <View style={styles.container}>
//       {/* 1. Logo Animation (Zoom In + Floating) */}
//       <Animated.View
//         entering={ZoomIn.duration(800).springify()}
//         style={[styles.logoContainer, floatingStyle]}
//       >
//         <View style={styles.circle}>
//           <Ionicons name="bag-handle" size={60} color="#FFF" />
//         </View>
//       </Animated.View>

//       {/* 2. Text Animation (Fade In from Bottom) */}
//       <Animated.View entering={FadeInDown.delay(500).duration(800)}>
//         <Text style={styles.title}>
//           Smart<Text style={styles.boldTitle}>POS</Text>
//         </Text>
//         <Text style={styles.subtitle}>Your Digital Business Partner</Text>
//       </Animated.View>

//       {/* 3. Bottom Credits / Loading */}
//       <Animated.View
//         entering={FadeInDown.delay(1000).duration(800)}
//         style={styles.footer}
//       >
//         <Text style={styles.loadingText}>Initializing System...</Text>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginBottom: 25,
//     // iOS Shadow - mas malinaw sa iOS
//     shadowColor: "#16AB4C",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 8,
//   },
//   circle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#16AB4C",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 34,
//     color: "#1E1E1E",
//     letterSpacing: 1,
//     textAlign: "center",
//   },
//   boldTitle: {
//     fontWeight: "900",
//     color: "#16AB4C",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 5,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//     textAlign: "center",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 50,
//   },
//   loadingText: {
//     color: "#16AB4C",
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 1,
//   },
// });

// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Platform } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import Animated, {
//   FadeInDown,
//   ZoomIn,
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";

// export default function SplashScreen() {
//   const router = useRouter();

//   // Para sa floating effect ng logo
//   const translateY = useSharedValue(0);

//   useEffect(() => {
//     // Floating animation: aangat at bababa ang logo
//     translateY.value = withRepeat(
//       withSequence(
//         withTiming(-10, { duration: 1500 }),
//         withTiming(0, { duration: 1500 })
//       ),
//       -1, // Repeat indefinitely
//       true // Reverse animation
//     );

//     // FIXED REDIRECT: Splash -> Onboarding (Hindi na diretso sa tabs)
//     const timer = setTimeout(() => {
//       router.replace("/onboarding");
//     }, 3500);

//     return () => clearTimeout(timer);
//   }, []);

//   const floatingStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   return (
//     <View style={styles.container}>
//       {/* 1. Logo Animation (Zoom In + Floating) */}
//       <Animated.View
//         entering={ZoomIn.duration(800).springify()}
//         style={[styles.logoContainer, floatingStyle]}
//       >
//         <View style={styles.circle}>
//           <Ionicons name="bag-handle" size={60} color="#FFF" />
//         </View>
//       </Animated.View>

//       {/* 2. Text Animation (Fade In from Bottom) */}
//       <Animated.View entering={FadeInDown.delay(500).duration(800)}>
//         <Text style={styles.title}>
//           Smart<Text style={styles.boldTitle}>POS</Text>
//         </Text>
//         <Text style={styles.subtitle}>Your Digital Business Partner</Text>
//       </Animated.View>

//       {/* 3. Bottom Credits / Loading */}
//       <Animated.View
//         entering={FadeInDown.delay(1000).duration(800)}
//         style={styles.footer}
//       >
//         <Text style={styles.loadingText}>Initializing System...</Text>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginBottom: 25,
//     // iOS Shadow - optimized for professional look
//     shadowColor: "#16AB4C",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 8,
//   },
//   circle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#16AB4C",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 34,
//     color: "#1E1E1E",
//     letterSpacing: 1,
//     textAlign: "center",
//   },
//   boldTitle: {
//     fontWeight: "900",
//     color: "#16AB4C",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 5,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//     textAlign: "center",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 50,
//   },
//   loadingText: {
//     color: "#16AB4C",
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 1,
//   },
// });

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const translateY = useSharedValue(0);

  useEffect(() => {
    // FIXED: Easing.sin instead of Easing.sine
    translateY.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* OUTER: Entrance Only */}
      <Animated.View
        entering={ZoomIn.duration(800).easing(Easing.out(Easing.quad))}
        style={styles.logoContainer}
      >
        {/* INNER: Floating Only - This fixes the transform conflict warning */}
        <Animated.View style={floatingStyle}>
          <View style={styles.circle}>
            <Ionicons name="bag-handle" size={60} color="#FFF" />
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(500)
          .duration(800)
          .easing(Easing.out(Easing.quad))}
      >
        <Text style={styles.title}>
          Smart<Text style={styles.boldTitle}>POS</Text>
        </Text>
        <Text style={styles.subtitle}>Your Digital Business Partner</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(1000).duration(800)}
        style={styles.footer}
      >
        <Text style={styles.loadingText}>Initializing System...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 25,
    shadowColor: "#16AB4C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#16AB4C",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    color: "#1E1E1E",
    letterSpacing: 1,
    textAlign: "center",
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
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 50,
  },
  loadingText: {
    color: "#16AB4C",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
