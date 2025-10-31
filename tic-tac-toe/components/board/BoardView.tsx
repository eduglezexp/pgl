import { View, Text } from "react-native";
import Square from "../Square";
import { board } from "@/styles/components/board";
import BoardRow from "./BoardRow";

interface BoardViewProps {
    squaresNumber: number,
    squares: string[],
    handlePress(i: number): void,
}

const BoardView = ({ squaresNumber, squares, handlePress }: BoardViewProps) => {
    for (let i = 0; i < squaresNumber; i++) {
        return (
            <View>
                <BoardRow
                    squares={squares}
                    handlePress={handlePress}
                >
                </BoardRow>
            </View>
        );
    }
}

export default BoardView;
