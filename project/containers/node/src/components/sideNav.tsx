import Logo from "./logo";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import LogoutPopup from "@/components/nav/sideNav/logoutPopup";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export default function SideNav() {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!isMobile ? (
        <div className="z-10 fixed flex flex-col justify-between p-4 w-[calc(10vw+100px)] h-screen bg-_background1 dark:bg-_darkBackground1 left-0 text-_blackText rounded-r-2xl">
          <div>
            <Logo />
            <div className="flex flex-col gap-4 mt-12 ">
              <Link
                className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText ${
                  window.location.pathname == "/app/dashboard" && "bg-_lightPrimary "
                }`}
                href="/app/dashboard"
              >
                <span
                  className={`material-symbols-outlined ${
                    window.location.pathname == "/app/dashboard" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  widgets
                </span>
                <p
                  className={`${
                    window.location.pathname == "/app/dashboard" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  {t("dashboard")}
                </p>
              </Link>
              <Link
                className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText ${
                  window.location.pathname.includes("/app/portfolios") && "bg-_lightPrimary "
                }`}
                href="/app/portfolios"
              >
                <span
                  className={`material-symbols-outlined ${
                    window.location.pathname.includes("/app/portfolios") &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  account_balance_wallet
                </span>
                <p
                  className={`${
                    window.location.pathname.includes("/app/portfolios") &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  {t("myPortfolios")}
                </p>
              </Link>
              {/* <Link
                className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText ${
                  window.location.pathname == "/app/liabilities" && "bg-_lightPrimary "
                }`}
                href="/app/liabilities"
              >
                <span
                  className={`material-symbols-outlined ${
                    window.location.pathname == "/app/liabilities" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  credit_card
                </span>
                <p
                  className={`${
                    window.location.pathname == "/app/liabilities" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  {t("myLiabilities")}
                </p>
              </Link> */}
              <Link
                className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText ${
                  window.location.pathname == "/app/search" && "bg-_lightPrimary "
                }`}
                href="/app/search"
              >
                <span
                  className={`material-symbols-outlined ${
                    window.location.pathname == "/app/search" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  search
                </span>
                <p
                  className={`${
                    window.location.pathname == "/app/search" &&
                    "text-_blackText dark:text-_whiteText"
                  }`}
                >
                  {t("research")}
                </p>
              </Link>
            </div>
          </div>
          <div className="flex justify-between">
            <Link className="" href="/app/settings/appearance">
              <div className="relative h-6 w-6 rounded-full p-4 bg-transparent hover:bg-_lightPrimary">
                <span className="absolute inset-0 hover:cursor-pointer material-symbols-outlined text-_blackText dark:text-white mt-1 ml-1">
                  settings
                </span>
              </div>
            </Link>
            <LogoutPopup />
          </div>
        </div>
      ) : (
        <div className="sticky top-0">
          <Sheet key={"left"}>
            <SheetTrigger asChild>
              <span className={`material-symbols-outlined text-3xl ml-2 mt-2 hover:cursor-pointer`}>
                menu
              </span>
            </SheetTrigger>
            <SheetContent side={"left"} className="dark:bg-_darkBackground1">
              <div className="z-10 fixed flex flex-col justify-between p-4 pb-8 w-3/4 left-0 h-screen text-_blackText rounded-r-2xl">
                <div>
                  <SheetHeader>
                    <Logo />
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-12 ">
                    {/* <Link
                      className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText text-lg ${
                        window.location.pathname == "/app" && "bg-_lightPrimary "
                      }`}
                      href="/app"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          window.location.pathname == "/app" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        home
                      </span>
                      <p
                        className={`${
                          window.location.pathname == "/app" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        TestApp
                      </p>
                    </Link> */}
                    <Link
                      className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText text-lg ${
                        window.location.pathname == "/app/dashboard" && "bg-_lightPrimary "
                      }`}
                      href="/app/dashboard"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          window.location.pathname == "/app/dashboard" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        widgets
                      </span>
                      <p
                        className={`${
                          window.location.pathname == "/app/dashboard" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        {t("dashboard")}
                      </p>
                    </Link>
                    <Link
                      className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText text-lg ${
                        window.location.pathname == "/app/portfolios" && "bg-_lightPrimary "
                      }`}
                      href="/app/portfolios"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          window.location.pathname == "/app/portfolios" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        account_balance_wallet
                      </span>
                      <p
                        className={`${
                          window.location.pathname == "/app/portfolios" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        {t("myPortfolios")}
                      </p>
                    </Link>
                    {/* <Link
                      className={`transition ease-in-out delay-[20] flex items-center gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText text-lg ${
                        window.location.pathname == "/app/liabilities" && "bg-_lightPrimary "
                      }`}
                      href="/app/liabilities"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          window.location.pathname == "/app/liabilities" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        credit_card
                      </span>
                      <p
                        className={`${
                          window.location.pathname == "/app/liabilities" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        {t("myLiabilities")}
                      </p>
                    </Link> */}
                    <Link
                      className={`transition ease-in-out delay-[20] flex gap-2 hover:text-_blackText dark:hover:text-_whiteText rounded-full p-2 text-_grayText text-lg ${
                        window.location.pathname == "/app/search" && "bg-_lightPrimary "
                      }`}
                      href="/app/search"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          window.location.pathname == "/app/search" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        search
                      </span>
                      <p
                        className={`${
                          window.location.pathname == "/app/search" &&
                          "text-_blackText dark:text-_whiteText"
                        }`}
                      >
                        {t("research")}
                      </p>
                    </Link>
                  </div>
                </div>
                <SheetFooter>
                  <Link className="" href="/app/settings/profile">
                    <span className="material-symbols-outlined text-_blackText dark:text-white text-3xl">
                      settings
                    </span>
                  </Link>
                  <LogoutPopup />
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}
