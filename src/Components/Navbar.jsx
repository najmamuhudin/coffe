import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Product", href: "#products" },
  { label: "Special coffee", href: "#special" },
  { label: "The process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#2c1810]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-[80%] w-full mx-auto flex items-center justify-between py-3 px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#8B5E3C] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 8h1a4 4 0 010 8h-1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 1v3M10 1v3M14 1v3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[1.3rem] font-black text-[#2c1810] dark:text-[#f0e9e2] tracking-wider uppercase">Coffeo</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#8B5E3C] dark:hover:text-[#8B5E3C] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block" />

          {/* Sign In / Sign Up */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/auth" className="text-sm font-semibold bg-[#8B5E3C] text-white px-4 py-2 rounded-full hover:bg-[#7a5234] transition shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#2c1810] border-b border-gray-100 dark:border-gray-800 shadow-md px-6 py-3 animate-[slideDown_0.2s_ease]">
          <input
            autoFocus
            type="text"
            placeholder="Search for coffee..."
            className="w-full max-w-2xl mx-auto block border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a0f0a] dark:text-white rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#8B5E3C] transition"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;