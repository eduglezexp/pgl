import { TouchableOpacity, Text } from "react-native";
import { restartButton } from "@/styles/components/restartButton";

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton = ({ onRestart }: RestartButtonProps) => {
  return (
    <TouchableOpacity 
      style={restartButton.button}
      onPress={onRestart}
    >
      <Text style={restartButton.buttonText}>Restart</Text>
    </TouchableOpacity>
  );
};

export default RestartButton;