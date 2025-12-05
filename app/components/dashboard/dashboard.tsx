"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [mark, setMark] = useState("X");
  const router = useRouter();("X");

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 text-4xl font-bold">
        <span className="text-cyan-400">X</span>
        <span className="text-yellow-300">O</span>
      </div>

      {/* Card */}
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <p className="text-center text-gray-400 mb-4 tracking-wide">PICK SYMBOL</p>

        {/* Toggle */}
        <div className="bg-slate-900 rounded-xl flex p-2 mb-4">
          <button
            onClick={() => setMark("X")}
            className={`flex-1 py-3 rounded-lg text-3xl font-bold transition ${
              mark === "X" ? "bg-slate-700 text-white" : "text-gray-400"
            }`}
          >
            X
          </button>
          <button
            onClick={() => setMark("O")}
            className={`flex-1 py-3 rounded-lg text-3xl font-bold transition ${
              mark === "O" ? "bg-slate-700 text-white" : "text-gray-400"
            }`}
          >
            O
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mb-6">REMEMBER : X GOES FIRST</p>

        {/* Buttons */}
        <button onClick={() => router.push(`/game?mark=${mark}`)} className="w-full py-4 rounded-xl bg-yellow-400 text-slate-900 font-bold text-lg mb-4">
          NEW GAME
        </button>
      </div>
    </div>
  );
}
