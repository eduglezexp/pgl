import HomeScreen from "@/components/HomeScreen";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const handleSelectMode = (mode: 'offline' | 'online') => {
    if (mode === 'offline') {
      router.push('/game-offline');
    } else {
      router.push('/game-online');
    }
  };

  return <HomeScreen onSelectMode={handleSelectMode} />;
}