import Board from "@/components/Board";
import SizeSelector from "@/components/SizeSelector";
import { game } from "@/styles/components/game";
import { useState } from "react";
import { Text, View } from "react-native";

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
    if (squares[i] || calculateWinner(squares, size)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares, size);
  const status = winner 
    ? `Winner: ${winner}` 
    : `Next player: ${xIsNext ? "X" : "O"}`;

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
    </View>
  );
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
    Array.from({ length: size }, (_, column) => row * size + column)
  );
};

const generateColumns = (size: number): number[][] => {
  return Array.from({ length: size }, (_, column) =>
    Array.from({ length: size }, (_, row) => row * size + column)
  );
};

const generateDiagonals = (size: number): number[][] => {
  const main = Array.from({ length: size }, (_, i) => i * size + i);
  const anti = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));
  return [main, anti];
};

export default Game;
