import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button
        className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-600 py-1 px-2 rounded-md"
        onClick={() => changeLanguage("fr")}
      >
        Français
      </button>
      <button
        className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-600 py-1 px-2 rounded-md"
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
    </div>
  );
}
