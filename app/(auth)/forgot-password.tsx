// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//         <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//       </TouchableOpacity>

//       <View style={styles.header}>
//         <View style={styles.iconCircle}>
//           <Ionicons name="key-outline" size={40} color="#16AB4C" />
//         </View>
//         <Text style={styles.title}>Forgot Password?</Text>
//         <Text style={styles.subText}>
//           Enter your email address and we'll send you instructions to reset your
//           password.
//         </Text>
//       </View>

//       <View style={styles.form}>
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
//           />
//         </View>

//         <TouchableOpacity style={styles.mainBtn}>
//           <Text style={styles.mainBtnText}>Send Reset Link</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", padding: 30, paddingTop: 60 },
//   backBtn: { marginBottom: 30 },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#F0FDF4",
//     borderRadius: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   header: { alignItems: "center", marginBottom: 40 },
//   title: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#1A1A1A",
//     textAlign: "center",
//   },
//   subText: {
//     fontSize: 15,
//     color: "#777",
//     marginTop: 10,
//     textAlign: "center",
//     lineHeight: 22,
//   },
//   form: { width: "100%" },
//   inputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     borderRadius: 16,
//     paddingHorizontal: 15,
//     marginBottom: 20,
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
//   },
//   mainBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
// });

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="mail-unread-outline" size={40} color="#16AB4C" />
        </View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subText}>
          We will send a reset link to your email.
        </Text>
      </View>

      <View style={styles.inputBox}>
        <TextInput style={styles.input} placeholder="Enter your email" />
      </View>

      <TouchableOpacity style={styles.mainBtn}>
        <Text style={styles.mainBtnText}>Send Instructions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 30, paddingTop: 60 },
  backBtn: { marginBottom: 30 },
  header: { alignItems: "center", marginBottom: 40 },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: "#F0FDF4",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "900" },
  subText: { color: "#777", marginTop: 10, textAlign: "center" },
  inputBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 60,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  input: { fontSize: 16 },
  mainBtn: {
    backgroundColor: "#16AB4C",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  mainBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
});
