import Game from "@/components/Game";
import { useRouter } from 'expo-router';

export default function GameOfflineScreen() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return <Game onBackToHome={handleBackToHome} mode="offline" />;
}