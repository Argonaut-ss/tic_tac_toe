"use client";

import { useSearchParams } from "next/navigation";

export default function GamePage() {
  const params = useSearchParams();
  const mark = params.get("mark");
  const mode = params.get("mode");

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Game Page</h1>
      <p>Player chose: {mark}</p>
      <p>Mode: {mode}</p>
    </div>
  );
}
