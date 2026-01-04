// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function SignUp() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
//       <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//         <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//       </TouchableOpacity>

//       <View style={styles.header}>
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subText}>
//           Join SmartPOS and start managing your business.
//         </Text>
//       </View>

//       <View style={styles.form}>
//         <View style={styles.inputBox}>
//           <Ionicons
//             name="person-outline"
//             size={20}
//             color="#666"
//             style={styles.icon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <View style={styles.inputBox}>
//           <Ionicons
//             name="mail-outline"
//             size={20}
//             color="#666"
//             style={styles.icon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email Address"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.inputBox}>
//           <Ionicons
//             name="lock-closed-outline"
//             size={20}
//             color="#666"
//             style={styles.icon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.mainBtn}
//           onPress={() => router.replace("/login")}
//         >
//           <Text style={styles.mainBtnText}>Create Account</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => router.push("/login")}>
//           <Text style={styles.linkText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF" },
//   inner: { padding: 30, paddingTop: 60 },
//   backBtn: { marginBottom: 30 },
//   header: { marginBottom: 40 },
//   title: { fontSize: 32, fontWeight: "900", color: "#1A1A1A" },
//   subText: { fontSize: 16, color: "#777", marginTop: 10 },
//   form: { width: "100%" },
//   inputBox: {
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
//   icon: { marginRight: 10 },
//   input: { flex: 1, fontSize: 16, fontWeight: "500" },
//   mainBtn: {
//     backgroundColor: "#16AB4C",
//     height: 60,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   mainBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
//   footer: { flexDirection: "row", justifyContent: "center", marginTop: 40 },
//   footerText: { color: "#777", fontSize: 15 },
//   linkText: { color: "#16AB4C", fontWeight: "800", fontSize: 15 },
// });

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function SignUp() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <Animated.View entering={FadeInRight.duration(600)}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subText}>
          Start managing your restaurant professionally.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput style={styles.input} placeholder="Full Name" />
          </View>
          <View style={styles.inputBox}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputBox}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.mainBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { padding: 30, paddingTop: 60 },
  backBtn: { marginBottom: 30 },
  title: { fontSize: 32, fontWeight: "900", color: "#1A1A1A" },
  subText: { fontSize: 16, color: "#777", marginTop: 10, marginBottom: 40 },
  form: { width: "100%" },
  inputBox: {
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
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  mainBtn: {
    backgroundColor: "#16AB4C",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mainBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
});
