// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = () => {
//     // Temporary bypass: Kahit anong input, papasok sa Home
//     router.replace("/(tabs)"); // Papunta sa main app tabs mo
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}
//       >
//         <View style={styles.inner}>
//           {/* Header */}
//           <View style={styles.headerContainer}>
//             <View style={styles.logoCircle}>
//               <Ionicons name="restaurant" size={40} color="#16AB4C" />
//             </View>
//             <Text style={styles.welcomeText}>Welcome Back</Text>
//             <Text style={styles.subText}>Sign in to continue to SmartPOS</Text>
//           </View>

//           {/* Form */}
//           <View style={styles.form}>
//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="mail-outline"
//                 size={20}
//                 color="#666"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email Address"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="lock-closed-outline"
//                 size={20}
//                 color="#666"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons
//                   name={showPassword ? "eye-outline" : "eye-off-outline"}
//                   size={20}
//                   color="#666"
//                 />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={styles.forgotPassword}>
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//               <Text style={styles.loginButtonText}>Login</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity>
//               <Text style={styles.signUpText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },
//   inner: {
//     flex: 1,
//     padding: 30,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 50,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#F0FDF4",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#1A1A1A",
//   },
//   subText: {
//     fontSize: 15,
//     color: "#777",
//     marginTop: 5,
//   },
//   form: {
//     width: "100%",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     borderRadius: 16,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     height: 60,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1A1A1A",
//     fontWeight: "500",
//   },
//   forgotPassword: {
//     alignSelf: "flex-end",
//     marginBottom: 30,
//   },
//   forgotText: {
//     color: "#16AB4C",
//     fontWeight: "700",
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: "#16AB4C",
//     height: 60,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#16AB4C",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   loginButtonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "800",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 40,
//   },
//   footerText: {
//     color: "#777",
//     fontSize: 15,
//   },
//   signUpText: {
//     color: "#16AB4C",
//     fontWeight: "800",
//     fontSize: 15,
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(800)} style={styles.inner}>
        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="restaurant" size={40} color="#16AB4C" />
          </View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Sign in to continue to SmartPOS</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { flex: 1, padding: 30, justifyContent: "center" },
  headerContainer: { alignItems: "center", marginBottom: 50 },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: "#F0FDF4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: { fontSize: 28, fontWeight: "900", color: "#1A1A1A" },
  subText: { fontSize: 15, color: "#777", marginTop: 5 },
  form: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 60,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#1A1A1A", fontWeight: "500" },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 30 },
  forgotText: { color: "#16AB4C", fontWeight: "700", fontSize: 14 },
  loginButton: {
    backgroundColor: "#16AB4C",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  loginButtonText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 40 },
  footerText: { color: "#777", fontSize: 15 },
  signUpText: { color: "#16AB4C", fontWeight: "800", fontSize: 15 },
});
