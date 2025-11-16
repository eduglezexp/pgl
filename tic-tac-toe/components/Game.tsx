import Board from "@/components/Board";
import SizeSelector from "@/components/SizeSelector";
import RestartButton from "@/components/RestartButton";
import ScoreBoard from "@/components/ScoreBoard";
import { game } from "@/styles/components/game";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GameStatus } from "@/types/game";

interface GameProps {
  onBackToHome?: () => void;
  mode?: 'offline' | 'online';
}

const Game = ({ onBackToHome, mode = 'offline' }: GameProps) => {
  const [size, setSize] = useState(3);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(size * size).fill(null));

  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [previousGameStatus, setPreviousGameStatus] = useState<GameStatus>({
    winner: null,
    isDraw: false,
    isGameOver: false
  });

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);
    setSquares(Array(newSize * newSize).fill(null));
    setXIsNext(true);
  };

  const handlePress = (i: number) => {
    const gameStatus = getGameStatus(squares, size);
    if (squares[i] || gameStatus.isGameOver) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    if (squares.every(square => square === null)) return;
    if (!gameStatus.isGameOver) {
      xIsNext ? setOWins(prev => prev + 1) : setXWins(prev => prev + 1);
    }
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  };

  const handleResetStats = () => {
    const gameStatus = getGameStatus(squares, size);
    if (!gameStatus.isGameOver && squares.some(square => square !== null)) {
      return;
    }
    setXWins(0);
    setOWins(0);
    setDraws(0);
  };

  const gameStatus = getGameStatus(squares, size);
  const status = getStatusMessage(gameStatus, xIsNext);
  
  useEffect(() => {
    if (gameStatus.isGameOver && !previousGameStatus.isGameOver) {
      if (gameStatus.winner === "X") {
        setXWins(prev => prev + 1);
      } else if (gameStatus.winner === "O") {
        setOWins(prev => prev + 1);
      } else if (gameStatus.isDraw) {
        setDraws(prev => prev + 1);
      }
    }
    setPreviousGameStatus(gameStatus);
  }, [gameStatus.isGameOver, gameStatus.winner, gameStatus.isDraw]);

  const canResetStats = gameStatus.isGameOver || squares.every(square => square === null);

  return (
    <View style={game.background}>
      {onBackToHome && (
        <TouchableOpacity 
          onPress={onBackToHome}
          style={game.backButton}
          activeOpacity={0.7}
        >
          <Text style={game.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}
      
      <ScoreBoard 
        xWins={xWins}
        oWins={oWins}
        draws={draws}
        onResetStats={handleResetStats}
        canResetStats={canResetStats}
      />

      <Text style={game.text}>{status}</Text>

      <Board 
        size={size} 
        squares={squares} 
        onSquarePress={handlePress}
        gameStatus={gameStatus}
      />

      <SizeSelector 
        currentSize={size} 
        onSizeChange={handleChangeSize}
        minSize={3}
        maxSize={7}
      />

      <RestartButton onRestart={handleRestart} />
    </View>
  );
};

const getGameStatus = (squares: string[], size: number): GameStatus => {
  const { winner, winningLine } = calculateWinner(squares, size);
  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;
  const isGameOver = winner !== null || isDraw;

  let longestLines;
  if (isDraw) {
    longestLines = findLongestLines(squares, size);
  }

  return { winner, isDraw, isGameOver, winningLine, longestLines };
};

const getStatusMessage = (gameStatus: GameStatus, xIsNext: boolean): string => {
  if (gameStatus.winner) {
    return `Winner: ${gameStatus.winner}!`;
  }
  
  if (gameStatus.isDraw) {
    return "Draw!";
  }
  
  return `Next player: ${xIsNext ? "X" : "O"}`;
};

const calculateWinner = (squares: string[], size: number): { winner: string | null; winningLine?: number[] } => {
  const checkLine = (line: number[]): string | null => {
    const first = squares[line[0]];
    if (!first) return null;
    
    return line.every(index => squares[index] === first) ? first : null;
  };

  const lines = [
    ...generateRows(size),
    ...generateColumns(size),
    ...generateDiagonals(size)
  ];

  for (const line of lines) {
    const winner = checkLine(line);
    if (winner) return { winner, winningLine: line };
  }

  return { winner: null };
};

const findLongestLines = (squares: string[], size: number): { X: number[]; O: number[] } => {
  const lines = [
    ...generateRows(size),
    ...generateColumns(size),
    ...generateDiagonals(size)
  ];

  let longestX: number[] = [];
  let longestO: number[] = [];
  let maxLengthX = 0;
  let maxLengthO = 0;

  for (const line of lines) {

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

const generateRows = (size: number): number[][] => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => row * size + col)
  );
};

const generateColumns = (size: number): number[][] => {
  return Array.from({ length: size }, (_, col) =>
    Array.from({ length: size }, (_, row) => row * size + col)
  );
};

const generateDiagonals = (size: number): number[][] => {
  const main = Array.from({ length: size }, (_, i) => i * size + i);
  const anti = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));
  return [main, anti];
};

export default Game;
