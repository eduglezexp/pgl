import Square from "@/components/Square";
import { board } from "@/styles/components/board";
import { View } from "react-native";

interface BoardProps {
  size: number;
  squares: string[];
  onSquarePress(i: number): void;
}

const Board = ({size, squares, onSquarePress}: BoardProps) => {

  return (
    <View>
      {Array.from({ length: size }).map((_, row) => (
        <View style={board.row}>
          {Array.from({ length: size }).map((_, column) => {
            const index = row * size + column;
            return (
              <Square
                value={squares[index]}
                onSquarePress={() => onSquarePress(index)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Board;
