import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { setTheme } = useTheme();

  const handleDarkModeToggle = () => {
    localStorage.setItem("darkMode", String(!darkMode));
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const rootElement = document.getElementById("root");

      if (rootElement) {
        rootElement.classList.toggle("dark", darkMode);
      }
    }
  }, [darkMode]);

  useEffect(() => {
    const localStorageDarkMode: string | null = localStorage.getItem("darkMode");
    if (localStorageDarkMode !== null) {
      setDarkMode(localStorageDarkMode.toLowerCase() === "true");
    }
  }, []);

  return (
    <div className="cursor-pointer" onClick={handleDarkModeToggle}>
      {darkMode ? (
        <span className="material-symbols-outlined" onClick={() => setTheme("light")}>
          light_mode
        </span>
      ) : (
        <button>
          <span className="material-symbols-outlined" onClick={() => setTheme("dark")}>
            dark_mode
          </span>
        </button>
      )}
    </div>
  );
};

export default DarkModeToggle;
