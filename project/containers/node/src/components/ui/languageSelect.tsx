"use client";

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import frTranslation from "../../../public/locales/fr.json";
import enTranslation from "../../../public/locales/en.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { languageLocalStorage } from "@/lib/utils/constants/localStorage";

export default function LanguageSelect() {
  const { t } = useTranslation();

  const handleLanguageChange = (event: string) => {
    i18n.changeLanguage(event);
    localStorage.setItem("language", event);
  };

  const getDefault = () => {
    const defaultLanguage: String | null = localStorage.getItem(languageLocalStorage);
    if (defaultLanguage) return defaultLanguage.toString();
    else return navigator.language.split("-")[0];
  };

  return (
    <>
      <Select
        onValueChange={handleLanguageChange}
        value={i18n.language}
        defaultValue={getDefault() == "en" ? "English" : "Français"}
      >
        <SelectTrigger className="px-4 relative flex items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <div className="flex items-center px-2 pointer-events-none">
            <i className="shaduicn shaduicn-globe text-_blackText"></i>
          </div>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
