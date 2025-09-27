import React from "react";
import { useTranslation } from "react-i18next";
import { AssetsPages } from "./actionButton";

const ActionButtonNav: React.FC<{
  setActiveTab: (tab: AssetsPages) => void;
  activeTab: AssetsPages;
}> = ({ setActiveTab, activeTab }) => {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-row justify-between h-10 px-4">
      <button
        onClick={() => setActiveTab(AssetsPages.Add)}
        className={`${
          activeTab == AssetsPages.Add
            ? "bg-slate-300 dark:bg-slate-600"
            : "dark:bg-slate-800 bg-slate-100"
        } w-44 hover:bg-slate-200 rounded-md text-sm font-medium h-9 px-4 py-2 justify-start dark:hover:bg-slate-700`}
      >
        {t("ACTION_NAV_ADD")}
      </button>
      <button
        onClick={() => setActiveTab(AssetsPages.Remove)}
        className={`${
          activeTab == AssetsPages.Remove
            ? "bg-slate-300 dark:bg-slate-600"
            : "dark:bg-slate-800 bg-slate-100"
        } w-44 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium h-9 px-4 py-2 justify-start dark:bg-slate-800 dark:hover:bg-slate-700`}
      >
        {t("ACTION_NAV_REMOVE")}
      </button>
      <button
        onClick={() => setActiveTab(AssetsPages.Liabilities)}
        className={`${
          activeTab == AssetsPages.Liabilities
            ? "bg-slate-300 dark:bg-slate-600"
            : "dark:bg-slate-800 bg-slate-100"
        } w-44 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium h-9 px-4 py-2 justify-start dark:bg-slate-800 dark:hover:bg-slate-700`}
      >
        {t("ACTION_NAV_LIABILITY")}
      </button>
    </nav>
  );
};

export default ActionButtonNav;
