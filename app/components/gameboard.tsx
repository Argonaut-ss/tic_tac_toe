"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function GameBoard() {
  const router = useRouter();
  const params = useSearchParams();

  const playerMark = (params.get("mark") as "X" | "O") || "X";
  const botMark: "X" | "O" = playerMark === "X" ? "O" : "X";

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const [score, setScore] = useState({ X: 0, O: 0, D: 0 });

  const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (b: (string | null)[]) => {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a] as "X" | "O";
      }
    }
    return null;
  };

  // HANDLE WIN OR DRAW
  const handleWin = (result: string | null) => {
    if (result) {
      setWinner(result);
      setScore((prev) => ({
        ...prev,
        [result]: prev[result as "X" | "O"] + 1,
      }));
    } else {
      setWinner("D"); // Draw
      setScore((prev) => ({
        ...prev,
        D: prev.D + 1,
      }));
    }
  };

  // PLAYER MOVE
  const handleClick = (index: number) => {
    if (turn !== playerMark) return;
    if (winner) return;
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = playerMark;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleWin(result);
      return;
    }

    if (!newBoard.includes(null)) {
      handleWin(null);
      return;
    }

    setTurn(botMark);
    setTimeout(() => botMove(newBoard), 300);
  };

  // BOT RANDOM MOVE
  const botMove = (currentBoard: (string | null)[]) => {
    const emptyIndexes = currentBoard
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null) as number[];

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newBoard = [...currentBoard];
    newBoard[randomIndex] = botMark;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleWin(result);
      return;
    }

    if (!newBoard.includes(null)) {
      handleWin(null);
      return;
    }

    setTurn(playerMark);
  };

  // AUTO FIRST TURN IF BOT = X
  useEffect(() => {
    if (botMark === "X") {
      setTurn("X");
      setTimeout(() => botMove(Array(9).fill(null)), 300);
    }
  }, []);

const rematch = () => {
  const empty = Array(9).fill(null);
  setBoard(empty);
  setWinner(null);

  if (botMark === "X") {
    setTurn("X");
    setTimeout(() => botMove(empty), 300);
  } else {
    setTurn(playerMark === "X" ? "X" : "O");
  }
};

const resetGame = () => {
  const empty = Array(9).fill(null);

  setBoard(empty);
  setWinner(null);
  setScore({ X: 0, O: 0, D: 0 });  // Reset score

  if (botMark === "X") {
    setTurn("X");
    setTimeout(() => botMove(empty), 300);
  } else {
    setTurn(playerMark === "X" ? "X" : "O");
  }
};

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6 text-white">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button
          className="p-3 bg-slate-800 rounded-xl shadow"
          onClick={() => router.push("/")}
        >
          🏠
        </button>
      </div>

      {/* Score Board */}
      <div className="flex gap-4 mb-6 w-full max-w-md">
        <div className="flex-1 bg-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{playerMark}</p>
          <p className="text-gray-400 text-sm">You</p>
          <p className="text-xl font-bold">{score[playerMark]}</p>
        </div>

        <div className="flex-1 bg-slate-700 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">=</p>
          <p className="text-gray-400 text-sm">Draw</p>
          <p className="text-xl font-bold">{score.D}</p>
        </div>

        <div className="flex-1 bg-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{botMark}</p>
          <p className="text-gray-400 text-sm">Bot</p>
          <p className="text-xl font-bold">{score[botMark]}</p>
        </div>
      </div>

      {/* Turn Status */}
      <h1 className="text-2xl font-bold mb-6">
        {winner ? "Game Over" : turn === playerMark ? "Your Turn" : "Bot Turn"}
      </h1>

      {/* BOARD */}
      <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-2xl shadow-xl w-full max-w-md">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-full aspect-square bg-slate-900 rounded-xl flex items-center justify-center text-5xl font-bold"
          >
            {cell === "X" && <span className="text-green-400">X</span>}
            {cell === "O" && <span className="text-pink-300">O</span>}
          </button>
        ))}
      </div>

      {/* Reset */}
      <div className="mt-8 w-full max-w-md">
        <button
          className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold shadow text-lg"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>

      {/* WINNER POPUP */}
      {winner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl text-center shadow-xl w-80">
            <h2 className="text-3xl font-bold mb-4">
              {winner === "D"
                ? "Draw! 🤝"
                : winner === playerMark
                ? "You Win! 🎉"
                : "Bot Wins 🤖"}
            </h2>

            <button
              onClick={rematch}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
            >
              Rematch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
