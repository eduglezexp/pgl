import Game from "@/components/Game";
import { useRouter } from 'expo-router';

export default function GameOffline() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.back();
  };

  return <Game onBackToHome={handleBackToHome} mode="offline" />;
}
