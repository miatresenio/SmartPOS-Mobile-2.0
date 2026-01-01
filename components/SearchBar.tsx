import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Built-in sa Expo para sa Search glass
import FilterIcon from "./icon/FilterIcon";
import { Colors } from "../types/colors";

const SearchBar: React.FC<TextInputProps> = (props) => {
  const { style, ...otherProps } = props;

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search product here..."
          style={[styles.input, style]}
          {...otherProps} // value and onChangeText come via props
        />
      </View>

      <TouchableOpacity style={styles.filterBtn}>
        <FilterIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 12,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F0FDF4", // Light gray background gaya ng sa Figma
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.extraLightGray,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: "#1E1E1E",
  },
  filterBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    // Shadow para sa iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation para sa Android
    elevation: 2,
  },
});

export default SearchBar;
