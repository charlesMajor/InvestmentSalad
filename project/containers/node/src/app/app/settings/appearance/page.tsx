"use client";

import DarkModeToggle from "@/components/darkModeToggle";
import CurrencySelect from "@/components/ui/currencySelect";
import LanguageSelect from "@/components/ui/languageSelect";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("SETTING_APP_TITLE")}</h3>
        <p className="text-sm text-muted-foreground">{t("SETTING_APP_DESC")}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">{t("SETTING_LANGUAGE_TITLE")}</h3>
        <div className="w-1/4 ">
          <LanguageSelect />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">{t("SETTING_DARK_TITLE")}</h3>
        <DarkModeToggle />
      </div>
      <div>
        <h3 className="text-lg font-medium">{t("SETTING_CURRENCY_TITLE")}</h3>
        <div className="w-1/4">
          <CurrencySelect />
        </div>
      </div>
    </div>
  );
}
