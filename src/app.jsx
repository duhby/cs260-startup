import React from "react";
import "./app.css";
import { About } from "./about/about";
import { Play } from "./play/play";
import { Login } from "./login/login";
import { Leaderboard } from "./leaderboard/leaderboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HighlightedNavLink } from "./navlink";

export default function App() {
  return (
    <BrowserRouter>
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
            <p>Player Name -</p>
            <a href="#" className="underline hover:text-purple-400">
              Logout
            </a>
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
            <div>"[You] can't spell pacifist without fist."</div>
            <div>- Sarge</div>
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
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="text-center">404: Return to sender. Address unknown.</main>
  );
}
