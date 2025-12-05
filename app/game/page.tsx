"use client";
import { useSearchParams } from "next/navigation";
import GameBoardUI from "../components/gameboard/gameboardUI";
import { useTicTacToe } from "../hooks/useTicTacToe";

export default function GamePage() {
  const params = useSearchParams();
  const mark = (params.get("mark") as "X"|"O") || "X";
  const { board, turn, winner, score, playerMove, resetBoard } = useTicTacToe(mark);

  return (
    <GameBoardUI
      board={board}
      turn={turn}
      winner={winner}
      score={score}
      playerMark={mark}
      botMark={mark === "X"? "O" : "X"}
      playerMove={playerMove}
      resetBoard={resetBoard}
    />
  );
}
