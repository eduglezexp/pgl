import Square from "@/components/Square";
import { board } from "@/styles/components/board";
import { View, Dimensions } from "react-native";

interface BoardProps {
  size: number;
  squares: string[];
  onSquarePress(i: number): void;
}

const Board = ({ size, squares, onSquarePress }: BoardProps) => {
  const screenWidth = Dimensions.get("window").width;
  const maxBoardSize = screenWidth * 0.8;
  const squareSize = maxBoardSize / size;

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
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Board;

