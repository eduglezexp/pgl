import Board from "@/components/Board";
import SizeSelector from "@/components/SizeSelector";
import RestartButton from "@/components/RestartButton";
import ScoreBoard from "@/components/ScoreBoard";
import { game } from "@/styles/components/game";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GameStatus } from "@/types/game";
import { getGameStatus, getStatusMessage } from "@/utils/gameUtils";

interface GameProps {
  onBackToHome?: () => void;
  mode?: 'offline' | 'online';
}

const Game = ({ onBackToHome, mode = 'offline' }: GameProps) => {
  const [size, setSize] = useState(3);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(size * size).fill(null));

  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [previousGameStatus, setPreviousGameStatus] = useState<GameStatus>({
    winner: null,
    isDraw: false,
    isGameOver: false
  });

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);
    setSquares(Array(newSize * newSize).fill(null));
    setXIsNext(true);
  };

  const handlePress = (i: number) => {
    const gameStatus = getGameStatus(squares, size);
    if (squares[i] || gameStatus.isGameOver) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    if (squares.every(square => square === null)) return;
    if (!gameStatus.isGameOver) {
      xIsNext ? setOWins(prev => prev + 1) : setXWins(prev => prev + 1);
    }
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  };

  const handleResetStats = () => {
    const gameStatus = getGameStatus(squares, size);
    if (!gameStatus.isGameOver && squares.some(square => square !== null)) {
      return;
    }
    setXWins(0);
    setOWins(0);
    setDraws(0);
  };

  const gameStatus = getGameStatus(squares, size);
  const status = getStatusMessage(gameStatus, xIsNext);
  
  useEffect(() => {
    if (gameStatus.isGameOver && !previousGameStatus.isGameOver) {
      if (gameStatus.winner === "X") {
        setXWins(prev => prev + 1);
      } else if (gameStatus.winner === "O") {
        setOWins(prev => prev + 1);
      } else if (gameStatus.isDraw) {
        setDraws(prev => prev + 1);
      }
    }
    setPreviousGameStatus(gameStatus);
  }, [gameStatus.isGameOver, gameStatus.winner, gameStatus.isDraw]);

  const canResetStats = gameStatus.isGameOver || squares.every(square => square === null);

  return (
    <View style={game.background}>
      {onBackToHome && (
        <TouchableOpacity 
          onPress={onBackToHome}
          style={game.backButton}
          activeOpacity={0.7}
        >
          <Text style={game.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}
      
      <ScoreBoard 
        xWins={xWins}
        oWins={oWins}
        draws={draws}
        onResetStats={handleResetStats}
        canResetStats={canResetStats}
      />

      <Text style={game.text}>{status}</Text>

      <Board 
        size={size} 
        squares={squares} 
        onSquarePress={handlePress}
        gameStatus={gameStatus}
      />

      <SizeSelector 
        currentSize={size} 
        onSizeChange={handleChangeSize}
        minSize={3}
        maxSize={7}
      />

      <RestartButton onRestart={handleRestart} />
    </View>
  );
};

export default Game;
