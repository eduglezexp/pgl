import { View } from "react-native";
import Square from "../Square";
import { board } from "@/styles/components/board";

interface BoardRowProps {
    squares: string[],
    handlePress(i: number): void,
}

const BoardRow = ({squares, handlePress }: BoardRowProps) => {
    return (
        <View style={board.row}>
            <Square value={squares[0]} onSquarePress={() => handlePress(0)}></Square>
            <Square value={squares[1]} onSquarePress={() => handlePress(1)}></Square>
            <Square value={squares[2]} onSquarePress={() => handlePress(2)}></Square>
        </View>
    );
}

export default BoardRow;