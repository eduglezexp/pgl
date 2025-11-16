import { StyleSheet, Platform } from "react-native";

export const restartButton = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
    width: "100%",
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});