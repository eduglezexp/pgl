import Square from "@/components/Square";
import { board } from "@/styles/components/board";
import { Text } from "@react-navigation/elements";
import { View } from "react-native";

interface BoardProps {
    xIsNext: boolean,
    squares: string[],
    onPlay: (nextSquares: string[]) => void,
}

const Board = ({xIsNext, squares, onPlay}: BoardProps) => {

  const handlePress = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <View>
      <Text style={board.text}>{status}</Text>
      <View style={board.row}>
        <Square value={squares[0]} onSquarePress={() => handlePress(0)}></Square>
        <Square value={squares[1]} onSquarePress={() => handlePress(1)}></Square>
        <Square value={squares[2]} onSquarePress={() => handlePress(2)}></Square>
      </View>
      <View style={board.row}>
        <Square value={squares[3]} onSquarePress={() => handlePress(3)}></Square>
        <Square value={squares[4]} onSquarePress={() => handlePress(4)}></Square>
        <Square value={squares[5]} onSquarePress={() => handlePress(5)}></Square>
      </View>
      <View style={board.row}>
        <Square value={squares[6]} onSquarePress={() => handlePress(6)}></Square>
        <Square value={squares[7]} onSquarePress={() => handlePress(7)}></Square>
        <Square value={squares[8]} onSquarePress={() => handlePress(8)}></Square>
      </View>
    </View>
  );
}

const calculateWinner = (squares: string[]) => {
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

export default Board;