import { TouchableOpacity, Text } from "react-native";
import { square } from "@/styles/components/square";

interface SquareProps {
  value: string | null;
  onSquarePress(): void;
  size: number;
}

const Square = ({ value, onSquarePress, size }: SquareProps) => {
  return (
    <TouchableOpacity
      style={[
        square.button,
        {
          width: size,
          height: size,
        },
      ]}
      onPress={onSquarePress}
      activeOpacity={0.8}
    >
      <Text style={square.text}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Square;
