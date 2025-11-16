import { View, Text, TouchableOpacity } from "react-native";
import { homeScreen } from "@/styles/components/homeScreen";

interface HomeScreenProps {
  onSelectMode: (mode: 'offline' | 'online') => void;
}

const HomeScreen = ({ onSelectMode }: HomeScreenProps) => {
  return (
    <View style={homeScreen.container}>
      <View style={homeScreen.content}>
        <Text style={homeScreen.title}>Tic Tac Toe</Text>
        <Text style={homeScreen.subtitle}>Choose your game mode</Text>

        <View style={homeScreen.buttonsContainer}>
          <TouchableOpacity
            style={homeScreen.buttonOffline}
            onPress={() => onSelectMode('offline')}
            activeOpacity={0.8}
          >
            <Text style={homeScreen.buttonIcon}>👥</Text>
            <Text style={homeScreen.buttonText}>Offline Mode</Text>
            <Text style={homeScreen.buttonDescription}>Play with a friend</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeScreen.buttonOnline}
            onPress={() => onSelectMode('online')}
            activeOpacity={0.8}
          >
            <Text style={homeScreen.buttonIcon}>🌐</Text>
            <Text style={homeScreen.buttonText}>Online Mode</Text>
            <Text style={homeScreen.buttonDescription}>Play online</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;