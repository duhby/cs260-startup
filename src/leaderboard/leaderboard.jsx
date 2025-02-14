import React from "react";

export function Leaderboard() {
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
        <tbody>
          <tr className="bg-gray-800 font-bold">
            <td>1</td>
            <td>Himothy</td>
            <td>100</td>
            <td>10 minutes ago</td>
          </tr>
          <tr className="bg-gray-700">
            <td>2</td>
            <td>Jimbothy</td>
            <td>68</td>
            <td>3 days ago</td>
          </tr>
          <tr className="bg-gray-800">
            <td>3</td>
            <td>Malarkey</td>
            <td>12</td>
            <td>1 week ago</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
