import { StyleSheet } from "react-native";

export const square = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#4B5563",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  
  text: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#1F2937",
    includeFontPadding: false,
    textAlign: "center",
  },
});
