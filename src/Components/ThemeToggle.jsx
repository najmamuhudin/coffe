import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-brown-600 text-white hover:opacity-80 transition"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemeToggle;