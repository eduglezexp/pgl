import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { apiService, MatchState } from '@/services/api';
import { deviceStorage } from '@/services/deviceStorage';
import Board from '@/components/Board';
import SizeSelector from '@/components/SizeSelector';
import { GameStatus } from '@/types/game';
import { gameOnline } from '@/styles/components/gameOnline';
import { getGameStatus as getGameStatusUtil } from '@/utils/gameUtils';

interface GameOnlineProps {
  onBackToHome?: () => void;
}

const GameOnline: React.FC<GameOnlineProps> = ({ onBackToHome }) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [size, setSize] = useState(3);
  const [isWaiting, setIsWaiting] = useState(false);
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [mySymbol, setMySymbol] = useState<'X' | 'O' | null>(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    initializeDevice();
  }, []);

  useEffect(() => {
    if (!matchId || !deviceId) return;

    const interval = setInterval(async () => {
      try {
        const state = await apiService.getMatchState(matchId);
        setMatchState(state);
        setIsMyTurn(state.turn === deviceId);
        
        if (state.winner && matchState?.winner !== state.winner) {
          await loadDeviceStats();
        }
      } catch (err: any) {
        console.error('Error syncing:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [matchId, deviceId, matchState?.winner]);

  useEffect(() => {
    if (!isWaiting || !deviceId) return;

    const interval = setInterval(async () => {
      try {
        const status = await apiService.getWaitingStatus(deviceId);
        
        if (status.status === 'matched' && status.match_id) {
          setMatchId(status.match_id);
          setIsWaiting(false);
          const state = await apiService.getMatchState(status.match_id);
          setMatchState(state);
          setMySymbol(state.players[deviceId]);
          setIsMyTurn(state.turn === deviceId);
        }
      } catch (err: any) {
        console.error('Error checking status:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isWaiting, deviceId]);

  const initializeDevice = async () => {
    try {
      setLoading(true);
      setError(null);

      const isConnected = await apiService.checkConnection();
      if (!isConnected) {
        setError('Cannot connect to server. Check your connection.');
        setLoading(false);
        return;
      }

      let devId = await deviceStorage.getDeviceId();
      
      if (!devId) {
        const response = await apiService.registerDevice();
        devId = response.device_id;
        await deviceStorage.saveDeviceId(devId);
      }

      setDeviceId(devId);
      await loadDeviceStats();
      setLoading(false);
    } catch (err: any) {
      setError('Error initializing device: ' + err.message);
      setLoading(false);
    }
  };

  const loadDeviceStats = async () => {
    if (!deviceId) return;
    
    try {
      const info = await apiService.getDeviceInfo(deviceId);
      setWins(info.wins);
      setLosses(info.losses);
    } catch (err: any) {
      console.error('Error loading statistics:', err);
    }
  };

  const handleCreateMatch = async () => {
    if (!deviceId) return;

    try {
      setIsWaiting(true);
      setError(null);
      const response = await apiService.createMatch(deviceId, size);

      if ('match_id' in response) {
        setMatchId(response.match_id);
        setIsWaiting(false);
        const state = await apiService.getMatchState(response.match_id);
        setMatchState(state);
        setMySymbol(state.players[deviceId]);
        setIsMyTurn(state.turn === deviceId);
      }
    } catch (err: any) {
      setError('Error creating match: ' + err.message);
      setIsWaiting(false);
    }
  };

  const handlePress = async (i: number) => {
    if (!matchId || !matchState || !deviceId) return;

    if (!isMyTurn) {
      if (Platform.OS === 'web') {
        alert('Not your turn! Wait for your opponent to make their move.');
      } else {
        Alert.alert('Not your turn', 'Wait for your opponent to make their move.');
      }
      return;
    }

    const x = Math.floor(i / matchState.size);
    const y = i % matchState.size;

    if (matchState.board[x][y] !== '') return;

    try {
      setError(null);
      const response = await apiService.makeMove(matchId, deviceId, x, y);
      
      setMatchState({
        ...matchState,
        board: response.board,
        turn: response.next_turn || matchState.turn,
        winner: response.winner,
      });
      
      setIsMyTurn(false);
      
      if (response.winner) {
        await loadDeviceStats();
      }
    } catch (err: any) {
      setError(err.message);
      if (Platform.OS === 'web') {
        alert('Error: ' + err.message);
      } else {
        Alert.alert('Error', err.message);
      }
    }
  };

  const handleResetDevice = () => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure? This will delete your device ID and all your statistics.')) {
        deviceStorage.removeDeviceId();
        setDeviceId(null);
        setMatchId(null);
        setMatchState(null);
        setWins(0);
        setLosses(0);
        initializeDevice();
      }
    } else {
      Alert.alert(
        'Reset Device',
        'Are you sure? This will delete your device ID and all your statistics.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            style: 'destructive',
            onPress: async () => {
              await deviceStorage.removeDeviceId();
              setDeviceId(null);
              setMatchId(null);
              setMatchState(null);
              setWins(0);
              setLosses(0);
              await initializeDevice();
            },
          },
        ]
      );
    }
  };

  const handleNewMatch = () => {
    setMatchId(null);
    setMatchState(null);
    setIsWaiting(false);
    setMySymbol(null);
    setIsMyTurn(false);
  };

  const getGameStatus = (): GameStatus => {
    if (!matchState) {
      return { winner: null, isDraw: false, isGameOver: false };
    }

    const squares = convertBoardToArray();
    return getGameStatusUtil(squares, matchState.size);
  };

  const getStatusMessage = (): string => {
    if (!matchState) return 'Waiting for match...';
    
    const gameStatus = getGameStatus();
    
    if (gameStatus.winner) {
      return gameStatus.winner === mySymbol ? 'You won! 🎉' : 'You lost 😢';
    }
    
    if (gameStatus.isDraw) {
      return 'Draw 🤝';
    }
    
    return isMyTurn ? `Your turn (${mySymbol})` : `Opponent's turn...`;
  };

  const convertBoardToArray = (): string[] => {
    if (!matchState) return Array(size * size).fill('');
    
    const flatBoard: string[] = [];
    for (let i = 0; i < matchState.size; i++) {
      for (let j = 0; j < matchState.size; j++) {
        flatBoard.push(matchState.board[i][j]);
      }
    }
    return flatBoard;
  };

  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';

  if (loading) {
    return (
      <View style={gameOnline.container}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={gameOnline.loadingText}>Connecting...</Text>
      </View>
    );
  }

  if (error && !deviceId) {
    return (
      <View style={gameOnline.container}>
        <Text style={gameOnline.errorText}>{error}</Text>
        <TouchableOpacity style={gameOnline.button} onPress={initializeDevice}>
          <Text style={gameOnline.buttonText}>Retry</Text>
        </TouchableOpacity>
        {onBackToHome && (
          <TouchableOpacity style={gameOnline.backButton} onPress={onBackToHome}>
            <Text style={gameOnline.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={gameOnline.container}>
      {onBackToHome && (
        <TouchableOpacity style={gameOnline.backButton} onPress={onBackToHome}>
          <Text style={gameOnline.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}

      <View style={gameOnline.statsContainer}>
        <Text style={gameOnline.statsTitle}>Scoreboard</Text>
        
        <View style={gameOnline.statsRow}>
          <View style={gameOnline.statItem}>
            <Text style={gameOnline.statValue}>{wins}</Text>
            <Text style={gameOnline.statLabel}>Wins</Text>
          </View>
          
          <View style={gameOnline.statItem}>
            <Text style={gameOnline.statValue}>{losses}</Text>
            <Text style={gameOnline.statLabel}>Losses</Text>
          </View>
          
          <View style={gameOnline.statItem}>
            <Text style={gameOnline.statValue}>{winRate}%</Text>
            <Text style={gameOnline.statLabel}>Rate</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleResetDevice} 
          style={gameOnline.resetButton}
          activeOpacity={0.7}
        >
          <Text style={gameOnline.resetDeviceText}>Reset Device</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={gameOnline.errorTextSmall}>{error}</Text>}

      {!matchId && !isWaiting && (
        <>
          <Text style={gameOnline.title}>Create New Match</Text>
          <SizeSelector
            currentSize={size}
            onSizeChange={setSize}
            minSize={3}
            maxSize={7}
          />
          <TouchableOpacity style={gameOnline.button} onPress={handleCreateMatch}>
            <Text style={gameOnline.buttonText}>Find Opponent</Text>
          </TouchableOpacity>
        </>
      )}

      {isWaiting && (
        <View style={gameOnline.waitingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={gameOnline.waitingText}>Waiting for opponent...</Text>
          <Text style={gameOnline.waitingSubtext}>Board {size}x{size}</Text>
        </View>
      )}

      {matchId && matchState && (
        <>
          <Text style={gameOnline.statusText}>{getStatusMessage()}</Text>
          
          <Board
            size={matchState.size}
            squares={convertBoardToArray()}
            onSquarePress={handlePress}
            gameStatus={getGameStatus()}
          />

          {getGameStatus().isGameOver && (
            <TouchableOpacity style={gameOnline.button} onPress={handleNewMatch}>
              <Text style={gameOnline.buttonText}>New Match</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default GameOnline;
