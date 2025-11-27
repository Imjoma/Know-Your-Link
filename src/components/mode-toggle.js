"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ModeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {theme === "light" ? "🌙" : "🌞"}
    </button>
  );
};

export default ModeToggler;
