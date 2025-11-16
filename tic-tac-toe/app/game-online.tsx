import GameOnline from "@/components/GameOnline";
import { useRouter } from 'expo-router';

export default function GameOnlineScreen() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return <GameOnline onBackToHome={handleBackToHome} />;
}