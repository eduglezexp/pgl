import Square from "@/components/Square";
import { board } from "@/styles/components/board";
import { View, Dimensions } from "react-native";
import { GameStatus } from "@/types/game";

interface BoardProps {
  size: number;
  squares: string[];
  onSquarePress(i: number): void;
  gameStatus: GameStatus;
}

const Board = ({ size, squares, onSquarePress, gameStatus }: BoardProps) => {
  const screenWidth = Dimensions.get("window").width;
  const maxBoardSize = screenWidth * 0.8;
  const squareSize = maxBoardSize / size;

  const getHighlightType = (index: number): 'winning' | 'drawX' | 'drawO' | null => {
    if (gameStatus.winningLine && gameStatus.winningLine.includes(index)) {
      return 'winning';
    }

    if (gameStatus.isDraw && gameStatus.longestLines) {
      if (gameStatus.longestLines.X.includes(index)) {
        return 'drawX';
      }
      if (gameStatus.longestLines.O.includes(index)) {
        return 'drawO';
      }
    }

    return null;
  };

  return (
    <View
      style={[
        board.container,
        {
          width: maxBoardSize,
          height: maxBoardSize,
        },
      ]}
    >
      {Array.from({ length: size }).map((_, row) => (
        <View key={row} style={board.row}>
          {Array.from({ length: size }).map((_, col) => {
            const index = row * size + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquarePress={() => onSquarePress(index)}
                size={squareSize}
                highlightType={getHighlightType(index)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Board;
