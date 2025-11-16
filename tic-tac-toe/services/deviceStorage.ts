import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = '@tictactoe_device_id';

export const deviceStorage = {
  async saveDeviceId(deviceId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    } catch (error) {
      console.error('Error al guardar device_id:', error);
      throw error;
    }
  },

  async getDeviceId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(DEVICE_ID_KEY);
    } catch (error) {
      console.error('Error al obtener device_id:', error);
      return null;
    }
  },

  async removeDeviceId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(DEVICE_ID_KEY);
    } catch (error) {
      console.error('Error al eliminar device_id:', error);
      throw error;
    }
  },

  async hasDeviceId(): Promise<boolean> {
    const deviceId = await this.getDeviceId();
    return deviceId !== null;
  }
};
