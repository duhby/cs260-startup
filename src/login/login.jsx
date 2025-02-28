import React from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  if (username) {
    navigate("/play");
  }

  return (
    <main className="flex flex-col items-center text-center text-xl">
      <div className="max-w-2xl">
        <p className="mb-4">
          Log in or create an account to share your scores and appear on the
          leaderboard.
        </p>
        <form
          className="flex flex-col items-center"
          action="/play.html"
          method="get"
        >
          <input
            className="border-2 w-sm rounded-sm p-1 mb-2 focus:border-purple-400 focus:outline-none"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            className="border-2 w-sm rounded-sm p-1 mb-2 focus:border-purple-400 focus:outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            className="bg-purple-800 w-sm rounded-sm p-2 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:text-purple-400"
            type="submit"
            value="Log in"
          />
        </form>
      </div>
    </main>
  );
}
