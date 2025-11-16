import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = '@tictactoe_device_id';
const LOCAL_STATS_KEY = '@tictactoe_local_stats';

const isWeb = typeof window !== 'undefined' && !window.navigator.product;

const webStorage = {
  async setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  async removeItem(key: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
};

const storage = isWeb ? webStorage : AsyncStorage;

export interface LocalStats {
  wins: number;
  losses: number;
  draws: number;
}

export const deviceStorage = {
  async saveDeviceId(deviceId: string): Promise<void> {
    try {
      await storage.setItem(DEVICE_ID_KEY, deviceId);
    } catch (error) {
      console.error('Error saving device_id:', error);
      throw error;
    }
  },

  async getDeviceId(): Promise<string | null> {
    try {
      return await storage.getItem(DEVICE_ID_KEY);
    } catch (error) {
      console.error('Error fetching device_id:', error);
      return null;
    }
  },

  async removeDeviceId(): Promise<void> {
    try {
      await storage.removeItem(DEVICE_ID_KEY);
    } catch (error) {
      console.error('Error removing device_id:', error);
      throw error;
    }
  },

  async hasDeviceId(): Promise<boolean> {
    const deviceId = await this.getDeviceId();
    return deviceId !== null;
  },

  async saveLocalStats(stats: LocalStats): Promise<void> {
    try {
      await storage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving local stats:', error);
      throw error;
    }
  },

  async getLocalStats(): Promise<LocalStats | null> {
    try {
      const stats = await storage.getItem(LOCAL_STATS_KEY);
      return stats ? JSON.parse(stats) : null;
    } catch (error) {
      console.error('Error fetching local stats:', error);
      return null;
    }
  },

  async removeLocalStats(): Promise<void> {
    try {
      await storage.removeItem(LOCAL_STATS_KEY);
    } catch (error) {
      console.error('Error removing local stats:', error);
      throw error;
    }
  }
};
