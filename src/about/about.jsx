import React from "react";
import { NavLink } from "react-router-dom";

export function About() {
  return (
    <main className="flex flex-col items-center text-center text-xl">
      <div className="max-w-2xl">
        <p className="mb-4">
          Diabolical Directions is a focus game where the goal is to press the
          arrow keys quickly and accurately based on the text.
        </p>
        <p className="mb-6 font-bold">
          <NavLink className="underline hover:text-purple-400 mr-2" to="login">
            Log in
          </NavLink>
          to play!
        </p>
        <img
          className="mx-auto sm:w-1/2 rounded-xl"
          src="arrows.png"
          alt="Arrow Keys"
        />
      </div>
    </main>
  );
}
