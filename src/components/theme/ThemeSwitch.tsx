// components/ThemeSwitch.tsx
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider"; // adjust path as needed

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <img
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        title="Loading Light/Dark Toggle"
      />
    );
  }

  return (
    <button
      className="transform transition-all duration-250 hover:rotate-90"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FiSun className="transition-all duration-200 hover:text-yellow-300" />
      ) : (
        <FiMoon className="transition-all duration-200 hover:text-yellow-300" />
      )}
    </button>
  );
}
