import Game from "@/components/Game";
import { useRouter } from 'expo-router';

export default function GameOnline() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.back();
  };

  return <Game onBackToHome={handleBackToHome} mode="online" />;
}
