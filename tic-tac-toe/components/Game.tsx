import Board from "@/components/board/Board";
import History from "@/components/History";
import { game } from "@/styles/components/game";
import { useState } from "react";
import { View } from "react-native";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => setCurrentMove(nextMove);

  return (
    <View style={game.background}>
      <View style={game.boardContainer}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      </View>
      <View style={game.historyContainer}>
        <History history={history} onJumpTo={jumpTo}></History>
      </View>
    </View>
  );
}

export default Game;
