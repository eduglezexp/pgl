import { View, Text, TouchableOpacity, } from "react-native";
import { scoreBoard } from "@/styles/components/scoreBoard";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  onResetStats: () => void;
  canResetStats: boolean;
}

const ScoreBoard = ({ xWins, oWins, draws, onResetStats, canResetStats }: ScoreBoardProps) => {
  return (
    <View style={scoreBoard.container}>
      <Text style={scoreBoard.title}>📊 Scoreboard</Text>
      
      <View style={scoreBoard.statsContainer}>
        <View style={scoreBoard.statItem}>
          <Text style={scoreBoard.statLabel}>PLayer X</Text>
          <Text style={scoreBoard.statValue}>{xWins}</Text>
        </View>
        
        <View style={scoreBoard.statItem}>
          <Text style={scoreBoard.statLabel}>Draws</Text>
          <Text style={scoreBoard.statValue}>{draws}</Text>
        </View>
        
        <View style={scoreBoard.statItem}>
          <Text style={scoreBoard.statLabel}>Player O</Text>
          <Text style={scoreBoard.statValue}>{oWins}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          scoreBoard.resetButton,
          !canResetStats && scoreBoard.resetButtonDisabled
        ]}
        onPress={onResetStats}
        disabled={!canResetStats}
      >
        <Text style={[
          scoreBoard.resetButtonText,
          !canResetStats && scoreBoard.resetButtonTextDisabled
        ]}>
          Reset statistics
        </Text>
      </TouchableOpacity>
      
      {!canResetStats && (
        <Text style={scoreBoard.warningText}>
          ⚠️ End the game to reset statistics
        </Text>
      )}
    </View>
  );
};

export default ScoreBoard;
