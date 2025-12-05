import { useState } from "react";

export type Mark = "X" | "O";
export type Cell = Mark | null;

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

export function useTicTacToe(playerMark: Mark) {
  const botMark: Mark = playerMark === "X" ? "O" : "X";

  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Mark>("X");
  const [winner, setWinner] = useState<Mark | "D" | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, D: 0 });

  const checkWinner = (b: Cell[]) => {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    return null;
  };

  const resetBoard = (resetScore = false) => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    if (resetScore) setScore({ X:0,O:0,D:0 });
    setTurn("X");
    if (botMark === "X") {
      setTimeout(() => botMove(Array(9).fill(null)), 300);
    }
  };

  const botMove = (current: Cell[]) => {
    if (winner) return;
    const empty = current.map((v,i)=> v===null? i : null).filter(i=> i!==null) as number[];
    if (empty.length === 0) return;
    const idx = empty[Math.floor(Math.random()*empty.length)];
    const newBoard = [...current];
    newBoard[idx] = botMark;
    setBoard(newBoard);
    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
      setScore(prev => ({ ...prev, [w]: prev[w] + 1 }));
    } else if (!newBoard.includes(null)) {
      setWinner("D");
      setScore(prev => ({ ...prev, D: prev.D + 1 }));
    } else {
      setTurn(playerMark);
    }
  };

  const playerMove = (idx: number) => {
    if (turn !== playerMark) return;
    if (board[idx] !== null) return;
    if (winner) return;

    const newBoard = [...board];
    newBoard[idx] = playerMark;
    setBoard(newBoard);
    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
      setScore(prev => ({ ...prev, [w]: prev[w] + 1 }));
      return;
    } else if (!newBoard.includes(null)) {
      setWinner("D");
      setScore(prev => ({ ...prev, D: prev.D + 1 }));
      return;
    }
    setTurn(botMark);
    setTimeout(() => botMove(newBoard), 300);
  };

  return { board, turn, winner, score, playerMove, resetBoard };
}
