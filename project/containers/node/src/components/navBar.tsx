import Link from "next/link";
import { HttpStatusCode } from "axios";
import { Skeleton } from "./ui/skeleton";
import {
  getCrumb,
  getSearchYahooFinance,
  getYahooFinanceFromCrumb,
  setYahooFinanceCookie,
} from "@/lib/services/yahooFinanceService";
import { useTranslation } from "react-i18next";
import ActionButton from "./actionButton/actionButton";
import React, { useEffect, useRef, useState } from "react";
import { SearchStocks, createObjSearch } from "@/lib/models/searchStocksModel";
import { getCrumbAndCookieFromLocalStorage } from "@/lib/utils/util";
import { useSelector } from "react-redux";
import { SearchType, TagGet } from "@/lib/services/returnTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const yahooFinanceUrl = "https://finance.yahoo.com/quote/";

export default function NavBar() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchPreview, setShowSearchPreview] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState<SearchStocks[]>([]);
  const excludedDivRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const tags: TagGet[] = useSelector((state: any) => state.tagArray.tagArray);

  const controller = useRef<AbortController | null>(null);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendSearchRequest();
    }
  };

  const sendSearchRequest = () => {
    const trimmedSearchTerm = searchTerm.trim();
    window.location.href = `/app/search?q=${encodeURIComponent(trimmedSearchTerm)}&t=${
      SearchType.SEARCH
    }`;
  };

  const sendTagRequest = (id: string) => {
    window.location.href = `/app/search?q=${id}&t=${SearchType.TAG}`;
  };

  const sendAssetRequest = (symbol: string) => {
    window.location.href = `/app/search?q=${symbol}&t=${SearchType.ASSET}`;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (excludedDivRef.current && !excludedDivRef.current.contains(event.target as Node)) {
        setShowSearchPreview(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const settingsTest = [
    {
      name: "Dark Mode",
      link: "/app/settings/appearance",
      icon: "dark_mode",
    },
    {
      name: "Language",
      link: "/app/settings/appearance",
      icon: "translate",
    },
    {
      name: "Currency",
      link: "/app/settings/appearance",
      icon: "paid",
    },
  ];

  const filteredTags = tags.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredSettings = settingsTest.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const verifyYahooFinance = async (symbol: string, modules: string) => {
    const yahooData = getCrumbAndCookieFromLocalStorage();
    if (yahooData.crumb && yahooData.cookie) {
      return await getYahooFinanceFromCrumb(
        symbol,
        "modules=" + modules,
        yahooData.crumb,
        yahooData.cookie,
      ).then((result) => {
        if (!result.success && result.message) {
          // if (result.message.options?.statusCode == HttpStatusCode.InternalServerError) {
          //   verifyCrumb();
          // }
        }
        if (result.success && result.data) {
          return result.data.key;
        }
      });
    }
    // } else {
    //   verifyCrumb();
    // }
  };

  const fetchSearchYahooFinance = async (value: string, abortController: AbortController) => {
    let result = await getSearchYahooFinance(value);
    if (!abortController.signal.aborted) {
      if (result.data) {
        const createdObjects: SearchStocks[] = result.data.key.quotes.map((quote: any) =>
          createObjSearch(
            quote.exchDisp,
            quote.longname,
            quote.symbol,
            quote.typeDisp,
            quote.sector,
          ),
        );
        setFilteredAssets(createdObjects);
        addPriceObject(createdObjects, abortController);
      } else {
        return setFilteredAssets([]);
      }
    }
  };

  const addPriceObject = async (
    createdObjects: SearchStocks[],
    abortController: AbortController,
  ) => {
    for (let i = 0; i < createdObjects.length; i++) {
      const info = await verifyYahooFinance(createdObjects[i].symbol, "price");
      if (abortController.signal.aborted) {
        break;
      }
      if (info) {
        const marketInfo = info.quoteSummary.result[0].price;
        const newPrice = marketInfo.regularMarketPrice.fmt;
        const newPercentage = marketInfo.regularMarketChangePercent.fmt;
        createdObjects[i].price = newPrice;
        createdObjects[i].percentage = newPercentage;
        createdObjects = createdObjects.slice(0);
        setFilteredAssets(createdObjects);
      }
    }
  };

  function getIconForSector(sector: string) {
    if (sector == "Financial Services") return "account_balance";
    else if (sector == "Basic Materials") return "forest";
    else if (sector == "Communication Services") return "call";
    else if (sector == "Healthcare") return "cardiology";
    else if (sector == "Technology") return "memory";
    else if (sector == "Consumer Cyclical") return "group";
    else if (sector == "Consumer Defensive") return "group";
    else if (sector == "Energy") return "battery_charging_full";
    else if (sector == "Real Estate") return "apartment";
    else if (sector == "Utilities") return "gavel";
    else return "radio_button_unchecked";
  }

  const [hoveredItems, setHoveredItems] = useState(Array(filteredAssets.length).fill(false));
  function handleMouseEnterStockElement(index: number) {
    setHoveredItems((prev) => {
      const newHoveredItems = [...prev];
      newHoveredItems[index] = true;
      return newHoveredItems;
    });
  }
  function handleMouseLeaveStockElement(index: number) {
    setHoveredItems((prev) => {
      const newHoveredItems = [...prev];
      newHoveredItems[index] = false;
      return newHoveredItems;
    });
  }

  const goToYahooFinance = (symbol: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.open(yahooFinanceUrl + symbol + "?.tsrc=fin-srch", "_blank");
  };

  return (
    <>
      <nav
        id="nav"
        className="z-10 sticky flex flex-row items-center top-0 py-2 pb-6 px-4 bg-gradient-to-b from-_background2  via-_background2 dark:from-_darkBackground2  dark:via-_darkBackground2 via-80% to-transparent to-100% mb-4"
      >
        {/* bg-_background2 dark:bg-_darkBackground2 */}
        {/* z-10 sticky sm:flex sm:flex-row items-center top-0 pt-2 px-4 mb-4 */}
        {!isMobile && (
          <div className="w-1/3">
            <ul className="flex flex-row"></ul>
          </div>
        )}
        <div ref={excludedDivRef} className="w-full sm:w-1/2 flex justify-start">
          <fieldset className="w-full space-y-1 dark:text-gray-100">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 z-50">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                  onClick={sendSearchRequest}
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 dark:text-_whiteText"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                autoComplete="off"
                type="text"
                name="Search"
                placeholder={t("SEARCH_LABEL")}
                onFocus={() => setShowSearchPreview(true)}
                className="min-w-56 sm:min-w-80 w-full py-2 pl-10 text-sm rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-200 focus:dark:bg-gray-900 drop-shadow-lg"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  controller.current?.abort();
                  const nextController = new AbortController();
                  controller.current = nextController;
                  setTimeout(() => {
                    if (!nextController.signal.aborted) {
                      fetchSearchYahooFinance(e.target.value, nextController);
                    }
                  }, 300);
                }}
                onKeyPress={handleSearchKeyPress}
              />
              {showSearchPreview && (
                <div className="w-full absolute top-full left-0 mt-2 bg-_background1 dark:bg-_darkBackground1 shadow-xl p-4 rounded-md max-h-96 overflow-y-scroll overflow-x-hidden">
                  {filteredTags.length === 0 &&
                    filteredSettings.length === 0 &&
                    filteredAssets.length === 0 && (
                      <p className="flex justify-center text-_grayText">{t("SEARCH_NO_RESULT")}</p>
                    )}
                  {filteredAssets.length != 0 && (
                    <div className="pb-2">
                      <div className="flex items-center text-_grayText text-xs py-1">
                        <span className="material-symbols-outlined text-[1rem] mr-1">
                          query_stats
                        </span>
                        <p>{t("SEARCH_ASSETS_SEARCH")}</p>
                      </div>
                      {filteredAssets.map((result, index) => (
                        <div
                          key={index}
                          className={`hover:cursor-pointer flex flex-row items-center gap-2 py-1 px-4 hover:bg-_blueBackground rounded-md`}
                          // href={"/app/search?q=" + result.symbol + "&t=" + SearchType.ASSET}
                          onMouseEnter={() => handleMouseEnterStockElement(index)}
                          onMouseLeave={() => handleMouseLeaveStockElement(index)}
                          onClick={() => sendAssetRequest(result.symbol)}
                        >
                          {hoveredItems[index] ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span
                                    onClick={goToYahooFinance(result.symbol)}
                                    className="material-symbols-outlined text-[1.2rem] mr-1 mt-1"
                                  >
                                    open_in_new
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{t("OPEN_YAHOO_FINANCE")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="material-symbols-outlined text-[1.2rem] mr-1">
                              {getIconForSector(result.sector)}
                            </span>
                          )}
                          <div className="flex flex-col w-[60%]">
                            <p>{result.symbol}</p>
                            <p className="text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
                              {result.shortname}
                            </p>
                          </div>
                          <div className="ml-auto">
                            {result.price != "0" ? (
                              <>
                                <p className="">{result.price}</p>
                                <div className="float-right text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
                                  {result.percentage.includes("-") ? (
                                    <p className="text-_redText">
                                      {result.percentage.replace(".", t("DECIMAL"))}
                                    </p>
                                  ) : (
                                    <p className="text-_greenText">
                                      {result.percentage.replace(".", t("DECIMAL"))}
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="">
                                <Skeleton className="h-5 w-12 rounded-lg mb-2" />
                                <Skeleton className="h-5 w-10 rounded-lg" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {filteredTags.length !== 0 && (
                    <div className="pb-2">
                      <div className="flex items-center text-_grayText text-xs py-1">
                        <span className="material-symbols-outlined text-[1rem]">label</span>
                        <p>{t("SEARCH_TAGS_LABEL")}</p>
                      </div>
                      {filteredTags.slice(0, 5).map((result, index) => (
                        <div
                          key={index}
                          className={`hover:cursor-pointer flex flex-row items-center gap-2 py-1 px-4 hover:bg-_blueBackground rounded-md`}
                          onClick={() => sendTagRequest(result.tagId)}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#" + result.hexColor }}
                          ></div>
                          {result.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {filteredSettings.length !== 0 && (
                    <div className="pb-2">
                      <div className="flex items-center text-_grayText text-xs py-1">
                        <span className="material-symbols-outlined text-[1rem] mr-1">settings</span>
                        <p>{t("SEARCH_SETTINGS_LABEL")}</p>
                      </div>
                      {filteredSettings.map((result, index) => (
                        <Link
                          key={index}
                          href={result.link}
                          className={`hover:cursor-pointer flex flex-row items-center gap-2 py-1 px-4 hover:bg-_blueBackground rounded-md`}
                        >
                          <span className="material-symbols-outlined text-[1.2rem]">
                            {result.icon}
                          </span>
                          {result.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </fieldset>
        </div>
        {!isMobile && (
          <div className="flex justify-end w-1/3">
            <ActionButton />
          </div>
        )}
      </nav>
      {isMobile && <ActionButton />}
    </>
  );
}
