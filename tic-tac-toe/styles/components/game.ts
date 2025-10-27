import { StyleSheet } from "react-native";

export const game = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  boardContainer: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },

  historyContainer: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    padding: 10,
    height: 250,
  },
});
