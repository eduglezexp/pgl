import { ScrollView, TouchableOpacity, Text } from "react-native";
import { history as styles } from "@/styles/components/history";

interface HistoryProps {
  history: string[][];
  onJumpTo: (move: number) => void;
}

const History = ({ history, onJumpTo }: HistoryProps) => {
  return (
    <ScrollView>
      {history.map((_, move) => {
        const description = move > 0 ? `Go to move #${move}` : "Go to game start";
        return (
          <TouchableOpacity
            key={move}
            onPress={() => onJumpTo(move)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{description}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default History;