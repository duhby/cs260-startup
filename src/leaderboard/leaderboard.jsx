import React, { useState, useEffect } from "react";

export function Leaderboard({ username }) {
  const [scores, setScores] = useState([]);
  const defaultText = "No scores yet. Be the first!";

  useEffect(() => {
    const res = localStorage.getItem("scores");
    if (res) {
      setScores(JSON.parse(res));
    }
  }, []);

  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr
          key={i}
          className={
            score.username === username
              ? "bg-gray-800 font-bold"
              : "bg-gray-700"
          }
        >
          <td>{i + 1}</td>
          <td>{score.username}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key="0">
        <td colSpan="4">{defaultText}</td>
      </tr>
    );
  }

  return (
    <main className="flex flex-col items-center text-center text-xl">
      <p className="mb-4">Login to see your scores on the leaderboard.</p>
      <table className="table-auto w-2xl bg-gray-800 rounded-sm">
        <thead>
          <tr className="text-purple-400 bg-gray-900">
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
    </main>
  );
}
