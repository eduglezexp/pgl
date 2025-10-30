import { View, Text } from "react-native";
import Square from "../Square";
import { board } from "@/styles/components/board";

interface BoardViewProps {
    status: string,
    squares: string[],
    handlePress(i: number): void,
}

const BoardView = ({status, squares, handlePress}: BoardViewProps) => {
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

export default BoardView;
