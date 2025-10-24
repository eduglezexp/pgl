import { styles } from "@/styles/styles";
import { Text, TouchableOpacity } from "react-native";

type Value = {
    value: string;
}

const Square = ({value}: Value) => {
    return (
        <TouchableOpacity style = {styles.square}>
            <Text style = {styles.text}>{value}</Text>
        </TouchableOpacity>
    );
};

export default Square;