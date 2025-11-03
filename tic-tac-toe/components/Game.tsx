import Board from "@/components/Board";
import SizeSelector from "@/components/SizeSelector";
import RestartButton from "@/components/RestartButton";
import { game } from "@/styles/components/game";
import { useState } from "react";
import { Text, View } from "react-native";

type GameStatus = {
  winner: string | null;
  isDraw: boolean;
  isGameOver: boolean;
};

const Game = () => {
  const [size, setSize] = useState(3);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(size * size).fill(null));

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
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  };

  const gameStatus = getGameStatus(squares, size);
  const status = getStatusMessage(gameStatus, xIsNext);

  return (
    <View style={game.background}>
      <Text style={game.text}>{status}</Text>
      
      <SizeSelector 
        currentSize={size} 
        onSizeChange={handleChangeSize}
        minSize={3}
        maxSize={7}
      />

      <View style={game.boardContainer}>
        <Board size={size} squares={squares} onSquarePress={handlePress} />
      </View>

      {gameStatus.isGameOver && <RestartButton onRestart={handleRestart} />}
    </View>
  );
};

const getGameStatus = (squares: string[], size: number): GameStatus => {
  const winner = calculateWinner(squares, size);
  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;
  const isGameOver = winner !== null || isDraw;

  return { winner, isDraw, isGameOver };
};

const getStatusMessage = (gameStatus: GameStatus, xIsNext: boolean): string => {
  if (gameStatus.winner) {
    return `Winner: ${gameStatus.winner}!`;
  }
  
  if (gameStatus.isDraw) {
    return "Draw!";
  }
  
  return `Next player: ${xIsNext ? "X" : "O"}`;
};

const calculateWinner = (squares: string[], size: number): string | null => {
  const checkLine = (line: number[]): string | null => {
    const first = squares[line[0]];
    if (!first) return null;
    
    return line.every(index => squares[index] === first) ? first : null;
  };

  const lines = [
    ...generateRows(size),
    ...generateColumns(size),
    ...generateDiagonals(size)
  ];

  for (const line of lines) {
    const winner = checkLine(line);
    if (winner) return winner;
  }

  return null;
};

const generateRows = (size: number): number[][] => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => row * size + col)
  );
};

const generateColumns = (size: number): number[][] => {
  return Array.from({ length: size }, (_, col) =>
    Array.from({ length: size }, (_, row) => row * size + col)
  );
};

const generateDiagonals = (size: number): number[][] => {
  const main = Array.from({ length: size }, (_, i) => i * size + i);
  const anti = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));
  return [main, anti];
};

export default Game;
