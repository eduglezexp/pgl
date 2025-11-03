import { StyleSheet } from "react-native";

export const sizeSelector = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    alignItems: "center",
    bottom: -10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    bottom: 60,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemActive: {
    backgroundColor: "#E8F5E9",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  menuTextActive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

