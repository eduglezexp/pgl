import { StyleSheet, Platform } from "react-native";

export const sizeSelector = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
    marginVertical: 5,
    width: "100%",
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    alignItems: "center",
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    bottom: 55,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  menuItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  menuItemActive: {
    backgroundColor: "#E8F5E9",
  },
  menuText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  menuTextActive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});