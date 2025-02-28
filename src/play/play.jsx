import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Play({ username }) {
  const defaultText = "Press up to start!";
  // TODO: make different difficulties with varying durations
  const keyDuration = 1000; // In miliseconds
  const defaultPercentage = 100;

  const navigate = useNavigate();
  const [gameText, setGameText] = useState(defaultText);
  const [gameColor, setGameColor] = useState("text-black");
  const [score, setScore] = useState(0);
  const [currentKey, setCurrentKey] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(defaultPercentage);

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const endGame = (finalScore) => {
    setGameText(defaultText);
    setGameColor("text-black");
    setScore(0);
    setTimeLeft(defaultPercentage);

    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ username, score: finalScore, date: new Date() });
    localStorage.setItem("scores", JSON.stringify(scores));
    alert(`Game over! Your score: ${finalScore}`);
  };

  const nextFrame = () => {
    const directions = ["Up", "Down", "Left", "Right"];
    const colors = [
      "text-red-600",
      "text-green-600",
      "text-blue-600",
      "text-yellow-500",
    ];

    const randomDirection = Math.floor(Math.random() * directions.length);
    const randomColor = Math.floor(Math.random() * colors.length);
    setCurrentKey(directions[randomDirection]);
    setGameText(directions[randomDirection]);
    setGameColor(colors[randomColor]);

    if (timer) {
      clearInterval(timer);
    }
    setTimeLeft(defaultPercentage);

    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          // Not sufficient to do it in endGame
          clearInterval(newTimer);
          endGame(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, keyDuration / defaultPercentage);

    setTimer(newTimer);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameText === defaultText && event.key === "ArrowUp") {
        nextFrame();
      } else if (
        (event.key === "ArrowUp" && currentKey === "Up") ||
        (event.key === "ArrowDown" && currentKey === "Down") ||
        (event.key === "ArrowLeft" && currentKey === "Left") ||
        (event.key === "ArrowRight" && currentKey === "Right")
      ) {
        setScore(score + 1);
        nextFrame();
      } else if (gameText !== defaultText) {
        clearInterval(timer);
        endGame(score);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameText, currentKey, score, timer]);

  return (
    <main className="flex flex-col items-center text-center">
      <p className="mb-4 text-3xl font-bold">Score: {score}</p>
      <div
        className="bg-white w-80 h-80 rounded-xl flex flex-col items-center justify-center relative"
        id="game"
      >
        <p className={`text-xl ${gameColor}`} id="game-text">
          {gameText}
        </p>
        <div
          className="absolute bottom-0 w-full h-2 rounded-full bg-gray-600"
          style={{
            width: `${timeLeft}%`,
            transition: "width 0.02s linear",
          }}
        ></div>
      </div>
      <p className="mt-5">
        Press the arrow keys based on the text before the timer runs out.
      </p>
    </main>
  );
}
