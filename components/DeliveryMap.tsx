// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// export default function DeliveryMap({ onClose }: any) {
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       {/* 1. MAP BACKGROUND LAYER (LOCAL ASSET) */}
//       <View style={styles.mapWrapper}>
//         <Image
//           source={require("../assets/images/map-bg.jpg")}
//           style={styles.mapImage}
//           resizeMode="cover"
//         />
//         {/* Tinanggal ang Animated Moped at Me Marker dito para sa malinis na UI */}
//       </View>

//       {/* 2. TOP HEADER (CLEAN & MODERN) */}
//       <View style={[styles.headerOverlay, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity style={styles.roundBackBtn} onPress={onClose}>
//           <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
//         </TouchableOpacity>
//         <View style={styles.headerStatusCard}>
//           <Text style={styles.headerStatusTitle}>Order In Transit</Text>
//           <Text style={styles.headerStatusSub}>Arriving in 8-12 mins</Text>
//         </View>
//         <TouchableOpacity style={styles.roundBackBtn}>
//           <Ionicons name="help-circle-outline" size={24} color="#1E1E1E" />
//         </TouchableOpacity>
//       </View>

//       {/* 3. BOTTOM INFO CARD (SHOPEE STYLE REDESIGN) */}
//       <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
//         {/* PROGRESS STEPPER */}
//         <View style={styles.stepperRow}>
//           <View style={styles.step}>
//             <View style={[styles.stepDot, { backgroundColor: "#16AB4C" }]} />
//             <Text style={[styles.stepText, { color: "#16AB4C" }]}>Kitchen</Text>
//           </View>
//           <View style={styles.stepLineActive} />
//           <View style={styles.step}>
//             <View style={[styles.stepDot, { backgroundColor: "#16AB4C" }]} />
//             <Text style={[styles.stepText, { color: "#16AB4C" }]}>
//               On the way
//             </Text>
//           </View>
//           <View style={styles.stepLine} />
//           <View style={styles.step}>
//             <View style={[styles.stepDot, { backgroundColor: "#DDD" }]} />
//             <Text style={styles.stepText}>Delivered</Text>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* RIDER INFO SECTION */}
//         <View style={styles.riderRow}>
//           <Image
//             source={require("../assets/images/rider.jpg")}
//             style={styles.riderAvatar}
//           />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.riderName}>Rider: Kuya Jojo</Text>
//             <Text style={styles.riderInfo}>Toyota Vios • NQW 1234</Text>
//           </View>
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.iconBtn}>
//               <Ionicons name="chatbubble-ellipses" size={20} color="#16AB4C" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.iconBtn, { backgroundColor: "#16AB4C" }]}
//             >
//               <Ionicons name="call" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* GUARANTEE BOX */}
//         <View style={styles.guaranteeBox}>
//           <MaterialCommunityIcons
//             name="shield-check"
//             size={18}
//             color="#16AB4C"
//           />
//           <Text style={styles.guaranteeText}>
//             Food Quality Guaranteed: Get a refund if the food is cold or
//             damaged.
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF" },
//   mapWrapper: { ...StyleSheet.absoluteFillObject },
//   mapImage: { width: width, height: height * 0.75 },

