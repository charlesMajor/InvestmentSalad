import { useTranslation } from "react-i18next";

export default function NavSettings() {
  const { t } = useTranslation();

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        <a
          className={`${
            window.location.pathname == "/settings/appearance" && "bg-muted"
          } inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start`}
          href="/app/settings/appearance"
        >
          {t("SETTING_APPEARANCE_TAB")}
        </a>
      </nav>
    </aside>
  );
}
