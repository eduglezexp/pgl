import { StyleSheet } from "react-native";

export const sizeSelector = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 45,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemActive: {
    backgroundColor: '#E8F5E9',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  menuTextActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});