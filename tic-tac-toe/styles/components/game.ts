import { StyleSheet } from "react-native";

export const game = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 40,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },

  text: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#111827",
    textAlign: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});