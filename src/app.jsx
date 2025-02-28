import React from "react";
import "./app.css";
import { About } from "./about/about";
import { Play } from "./play/play";
import { Login } from "./login/login";
import { Leaderboard } from "./leaderboard/leaderboard";
import {
  NavLink,
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HighlightedNavLink } from "./navlink";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [quote, setQuote] = React.useState({
    text: "Loading...",
    author: "n/a",
  });
  const [username, setUsername] = React.useState("");

  // Needs to be used inside BrowserRouter
  const location = useLocation();

  React.useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  React.useEffect(() => {
    let quotes = [
      { text: "[You] can't spell pacifist without fist.", author: "Sarge" },
      {
        text: "[With inheritance,] you wanted a banana, but what you got was a gorilla holding the banana, and the entire jungle.",
        author: "Joe Armstrong",
      },
      {
        text: "Rust isn't about memory safety, it's about a pervasive effort to ensure that you only need to reason locally about code's behavior.",
        author: "Unknown",
      },
      {
        text: "I have a first place ribbon in doing nothing... it's the same ribbon as last place.",
        author: "Michael J. Caboose",
      },
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <div className="text-gray-100 bg-gray-900 h-screen flex flex-col justify-between">
      <header className="bg-gray-800 grid grid-cols-3 justify-items-center p-4 border-b-1">
        <h1 className="text-xl font-bold">Diabolical Directions ⬆️⬇️⬅️➡️</h1>
        <nav>
          <menu className="flex space-x-4">
            <li>
              <HighlightedNavLink to="/">Home</HighlightedNavLink>
            </li>
            <li>
              <HighlightedNavLink to="login">Login</HighlightedNavLink>
            </li>
            <li>
              <HighlightedNavLink to="play">Play</HighlightedNavLink>
            </li>
            <li>
              <HighlightedNavLink to="leaderboard">
                Leaderboard
              </HighlightedNavLink>
            </li>
          </menu>
        </nav>
        <div className="flex space-x-1">
          <p>{"username" + " -" ? username : ""}</p>
          <NavLink
            to={username ? "/" : "/login"}
            className="underline"
            onClick={logout}
          >
            {username ? "Logout" : "Login"}
          </NavLink>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="play" element={<Play />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="bg-gray-800 flex items-center justify-between p-8 border-t-1">
        <div id="random-quote">
          <div>"{quote.text}"</div>
          <div>- {quote.author}</div>
        </div>

        <div>
          <span className="mr-2">Josh</span>
          <a
            className="underline hover:text-purple-400"
            href="https://github.com/duhby/cs260-startup"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <main className="text-center">404: Return to sender. Address unknown.</main>
  );
}
