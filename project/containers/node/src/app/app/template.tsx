"use client";

import i18n from "i18next";
import store from "@/redux/store";
import { Provider } from "react-redux";
import NavBar from "@/components/navBar";
import SideNav from "@/components/sideNav";
import { PaletteMode } from "@mui/material";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import StoreSetup from "@/components/storeSetup";
import frTranslation from "../../../public/locales/fr.json";
import enTranslation from "../../../public/locales/en.json";
import { ThemeProviderNext } from "@/components/theme-provider";
import { currencyList } from "@/lib/utils/constants/selectArray";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { languageLocalStorage } from "@/lib/utils/constants/localStorage";
import { getCrumb, setYahooFinanceCookie } from "@/lib/services/yahooFinanceService";

const defaultLanguage = "en";
const defaultCountry = "CA";
const defaultCurrency = currencyList[0];

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
}

const Configuration = ({ children }: ConfigurationProps) => {
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
      const rootElement = document.getElementById("root");
      const localStorageDarkMode: string | null = localStorage.getItem("darkMode");
      if (localStorageDarkMode !== null) {
        if (rootElement) {
          rootElement.classList.toggle("dark", localStorageDarkMode.toLowerCase() === "true");
        }
      }
    }

    if (localStorage.getItem("country") == null || localStorage.getItem("currency") == null) {
      localStorage.setItem("country", defaultCountry);
      localStorage.setItem("currency", defaultCurrency);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDnUawKCB_rmt-4_8y6xApdr_Fmmb53evQ`,
          );
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[1].address_components;

            const countryComponent = addressComponents.find((component: { types: string[] }) =>
              component.types.includes("country"),
            );

            if (countryComponent) {
              localStorage.setItem("country", countryComponent.short_name);

              const currencyForCountry: { [key: string]: string } = {
                CA: currencyList[0],
                US: currencyList[1],
                FR: currencyList[2],
              };

              if (currencyForCountry.hasOwnProperty(countryComponent.short_name)) {
                localStorage.setItem("currency", currencyForCountry[countryComponent.short_name]);
              }
            }
          }
        } catch (error) {
          console.error("Error getting country:", error);
        }
      });
    }
  }, []);

  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  useEffect(() => {
    if (localStorage) {
      setThemeMode(localStorage.getItem("darkMode") === "true" ? "dark" : "light");
    }
  }, [themeMode]);

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <div id="root">
      {isClient ? (
        <ThemeProvider theme={darkTheme}>
          <ThemeProviderNext
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Provider store={store}>
              <StoreSetup />
              <div className="flex text-_blackText dark:text-_whiteText bg-_background2 dark:bg-_darkBackground2 fill-_blackText dark:fill-_whiteText h-full min-h-screen">
                <div className="fixed -z-20 bg-_background2 dark:bg-_darkBackground2 h-screen w-screen"></div>
                <SideNav />
                <div className="pr-10 md:ml-[calc(10vw+100px)] md:pr-0 w-screen">
                  <NavBar />
                  <div className="h-full bg-_background2 dark:bg-_darkBackground2">{children}</div>
                </div>
              </div>
            </Provider>
          </ThemeProviderNext>
        </ThemeProvider>
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

export default Configuration;