//   // HEADER OVERLAY
//   headerOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     paddingHorizontal: 15,
//     alignItems: "center",
//     gap: 10,
//   },
//   roundBackBtn: {
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   headerStatusCard: {
//     flex: 1,
//     backgroundColor: "white",
//     height: 50,
//     borderRadius: 15,
//     justifyContent: "center",
//     paddingHorizontal: 15,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerStatusTitle: { fontSize: 14, fontWeight: "800", color: "#16AB4C" },
//   headerStatusSub: { fontSize: 11, color: "#666" },

//   // BOTTOM SHEET
//   bottomSheet: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 25,
//     elevation: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   stepperRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   step: { alignItems: "center", gap: 5 },
//   stepDot: { width: 10, height: 10, borderRadius: 5 },
//   stepText: { fontSize: 10, fontWeight: "700", color: "#999" },
//   stepLine: {
//     flex: 1,
//     height: 2,
//     backgroundColor: "#EEE",
//     marginTop: -15,
//     marginHorizontal: 5,
//   },
//   stepLineActive: {
//     flex: 1,
//     height: 2,
//     backgroundColor: "#16AB4C",
//     marginTop: -15,
//     marginHorizontal: 5,
//   },

//   divider: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 20 },

//   riderRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 15,
//     marginBottom: 20,
//   },
//   riderAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#EEE",
//   },
//   riderName: { fontSize: 16, fontWeight: "800", color: "#1E1E1E" },
//   riderInfo: { fontSize: 12, color: "#999" },
//   actionRow: { flexDirection: "row", gap: 10 },
//   iconBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F0F9F2",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   guaranteeBox: {
//     flexDirection: "row",
//     backgroundColor: "#F8FDF9",
//     padding: 15,
//     borderRadius: 12,
//     gap: 10,
//     borderWidth: 1,
//     borderColor: "#E8F5E9",
//   },
//   guaranteeText: { flex: 1, fontSize: 11, color: "#444", lineHeight: 16 },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// 1. STATIC COORDINATES (Sir's Requirement)
const KITCHEN_COORD = { latitude: 14.5547, longitude: 121.0244 }; // Makati Area
const CUSTOMER_COORD = { latitude: 14.58, longitude: 121.05 }; // Pasig Area
const RIDER_COORD = { latitude: 14.568, longitude: 121.037 }; // Nasa gitna (In Transit)

export default function DeliveryMap({ onClose }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* 2. ACTUAL MAP LAYER (Replaced Image with MapView) */}
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 14.567,
            longitude: 121.037,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Guhit mula Kitchen hanggang Customer */}
          <Polyline
            coordinates={[KITCHEN_COORD, CUSTOMER_COORD]}
            strokeColor="#16AB4C"
            strokeWidth={4}
            lineDashPattern={[1, 5]}
          />

          {/* Marker: Kitchen/Store */}
          <Marker coordinate={KITCHEN_COORD} title="SmartPOS Kitchen">
            <View style={styles.markerContainer}>
              <View
                style={[styles.markerDot, { backgroundColor: "#16AB4C" }]}
              />
            </View>
          </Marker>

          {/* Marker: Rider (Ang gumagalaw na icon) */}
          <Marker coordinate={RIDER_COORD} title="Kuya Jojo (Rider)">
            <View style={styles.riderMarker}>
              <MaterialCommunityIcons name="moped" size={24} color="white" />
            </View>
          </Marker>

          {/* Marker: Customer Drop-off */}
          <Marker coordinate={CUSTOMER_COORD} title="Your Location">
            <View style={styles.markerContainer}>
              <Ionicons name="location" size={30} color="#FF4444" />
            </View>
          </Marker>
        </MapView>
      </View>

      {/* 3. TOP HEADER OVERLAY */}
      <View style={[styles.headerOverlay, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.roundBackBtn} onPress={onClose}>
          <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <View style={styles.headerStatusCard}>
          <Text style={styles.headerStatusTitle}>Order In Transit</Text>
          <Text style={styles.headerStatusSub}>Arriving in 8-12 mins</Text>
        </View>
        <TouchableOpacity style={styles.roundBackBtn}>
          <Ionicons name="help-circle-outline" size={24} color="#1E1E1E" />
        </TouchableOpacity>
      </View>

      {/* 4. BOTTOM INFO CARD */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.stepperRow}>
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: "#16AB4C" }]} />
            <Text style={[styles.stepText, { color: "#16AB4C" }]}>Kitchen</Text>
          </View>
          <View style={styles.stepLineActive} />
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: "#16AB4C" }]} />
            <Text style={[styles.stepText, { color: "#16AB4C" }]}>
              On the way
            </Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: "#DDD" }]} />
            <Text style={styles.stepText}>Delivered</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.riderRow}>
          <Image
            source={require("../assets/images/rider.jpg")}
            style={styles.riderAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.riderName}>Rider: Kuya Jojo</Text>
            <Text style={styles.riderInfo}>Toyota Vios • NQW 1234</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#16AB4C" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: "#16AB4C" }]}
            >
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guaranteeBox}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color="#16AB4C"
          />
          <Text style={styles.guaranteeText}>
            Food Quality Guaranteed: Get a refund if the food is cold or
            damaged.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  mapWrapper: { ...StyleSheet.absoluteFillObject },
  map: { width: width, height: height },

  // MARKER STYLES
  markerContainer: { alignItems: "center", justifyContent: "center" },
  markerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
  },
  riderMarker: {
    backgroundColor: "#16AB4C",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    elevation: 5,
  },

  // HEADER OVERLAY
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    gap: 10,
  },
  roundBackBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
  },
  headerStatusCard: {
    flex: 1,
    backgroundColor: "white",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 15,
    elevation: 5,
  },
  headerStatusTitle: { fontSize: 14, fontWeight: "800", color: "#16AB4C" },
  headerStatusSub: { fontSize: 11, color: "#666" },

  // BOTTOM SHEET
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    elevation: 20,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  step: { alignItems: "center", gap: 5 },
  stepDot: { width: 10, height: 10, borderRadius: 5 },
  stepText: { fontSize: 10, fontWeight: "700", color: "#999" },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#EEE",
    marginTop: -15,
    marginHorizontal: 5,
  },
  stepLineActive: {
    flex: 1,
    height: 2,
    backgroundColor: "#16AB4C",
    marginTop: -15,
    marginHorizontal: 5,
  },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 20 },
  riderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEE",
  },
  riderName: { fontSize: 16, fontWeight: "800", color: "#1E1E1E" },
  riderInfo: { fontSize: 12, color: "#999" },
  actionRow: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F9F2",
    justifyContent: "center",
    alignItems: "center",
  },
  guaranteeBox: {
    flexDirection: "row",
    backgroundColor: "#F8FDF9",
    padding: 15,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8F5E9",
  },
  guaranteeText: { flex: 1, fontSize: 11, color: "#444", lineHeight: 16 },
});
