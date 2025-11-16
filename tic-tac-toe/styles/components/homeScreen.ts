import { StyleSheet, Platform } from "react-native";

export const homeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  content: {
    width: "100%",
    maxWidth: Platform.OS === 'web' ? 500 : 500,
    alignItems: "center",
  },
  title: {
    fontSize: Platform.OS === 'web' ? 56 : 48,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#6B7280",
    marginBottom: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 20,
  },
  buttonOffline: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  buttonOnline: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  buttonIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 16,
    color: "#6B7280",
  },
});