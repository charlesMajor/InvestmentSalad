"use client";

import i18n from "i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import LanguageSelect from "./ui/languageSelect";
import enTranslation from "@/../public/locales/en.json";
import frTranslation from "@/../public/locales/fr.json";

const defaultLanguage = "en";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frTranslation },
    en: { translation: enTranslation },
  },
  lng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

interface ConfigurationProps {
  children: React.ReactNode;
  isBlurBg?: boolean;
  isArrowBlack?: boolean;
}

export const AuthPageTemplate = ({ children, isBlurBg, isArrowBlack }: ConfigurationProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);

    const localStorageLanguage: string | null = localStorage.getItem("language");
    if (localStorageLanguage !== null) {
      i18n.changeLanguage(localStorageLanguage.toLowerCase());
    } else {
      i18n.changeLanguage(navigator.language.split("-")[0]);
    }

    if (typeof document !== "undefined") {
      const rootElement = document.getElementById("root");
      const localStorageDarkMode: string | null = localStorage.getItem("darkMode");
      if (localStorageDarkMode !== null) {
        if (rootElement) {
          rootElement.classList.toggle("dark", localStorageDarkMode.toLowerCase() === "true");
        }
      }
    }

    if (typeof document !== "undefined") {
      const rootElement = document.documentElement;
      if (rootElement) {
        rootElement.classList.remove("dark");
      }
    }
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <header
            className={`fixed top-0 flex justify-between p-8 w-full z-20 ${
              isBlurBg && "backdrop-blur-md"
            }`}
          >
            <Link href="/">
              <span
                className={`material-symbols-outlined text-_blackText ${
                  !isArrowBlack && "text-_whiteText"
                }`}
              >
                arrow_back_ios
              </span>
            </Link>
            <div className="w-32">
              <LanguageSelect />
            </div>
          </header>
          <div>{children}</div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2 h-screen bg-_background2 dark:bg-_darkBackground2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-blue-300 dark:bg-blue-800"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-blue-300 dark:bg-blue-800"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-blue-300 dark:bg-blue-800"></div>
        </div>
      )}
    </div>
  );
};
