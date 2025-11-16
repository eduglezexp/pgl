import { StyleSheet } from "react-native";

export const gameOnline = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#3182ce',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
  },
  statsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetDeviceText: {
    color: '#e53e3e',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3182ce',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waitingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
  waitingSubtext: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorTextSmall: {
    color: '#e53e3e',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});