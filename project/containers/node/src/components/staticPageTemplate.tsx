"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import frTranslation from "@//../public/locales/fr.json";
import enTranslation from "@/../public/locales/en.json";
import SideNav from "@/components/sideNav";
import NavBar from "@/components/navBar";
import LanguageSelect from "./ui/languageSelect";
import Logo from "./logo";
import { languageLocalStorage } from "@/lib/utils/constants/localStorage";
import { useDispatch } from "react-redux";
import { getCrumb, setYahooFinanceCookie } from "@/lib/services/yahooFinanceService";

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
}

const StaticPageTemplate = ({ children, isBlurBg }: ConfigurationProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const verifyCrumb = async () => {
      getCrumb().then(async (result: any) => {
        console.log(result);
        if (result.data) {
          setYahooFinanceCookie().then((result: any) => {
            localStorage.setItem("yahooFinanceCookie", result.data.key);
          });
          getCrumb().then((result: any) => {
            localStorage.setItem("crumb", result.data.key);
            localStorage.removeItem("isCrumbReady");
          });
        }
      });
    };
    if (localStorage) {
      const crumb = localStorage.getItem("crumb");
      const yahooFinanceCookie = localStorage.getItem("yahooFinanceCookie");
      const isCrumbReady = localStorage.getItem("isCrumbReady");
      if (!crumb && !yahooFinanceCookie && !isCrumbReady) {
        localStorage.setItem("isCrumbReady", "false");
        verifyCrumb();
      }
    }

    setIsClient(true);

    const localStorageLanguage: string | null = localStorage.getItem(languageLocalStorage);
    if (localStorageLanguage !== null) {
      i18n.changeLanguage(localStorageLanguage.toLowerCase());
    } else {
      i18n.changeLanguage(navigator.language.split("-")[0]);
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
            className={`fixed top-0 flex justify-between px-4 w-full items-center ${
              isBlurBg && "backdrop-blur-md"
            }`}
          >
            <Logo />
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

export default StaticPageTemplate;
