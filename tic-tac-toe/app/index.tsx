import Board from "@/components/Board";
import { game } from "@/styles/game";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <TouchableOpacity
        key={move}
        onPress={() => jumpTo(move)}
      >
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={game.background}>
      <View style={game.board}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      </View>
      <View style={game.history}>
        <ScrollView>{moves}</ScrollView>
      </View>
    </View>
  );
}
