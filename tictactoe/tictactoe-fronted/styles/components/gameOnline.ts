// @/styles/components/gameOnline.ts
import { StyleSheet, Platform } from "react-native";

export const gameOnline = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Platform.OS === 'web' ? 600 : undefined,
    alignSelf: Platform.OS === 'web' ? 'center' : undefined,
    width: Platform.OS === 'web' ? '100%' : undefined,
    gap: 15,
  },
  
  // Botón de retroceso
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 0,
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
  
  // Contenedor de estadísticas
  statsContainer: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 500 : undefined,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 5,
  },
  
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Fila horizontal de estadísticas
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },

  // Item individual de estadística
  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Botón de reset
  resetButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },

  resetDeviceText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '600',
  },
  
  // Títulos
  title: {
    fontSize: 24,
    color: '#111827',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statusText: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Botones
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estados de espera
  waitingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  waitingText: {
    fontSize: 20,
    color: '#111827',
    marginTop: 20,
    fontWeight: '600',
  },

  waitingSubtext: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },
  
  // Estados de carga y error
  loadingText: {
    color: '#111827',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },

  errorText: {
    color: '#e53e3e',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },

  errorTextSmall: {
    color: '#e53e3e',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
