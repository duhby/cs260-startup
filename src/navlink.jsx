import React from "react";
import { NavLink } from "react-router-dom";

export function HighlightedNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "underline" : "hover:underline"} hover:text-purple-400`
      }
    >
      {children}
    </NavLink>
  );
}
