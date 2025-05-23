import React from "react";
import { useNavigate } from "react-router-dom";

export function Login({ username, setUsername }) {
  const [password, setPassword] = React.useState("");
  const usernameRef = React.useRef(username);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (username) {
      navigate("/play");
    }
  }, []);

  const loginOrCreate = (e) => {
    e.preventDefault();
    fetch("/api/auth/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameRef.current.value, password }),
    }).then((response) => {
      if (response.status === 204) {
        setUsername(usernameRef.current.value.toLowerCase());
        navigate("/play");
      } else {
        fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password,
          }),
        }).then((response) => {
          if (response.status === 204) {
            setUsername(usernameRef.current.value.toLowerCase());
            navigate("/play");
          } else {
            alert("Invalid username or password");
          }
        });
      }
    });
  };

  return (
    <main className="flex flex-col items-center text-center text-xl">
      <div className="max-w-2xl">
        <p className="mb-4">
          Log in or create an account to share your scores and appear on the
          leaderboard.
        </p>
        <form className="flex flex-col items-center" onSubmit={loginOrCreate}>
          <input
            className="border-2 w-sm rounded-sm p-1 mb-2 focus:border-purple-400 focus:outline-none"
            type="text"
            placeholder="Username"
            required
            ref={usernameRef}
          />
          <input
            className="border-2 w-sm rounded-sm p-1 mb-2 focus:border-purple-400 focus:outline-none"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-purple-800 w-sm rounded-sm p-2 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:text-purple-400"
            type="submit"
          >
            Log in/Create account
          </button>
        </form>
      </div>
    </main>
  );
}
