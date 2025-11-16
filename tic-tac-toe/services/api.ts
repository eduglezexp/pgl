const API_BASE_URL = 'http://192.168.1.128:5000';

export interface Device {
  device_id: string;
}

export interface DeviceInfo {
  connected: boolean;
  wins: number;
  losses: number;
  ratio: number;
}

export interface Match {
  match_id: string;
  players: { [key: string]: 'X' | 'O' };
  board_size: number;
}

export interface WaitingStatus {
  status: 'idle' | 'waiting' | 'matched';
  match_id?: string;
  players?: { [key: string]: 'X' | 'O' };
  board_size?: number;
}

export interface MatchState {
  board: string[][];
  turn: string;
  winner: string | null;
  size: number;
  players: { [key: string]: 'X' | 'O' };
}

export interface MoveResponse {
  board: string[][];
  next_turn: string | null;
  winner: string | null;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async registerDevice(alias?: string): Promise<Device> {
    const response = await fetch(`${this.baseUrl}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alias }),
    });

    if (!response.ok) {
      throw new Error('Error al registrar dispositivo');
    }

    return await response.json();
  }

  async getDeviceInfo(deviceId: string): Promise<DeviceInfo> {
    const response = await fetch(`${this.baseUrl}/devices/${deviceId}/info`);

    if (!response.ok) {
      throw new Error('Error al obtener información del dispositivo');
    }

    return await response.json();
  }

  async createMatch(deviceId: string, size: number = 3): Promise<Match | { message: string }> {
    const response = await fetch(`${this.baseUrl}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device_id: deviceId, size }),
    });

    if (!response.ok) {
      throw new Error('Error al crear partida');
    }

    return await response.json();
  }

  async getWaitingStatus(deviceId: string): Promise<WaitingStatus> {
    const response = await fetch(
      `${this.baseUrl}/matches/waiting-status?device_id=${deviceId}`
    );

    if (!response.ok) {
      throw new Error('Error al obtener estado de espera');
    }

    return await response.json();
  }

  async makeMove(
    matchId: string,
    deviceId: string,
    x: number,
    y: number
  ): Promise<MoveResponse> {
    const response = await fetch(`${this.baseUrl}/matches/${matchId}/moves`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device_id: deviceId, x, y }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al realizar movimiento');
    }

    return await response.json();
  }

  async getMatchState(matchId: string): Promise<MatchState> {
    const response = await fetch(`${this.baseUrl}/matches/${matchId}`);

    if (!response.ok) {
      throw new Error('Error al obtener estado de la partida');
    }

    return await response.json();
  }

  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/devices`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const apiService = new ApiService();
