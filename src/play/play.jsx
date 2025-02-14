import React from "react";

export function Play() {
  return (
    <main className="flex flex-col items-center text-center">
      <div
        className="bg-purple-800 w-80 h-80 rounded-xl flex items-center justify-center"
        id="game"
      >
        <p className="text-xl" id="game-text">
          Press up to start!
        </p>
      </div>
      <p className="mt-10">
        Press the arrow keys based on the text before the timer runs out.
      </p>
    </main>
  );
}
