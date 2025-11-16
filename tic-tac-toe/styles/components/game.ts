import { StyleSheet } from "react-native";

export const game = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },

  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
    textAlign: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 5,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});