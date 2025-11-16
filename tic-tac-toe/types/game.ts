export type GameStatus = {
  winner: string | null;
  isDraw: boolean;
  isGameOver: boolean;
  winningLine?: number[];
  longestLines?: {
    X: number[];
    O: number[];
  };
};
