import { TouchableOpacity, Text } from "react-native";
import { square } from "@/styles/components/square";

interface SquareProps {
  value: string | null;
  onSquarePress(): void;
  size: number;
  highlightType?: 'winning' | 'drawX' | 'drawO' | null;
}

const Square = ({ value, onSquarePress, size, highlightType }: SquareProps) => {
  const getButtonStyle = () => {
    switch (highlightType) {
      case 'winning':
        return square.buttonWinning;
      case 'drawX':
        return square.buttonDrawX;
      case 'drawO':
        return square.buttonDrawO;
      default:
        return square.button;
    }
  };

  const textStyle = highlightType ? square.textHighlighted : square.text;

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        {
          width: size,
          height: size,
        },
      ]}
      onPress={onSquarePress}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Square;
