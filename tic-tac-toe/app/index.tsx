import Board from "@/components/Board";
import { game } from "@/styles/game";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  const handlePlay = (nextSquares: string[]) => {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (nextMove: number) => {

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
