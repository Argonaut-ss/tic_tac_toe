"use client";

import { Suspense } from "react";
import GamePageContent from "./gamepagecontent";

export default function GamePage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <GamePageContent />
    </Suspense>
  );
}
