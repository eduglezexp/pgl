import Board from "@/components/Board";
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
  }

  let status = calculateStatus(squares, size, xIsNext);
  
  return (
    <View style={game.background}>
      <Text style={game.text}>{status}</Text>
      <View style={game.boardContainer}>
        <Board size={size} squares={squares} onSquarePress={handlePress}></Board>
      </View>
    </View>
  );
}

const calculateWinner = (squares: string[], size: number) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const calculateStatus = (squares: string[], size: number, xIsNext: boolean) => {
  const winner = calculateWinner(squares, size);
  if (winner) {
    return "Winner: " + winner;
  } else {
    return "Next player: " + (xIsNext ? "X" : "O");
  }
}

export default Game;
