import { square } from "@/styles/square";
import { Text, TouchableOpacity, } from "react-native";

type SquareProps = {
    value: string
    onSquarePress: () => void;
}

const Square = ({value, onSquarePress}: SquareProps) => {
    
    return (
        <TouchableOpacity 
            style = {square.square}
            onPress={onSquarePress}
        >
            <Text style = {square.text}>{value}</Text>
        </TouchableOpacity>
    );
};

export default Square;