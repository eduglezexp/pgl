import { GameStatus } from '@/types/game';

/**
 * Genera todas las filas del tablero
 */
export const generateRows = (size: number): number[][] => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => row * size + col)
  );
};

/**
 * Genera todas las columnas del tablero
 */
export const generateColumns = (size: number): number[][] => {
  return Array.from({ length: size }, (_, col) =>
    Array.from({ length: size }, (_, row) => row * size + col)
  );
};

/**
 * Genera las dos diagonales del tablero
 */
export const generateDiagonals = (size: number): number[][] => {
  const main = Array.from({ length: size }, (_, i) => i * size + i);
  const anti = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));
  return [main, anti];
};

/**
 * Genera todas las líneas posibles (filas, columnas y diagonales)
 */
export const generateAllLines = (size: number): number[][] => {
  return [
    ...generateRows(size),
    ...generateColumns(size),
    ...generateDiagonals(size)
  ];
};

/**
 * Encuentra las líneas más largas de X y O en un empate
 */
export const findLongestLines = (squares: string[], size: number): { X: number[]; O: number[] } => {
  const lines = generateAllLines(size);

  let longestX: number[] = [];
  let longestO: number[] = [];
  let maxLengthX = 0;
  let maxLengthO = 0;

  for (const line of lines) {
    // Buscar secuencia más larga de X
    let currentSequenceX: number[] = [];
    for (const index of line) {
      if (squares[index] === 'X') {
        currentSequenceX.push(index);
      } else {
        if (currentSequenceX.length > maxLengthX) {
          maxLengthX = currentSequenceX.length;
          longestX = [...currentSequenceX];
        }
        currentSequenceX = [];
      }
    }
    if (currentSequenceX.length > maxLengthX) {
      maxLengthX = currentSequenceX.length;
      longestX = [...currentSequenceX];
    }

    // Buscar secuencia más larga de O
    let currentSequenceO: number[] = [];
    for (const index of line) {
      if (squares[index] === 'O') {
        currentSequenceO.push(index);
      } else {
        if (currentSequenceO.length > maxLengthO) {
          maxLengthO = currentSequenceO.length;
          longestO = [...currentSequenceO];
        }
        currentSequenceO = [];
      }
    }
    if (currentSequenceO.length > maxLengthO) {
      maxLengthO = currentSequenceO.length;
      longestO = [...currentSequenceO];
    }
  }

  return { X: longestX, O: longestO };
};

/**
 * Encuentra la línea ganadora
 */
export const findWinningLine = (squares: string[], size: number, winner?: string): number[] | undefined => {
  const lines = generateAllLines(size);

  for (const line of lines) {
    const first = squares[line[0]];
    if (!first) continue;
    
    if (line.every(index => squares[index] === first)) {
      if (!winner || first === winner) {
        return line;
      }
    }
  }
  
  return undefined;
};

/**
 * Calcula el ganador del juego
 */
export const calculateWinner = (squares: string[], size: number): { winner: string | null; winningLine?: number[] } => {
  const lines = generateAllLines(size);

  for (const line of lines) {
    const first = squares[line[0]];
    if (!first) continue;
    
    if (line.every(index => squares[index] === first)) {
      return { winner: first, winningLine: line };
    }
  }

  return { winner: null };
};

/**
 * Obtiene el estado del juego
 */
export const getGameStatus = (squares: string[], size: number): GameStatus => {
  const { winner, winningLine } = calculateWinner(squares, size);
  const isBoardFull = squares.every(square => square !== null && square !== '');
  const isDraw = !winner && isBoardFull;
  const isGameOver = winner !== null || isDraw;

  let longestLines;
  if (isDraw) {
    longestLines = findLongestLines(squares, size);
  }

  return { winner, isDraw, isGameOver, winningLine, longestLines };
};

/**
 * Obtiene el mensaje de estado del juego
 */
export const getStatusMessage = (gameStatus: GameStatus, xIsNext: boolean): string => {
  if (gameStatus.winner) {
    return `Winner: ${gameStatus.winner}!`;
  }
  
  if (gameStatus.isDraw) {
    return "Draw!";
  }
  
  return `Next player: ${xIsNext ? "X" : "O"}`;
};
